export function BackgroundVideo() {
  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover opacity-20"
        style={{ 
          minWidth: '100%',
          minHeight: '100%',
          width: 'auto',
          height: 'auto',
        }}
      >
        <source 
          src="https://videos.pexels.com/video-files/3044083/3044083-hd_1920_1080_25fps.mp4" 
          type="video/mp4" 
        />
        {/* Fallback for browsers that don't support video */}
        Your browser does not support the video tag.
      </video>
      {/* Overlay for better text readability */}
      <div className="absolute inset-0 bg-gradient-to-br from-ivory-50/60 via-blush-50/60 to-gold-50/60" />
    </div>
  );
}

