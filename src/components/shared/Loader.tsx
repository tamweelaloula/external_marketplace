'use client';
import dynamic from 'next/dynamic';

// Dynamically load the Lottie Player without showing a temporary spinner
const Player = dynamic(
  () => import('@lottiefiles/react-lottie-player').then(mod => mod.Player),
  {
    ssr: false,
    loading: () => null, // 🔥 No fallback spinner
  }
);

import loaderAnimation from '@/lib/loader.json';

export interface LoaderProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  fullScreen?: boolean;
  text?: string;
  className?: string;
  speed?: number;
}

const Loader: React.FC<LoaderProps> = ({
  size = 'md',
  fullScreen = false,
  text,
  className = '',
  speed = 1
}) => {
  const sizeConfig = {
    sm: { height: '60px', width: '60px', textClass: 'text-xs' },
    md: { height: '80px', width: '80px', textClass: 'text-sm' },
    lg: { height: '120px', width: '120px', textClass: 'text-base' },
    xl: { height: '160px', width: '160px', textClass: 'text-lg' }
  };

  const config = sizeConfig[size];

  const containerClasses = fullScreen
    ? "flex h-screen items-center justify-center bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm"
    : "flex items-center justify-center py-8";

  return (
    <div className={`${containerClasses} ${className}`}>
      <div className="flex flex-col items-center space-y-3">
        <div className="relative">
          <Player
            autoplay
            loop
            src={loaderAnimation}
            speed={speed}
            style={{
              height: config.height,
              width: config.width,
              filter: 'drop-shadow(0 4px 6px rgba(0, 0, 0, 0.1))'
            }}
          />
        </div>
        {text && (
          <div
            className={`${config.textClass} text-gray-600 dark:text-gray-400 font-medium text-center max-w-xs animate-pulse`}
          >
            {text}
          </div>
        )}
      </div>
    </div>
  );
};

export const FullScreenLoader: React.FC<Omit<LoaderProps, 'fullScreen'>> = (props) => (
  <Loader {...props} fullScreen={true} />
);

export const CompactLottieLoader: React.FC<Omit<LoaderProps, 'size'>> = (props) => (
  <Loader {...props} size="sm" />
);

export const PageLoader: React.FC<Omit<LoaderProps, 'fullScreen' | 'size'>> = (props) => (
  <Loader {...props} size="lg" fullScreen={false} />
);

export default Loader;