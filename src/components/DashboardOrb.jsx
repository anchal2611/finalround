import Orb from "../components/Orb";

export default function DashboardOrb() {
  return (
    <div className="relative flex items-center justify-center">
      <div
        className="
          absolute
          w-72
          h-72
          bg-violet-500/20
          blur-[100px]
          rounded-full
        "
      />

      <div
        style={{
          width: "450px",
          height: "450px",
          position: "relative",
        }}
      >
        <Orb
          hue={220}
          hoverIntensity={1.2}
          rotateOnHover
          forceHoverState={false}
        />
      </div>
    </div>
  );
}