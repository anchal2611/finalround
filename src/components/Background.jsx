import Galaxy from "./Galaxy";

export default function Background() {
  return (
    <div
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 0 }}
    >
      <Galaxy
        starSpeed={0.0}
        density={2}
        hueShift={110}
        speed={2.70}
        glowIntensity={0.3}
        saturation={0}
        mouseRepulsion
        repulsionStrength={4}
        twinkleIntensity={0.6}
        rotationSpeed={0.1}
        transparent
        className="w-full h-full"
      />
    </div>
  );
}