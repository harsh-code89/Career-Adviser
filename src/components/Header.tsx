"use client";

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useUser } from '@/hooks/useUser';
import { supabase } from '@/lib/supabaseClient';

export default function Header() {
  const { user } = useUser();
  const router = useRouter();

  const handleLogout = async () => {
    if (supabase) {
      await supabase.auth.signOut();
      router.push('/');
    }
  };

  return (
    <header className="bg-white shadow-sm py-4 px-8">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link href="/">
          <div className="flex items-center space-x-3 cursor-pointer">
            <div className="w-10 h-10 bg-gray-800 rounded-xl flex items-center justify-center">
              <span className="text-white font-bold text-xl">CA</span>
            </div>
            <h1 className="text-2xl font-bold text-gray-800">Career Adviser</h1>
          </div>
        </Link>
        <nav className="flex items-center space-x-6">
          <Link href="/career-paths" className="text-gray-600 hover:text-gray-800 transition-colors">
            Career Paths
          </Link>
          {user ? (
            <>
              <span className="text-gray-600">{user.email}</span>
              <button
                onClick={handleLogout}
                className="bg-gray-800 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link href="/auth" className="text-gray-600 hover:text-gray-800 transition-colors">
                Login
              </Link>
              <Link href="/auth?signup=true" className="bg-gray-800 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors">
                Sign Up
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
