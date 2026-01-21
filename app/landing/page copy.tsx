"use client";

import Link from "next/link";

export default function Landing() {
  return (
    <div className="flex flex-col min-h-screen items-center justify-center bg-zinc-900 font-sans">
      {/* Navigation back to Home */}
      <div className="absolute top-8 left-8">
        <Link 
          href="/"
          className="px-6 py-3 bg-gray-600 hover:bg-gray-700 text-white font-semibold rounded-lg transition-colors duration-200 flex items-center gap-2"
        >
          <span>🏠</span>
          <span>Home</span>
        </Link>
      </div>

      <div className="w-fit flex flex-col">
        <h1
          className="
            text-[100px] 
            font-extrabold 
            tracking-widest
            text-transparent 
            bg-clip-text 
            bg-cover
            animate-textmove
            select-none
          "
          style={{
            backgroundImage: "url('/animate-texture.jpg')",
          }}
        >
          LANDING PAGE
        </h1>
        <div className="w-full flex justify-center items-center">
          <p className="text-white text-[24px] font-semibold">Welcome to Nianverse Landing</p>
        </div>
      </div>
    </div>
  );
}