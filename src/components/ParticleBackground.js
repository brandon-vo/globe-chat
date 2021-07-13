import React from 'react';
import Particles from 'react-particles-js';
import ParticleConfig from '../config/particle-config';
import DarkParticleConfig from '../config/dark-particle-config';

// Home screen particles for dark and light mode
function ParticleBackground() {
    return (
        <Particles className="absolute w-full h-full" params={ParticleConfig}></Particles>
    )
}

function DarkParticleBackground() {
    return (
        <Particles className="absolute w-full h-full" params={DarkParticleConfig}></Particles>
    )
}

export { ParticleBackground, DarkParticleBackground };