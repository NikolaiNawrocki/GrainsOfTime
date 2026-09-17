export function SkipToContent() {
  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-grains-red focus:text-white focus:font-mono focus:text-xs focus:tracking-widest focus:rounded-sm focus:shadow-lg focus:outline-none"
    >
      SKIP TO CONTENT &rarr;
    </a>
  );
}
