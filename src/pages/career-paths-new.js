"use client";

import { useState, useEffect } from 'react';
import { getCareerPaths } from '@/lib/careerPaths';

export default function CareerPaths() {
  const [careerPaths, setCareerPaths] = useState([]);
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [selectedPath, setSelectedPath] = useState(null);

  useEffect(() => {
    const fetchCareerPaths = async () => {
      setIsLoading(true);
      try {
        const userId = 'test-user-id'; // Replace with actual user ID from auth session
        const paths = await getCareerPaths(userId);
        setCareerPaths(paths);
      } catch (error) {
        setMessage(`Error: ${error.message}`);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCareerPaths();
  }, []);

  const getSkillLevelColor = (level) => {
    switch (level?.toLowerCase()) {
      case 'beginner': return 'bg-green-100 text-green-800 border-green-200';
      case 'intermediate': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'advanced': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getSalaryRange = (path) => {
    // Mock salary data based on career path
    const salaryRanges = {
      'Software Engineer': '$80,000 - $150,000',
      'Data Scientist': '$90,000 - $160,000',
      'Product Manager': '$85,000 - $140,000',
      'UX Designer': '$70,000 - $130,000',
      'Marketing Manager': '$75,000 - $135,000',
      'default': '$60,000 - $120,000'
    };
    return salaryRanges[path.title] || salaryRanges.default;
  };

  return (
    <div className="min-h-screen gradient-warning flex flex-col">
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
            <h1 className="text-2xl font-bold text-white">Career Paths</h1>
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
              Your Personalized
              <span className="block gradient-secondary bg-clip-text text-transparent">
                Career Roadmap
              </span>
            </h1>
            <p className="text-xl text-white/90 max-w-3xl mx-auto">
              Based on your profile and resume analysis, here are the most suitable career paths for you.
            </p>
          </div>

          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-16">
              <div className="loading-spinner w-12 h-12 mb-4"></div>
              <p className="text-white/80 text-lg">Analyzing your career potential...</p>
            </div>
          ) : message ? (
            <div className="modern-card p-8 text-center">
              <div className="w-16 h-16 bg-red-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <p className="text-red-700 text-lg">{message}</p>
            </div>
          ) : careerPaths.length > 0 ? (
            <div className="grid lg:grid-cols-2 gap-8">
              {careerPaths.map((path, index) => (
                <div
                  key={index}
                  className={`modern-card p-6 cursor-pointer transition-all duration-300 ${
                    selectedPath === index ? 'ring-2 ring-blue-500 scale-105' : 'hover:scale-102'
                  }`}
                  onClick={() => setSelectedPath(selectedPath === index ? null : index)}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-gray-800 mb-2">{path.title}</h3>
                      <p className="text-gray-600 mb-4">{path.description}</p>
                    </div>
                    <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-600 rounded-xl flex items-center justify-center ml-4">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    </div>
                  </div>

                  {/* Salary Range */}
                  <div className="mb-4">
                    <div className="flex items-center gap-2 mb-2">
                      <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                      </svg>
                      <span className="font-semibold text-gray-800">Salary Range</span>
                    </div>
                    <p className="text-green-700 font-medium">{getSalaryRange(path)}</p>
                  </div>

                  {/* Skills Required */}
                  <div className="mb-4">
                    <h4 className="font-semibold text-gray-800 mb-3">Required Skills</h4>
                    <div className="flex flex-wrap gap-2">
                      {path.skills?.map((skill, skillIndex) => (
                        <span
                          key={skillIndex}
                          className={`px-3 py-1 rounded-full text-sm font-medium border ${getSkillLevelColor(skill.level)}`}
                        >
                          {skill.name} {skill.level && `(${skill.level})`}
                        </span>
                      )) || (
                        <p className="text-gray-500 italic">Skills analysis in progress...</p>
                      )}
                    </div>
                  </div>

                  {/* Growth Potential */}
                  <div className="mb-4">
                    <div className="flex items-center gap-2 mb-2">
                      <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                      </svg>
                      <span className="font-semibold text-gray-800">Growth Potential</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full"
                        style={{ width: `${Math.random() * 40 + 60}%` }}
                      ></div>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">High growth potential in this field</p>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-3 mt-6">
                    <button className="btn-primary flex-1 py-2 text-sm">
                      Learn More
                    </button>
                    <button className="btn-success flex-1 py-2 text-sm">
                      Apply Now
                    </button>
                  </div>

                  {/* Detailed View */}
                  {selectedPath === index && (
                    <div className="mt-6 pt-6 border-t border-gray-200 slide-in">
                      <h4 className="font-semibold text-gray-800 mb-3">Career Progression</h4>
                      <div className="space-y-3">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                            <span className="text-blue-600 font-semibold text-sm">1</span>
                          </div>
                          <div>
                            <p className="font-medium text-gray-800">Entry Level</p>
                            <p className="text-sm text-gray-600">0-2 years experience</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                            <span className="text-green-600 font-semibold text-sm">2</span>
                          </div>
                          <div>
                            <p className="font-medium text-gray-800">Mid Level</p>
                            <p className="text-sm text-gray-600">2-5 years experience</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                            <span className="text-purple-600 font-semibold text-sm">3</span>
                          </div>
                          <div>
                            <p className="font-medium text-gray-800">Senior Level</p>
                            <p className="text-sm text-gray-600">5+ years experience</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="modern-card p-8 text-center">
              <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">No Career Paths Available</h3>
              <p className="text-gray-600 mb-6">Upload your resume to get personalized career recommendations.</p>
              <button className="btn-primary px-6 py-3">
                Upload Resume
              </button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
