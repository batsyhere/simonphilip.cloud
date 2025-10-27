'use client';

import { useState, useCallback } from 'react';
import { Upload, X, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import { toast } from 'sonner';

interface UploadFile {
  file: File;
  id: string;
  status: 'pending' | 'uploading' | 'indexing' | 'success' | 'error';
  progress: number;
  error?: string;
}

export default function AdminPage() {
  const [files, setFiles] = useState<UploadFile[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [indexingAll, setIndexingAll] = useState(false);

  const handleDragEnter = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const droppedFiles = Array.from(e.dataTransfer.files);
    addFiles(droppedFiles);
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFiles = Array.from(e.target.files);
      addFiles(selectedFiles);
    }
  };

  const addFiles = (newFiles: File[]) => {
    const validFiles = newFiles.filter((file) => {
      const isImage = file.type.startsWith('image/');
      const isVideo = file.type.startsWith('video/');
      return isImage || isVideo;
    });

    if (validFiles.length !== newFiles.length) {
      toast.error('Some files were skipped. Only images and videos are allowed.');
    }

    const uploadFiles: UploadFile[] = validFiles.map((file) => ({
      file,
      id: `${file.name}-${Date.now()}-${Math.random()}`,
      status: 'pending',
      progress: 0,
    }));

    setFiles((prev) => [...prev, ...uploadFiles]);
  };

  const removeFile = (id: string) => {
    setFiles((prev) => prev.filter((f) => f.id !== id));
  };

  const uploadFile = async (uploadFile: UploadFile) => {
    const { file, id } = uploadFile;

    try {
      // Update status to uploading
      setFiles((prev) =>
        prev.map((f) =>
          f.id === id ? { ...f, status: 'uploading' as const, progress: 10 } : f
        )
      );

      // Step 1: Get presigned URL
      const uploadResponse = await fetch('/api/media/upload', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fileName: file.name,
          fileType: file.type,
        }),
      });

      if (!uploadResponse.ok) {
        throw new Error('Failed to get upload URL');
      }

      const { uploadUrl, key, fileUrl } = await uploadResponse.json();

      setFiles((prev) =>
        prev.map((f) => (f.id === id ? { ...f, progress: 30 } : f))
      );

      // Step 2: Upload to S3
      const s3Response = await fetch(uploadUrl, {
        method: 'PUT',
        body: file,
        headers: {
          'Content-Type': file.type,
        },
      });

      if (!s3Response.ok) {
        throw new Error('Failed to upload to S3');
      }

      setFiles((prev) =>
        prev.map((f) => (f.id === id ? { ...f, progress: 70 } : f))
      );

      // Step 3: Index faces if it's an image
      if (file.type.startsWith('image/')) {
        setFiles((prev) =>
          prev.map((f) =>
            f.id === id ? { ...f, status: 'indexing' as const, progress: 80 } : f
          )
        );

        const indexResponse = await fetch('/api/media/index-face', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            s3Key: key,
            fileName: file.name,
          }),
        });

        if (!indexResponse.ok) {
          console.warn('Face indexing failed, but upload succeeded');
        }
      }

      // Success
      setFiles((prev) =>
        prev.map((f) =>
          f.id === id ? { ...f, status: 'success' as const, progress: 100 } : f
        )
      );

      toast.success(`${file.name} uploaded successfully`);
    } catch (error) {
      console.error('Upload error:', error);
      setFiles((prev) =>
        prev.map((f) =>
          f.id === id
            ? {
                ...f,
                status: 'error' as const,
                error: error instanceof Error ? error.message : 'Upload failed',
              }
            : f
        )
      );
      toast.error(`Failed to upload ${file.name}`);
    }
  };

  const uploadAll = async () => {
    const pendingFiles = files.filter((f) => f.status === 'pending');

    for (const file of pendingFiles) {
      await uploadFile(file);
    }
  };

  const indexAllExisting = async () => {
    try {
      setIndexingAll(true);
      toast.info('Indexing all existing images...');

      const response = await fetch('/api/media/index-all', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Failed to index images');
      }

      toast.success(result.message);
      console.log('Indexing details:', result.details);
    } catch (error: any) {
      console.error('Indexing error:', error);
      toast.error(error.message || 'Failed to index existing images');
    } finally {
      setIndexingAll(false);
    }
  };

  const getStatusIcon = (status: UploadFile['status']) => {
    switch (status) {
      case 'pending':
        return <Upload className="w-5 h-5 text-gray-400" />;
      case 'uploading':
      case 'indexing':
        return <Loader2 className="w-5 h-5 text-blue-500 animate-spin" />;
      case 'success':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'error':
        return <AlertCircle className="w-5 h-5 text-red-500" />;
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-4xl font-bold text-white mb-2">Media Admin Panel</h1>
              <p className="text-gray-400">Upload high-quality photos and videos to your gallery</p>
            </div>
            <button
              onClick={indexAllExisting}
              disabled={indexingAll}
              className="flex items-center gap-2 px-6 py-3 bg-purple-600 hover:bg-purple-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white rounded-lg transition-colors"
            >
              {indexingAll ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Indexing...
                </>
              ) : (
                <>
                  <CheckCircle className="w-5 h-5" />
                  Index Existing Images
                </>
              )}
            </button>
          </div>
        </div>

        {/* Upload Area */}
        <div
          className={`border-2 border-dashed rounded-xl p-12 mb-8 transition-all ${
            isDragging
              ? 'border-blue-500 bg-blue-500/10'
              : 'border-gray-600 bg-gray-800/50'
          }`}
          onDragEnter={handleDragEnter}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <div className="text-center">
            <Upload className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">
              Drop files here or click to upload
            </h3>
            <p className="text-gray-400 mb-4">
              Support for images (JPG, PNG, GIF) and videos (MP4, MOV, WebM)
            </p>
            <label className="inline-block">
              <input
                type="file"
                multiple
                accept="image/*,video/*"
                className="hidden"
                onChange={handleFileInput}
              />
              <span className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg cursor-pointer transition-colors inline-block">
                Select Files
              </span>
            </label>
          </div>
        </div>

        {/* Files List */}
        {files.length > 0 && (
          <div className="bg-gray-800/50 rounded-xl p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-semibold text-white">
                Files ({files.length})
              </h2>
              <button
                onClick={uploadAll}
                disabled={!files.some((f) => f.status === 'pending')}
                className="px-6 py-2 bg-green-600 hover:bg-green-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white rounded-lg transition-colors"
              >
                Upload All
              </button>
            </div>

            <div className="space-y-3">
              {files.map((uploadFile) => (
                <div
                  key={uploadFile.id}
                  className="flex items-center gap-4 bg-gray-900/50 p-4 rounded-lg"
                >
                  {getStatusIcon(uploadFile.status)}

                  <div className="flex-1 min-w-0">
                    <p className="text-white font-medium truncate">
                      {uploadFile.file.name}
                    </p>
                    <p className="text-sm text-gray-400">
                      {formatFileSize(uploadFile.file.size)} • {uploadFile.file.type}
                    </p>
                    {uploadFile.status === 'indexing' && (
                      <p className="text-sm text-blue-400">Indexing faces...</p>
                    )}
                    {uploadFile.error && (
                      <p className="text-sm text-red-400">{uploadFile.error}</p>
                    )}
                  </div>

                  {uploadFile.status === 'pending' && (
                    <button
                      onClick={() => uploadFile(uploadFile)}
                      className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors text-sm"
                    >
                      Upload
                    </button>
                  )}

                  {(uploadFile.status === 'pending' || uploadFile.status === 'error') && (
                    <button
                      onClick={() => removeFile(uploadFile.id)}
                      className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
                    >
                      <X className="w-5 h-5 text-gray-400" />
                    </button>
                  )}

                  {(uploadFile.status === 'uploading' || uploadFile.status === 'indexing') && (
                    <div className="w-32">
                      <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-blue-500 transition-all duration-300"
                          style={{ width: `${uploadFile.progress}%` }}
                        />
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Info Panel */}
        <div className="mt-8 bg-blue-900/20 border border-blue-800/30 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-blue-400 mb-2">ℹ️ Important Notes</h3>
          <ul className="text-gray-300 space-y-1 text-sm">
            <li>• Images with faces will be automatically indexed for facial recognition</li>
            <li>• Videos are stored but not indexed for facial recognition</li>
            <li>• All media is uploaded to a secure S3 bucket</li>
            <li>• Maximum recommended file size: 100MB per file</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
