"use client";

import React, { useMemo, useState, useCallback} from "react";
import Particles, { ParticlesProvider } from "@tsparticles/react";
import {loadSlim} from "@tsparticles/slim";

import {
    type Container,
    type ISourceOptions,
    MoveDirection,
    OutMode,
} from "@tsparticles/engine";

const particlesInit = async (engine) => {
    await loadSlim(engine);
};

const BackgroundParticles: React.FC = () => {
    const particlesLoaded = useCallback(async (container) => {
        console.log("Particles container loaded", container);
    }, []);

    const options: ISourceOptions = useMemo(() => {
        const spaceColors = [
            "#FFD700",
            "#FF4500",
            "#1E90FF",
            "#9400D3",
            "#FF1493",
            "#8A2BE2",
            "#FFFFFF",
            "#A9A9A9",
        ];

        return {
            background: {
                color: {value: "#000000"},
            },
            fpsLimit: 60,
            interactivity: {
                events: {
                    onHover: {
                        enable: true,
                        mode: "grab",
                    },
                    onClick: {
                        enable: true,
                        mode: "push",
                    },
                },
                modes: {
                    grab: {
                        distance: 200,
                        links: {
                            opacity: 0.5,
                        },
                    },
                    push: {
                        quantity: 2,
                    },
                },
            },
            particles: {
                color: {
                    value: spaceColors,
                },
                links: {
                    enable: true,
                    color: "random",
                    distance: 150,
                    opacity: 0.5,
                    width: 1,
                },
                move: {
                    enable: true,
                    speed: 1,
                    direction: MoveDirection.none,
                    outModes: {default: OutMode.out},
                    random: false,
                    straight: false,
                },
                number: {
                    value: 100,
                    density: {
                        enable: true,
                        value_area: 800,
                    },
                },
                opacity: {value: 0.8},
                shape: {type: "circle"},
                size: {value: {min: 1, max: 3}},
            },
            detectRetina: true,
        };
    }, []);

    return (
        <ParticlesProvider init={particlesInit}>
            <Particles
                id="tsparticles"
                options={options}
                particlesLoaded={particlesLoaded}
                className="absolute top-0 left-0 w-full h-full -z-10"
            />
        </ParticlesProvider>
    );
};

export default BackgroundParticles;
