"use client";
export default function Video() {
  return (
    <video width="500" height="500" controls autoPlay>
      <source src="/video/road.mp4" type="video/mp4" />
    </video>
  );
}
