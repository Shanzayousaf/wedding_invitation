import React from 'react';
import '../Styles/animatedBackground.css';

/**
 * StaticGradientBackground
 * Simple, non-animated full-screen gradient used per user request.
 */
export function AnimatedBackground(): JSX.Element {
  return <div className="animated-background static" aria-hidden="true" />;
}

export default AnimatedBackground;
