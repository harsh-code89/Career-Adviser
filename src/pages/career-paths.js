"use client";

import { useRouter } from 'next/router';

export default function CareerPaths() {
  const router = useRouter();
  const { skills } = router.query;

  // In a real app, you would use the skills to suggest career paths.
  // For now, we'll just display the skills.
  const suggestedPaths = [
    "Software Engineer",
    "Data Scientist",
    "Product Manager",
    "UX/UI Designer",
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-800 mb-8">Career Paths</h1>
        {skills ? (
          <div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Based on your skills: {skills}
            </h2>
            <ul className="list-disc list-inside text-gray-600 space-y-2">
              {suggestedPaths.map((path, index) => (
                <li key={index}>{path}</li>
              ))}
            </ul>
          </div>
        ) : (
          <p>
            Upload your resume to get personalized career path suggestions.
          </p>
        )}
      </div>
    </div>
  );
}
