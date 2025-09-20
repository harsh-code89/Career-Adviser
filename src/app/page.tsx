import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
      <header className="bg-blue-600 w-full py-4 text-white text-center font-bold text-xl">
        Career Adviser Dashboard
      </header>
      <main className="flex flex-col items-center justify-center gap-8 p-8">
        <h1 className="text-3xl font-bold text-gray-800">Welcome to Career Adviser</h1>
        <p className="text-lg text-gray-600 text-center max-w-xl">
          Your one-stop solution for career guidance, resume analysis, and personalized career paths.
        </p>
        <div className="flex gap-4">
          <Link
            href="/auth"
            className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
          >
            <a>Sign Up / Login</a>
          </Link>
          <Link
            href="/upload"
            className="bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition"
          >
            <a>Upload Resume</a>
          </Link>
          <Link
            href="/career-paths"
            className="bg-purple-500 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition"
          >
            <a>Career Paths</a>
          </Link>
          <Link
            href="/chatbot"
            className="bg-yellow-500 text-white px-6 py-3 rounded-lg hover:bg-yellow-700 transition"
          >
            <a>Career Chatbot</a>
          </Link>
        </div>
      </main>
      <footer className="bg-gray-800 w-full py-4 text-white text-center">
        © 2025 Career Adviser. All rights reserved.
      </footer>
    </div>
  );
}
