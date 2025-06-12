import React, { useEffect, useRef } from "react";

const Video = () => {
  const iframeRef = useRef(null);

  useEffect(() => {
    const iframe = iframeRef.current;
    if (!iframe) return;

    const url = "https://www.youtube.com/embed/H-GiB9QKsdw?autoplay=1&mute=1&controls=0&modestbranding=1&rel=0&showinfo=0&fs=0&loop=1&playlist=H-GiB9QKsdw";

    iframe.src = url;

    // Unmute the video after a slight delay
    setTimeout(() => {
      const player = new window.YT.Player(iframe, {
        events: {
          onReady: (event) => {
            event.target.unMute();
            event.target.setVolume(100);
          },
        },
      });
    }, 1000);
  }, []);

  return (
    <div className="h-screen w-full flex items-center justify-center">
      <iframe
        ref={iframeRef}
        width="100%"
        height="100%"
        className="h-screen"
        src=""
        title="YouTube video player"
        frameBorder="0"
        allow="autoplay; encrypted-media"
        allowFullScreen
      ></iframe>
    </div>
  );
};

export default Video;
