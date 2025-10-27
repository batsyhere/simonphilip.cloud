'use client';

import { useState, useEffect, useRef } from 'react';
import {
  Download,
  Search,
  Camera,
  X,
  Loader2,
  Image as ImageIcon,
  Video,
  Grid3x3,
  List,
} from 'lucide-react';
import { toast } from 'sonner';

interface MediaItem {
  key: string;
  url: string;
  size: number;
  lastModified: string;
  type: 'image' | 'video' | 'unknown';
  fileName: string;
}

export default function GalleryPage() {
  const [media, setMedia] = useState<MediaItem[]>([]);
  const [filteredMedia, setFilteredMedia] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showWebcam, setShowWebcam] = useState(false);
  const [searching, setSearching] = useState(false);
  const [selectedMedia, setSelectedMedia] = useState<MediaItem | null>(null);

  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  useEffect(() => {
    fetchMedia();
  }, []);

  const fetchMedia = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/media/list');

      if (!response.ok) {
        throw new Error('Failed to fetch media');
      }

      const data = await response.json();
      setMedia(data.media || []);
      setFilteredMedia(data.media || []);
    } catch (error) {
      console.error('Error fetching media:', error);
      toast.error('Failed to load media');
    } finally {
      setLoading(false);
    }
  };

  const downloadMedia = async (item: MediaItem) => {
    try {
      const link = document.createElement('a');
      link.href = item.url;
      link.download = item.fileName;
      link.target = '_blank';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      toast.success('Download started');
    } catch (error) {
      console.error('Download error:', error);
      toast.error('Failed to download');
    }
  };

  const startWebcam = async () => {
    try {
      setShowWebcam(true);

      // Wait a tick for the video element to be mounted
      await new Promise(resolve => setTimeout(resolve, 100));

      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'user', width: { ideal: 1280 }, height: { ideal: 720 } },
        audio: false,
      });

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        streamRef.current = stream;

        // Explicitly play the video
        try {
          await videoRef.current.play();
        } catch (playError) {
          console.error('Video play error:', playError);
        }
      }
    } catch (error) {
      console.error('Webcam error:', error);
      setShowWebcam(false);
      toast.error('Failed to access camera. Please grant camera permissions.');
    }
  };

  const stopWebcam = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
    setShowWebcam(false);
  };

  const captureAndSearch = async () => {
    if (!videoRef.current || !canvasRef.current) {
      toast.error('Camera not ready');
      return;
    }

    const video = videoRef.current;

    // Check if video is ready
    if (video.videoWidth === 0 || video.videoHeight === 0) {
      toast.error('Camera is still loading. Please wait a moment.');
      return;
    }

    try {
      setSearching(true);
      toast.info('Capturing image...');

      // Capture image from video
      const canvas = canvasRef.current;
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;

      const ctx = canvas.getContext('2d');
      if (!ctx) throw new Error('Canvas context not available');

      ctx.drawImage(video, 0, 0);

      // Convert to base64
      const imageData = canvas.toDataURL('image/jpeg', 0.9);
      console.log('Image captured, size:', imageData.length, 'bytes');

      // Search for faces
      toast.info('Searching for faces...');
      const response = await fetch('/api/media/search-face', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ imageData }),
      });

      const result = await response.json();
      console.log('Search result:', result);

      if (!response.ok) {
        throw new Error(result.error || 'Face search failed');
      }

      if (!result.matches || result.matches.length === 0) {
        toast.info('No matching faces found');
        setFilteredMedia(media);
        stopWebcam();
        return;
      }

      // Filter media based on matches
      const matchedFileNames = result.matches.map(
        (match: any) => match.externalImageId
      );

      console.log('Matched file names:', matchedFileNames);

      const filtered = media.filter((item) =>
        matchedFileNames.some((name: string) =>
          item.fileName.includes(name) || item.key.includes(name)
        )
      );

      console.log('Filtered media:', filtered.length, 'items');

      setFilteredMedia(filtered);
      toast.success(`Found ${filtered.length} photo(s) with matching face(s)`);

      stopWebcam();
    } catch (error: any) {
      console.error('Search error:', error);
      toast.error(error.message || 'Face search failed. Please try again.');
    } finally {
      setSearching(false);
    }
  };

  const resetFilter = () => {
    setFilteredMedia(media);
    toast.info('Showing all media');
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Media Gallery</h1>
          <p className="text-gray-400">Browse and search your photo collection</p>
        </div>

        {/* Controls */}
        <div className="flex flex-wrap gap-4 mb-8">
          <button
            onClick={startWebcam}
            disabled={showWebcam}
            className="flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white rounded-lg transition-colors"
          >
            <Camera className="w-5 h-5" />
            Search by Face
          </button>

          {filteredMedia.length !== media.length && (
            <button
              onClick={resetFilter}
              className="flex items-center gap-2 px-6 py-3 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
              Clear Filter ({filteredMedia.length} of {media.length})
            </button>
          )}

          <button
            onClick={fetchMedia}
            disabled={loading}
            className="flex items-center gap-2 px-6 py-3 bg-gray-700 hover:bg-gray-600 disabled:bg-gray-600 text-white rounded-lg transition-colors ml-auto"
          >
            {loading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <Search className="w-5 h-5" />
            )}
            Refresh
          </button>

          <div className="flex gap-2">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-3 rounded-lg transition-colors ${
                viewMode === 'grid'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              <Grid3x3 className="w-5 h-5" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-3 rounded-lg transition-colors ${
                viewMode === 'list'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              <List className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Webcam Modal */}
        {showWebcam && (
          <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
            <div className="bg-gray-900 rounded-xl p-6 max-w-2xl w-full">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold text-white">Facial Recognition Search</h2>
                <button
                  onClick={stopWebcam}
                  className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
                >
                  <X className="w-6 h-6 text-gray-400" />
                </button>
              </div>

              <div className="relative bg-black rounded-lg overflow-hidden mb-4">
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  muted
                  className="w-full min-h-[400px] object-cover"
                  onLoadedMetadata={() => {
                    if (videoRef.current) {
                      videoRef.current.play().catch(err => console.error('Play error:', err));
                    }
                  }}
                />
                <canvas ref={canvasRef} className="hidden" />
              </div>

              <div className="flex gap-4">
                <button
                  onClick={captureAndSearch}
                  disabled={searching}
                  className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 text-white rounded-lg transition-colors"
                >
                  {searching ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Searching...
                    </>
                  ) : (
                    <>
                      <Camera className="w-5 h-5" />
                      Capture & Search
                    </>
                  )}
                </button>
                <button
                  onClick={stopWebcam}
                  className="px-6 py-3 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors"
                >
                  Cancel
                </button>
              </div>

              <p className="text-sm text-gray-400 mt-4 text-center">
                Position your face in the camera and click "Capture & Search" to find matching photos
              </p>
            </div>
          </div>
        )}

        {/* Media Display Modal */}
        {selectedMedia && (
          <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-4">
            <div className="max-w-5xl w-full">
              <div className="flex justify-end mb-4">
                <button
                  onClick={() => setSelectedMedia(null)}
                  className="p-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors"
                >
                  <X className="w-6 h-6 text-white" />
                </button>
              </div>
              {selectedMedia.type === 'image' ? (
                <img
                  src={selectedMedia.url}
                  alt={selectedMedia.fileName}
                  className="w-full h-auto rounded-lg"
                />
              ) : (
                <video src={selectedMedia.url} controls className="w-full h-auto rounded-lg" />
              )}
            </div>
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-12 h-12 text-blue-500 animate-spin" />
          </div>
        )}

        {/* Empty State */}
        {!loading && filteredMedia.length === 0 && (
          <div className="text-center py-20">
            <ImageIcon className="w-16 h-16 text-gray-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-400 mb-2">No media found</h3>
            <p className="text-gray-500">Upload some photos or videos to get started</p>
          </div>
        )}

        {/* Grid View */}
        {!loading && filteredMedia.length > 0 && viewMode === 'grid' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredMedia.map((item) => (
              <div
                key={item.key}
                className="bg-gray-800/50 rounded-lg overflow-hidden hover:ring-2 hover:ring-blue-500 transition-all cursor-pointer group"
              >
                <div
                  className="aspect-square bg-gray-900 relative overflow-hidden"
                  onClick={() => setSelectedMedia(item)}
                >
                  {item.type === 'image' ? (
                    <img
                      src={item.url}
                      alt={item.fileName}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <Video className="w-16 h-16 text-gray-600" />
                    </div>
                  )}
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    {item.type === 'image' ? (
                      <ImageIcon className="w-12 h-12 text-white" />
                    ) : (
                      <Video className="w-12 h-12 text-white" />
                    )}
                  </div>
                </div>

                <div className="p-4">
                  <p className="text-white font-medium truncate mb-1">{item.fileName}</p>
                  <p className="text-sm text-gray-400 mb-3">
                    {formatFileSize(item.size)} • {formatDate(item.lastModified)}
                  </p>
                  <button
                    onClick={() => downloadMedia(item)}
                    className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors text-sm"
                  >
                    <Download className="w-4 h-4" />
                    Download
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* List View */}
        {!loading && filteredMedia.length > 0 && viewMode === 'list' && (
          <div className="bg-gray-800/50 rounded-xl overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-900/50">
                <tr>
                  <th className="text-left p-4 text-gray-400 font-medium">Name</th>
                  <th className="text-left p-4 text-gray-400 font-medium">Type</th>
                  <th className="text-left p-4 text-gray-400 font-medium">Size</th>
                  <th className="text-left p-4 text-gray-400 font-medium">Date</th>
                  <th className="text-right p-4 text-gray-400 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredMedia.map((item) => (
                  <tr
                    key={item.key}
                    className="border-t border-gray-700/50 hover:bg-gray-900/30 transition-colors"
                  >
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        {item.type === 'image' ? (
                          <ImageIcon className="w-5 h-5 text-blue-400" />
                        ) : (
                          <Video className="w-5 h-5 text-purple-400" />
                        )}
                        <span className="text-white font-medium truncate max-w-md">
                          {item.fileName}
                        </span>
                      </div>
                    </td>
                    <td className="p-4">
                      <span className="text-gray-400 capitalize">{item.type}</span>
                    </td>
                    <td className="p-4">
                      <span className="text-gray-400">{formatFileSize(item.size)}</span>
                    </td>
                    <td className="p-4">
                      <span className="text-gray-400">{formatDate(item.lastModified)}</span>
                    </td>
                    <td className="p-4 text-right">
                      <button
                        onClick={() => downloadMedia(item)}
                        className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors text-sm"
                      >
                        <Download className="w-4 h-4" />
                        Download
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
