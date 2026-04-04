"use client";

export default function VideoPlayer({ src }) {
  return (
    <video
      controls
      preload="metadata"
      playsInline
      onLoadedMetadata={(e) => { e.target.playbackRate = 1.5; }}
      style={{ display: "block", width: "100%", height: "auto" }}
    >
      <source src={src} type="video/mp4" />
    </video>
  );
}
