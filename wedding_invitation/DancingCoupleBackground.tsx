export function DancingCoupleBackground() {
  return (
    <>
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0 opacity-15">
        {/* Animated dancing couple using SVG */}
        <div 
          className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-full max-w-2xl h-96 md:h-[500px]"
          style={{
            animation: 'dance 3s ease-in-out infinite',
          }}
        >
          <svg
            viewBox="0 0 400 400"
            className="w-full h-full"
            preserveAspectRatio="xMidYMid meet"
          >
            {/* Dancing Couple Silhouette */}
            <g transform="translate(200, 200)">
              {/* Girl */}
              <g id="girl" transform="translate(-80, 0)">
                {/* Dress */}
                <ellipse
                  cx="0"
                  cy="40"
                  rx="35"
                  ry="60"
                  fill="#f9486b"
                  className="animate-pulse"
                  style={{
                    animation: 'sway 2s ease-in-out infinite',
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
                    animation: 'wave 1.5s ease-in-out infinite',
                  }}
                />
                <path
                  d="M 20 -30 Q 40 -10 30 10"
                  stroke="#f9486b"
                  strokeWidth="8"
                  strokeLinecap="round"
                  fill="none"
                  style={{
                    animation: 'wave 1.5s ease-in-out infinite 0.3s',
                  }}
                />
              </g>

              {/* Boy */}
              <g id="boy" transform="translate(80, 0)">
                {/* Body */}
                <rect
                  x="-20"
                  y="-20"
                  width="40"
                  height="80"
                  rx="20"
                  fill="#d4af37"
                  style={{
                    animation: 'sway 2s ease-in-out infinite 0.5s',
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
                    animation: 'wave 1.5s ease-in-out infinite 0.2s',
                  }}
                />
                <path
                  d="M 20 -30 Q 40 -10 30 10"
                  stroke="#d4af37"
                  strokeWidth="8"
                  strokeLinecap="round"
                  fill="none"
                  style={{
                    animation: 'wave 1.5s ease-in-out infinite 0.5s',
                  }}
                />
              </g>
            </g>
          </svg>
        </div>
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
      `}</style>
    </>
  );
}
