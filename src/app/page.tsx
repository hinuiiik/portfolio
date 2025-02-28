import Image from "next/image";
import LinkParticles from "./ui/LinkParticles";
import ScrollIndicator from "./ui/ScrollIndicator";
import ProjectBox from "./ui/ProjectBox";
import Link from "next/link";

export default function Home() {
    return (<div className="text-white relative w-full">
        <div className="relative overflow-hidden">
            <LinkParticles/>

            {/* Welcome Section */}
            <div
                className="flex flex-col-reverse lg:flex-row items-center justify-center text-center lg:text-left
             w-full max-w-7xl mx-auto h-screen px-4 sm:px-6 lg:px-8"
                style={{transform: "translateY(-5em)"}}
            >
                <div className="flex flex-col lg:w-1/2 mt-6 lg:m-0">
                    <h1 className="text-5xl font-raleway mb-2">Welcome</h1>
                    <p className="text-gray-300">
                        I’m Vikram, a Computer Science student at the University of North Carolina
                        at Chapel Hill.
                    </p>
                </div>

                <div className="flex justify-end lg:ml-24">
                    {/* Desktop */}
                    <Image
                        src="/face.jpg"
                        alt="Vikram Krishnakumar Suit Picture"
                        width={350}
                        height={350}
                        className="rounded-lg hidden md:block"
                        priority
                        loading="eager"
                    />

                    {/* Mobile */}
                    <Image
                        src="/face.jpg"
                        alt="Vikram Krishnakumar Suit Picture"
                        width={350} // Width will be overridden by Tailwind
                        height={0} // Maintain aspect ratio
                        className="rounded-lg block md:hidden w-4/5 mx-auto"
                        priority
                        loading="eager"
                        style={{height: "auto", width: "80%"}}
                    />
                </div>
            </div>
        </div>
        <Link href={"#Projects"}>
            <ScrollIndicator/>
        </Link>

        {/* Slim White Line */}
        <div className="mx-auto w-4/5 border-t border-white"></div>

        {/* Projects Section */}
        <div className="w-full px-4 sm:px-6 lg:px-8 min-h-screen flex flex-col justify-start">
            <h1 className={"py-10 text-center text-4xl font-raleway"} id={"Projects"}>
                <a href={"#Projects"}>
                    Projects
                </a>
            </h1>
            <div className="flex flex-wrap justify-center gap-6 mb-6">
                <ProjectBox
                    id="WhereTheHeel"
                    name="Where the Heel - HackNC 2024"
                    image="/wheretheheel_small_compressed.png"
                    description="Where the Heel was a fun game inspired by GeoGuessr. Each round, you are random images from around campus, and your goal is to pinpoint where it was taken the best you can. Built for the HackNC competition at UNC in 2024 by Vikram Krishnakumar, Jason Armbruster, Colin Volpe, and Owen Ingram."
                    alt="Where the Heel webpage"
                    github="https://github.com/Awesomeness7/HackNC-24"
                />
                <ProjectBox
                    id="ChamaQuest"
                    name="Chamaquest - Hack_NCState 2025"
                    image="/chamaquest_small.png"
                    description="ChamaQuest was a project built for the Hack_NCState hackathon in 2025 by Vikram Krishnakumar, Anna Lynch, Colin Volpe, and May Yamanaka. The prototype aims to be a way to connect Rotating Savings and Credit Associations (ROSCAs) in developing countries with banks in order to provide institutional security, while keeping the social aspect many ROSCAs provide."
                    alt="Chamaquest Hackathon Project Page"
                    github="https://github.com/hinuiiik/chamaquest"
                />
                <ProjectBox
                    id="CarolinaRazor"
                    name="The Carolina Razor"
                    image="/carolinarazor_small.png"
                    description="The Carolina Razor was a concept newspaper for UNC aimed at providing left-wing opinions in a digestible format. The website was created by Vikram Krishnakumar and Alex Kreidler."
                    alt="Carolina Razor Webpage"
                    github="https://github.com/CarolinaRazor/website"
                />
            </div>
        </div>
    </div>)
        ;
}
