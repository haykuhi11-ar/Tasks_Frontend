import { Link } from 'react-router-dom';

const leaves = [
  { color: '#A8C49A', left: '18%', delay: '0.5s', duration: '5.5s', drift: '-40px', rotate: '360deg' },
  { color: '#C4B28A', left: '42%', delay: '1.8s', duration: '6.2s', drift: '30px', rotate: '-290deg' },
  { color: '#8FAF82', left: '68%', delay: '3.1s', duration: '7s', drift: '-40px', rotate: '360deg' },
  { color: '#BFA882', left: '82%', delay: '0.9s', duration: '5.8s', drift: '30px', rotate: '-290deg' },
  { color: '#A8C49A', left: '8%', delay: '2.4s', duration: '6.6s', drift: '-40px', rotate: '360deg' },
];

export const NotFound = () => {
  return (
    <div className="relative min-h-screen bg-[#FDFBF7] flex flex-col items-center justify-center px-6 py-12 antialiased overflow-hidden">

      {leaves.map((leaf, i) => (
        <span
          key={i}
          className="pointer-events-none absolute top-0 w-2 h-2.5 opacity-0 rounded-[50%_50%_50%_0]"
          style={{
            background: leaf.color,
            left: leaf.left,
            animation: `leafDrift ${leaf.duration} ${leaf.delay} ease-in infinite`,
            '--drift': leaf.drift,
            '--rotate': leaf.rotate,
          } as React.CSSProperties}
        />
      ))}

      {/* Book icon + 404 */}
      <div
        className="relative w-40 h-40 mb-7 text-[#2D5A27] overflow-hidden rounded-lg"
        style={{ animation: 'float 4s ease-in-out infinite' }}
      >
        <svg fill="none" viewBox="0 0 24 24" strokeWidth="0.9" stroke="currentColor" className="w-full h-full">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.25c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25" />
        </svg>

        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'linear-gradient(transparent 45%, rgba(255,255,255,0.18) 50%, transparent 55%)',
            animation: 'scanLine 3s ease-in-out infinite',
          }}
        />

        <span
          className="absolute inset-0 flex items-center justify-center font-serif font-black text-[#5C4033] select-none"
          style={{ fontSize: 52, letterSpacing: -2, animation: 'numPop 0.8s 0.3s cubic-bezier(0.34,1.56,0.64,1) both' }}
        >
          404
        </span>
      </div>

      <svg width="200" height="4" viewBox="0 0 200 4" fill="none" className="mb-0" style={{ overflow: 'visible' }}>
        <path
          d="M4 2 Q50 0 100 2 Q150 4 196 2"
          stroke="#C4A882"
          strokeWidth="1.2"
          strokeLinecap="round"
          strokeDasharray="800"
          style={{ animation: 'inkWrite 1.2s 0.6s ease forwards', strokeDashoffset: 800 }}
        />
      </svg>

      <div className="relative text-center max-w-xl flex flex-col items-center z-10 mt-5">
        <h1
          className="text-3xl sm:text-4xl font-serif font-bold text-[#1E3A1A] mb-3 tracking-tight"
          style={{ animation: 'fadeUp 0.6s 0.2s ease both', opacity: 0 }}
        >
          Page Not Found
        </h1>
        <p
          className="text-sm text-[#6B5B52] mb-8 leading-relaxed max-w-md"
          style={{ animation: 'fadeUp 0.6s 0.35s ease both', opacity: 0 }}
        >
            It seems this chapter was torn out, or this story was never written. Let's head back and find a new story!
        </p>

        {/* Buttons */}
        <div
          className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto"
          style={{ animation: 'fadeUp 0.6s 0.5s ease both', opacity: 0 }}
        >
          <Link
            to="/"
            className="inline-flex items-center justify-center gap-2 px-6 py-2.5 text-sm font-medium rounded-xl text-white bg-[#2D5A27] transition-all duration-200"
            style={{ boxShadow: '0 2px 0 #1a3a16' }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLElement).style.background = '#1E3A1A';
              (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)';
              (e.currentTarget as HTMLElement).style.boxShadow = '0 6px 16px rgba(45,90,39,0.28)';
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLElement).style.background = '#2D5A27';
              (e.currentTarget as HTMLElement).style.transform = '';
              (e.currentTarget as HTMLElement).style.boxShadow = '0 2px 0 #1a3a16';
            }}
          >
            <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="m3 12 2-2m0 0 7-7 7 7M5 10v10a1 1 0 0 0 1 1h3m10-11 2 2m-2-2v10a1 1 0 0 1-1 1h-3m-6 0a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1m-6 0h6" />
            </svg>
            Go Home
          </Link>

          <Link
            to="/"
            className="inline-flex items-center justify-center gap-2 px-6 py-2.5 text-sm font-medium rounded-xl text-[#5C4033] transition-all duration-200"
            style={{ border: '1.5px solid rgba(139,90,43,0.35)' }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLElement).style.borderColor = '#8B5A2B';
              (e.currentTarget as HTMLElement).style.background = 'rgba(139,90,43,0.07)';
              (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLElement).style.borderColor = 'rgba(139,90,43,0.35)';
              (e.currentTarget as HTMLElement).style.background = '';
              (e.currentTarget as HTMLElement).style.transform = '';
            }}
          >
            <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.25c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25" />
            </svg>
            Browse Books
          </Link>
        </div>
      </div>

      {/* Footer */}
      <div
        className="relative mt-14 text-xs text-[#B0A09A] font-light tracking-wide z-10"
        style={{ animation: 'shimmer 4s ease-in-out infinite' }}
      >
        © 2026 Your Book Store. All rights reserved.
      </div>

    
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(-1deg); }
          50% { transform: translateY(-12px) rotate(1deg); }
        }
        @keyframes leafDrift {
          0%   { transform: translate(0, -20px) rotate(0deg); opacity: 0; }
          10%  { opacity: 1; }
          90%  { opacity: 0.6; }
          100% { transform: translate(var(--drift), 105vh) rotate(var(--rotate)); opacity: 0; }
        }
        @keyframes scanLine {
          0%   { transform: translateY(-100%); }
          100% { transform: translateY(400%); }
        }
        @keyframes numPop {
          0%   { transform: scale(0.7); opacity: 0; }
          70%  { transform: scale(1.08); opacity: 1; }
          100% { transform: scale(1); opacity: 1; }
        }
        @keyframes inkWrite {
          from { stroke-dashoffset: 800; }
          to   { stroke-dashoffset: 0; }
        }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes shimmer {
          0%, 100% { opacity: 0.5; }
          50%       { opacity: 1; }
        }
      `}</style>
    </div>
  );
};