"use client";

import { useState } from 'react';
import { uploadResume, getResumeUrl } from '@/lib/resume';

export default function ResumeUploader() {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState('');
  const [resumeUrl, setResumeUrl] = useState('');

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) {
      setMessage('Please select a file to upload.');
      return;
    }

    try {
      const userId = 'test-user-id'; // Replace with actual user ID from auth session
      await uploadResume(userId, file);
      const url = await getResumeUrl(userId, file.name);
      setResumeUrl(url);
      setMessage('Resume uploaded successfully!');
    } catch (error) {
      setMessage(`Error: ${error.message}`);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <h1 className="text-2xl font-bold mb-4">Upload Your Resume</h1>
      <input
        type="file"
        onChange={handleFileChange}
        className="mb-4 p-2 border rounded"
      />
      <button
        onClick={handleUpload}
        className="p-2 bg-blue-500 text-white rounded"
      >
        Upload Resume
      </button>
      {message && <p className="mt-4 text-center text-red-500">{message}</p>}
      {resumeUrl && (
        <p className="mt-4 text-center">
          Resume URL: <a href={resumeUrl} target="_blank" className="text-blue-500 underline">{resumeUrl}</a>
        </p>
      )}
    </div>
  );
}