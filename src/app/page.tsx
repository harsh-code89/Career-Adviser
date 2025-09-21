import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen gradient-primary flex flex-col">
      {/* Modern Header */}
      <header className="bg-white/10 backdrop-blur-md border-b border-white/20 py-6 px-8">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
              <span className="text-white font-bold text-xl">CA</span>
            </div>
            <h1 className="text-2xl font-bold text-white">Career Adviser</h1>
          </div>
          <nav className="hidden md:flex space-x-6">
            <a href="#features" className="text-white/80 hover:text-white transition-colors">Features</a>
            <a href="#about" className="text-white/80 hover:text-white transition-colors">About</a>
            <a href="#contact" className="text-white/80 hover:text-white transition-colors">Contact</a>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-1 flex flex-col items-center justify-center px-8 py-16">
        <div className="text-center max-w-4xl mx-auto slide-in">
          {/* Floating Elements */}
          <div className="absolute top-20 left-10 w-20 h-20 bg-white/10 rounded-full float hidden lg:block"></div>
          <div className="absolute top-40 right-20 w-16 h-16 bg-white/5 rounded-full float hidden lg:block" style={{animationDelay: '2s'}}></div>
          <div className="absolute bottom-20 left-1/4 w-12 h-12 bg-white/10 rounded-full float hidden lg:block" style={{animationDelay: '4s'}}></div>

          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
            Your Career
            <span className="block gradient-secondary bg-clip-text text-transparent">
              Journey Starts Here
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-white/90 mb-12 max-w-3xl mx-auto leading-relaxed">
            Get personalized career guidance, resume analysis, and expert advice to accelerate your professional growth.
          </p>

          {/* Feature Cards */}
          <div className="grid md:grid-cols-3 gap-6 mb-12 max-w-5xl mx-auto">
            <div className="modern-card p-6 text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Resume Analysis</h3>
              <p className="text-gray-600">AI-powered resume parsing and optimization suggestions</p>
            </div>

            <div className="modern-card p-6 text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Career Paths</h3>
              <p className="text-gray-600">Personalized career recommendations based on your profile</p>
            </div>

            <div className="modern-card p-6 text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">AI Chatbot</h3>
              <p className="text-gray-600">24/7 career guidance and instant answers to your questions</p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href="/auth">
              <button className="btn-primary px-8 py-4 text-lg flex items-center gap-2 pulse-glow">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                </svg>
                Get Started
              </button>
            </Link>

            <Link href="/upload">
              <button className="btn-success px-8 py-4 text-lg flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                </svg>
                Upload Resume
              </button>
            </Link>
          </div>

          {/* Navigation Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12 max-w-4xl mx-auto">
            <Link href="/career-paths">
              <div className="modern-card p-4 text-center hover:scale-105 transition-transform cursor-pointer">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-600 rounded-xl flex items-center justify-center mx-auto mb-3">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                </div>
                <h3 className="font-semibold text-gray-800">Career Paths</h3>
              </div>
            </Link>

            <Link href="/chatbot">
              <div className="modern-card p-4 text-center hover:scale-105 transition-transform cursor-pointer">
                <div className="w-12 h-12 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-xl flex items-center justify-center mx-auto mb-3">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                </div>
                <h3 className="font-semibold text-gray-800">Chatbot</h3>
              </div>
            </Link>

            <Link href="/analyze">
              <div className="modern-card p-4 text-center hover:scale-105 transition-transform cursor-pointer">
                <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl flex items-center justify-center mx-auto mb-3">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <h3 className="font-semibold text-gray-800">Analyze</h3>
              </div>
            </Link>

            <Link href="/auth">
              <div className="modern-card p-4 text-center hover:scale-105 transition-transform cursor-pointer">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center mx-auto mb-3">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <h3 className="font-semibold text-gray-800">Profile</h3>
              </div>
            </Link>
          </div>
        </div>
      </main>

      {/* Modern Footer */}
      <footer className="bg-white/10 backdrop-blur-md border-t border-white/20 py-8 px-8">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold">CA</span>
            </div>
            <span className="text-white font-semibold">Career Adviser</span>
          </div>
          <p className="text-white/80 mb-4">© 2025 Career Adviser. All rights reserved.</p>
          <div className="flex justify-center space-x-6 text-sm text-white/60">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-white transition-colors">Contact Us</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
