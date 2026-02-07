export default function BlogComingSoon() {
  return (
    <main className="min-h-screen bg-[#1c1c1c] flex items-center justify-center px-6">
      <div className="max-w-xl text-center text-white">
        <h1 className="text-4xl md:text-5xl font-semibold mb-6">
          Blog Coming Soon
        </h1>

        <p className="text-lg text-gray-300 mb-4">
          We’re working on in-depth, high-quality articles on cloud computing,
          AWS, and modern system design.
        </p>

        <p className="text-lg text-gray-300 mb-10">
          Launching on{" "}
          <span className="text-white font-medium">10 February 2026</span>
        </p>

        <div className="border-t border-gray-700 pt-6">
          <p className="text-sm text-gray-400">Thank you for your patience.</p>
          <p className="text-sm text-gray-500 mt-1">— cloudkinshuk.in</p>
        </div>
      </div>
    </main>
  );
}
