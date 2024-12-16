import Particles from "react-tsparticles";

function ParticleBackground({ config }: { config: any }) {
  return <Particles className="absolute w-full h-full" options={config} />;
}

export default ParticleBackground;
