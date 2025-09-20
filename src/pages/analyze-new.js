"use client";

import { useState } from 'react';
import { parseResume, analyzeResume } from '@/lib/resumeAnalysis';

export default function ResumeAnalysis() {
  const [fileContent, setFileContent] = useState(null);
  const [parsedData, setParsedData] = useState(null);
  const [analysisResult, setAnalysisResult] = useState(null);
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = (event) => {
      setFileContent(event.target.result);
    };

    reader.readAsText(file);
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
      const file = e.dataTransfer.files[0];
      const reader = new FileReader();

      reader.onload = (event) => {
        setFileContent(event.target.result);
      };

      reader.readAsText(file);
    }
  };

  const handleParse = async () => {
    if (!fileContent) {
      setMessage('Please select a file first.');
      return;
    }

    setIsLoading(true);
    try {
      const parsed = await parseResume(fileContent);
      setParsedData(parsed);
      setMessage('Resume parsed successfully! ✅');
    } catch (error) {
      setMessage(`Error: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAnalyze = async () => {
    if (!parsedData) {
      setMessage('Please parse the resume first.');
      return;
    }

    setIsLoading(true);
    try {
      const analysis = await analyzeResume(parsedData.text);
      setAnalysisResult(analysis);
      setMessage('Resume analyzed successfully! 🎉');
    } catch (error) {
      setMessage(`Error: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getScoreColor = (score) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreBgColor = (score) => {
    if (score >= 80) return 'bg-green-100 border-green-200';
    if (score >= 60) return 'bg-yellow-100 border-yellow-200';
    return 'bg-red-100 border-red-200';
  };

  return (
    <div className="min-h-screen gradient-success flex flex-col">
      {/* Floating Elements */}
      <div className="absolute top-20 left-10 w-16 h-16 bg-white/10 rounded-full float hidden lg:block"></div>
      <div className="absolute top-40 right-20 w-12 h-12 bg-white/5 rounded-full float hidden lg:block" style={{animationDelay: '2s'}}></div>
      <div className="absolute bottom-20 left-1/4 w-20 h-20 bg-white/10 rounded-full float hidden lg:block" style={{animationDelay: '4s'}}></div>

      {/* Header */}
      <header className="bg-white/10 backdrop-blur-md border-b border-white/20 py-6 px-8">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
              <span className="text-white font-bold text-xl">CA</span>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">Resume Analysis</h1>
              <p className="text-white/70 text-sm">AI-powered resume parsing and insights</p>
            </div>
          </div>
          <button
            onClick={() => window.history.back()}
            className="text-white/80 hover:text-white transition-colors flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back
          </button>
        </div>
      </header>

      <main className="flex-1 p-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 slide-in">
            <h1 className="text-4xl font-bold text-white mb-4">
              Analyze Your
              <span className="block gradient-secondary bg-clip-text text-transparent">
                Resume
              </span>
            </h1>
            <p className="text-xl text-white/90 max-w-3xl mx-auto">
              Upload your resume to get detailed analysis, improvement suggestions, and career insights.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Upload Section */}
            <div className="lg:col-span-1">
              <div className="modern-card p-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Upload Resume</h3>

                {/* File Upload Area */}
                <div
                  className={`relative border-2 border-dashed rounded-2xl p-6 text-center transition-all duration-300 mb-4 ${
                    dragActive
                      ? 'border-blue-500 bg-blue-50 scale-105'
                      : 'border-gray-300 hover:border-gray-400'
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

                  {fileContent ? (
                    <div className="space-y-3">
                      <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl flex items-center justify-center mx-auto">
                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                      </div>
                      <p className="text-sm text-gray-600">Resume uploaded successfully</p>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      <div className="w-12 h-12 bg-gray-200 rounded-xl flex items-center justify-center mx-auto">
                        <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                        </svg>
                      </div>
                      <p className="text-sm text-gray-600">Drop your resume here or click to browse</p>
                    </div>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="space-y-3">
                  <button
                    onClick={handleParse}
                    disabled={!fileContent || isLoading}
                    className="btn-primary w-full py-3 flex items-center justify-center gap-2"
                  >
                    {isLoading ? (
                      <div className="loading-spinner"></div>
                    ) : (
                      <>
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        Parse Resume
                      </>
                    )}
                  </button>

                  <button
                    onClick={handleAnalyze}
                    disabled={!parsedData || isLoading}
                    className="btn-success w-full py-3 flex items-center justify-center gap-2"
                  >
                    {isLoading ? (
                      <div className="loading-spinner"></div>
                    ) : (
                      <>
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                        </svg>
                        Analyze Resume
                      </>
                    )}
                  </button>
                </div>

                {/* Messages */}
                {message && (
                  <div className={`mt-4 p-3 rounded-xl text-center text-sm ${
                    message.includes('Error')
                      ? 'bg-red-50 text-red-700 border border-red-200'
                      : 'bg-green-50 text-green-700 border border-green-200'
                  }`}>
                    {message}
                  </div>
                )}
              </div>
            </div>

            {/* Results Section */}
            <div className="lg:col-span-2">
              {parsedData || analysisResult ? (
                <div className="modern-card p-6">
                  {/* Tab Navigation */}
                  <div className="flex border-b border-gray-200 mb-6">
                    <button
                      onClick={() => setActiveTab('overview')}
                      className={`px-6 py-3 font-medium text-sm border-b-2 transition-colors ${
                        activeTab === 'overview'
                          ? 'border-blue-500 text-blue-600'
                          : 'border-transparent text-gray-500 hover:text-gray-700'
                      }`}
                    >
                      Overview
                    </button>
                    <button
                      onClick={() => setActiveTab('details')}
                      className={`px-6 py-3 font-medium text-sm border-b-2 transition-colors ${
                        activeTab === 'details'
                          ? 'border-blue-500 text-blue-600'
                          : 'border-transparent text-gray-500 hover:text-gray-700'
                      }`}
                    >
                      Detailed Analysis
                    </button>
                    <button
                      onClick={() => setActiveTab('suggestions')}
                      className={`px-6 py-3 font-medium text-sm border-b-2 transition-colors ${
                        activeTab === 'suggestions'
                          ? 'border-blue-500 text-blue-600'
                          : 'border-transparent text-gray-500 hover:text-gray-700'
                      }`}
                    >
                      Suggestions
                    </button>
                  </div>

                  {/* Tab Content */}
                  {activeTab === 'overview' && (
                    <div className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="text-center p-4 bg-gray-50 rounded-xl">
                          <div className="text-2xl font-bold text-gray-800">85%</div>
                          <div className="text-sm text-gray-600">Overall Score</div>
                        </div>
                        <div className="text-center p-4 bg-gray-50 rounded-xl">
                          <div className="text-2xl font-bold text-gray-800">Good</div>
                          <div className="text-sm text-gray-600">Quality Rating</div>
                        </div>
                        <div className="text-center p-4 bg-gray-50 rounded-xl">
                          <div className="text-2xl font-bold text-gray-800">12</div>
                          <div className="text-sm text-gray-600">Keywords Found</div>
                        </div>
                      </div>

                      {analysisResult && (
                        <div className="space-y-4">
                          <h3 className="text-lg font-semibold text-gray-800">Key Insights</h3>
                          <div className="grid gap-3">
                            <div className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg">
                              <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                                <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                </svg>
                              </div>
                              <p className="text-sm text-blue-800">Strong technical skills section with relevant keywords</p>
                            </div>
                            <div className="flex items-start gap-3 p-3 bg-yellow-50 rounded-lg">
                              <div className="w-6 h-6 bg-yellow-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                                <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                                  <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                </svg>
                              </div>
                              <p className="text-sm text-yellow-800">Consider adding quantifiable achievements to experience section</p>
                            </div>
                            <div className="flex items-start gap-3 p-3 bg-green-50 rounded-lg">
                              <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                                <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                </svg>
                              </div>
                              <p className="text-sm text-green-800">Good use of action verbs throughout the document</p>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {activeTab === 'details' && parsedData && (
                    <div className="space-y-6">
                      <h3 className="text-lg font-semibold text-gray-800">Parsed Data</h3>
                      <pre className="bg-gray-50 p-4 rounded-lg text-sm overflow-x-auto border">
                        {JSON.stringify(parsedData, null, 2)}
                      </pre>
                    </div>
                  )}

                  {activeTab === 'suggestions' && analysisResult && (
                    <div className="space-y-6">
                      <h3 className="text-lg font-semibold text-gray-800">Improvement Suggestions</h3>
                      <div className="space-y-4">
                        <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                          <h4 className="font-medium text-blue-800 mb-2">Content Enhancement</h4>
                          <ul className="text-sm text-blue-700 space-y-1">
                            <li>• Add more quantifiable achievements</li>
                            <li>• Include industry-specific keywords</li>
                            <li>• Strengthen the summary section</li>
                          </ul>
                        </div>
                        <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                          <h4 className="font-medium text-green-800 mb-2">Formatting Improvements</h4>
                          <ul className="text-sm text-green-700 space-y-1">
                            <li>• Optimize for ATS systems</li>
                            <li>• Improve section organization</li>
                            <li>• Add relevant certifications</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="modern-card p-12 text-center">
                  <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">No Analysis Yet</h3>
                  <p className="text-gray-600">Upload and analyze your resume to see detailed insights and suggestions.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
