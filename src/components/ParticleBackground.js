import React from 'react';
import Particles from 'react-particles-js';
import ParticleConfig from '../config/particle-config';
import DarkParticleConfig from '../config/dark-particle-config';

function ParticleBackground() {
    return (
        <Particles className="absolute w-full h-full pt-20" params={ParticleConfig}></Particles>
    )
}

function DarkParticleBackground() {
    return (
        <Particles className="absolute w-full h-full pt-20" params={DarkParticleConfig}></Particles>
    )
}

export { ParticleBackground, DarkParticleBackground };