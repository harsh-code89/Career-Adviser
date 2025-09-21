"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { uploadResume, getResumeUrl } from '@/lib/resume';
import { supabase } from '@/lib/supabaseClient';
import Link from 'next/link';

export default function ResumeUploader() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState('');
  const [resumeUrl, setResumeUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  useEffect(() => {
    const { data: { user } } = await supabase.auth.getUser();
    setUser(user);
  }, []);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setMessage('');
    setResumeUrl('');
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files[0]);
      setMessage('');
      setResumeUrl('');
    }
  };

  const handleUpload = async () => {
    if (!file) {
      setMessage('Please select a file to upload.');
      return;
    }

    setIsLoading(true);
    setUploadProgress(0);

    try {
      if (!user) {
        setMessage('You must be logged in to upload a resume.');
        setIsLoading(false);
        return;
      }

      const progressInterval = setInterval(() => {
        setUploadProgress((prev) => {
          if (prev >= 90) {
            clearInterval(progressInterval);
            return prev;
          }
          return prev + 10;
        });
      }, 200);

      await uploadResume(user.id, file);
      const url = await getResumeUrl(user.id, file.name);
      setUploadProgress(100);
      setMessage('Resume uploaded successfully! 🎉');

      clearInterval(progressInterval);
      router.push(`/analyze?resumeUrl=${encodeURIComponent(url)}`);
    } catch (error) {
      setMessage(`Error: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-lg">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Upload Your Resume</h1>
          <p className="text-gray-600">Drag and drop your resume or click to browse.</p>
        </div>

        <div
          className={`relative border-2 border-dashed rounded-lg p-8 w-full text-center transition-all duration-300 ${
            dragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-gray-400'
          }`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <input
            type="file"
            onChange={handleFileChange}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            accept=".pdf,.doc,.docx,.txt"
            disabled={isLoading}
          />

          {file ? (
            <div>
              <p className="text-lg font-semibold text-gray-800">{file.name}</p>
              <p className="text-gray-600">{file.size} bytes</p>
            </div>
          ) : (
            <div>
              <p className="text-lg font-semibold text-gray-800">Drop your resume here</p>
              <p className="text-gray-600">or click to browse</p>
            </div>
          )}
        </div>

        {isLoading && (
          <div className="w-full mt-4">
            <div className="flex justify-between text-sm text-gray-600 mb-1">
              <span>Uploading...</span>
              <span>{uploadProgress}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-blue-600 h-2 rounded-full"
                style={{ width: `${uploadProgress}%` }}
              ></div>
            </div>
          </div>
        )}

        <button
          onClick={handleUpload}
          disabled={!file || isLoading}
          className="w-full bg-gray-800 text-white px-8 py-4 text-lg rounded-lg hover:bg-gray-700 transition-colors mt-6 disabled:opacity-50"
        >
          {isLoading ? 'Uploading...' : 'Upload Resume'}
        </button>

        {message && (
          <div className={`mt-4 p-4 rounded-md text-center ${
            message.includes('Error') ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'
          }`}>
            {message}
          </div>
        )}
      </div>
    </div>
  );
}
