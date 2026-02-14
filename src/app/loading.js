export default function Loading() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-white">
      <div className="flex flex-col items-center gap-4">

        <p className="text-sm font-bold text-neutral-800 tracking-wide">
          Ejada Law Firm
        </p>

        {/* Elegant animated line */}
        <div className="h-0.5 w-48 rounded-full bg-neutral-200 overflow-hidden">
          <div className="h-full w-16 bg-[#f9bb00] animate-law-line" />
        </div>

        {/* 3 animated dots */}
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-[#f9bb00] animate-law-dot-1" />
          <span className="h-2 w-2 rounded-full bg-[#f9bb00] animate-law-dot-2" />
          <span className="h-2 w-2 rounded-full bg-[#f9bb00] animate-law-dot-3" />
        </div>

      </div>
    </div>
  );
}
