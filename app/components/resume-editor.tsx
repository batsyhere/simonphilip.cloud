import { useState } from "react";

type Resume = {
    name: string;
    title: string;
    phone: string;
    email: string;
    summary: string;
    skills: string[];
    experience: {
      role: string;
      company: string;
      duration: string;
      responsibilities: string[];
    }[];
    projects: {
      name: string;
      description: string;
    }[];
    certifications: string[];
    education: {
      degree: string;
      institution: string;
      year: string;
    }[];
  };

  interface ResumeEditorProps {
    resumeData: Resume;
    onSave: (updatedData: Resume) => void;
    onCancel: () => void;
  }
  

  export const ResumeEditor = ({ resumeData, onSave, onCancel }: ResumeEditorProps) => {
    const [editedResume, setEditedResume] = useState<Resume>(resumeData);
  
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, key: string) => {
      setEditedResume({
        ...editedResume,
        [key]: e.target.value
      });
    };
  
    const handleSave = () => {
      onSave(editedResume); // updated data will be passed to onSave callback
    };
  
    return (
      <div className="space-y-4">
        <div>
          <label className="block font-medium mb-1">Name</label>
          <input
            type="text"
            value={editedResume.name}
            onChange={(e) => handleChange(e, "name")}
            className="w-full border border-zinc-300 rounded-md px-4 py-2"
          />
        </div>
        <div>
          <label className="block font-medium mb-1">Title</label>
          <input
            type="text"
            value={editedResume.title}
            onChange={(e) => handleChange(e, "title")}
            className="w-full border border-zinc-300 rounded-md px-4 py-2"
          />
        </div>
        {/* Add the rest of the form fields here */}
        <button
          onClick={handleSave}
          className="px-6 py-2 bg-blue-500 text-white rounded-md"
        >
          Save Changes
        </button>
        <button
          onClick={onCancel}
          className="px-6 py-2 bg-red-500 text-white rounded-md ml-4"
        >
          Cancel
        </button>
      </div>
    );
  };
  