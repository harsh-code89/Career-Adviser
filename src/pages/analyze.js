"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
export default function Analyze() {
  const router = useRouter();
  const [analysis, setAnalysis] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAndAnalyzeResume = async () => {
      if (!router.query.resumeUrl) {
        return;
      }

      try {
        const resumeUrl = decodeURIComponent(router.query.resumeUrl);
        const resumeResponse = await fetch(resumeUrl);
        if (!resumeResponse.ok) {
          throw new Error('Failed to fetch resume content.');
        }
        const resumeText = await resumeResponse.text();

        const analysisResponse = await fetch('/api/analyze', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ resumeText }),
        });

        if (!analysisResponse.ok) {
          throw new Error('Failed to analyze the resume.');
        }

        const result = await analysisResponse.json();
        setAnalysis(result);
      } catch (error) {
        setError("Failed to analyze the resume. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchAndAnalyzeResume();
  }, [router.query.resumeUrl]);

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-800 mb-8">Resume Analysis</h1>

        {isLoading && <p>Analyzing your resume...</p>}
        {error && <p className="text-red-500">{error}</p>}

        {analysis && (
          <div className="space-y-8">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Summary</h2>
              <p className="text-gray-600">{analysis.summary}</p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Strengths</h2>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                {analysis.strengths.map((strength, index) => (
                  <li key={index}>{strength}</li>
                ))}
              </ul>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Areas for Improvement</h2>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                {analysis.improvements.map((improvement, index) => (
                  <li key={index}>{improvement}</li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
