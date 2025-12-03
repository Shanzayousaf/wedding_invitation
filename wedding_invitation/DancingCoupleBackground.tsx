import { useRef, useState } from 'react';

export function DancingCoupleBackground() {
  const [stage, setStage] = useState<'idle' | 'meet' | 'dance'>('idle');
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  // Parallax offsets
  const xRef = useRef(0);
  const yRef = useRef(0);
  return (
    <>
  <div className="fixed inset-0 overflow-hidden z-0 opacity-95">
        {/* Animated dancing couple using SVG */}
        <div
          ref={wrapperRef}
          role="button"
          tabIndex={0}
          aria-pressed={stage === 'dance'}
          aria-label="Toggle couple animation: click to meet then dance"
          onClick={() => setStage(prev => (prev === 'idle' ? 'meet' : prev === 'meet' ? 'dance' : 'idle'))}
          onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') setStage(prev => (prev === 'idle' ? 'meet' : prev === 'meet' ? 'dance' : 'idle')); }}
          onMouseMove={(e) => {
            // Small parallax movement relative to center
            const rect = wrapperRef.current?.getBoundingClientRect();
            if (!rect) return;
            const cx = rect.left + rect.width / 2;
            const cy = rect.top + rect.height / 2;
            xRef.current = (e.clientX - cx) / 50; // smaller values for subtle movement
            yRef.current = (e.clientY - cy) / 100;
            if (wrapperRef.current) {
              wrapperRef.current.style.transform = `translate(-50%, 0) translate(${xRef.current}px, ${yRef.current}px)`;
            }
          }}
          onMouseLeave={() => {
            if (wrapperRef.current) {
              xRef.current = 0;
              yRef.current = 0;
              wrapperRef.current.style.transform = `translate(-50%, 0)`;
            }
          }}
          className={`absolute bottom-0 left-1/2 transform -translate-x-1/2 w-full max-w-2xl h-96 md:h-[500px] transition-transform duration-300 ease-out ${stage === 'dance' ? 'opacity-100 dance' : 'opacity-90'}`}
        >
          <svg
            viewBox="0 0 400 400"
            className="w-full h-full"
            preserveAspectRatio="xMidYMid meet"
          >
            {/* Dancing Couple Silhouette */}
            <g transform="translate(200, 200)">
              {/* Girl */}
              <g id="girl" transform={stage === 'idle' ? 'translate(-120, 0)' : stage === 'meet' ? 'translate(-45, 0)' : 'translate(-25, 0)'}>
                {/* Dress */}
                <ellipse
                  cx="0"
                  cy="40"
                  rx="35"
                  ry="60"
                  fill="#f9486b"
                  className="animate-pulse"
                    style={{
                      animation: stage === 'dance' ? 'sway 1.6s ease-in-out infinite' : 'sway 2s ease-in-out infinite',
                      transformOrigin: '0 40px',
                    }}
                />
                {/* Head */}
                <circle
                  cx="0"
                  cy="-50"
                  r="25"
                  fill="#f9486b"
                />
                {/* Arms - dancing position */}
                <path
                  d="M -20 -30 Q -40 -10 -30 10"
                  stroke="#f9486b"
                  strokeWidth="8"
                  strokeLinecap="round"
                  fill="none"
                  style={{
                      animation: stage === 'dance' ? 'wave 1.2s ease-in-out infinite' : 'wave 1.5s ease-in-out infinite',
                    }}
                />
                <path
                  d="M 20 -30 Q 40 -10 30 10"
                  stroke="#f9486b"
                  strokeWidth="8"
                  strokeLinecap="round"
                  fill="none"
                  style={{
                      animation: stage === 'dance' ? 'wave 1.2s ease-in-out infinite 0.2s' : 'wave 1.5s ease-in-out infinite 0.3s',
                    }}
                />
              </g>

              {/* Boy */}
                <g id="boy" transform={stage === 'idle' ? 'translate(120, 0)' : stage === 'meet' ? 'translate(45, 0)' : 'translate(25, 0)'}>
                {/* Body */}
                <rect
                  x="-20"
                  y="-20"
                  width="40"
                  height="80"
                  rx="20"
                  fill="#d4af37"
                  style={{
                    animation: stage === 'dance' ? 'sway 1.6s ease-in-out infinite 0.3s' : 'sway 2s ease-in-out infinite 0.5s',
                    transformOrigin: '0 40px',
                  }}
                />
                {/* Head */}
                <circle
                  cx="0"
                  cy="-50"
                  r="25"
                  fill="#d4af37"
                />
                {/* Arms - dancing position */}
                <path
                  d="M -20 -30 Q -40 -10 -30 10"
                  stroke="#d4af37"
                  strokeWidth="8"
                  strokeLinecap="round"
                  fill="none"
                  style={{
                    animation: stage === 'dance' ? 'wave 1.2s ease-in-out infinite 0.1s' : 'wave 1.5s ease-in-out infinite 0.2s',
                  }}
                />
                <path
                  d="M 20 -30 Q 40 -10 30 10"
                  stroke="#d4af37"
                  strokeWidth="8"
                  strokeLinecap="round"
                  fill="none"
                  style={{
                    animation: stage === 'dance' ? 'wave 1.2s ease-in-out infinite 0.2s' : 'wave 1.5s ease-in-out infinite 0.5s',
                  }}
                />
              </g>
            </g>
          </svg>
          {/* Audio control and helper overlay removed temporarily to diagnose JSX error */}
          </div>
          {/* floating petals for wedding vibe */}
          <svg className="absolute w-8 h-8 left-8 bottom-36 opacity-80 animate-float-slow" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2C13.5 6 20 7 20 7s-3.6 3.5-8 2S4 9 4 9s4.5-3 8-7z" fill="#f7c6d1" />
          </svg>
          <svg className="absolute w-10 h-10 right-12 bottom-20 opacity-85 animate-float" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2C13.5 6 20 7 20 7s-3.6 3.5-8 2S4 9 4 9s4.5-3 8-7z" fill="#f0b2b9" />
          </svg>
      </div>

      <style>{`
        @keyframes dance {
          0%, 100% {
            transform: translate(-50%, 0) rotate(0deg);
          }
          25% {
            transform: translate(-50%, -10px) rotate(-2deg);
          }
          50% {
            transform: translate(-50%, 0) rotate(0deg);
          }
          75% {
            transform: translate(-50%, -10px) rotate(2deg);
          }
        }

        @keyframes sway {
          0%, 100% {
            transform: rotate(0deg);
          }
          50% {
            transform: rotate(5deg);
          }
        }

        @keyframes wave {
          0%, 100% {
            transform: rotate(0deg);
          }
          50% {
            transform: rotate(15deg);
          }
        }

        /* Add a subtle meet movement and a gentle spin when in dance stage */
        @keyframes meet-lean {
          0% { transform: translateX(0); }
          100% { transform: translateX(0); }
        }

        @keyframes spin-dance {
          0% { transform: rotate(0deg); }
          50% { transform: rotate(10deg); }
          100% { transform: rotate(0deg); }
        }

        #girl ellipse,
        #girl circle,
        #girl path {
          animation: sway 2s ease-in-out infinite;
        }

        #boy rect,
        #boy circle,
        #boy path {
          animation: sway 2s ease-in-out infinite 0.5s;
        }

        /* Dance stage: add spin and more movement */
        .dance #girl, .dance #boy {
          animation: spin-dance 6s linear infinite;
        }

        /* Subtle float animations for petals */
        @keyframes float {
          0% { transform: translateY(0) translateX(0) rotate(0deg); }
          50% { transform: translateY(-10px) translateX(6px) rotate(6deg); }
          100% { transform: translateY(0) translateX(0) rotate(0deg); }
        }
        @keyframes float-slow {
          0% { transform: translateY(0) translateX(0) rotate(0deg); }
          50% { transform: translateY(-18px) translateX(-6px) rotate(-6deg); }
          100% { transform: translateY(0) translateX(0) rotate(0deg); }
        }
        .animate-float { animation: float 6s ease-in-out infinite; }
        .animate-float-slow { animation: float-slow 9s ease-in-out infinite; }

        /* Smooth transitions for position changes */
        #girl, #boy { transition: transform 700ms cubic-bezier(.2,.9,.25,1); }
  `}</style>
    </>
  );
}
