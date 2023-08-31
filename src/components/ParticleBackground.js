import React from "react";
import Particles from "react-tsparticles";
import ParticleConfig from "../config/particle-config";
import DarkParticleConfig from "../config/dark-particle-config";

// Home screen particles for dark and light mode
function ParticleBackground() {
  return (
    <Particles
      className="absolute w-full h-full"
      options={ParticleConfig}
    ></Particles>
  );
}

function DarkParticleBackground() {
  return (
    <Particles
      className="absolute w-full h-full"
      options={DarkParticleConfig}
    ></Particles>
  );
}

export { ParticleBackground, DarkParticleBackground };
