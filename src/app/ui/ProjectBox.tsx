import Image from 'next/image'
import { FiGithub } from "react-icons/fi";
import { BsGlobe } from "react-icons/bs";

export interface ProjectProps {
    name: string,
    image: string
    description: string
    alt: string
    site_link?: string
    github?: string
}

export default function ProjectBox({ name, image, description, alt, site_link, github }: ProjectProps) {
    return (
        <div className="mx-auto bg-white/10 backdrop-blur-md p-6 rounded-lg border border-white/50 text-left flex flex-col h-[600px]  w-[450px]">
            {site_link ? (
                <a href={site_link} target="_blank" rel="noopener noreferrer">
                    <Image
                        src={image}
                        alt={alt}
                        width={500}
                        height={400}
                        className="rounded-lg mx-auto"
                    />
                </a>
            ) : (
                <Image
                    src={image}
                    alt={alt}
                    width={500}
                    height={400}
                    className="rounded-lg mx-auto"
                />
            )}

            <p className="text-2xl m-1 text-center font-raleway">{name}</p>

            <p className="text-gray-300 flex-grow text-left">{description}</p>

            <div className="mt-auto flex gap-3 justify-start">
                {site_link && (
                    <a
                        href={site_link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 bg-gray-800 text-white rounded-full hover:bg-blue-500 transition"
                    >
                        <BsGlobe size={20}/>
                    </a>
                )}
                {github && (
                    <a
                        href={github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 bg-gray-800 text-white rounded-full hover:bg-gray-700 transition"
                    >
                        <FiGithub size={20}/>
                    </a>
                )}
            </div>
        </div>
    );
}




