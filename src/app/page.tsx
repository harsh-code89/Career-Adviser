import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Hero Section */}
      <main className="flex-1 flex flex-col items-center justify-center px-8 py-16 text-center">
        <h1 className="text-5xl md:text-7xl font-bold text-gray-800 mb-6 leading-tight">
          Your Personal AI Career Coach
        </h1>
        <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed">
          Upload your resume, get detailed analysis, and chat with our AI to find your dream job.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link href="/upload">
            <button className="bg-gray-800 text-white px-8 py-4 text-lg rounded-lg hover:bg-gray-700 transition-colors">
              Upload Resume
            </button>
          </Link>
          <Link href="/chatbot">
            <button className="bg-white text-gray-800 px-8 py-4 text-lg rounded-lg border border-gray-300 hover:bg-gray-100 transition-colors">
              Chat with AI
            </button>
          </Link>
        </div>
      </main>

      {/* Features Section */}
      <section id="features" className="bg-white py-20 px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-gray-800 text-center mb-12">Key Features</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-gray-50 p-8 rounded-lg">
              <h3 className="text-2xl font-semibold text-gray-800 mb-4">Resume Analysis</h3>
              <p className="text-gray-600">
                Our AI-powered tool parses your resume, identifies key skills and experiences, and provides actionable feedback to help you stand out to recruiters.
              </p>
            </div>
            <div className="bg-gray-50 p-8 rounded-lg">
              <h3 className="text-2xl font-semibold text-gray-800 mb-4">AI Chatbot</h3>
              <p className="text-gray-600">
                Have a question about your career? Our AI chatbot is available 24/7 to provide personalized advice, interview tips, and job market insights.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8 px-8">
        <div className="max-w-7xl mx-auto text-center">
          <p>© 2025 Career Adviser. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
