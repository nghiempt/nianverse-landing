"use client";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen items-center justify-center bg-zinc-900 font-sans">
      <div className="w-fit flex flex-col">
        <h1
          className="
            text-[125px] 
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
          NIANVERSE
        </h1>
        <div className="w-full flex justify-end items-center pr-4">
          <p className="text-white text-[28px] font-extrabold">www.nianverse.org</p>
        </div>
      </div>
    </div>
  );
}
