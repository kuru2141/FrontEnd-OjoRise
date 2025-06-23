import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full bg-neutral-100 border-t border-neutral-200 py-6 mt-12">
      <div className="max-w-5xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4 text-neutral-600 text-sm">
        <div className="flex items-center gap-2 mb-2 sm:mb-0">
          <span className="font-bold hidden sm:inline">OjoRise</span>
        </div>
        <div className="flex flex-col sm:flex-row gap-1 sm:gap-4 items-center text-xs sm:text-sm">
          <span>© {new Date().getFullYear()} OjoRise. All rights reserved.</span>
          <Link href="https://www.lguplus.com/" className="hover:underline">LG U+</Link>
          <Link href="/" className="hover:underline">Link Section</Link>
        </div>
      </div>
    </footer>
  );
} 