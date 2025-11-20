import { Flower2, Sparkles } from 'lucide-react';

interface FloralDecorationProps {
  position: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
  color?: string;
}

export function FloralDecoration({ position, color = 'text-blush-300' }: FloralDecorationProps) {
  const positionClasses = {
    'top-left': 'top-0 left-0',
    'top-right': 'top-0 right-0',
    'bottom-left': 'bottom-0 left-0',
    'bottom-right': 'bottom-0 right-0',
  };

  const rotationClasses = {
    'top-left': 'rotate-0',
    'top-right': 'rotate-90',
    'bottom-left': '-rotate-90',
    'bottom-right': 'rotate-180',
  };

  return (
    <div className={`absolute ${positionClasses[position]} pointer-events-none opacity-20`}>
      <div className={`relative ${rotationClasses[position]}`}>
        <Flower2 className={`w-24 h-24 ${color} animate-float`} />
        <Sparkles className={`w-6 h-6 ${color} absolute top-2 right-2 animate-pulse`} />
      </div>
    </div>
  );
}
