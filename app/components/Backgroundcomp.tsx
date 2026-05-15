const AmbientBackground = () => {
  return (
    <>
      <style>{`
        @keyframes scroll-grid {
          0% { background-position: 0px 0px; }
          100% { background-position: 40px 40px; }
        }
      `}</style>
      <div className="pointer-events-none fixed inset-0 overflow-hidden z-0">
        <div
          className="absolute inset-[-100%]"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(243, 241, 241, 0.15) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(236, 226, 226, 0.11) 1px, transparent 1px)
            `,
            backgroundSize: "40px 40px",
            animation: "scroll-grid 20s linear infinite",
            WebkitMaskImage:
              "radial-gradient(ellipse at center, black 30%, transparent 70%)",
            maskImage:
              "radial-gradient(ellipse at center, black 30%, transparent 70%)",
          }}
        />
        {/* subtle grain texture */}
        <div
          className="absolute inset-0 opacity-[0.05] mix-blend-overlay"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
          }}
        />
      </div>
    </>
  );
};

export default AmbientBackground; // Optional: Only if putting in a separate file
