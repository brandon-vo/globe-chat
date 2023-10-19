import React from "react";
import Particles from "react-tsparticles";

// Home screen particles for dark and light mode
function ParticleBackground({ config }) {
  return (
    <Particles className="absolute w-full h-full" options={config}></Particles>
  );
}

export default ParticleBackground;
