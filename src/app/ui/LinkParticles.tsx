"use client";

import React, {useEffect, useMemo, useState} from "react";
import Particles, {initParticlesEngine} from "@tsparticles/react";
import {
    type Container,
    type ISourceOptions,
    MoveDirection,
    OutMode,
} from "@tsparticles/engine";
import {loadSlim} from "@tsparticles/slim";

const BackgroundParticles: React.FC = () => {
    const [initialized, setInitialized] = useState(false);

    useEffect(() => {
        initParticlesEngine(async (engine) => {
            await loadSlim(engine);
        }).then(() => {
            setInitialized(true);
        });
    }, []);

    const particlesLoaded = async (container?: Container): Promise<void> => {
        console.log("Particles loaded:", container);
    };

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
                color: {value: "#000000"}, // Deep black space background
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

    if (!initialized) return null;

    return (
        <Particles
            id="tsparticles"
            options={options}
            particlesLoaded={particlesLoaded}
            className="absolute top-0 left-0 w-full h-full -z-10"
        />
    );
};

export default BackgroundParticles;
