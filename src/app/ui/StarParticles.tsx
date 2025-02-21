"use client";

import React, { useEffect, useMemo, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import {
    type Container,
    type ISourceOptions
} from "@tsparticles/engine";
import { loadSlim } from "@tsparticles/slim";

const BackgroundParticles: React.FC = () => {
    const [initialized, setInitialized] = useState(false);

    useEffect(() => {
        // Initialize the tsParticles engine once
        initParticlesEngine(async (engine) => {
            // You can switch to loadFull or loadBasic if needed
            await loadSlim(engine);
        }).then(() => {
            setInitialized(true);
        });
    }, []);

    const particlesLoaded = async (container?: Container): Promise<void> => {
        console.log("Particles loaded:", container);
    };

    const options: ISourceOptions = useMemo(
        () => ({
            background: {
                color: { value: "#000000" }, // Black background
            },
            fpsLimit: 60,
            interactivity: {
                events: {
                    onHover: {
                        enable: true,
                        mode: "repulse", // Repulse mode on hover
                    },
                    // onClick or other events can be added here if needed
                },
            },
            particles: {
                color: { value: "#ffffff" }, // White stars
                links: { enable: false },
                collisions: { enable: false },
                move: {
                    enable: true,
                    speed: 1,
                    outModes: { default: "bounce" },
                },
                number: {
                    value: 100,
                    density: {
                        enable: true,
                        value_area: 800, // Use value_area instead of area
                    },
                },
                opacity: { value: 1 },
                shape: { type: "circle" },
                size: { value: { min: 1, max: 3 } },
            },
            detectRetina: true,
        }),
        []
    );

    // Render nothing until the engine is initialized
    if (!initialized) return null;

    return (
        <Particles
            id="tsparticles"
            options={options}
            particlesLoaded={particlesLoaded}
            style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                zIndex: -1,
            }}
        />
    );
};

export default BackgroundParticles;
