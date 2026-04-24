"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="relative h-screen w-full flex items-center justify-center overflow-hidden">
      {/* BACKGROUND */}
      <div
        className="absolute inset-0 bg-cover bg-center blur-[3px] scale-110"
        style={{ backgroundImage: "url('/error.jpg')" }}
      />

      {/* OVERLAY */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-[1px]" />

      {/* CONTENT */}
      <div className="relative z-10 flex flex-col items-center text-center gap-8 border-2 border-black bg-pink-50 px-16 py-16 shadow-[10px_10px_0px_black] max-w-xl w-full">
        {/* ACCENT BAR */}
        <div className="absolute top-0 left-0 w-full h-2 bg-pink-400 border-b-2 border-black" />

        {/* LABEL */}
        <p className="text-xs tracking-widest uppercase border-2 border-black px-3 py-1 bg-pink-400">
          Error
        </p>

        {/* TITLE */}
        <h1 className="text-7xl font-heading font-bold leading-none tracking-tight">
          <span className="bg-white border-2 border-black px-3">404</span>
        </h1>

        {/* DESCRIPTION */}
        <p className="text-base text-black/80">This page doesn’t exist</p>

        {/* ACTIONS */}
        <div className="flex gap-4 mt-2">
          {/* PRIMARY */}
          <Link href="/">
            <Button
              className="border-2 border-black px-6 py-2 text-black bg-white shadow-[4px_4px_0px_black]
          hover:bg-pink-400 hover:text-white
          hover:translate-x-[2px] hover:translate-y-[2px]
          active:translate-x-[3px] active:translate-y-[3px]
          transition-all"
            >
              Home
            </Button>
          </Link>

          {/* SECONDARY */}
          <Button
            onClick={() => history.back()}
            className="border-2 border-black px-6 py-2 text-black bg-white shadow-[4px_4px_0px_black]
        hover:bg-gray-100
        hover:translate-x-[2px] hover:translate-y-[2px]
        active:translate-x-[3px] active:translate-y-[3px]
        transition-all"
          >
            Go back
          </Button>
        </div>

        {/* ATTRIBUTION */}
        <a
          href="http://www.freepik.com"
          className="text-xs underline mt-4 text-black/60"
          target="_blank"
        >
          Image designed by Freepik
        </a>
      </div>
    </div>
  );
}
