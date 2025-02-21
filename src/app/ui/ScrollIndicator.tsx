"use client";

import { useEffect, useState } from "react";
import { FiArrowDown } from "react-icons/fi";

const ScrollIndicator: React.FC = () => {
    const [scrolled, setScrolled] = useState(false);

    // Detect when the user scrolls down
    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 50) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }
        };

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    return (
        <>
            {!scrolled && (
                <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2">
                    <FiArrowDown className="w-12 h-12 text-white animate-bounce" />
                </div>
            )}
        </>
    );
};

export default ScrollIndicator;
