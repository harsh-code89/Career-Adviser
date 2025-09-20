"use client";

import { useState } from 'react';
import { parseResume, analyzeResume } from '@/lib/resumeAnalysis';

export default function ResumeAnalysis() {
  const [fileContent, setFileContent] = useState(null);
  const [parsedData, setParsedData] = useState(null);
  const [analysisResult, setAnalysisResult] = useState(null);
  const [message, setMessage] = useState('');

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = (event) => {
      setFileContent(event.target.result);
    };

    reader.readAsDataURL(file);
  };

  const handleParse = async () => {
    try {
      const parsed = await parseResume(fileContent);
      setParsedData(parsed);
      setMessage('Resume parsed successfully!');
    } catch (error) {
      setMessage(`Error: ${error.message}`);
    }
  };

  const handleAnalyze = async () => {
    if (!parsedData) {
      setMessage('Please parse the resume first.');
      return;
    }

    try {
      const analysis = await analyzeResume(parsedData.text);
      setAnalysisResult(analysis);
      setMessage('Resume analyzed successfully!');
    } catch (error) {
      setMessage(`Error: ${error.message}`);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <h1 className="text-2xl font-bold mb-4">Resume Parsing and Analysis</h1>
      <input
        type="file"
        onChange={handleFileChange}
        className="mb-4 p-2 border rounded"
      />
      <button
        onClick={handleParse}
        className="mb-2 p-2 bg-blue-500 text-white rounded"
      >
        Parse Resume
      </button>
      <button
        onClick={handleAnalyze}
        className="p-2 bg-green-500 text-white rounded"
      >
        Analyze Resume
      </button>
      {message && <p className="mt-4 text-center text-red-500">{message}</p>}
      {parsedData && (
        <div className="mt-4">
          <h2 className="text-xl font-bold">Parsed Data:</h2>
          <pre className="bg-gray-100 p-2 rounded">{JSON.stringify(parsedData, null, 2)}</pre>
        </div>
      )}
      {analysisResult && (
        <div className="mt-4">
          <h2 className="text-xl font-bold">Analysis Result:</h2>
          <pre className="bg-gray-100 p-2 rounded">{JSON.stringify(analysisResult, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}