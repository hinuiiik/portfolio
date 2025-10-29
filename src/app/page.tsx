import Image from "next/image";
import LinkParticles from "./ui/LinkParticles";
import ScrollIndicator from "./ui/ScrollIndicator";
import ProjectBox from "./ui/ProjectBox";
import Link from "next/link";

export default function Home() {
    return (
        <div className="text-white relative w-full scroll-smooth">
            <div className="relative overflow-hidden">
                <LinkParticles />

                {/* Welcome Section */}
                <div
                    className="flex flex-col-reverse lg:flex-row items-center justify-center text-center lg:text-left
          w-full max-w-7xl mx-auto h-screen px-4 sm:px-6 lg:px-8"
                    style={{ transform: "translateY(-5em)" }}
                >
                    <div className="flex flex-col lg:w-1/2 mt-6 lg:m-0">
                        <h1 className="text-6xl font-raleway font-bold mb-4">Welcome</h1>
                        <p className="text-gray-300 text-lg">
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
                            width={350}
                            height={0}
                            className="rounded-lg block md:hidden w-4/5 mx-auto"
                            priority
                            loading="eager"
                            style={{ height: "auto", width: "80%" }}
                        />
                    </div>
                </div>
            </div>

            {/* Scroll Arrow — fixed link */}
            <Link href={"#Projects"}>
                <ScrollIndicator/>
            </Link>

            {/* Projects Section */}
            <section
                id="Projects"
                className="w-full px-4 sm:px-6 lg:px-8 flex flex-col justify-start scroll-mt-24"
            >
                {/* Projects Header */}
                <div className="flex items-center justify-center w-full my-16">
                    <div className="flex-grow border-t border-white"></div>
                    <span className="px-6 text-5xl font-raleway font-bold text-white uppercase tracking-wide">
            Projects
          </span>
                    <div className="flex-grow border-t border-white"></div>
                </div>

                <div className="flex flex-wrap justify-center gap-6 mb-6">
                    <ProjectBox
                        id="CarolinaRazor"
                        name="The Carolina Razor"
                        image="/carolinarazor_small.png"
                        description="The Carolina Razor is a progressive newspaper for the University of North Carolina at Chapel Hill. Built with Next.JS and PayloadCMS."
                        alt="Carolina Razor Webpage"
                        github="https://github.com/CarolinaRazor/website"
                    />
                    <ProjectBox
                        id="PorgUNC"
                        name="PorgUNC"
                        image="/porgunc_small.png"
                        description="PorgUNC (Public Opinion Research Group at UNC) is a student-led polling organization. Built with Next.JS and PayloadCMS."
                        alt="PorgUNC Webpage"
                        github="https://github.com/hinuiiik/porgunc"
                    />
                    <ProjectBox
                        id="W4VKU Radio Tools"
                        name="W4VKU Radio Tools"
                        image="/radiotools_small.png"
                        description="Radio Tools is a site built for W4VKU that processes and submits QSO logs based on a given callsign and operation. Built with Next.JS."
                        alt="Radio Tools Webpage"
                        github="https://github.com/hinuiiik/radio-tools"
                        site_link={"https://www.w4vku.com"}
                    />
                </div>
            </section>

            {/* Hackathons Section */}
            <section
                id="Hackathons"
                className="w-full px-4 sm:px-6 lg:px-8 flex flex-col justify-start scroll-mt-24"
            >
                {/* Hackathons Header */}
                <div className="flex items-center justify-center w-full my-16">
                    <div className="flex-grow border-t border-white"></div>
                    <span className="px-6 text-5xl font-raleway font-bold text-white uppercase tracking-wide">
            Hackathons
          </span>
                    <div className="flex-grow border-t border-white"></div>
                </div>

                <div className="flex flex-wrap justify-center gap-6 mb-6">
                    <ProjectBox
                        id="WhereTheHeel"
                        name="Where the Heel - HackNC 2024"
                        image="/wheretheheel_small_compressed.png"
                        description="Where the Heel was a fun game inspired by GeoGuessr. Each round, you are shown random images from around campus, and your goal is to pinpoint where it was taken as accurately as possible. Built for HackNC 2024 by Vikram Krishnakumar, Jason Armbruster, Colin Volpe, and Owen Ingram."
                        alt="Where the Heel webpage"
                        github="https://github.com/Awesomeness7/HackNC-24"
                    />
                    <ProjectBox
                        id="ChamaQuest"
                        name="ChamaQuest - Hack_NCState 2025"
                        image="/chamaquest_small.png"
                        description="ChamaQuest is a concept that connects Rotating Savings and Credit Associations (ROSCAs) with banks to provide institutional security while preserving the social benefits ROSCAs offer. Build with Next.JS. Built for Hack_NCState 2025 by Vikram Krishnakumar, Anna Lynch, Colin Volpe, and May Yamanaka. "
                        alt="ChamaQuest Hackathon Project Page"
                        github="https://github.com/hinuiiik/chamaquest"
                    />
                    <ProjectBox
                        id="DuckHunt"
                        name="DuckHunt - HackNC 2025"
                        image="/duckhunt_small.png"
                        description=" DuckHunt is a website that gamifies birdwatching by giving a weekly bird in your local area to find. Your photos are then verified by Gemini and added to your gallery. Build with Next.JS and Prisma ORM. Built for HackNC 2025 by Vikram Krishnakumar, Anna Lynch, Jason Armbruster, and May Yamanaka."
                        alt="DuckHunt Hackathon Project Page"
                        github="https://github.com/hinuiiik/duckhunt-HACKNC25/"
                    />
                </div>
            </section>
        </div>
    );
}
