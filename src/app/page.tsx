import Image from 'next/image'
import { FiMail, FiGithub, FiLinkedin } from 'react-icons/fi'

export default function Home() {
    return (
        <div className="min-h-screen text-white flex flex-col items-center justify-between relative py-8">
            {/* Header: remove horizontal padding on mobile */}
            <div className="w-full flex justify-between items-center px-3 lg:px-8 absolute top-4">
                <Header />
                <Socials />
            </div>

            {/* Main content container: 80% width on mobile, full width on larger screens */}
            <div className="flex flex-col-reverse lg:flex-row items-center justify-center text-center lg:text-left w-[80%] lg:w-full max-w-5xl mx-auto lg:space-x-32 flex-grow">
                <div className="flex flex-col items-center lg:items-start lg:w-1/2 mt-8 lg:mt-0">
                    <h1 className="text-5xl font-bold mb-2">Welcome</h1>
                    <p className="text-gray-300">
                        Hey! I&#39;m Vikram, a Computer Science student at the University of North Carolina at Chapel Hill.
                    </p>
                </div>

                <div className="lg:w-1/2 flex justify-center">
                    <Image
                        src="/face.jpg"
                        alt="Placeholder"
                        width={400}
                        height={400}
                        className="rounded-lg"
                    />
                </div>
            </div>
        </div>
    )
}

function Header() {
    return (
        <div className="text-3xl font-semibold">
            Vikram K.
        </div>
    )
}

function Socials() {
    return (
        <div className="flex space-x-4">
            <a href="mailto:hello@vikramk.dev" className="p-2 rounded-full bg-[#1E293B] hover:bg-[#334155]">
                <FiMail className="text-white" size={20} />
            </a>
            <a
                href="https://github.com/hinuiiik"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-[#0D1117] hover:bg-[#21262D]"
            >
                <FiGithub className="text-white" size={20} />
            </a>
            <a
                href="https://linkedin.com/in/vikram-krishnakumar-226479237"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-[#0072b1] hover:bg-[#005582]"
            >
                <FiLinkedin className="text-white" size={20} />
            </a>
        </div>
    )
}
