import Image from 'next/image'
// import StarParticles from './ui/StarParticles'
import LinkParticles from './ui/LinkParticles'
import Socials from './ui/Socials'
import ScrollIndicator from './ui/ScrollIndicator'
import ProjectBox from './ui/ProjectBox'

export default function Home() {
    return (
        <div className="text-white relative">
            <LinkParticles/>

            <div className="w-full flex justify-between items-center px-3 lg:px-8 absolute top-4">
                <div className="text-3xl font-semibold">
                    Vikram K.
                </div>
                <Socials/>
            </div>

            <div
                className="flex flex-col-reverse lg:flex-row items-center justify-center text-center lg:text-left w-[80%] lg:w-full max-w-5xl mx-auto min-h-screen gap-y-10 lg:gap-y-0">

                <div className="flex flex-col items-center lg:items-start lg:w-1/2 justify-center">
                    <h1 className="text-5xl font-bold mb-2">Welcome</h1>
                    <p className="text-gray-300">
                        I&#39;m Vikram, a Computer Science student at the University of North Carolina at Chapel Hill.
                    </p>
                </div>

                <div className="lg:w-1/2 flex justify-center">
                    <Image
                        src="/face.jpg"
                        alt="Vikram Krishnakumar Suit Picture"
                        width={400}
                        height={400}
                        className="rounded-lg"
                    />
                </div>
            </div>

            <ScrollIndicator/>

            <div
                className="border-t-2 py-20 flex flex-col lg:flex-row items-center justify-center w-[90%] mx-auto gap-6">
                <ProjectBox
                    name="Where the Heel - HackNC 2024"
                    image="/wheretheheel_small_compressed.png"
                    description="Where the Heel was a fun game inspired by GeoGuessr. Each round, you are random images from around campus, and your goal is to pinpoint where it was taken the best you can. Built for the HackNC competition at UNC in 2024 by Vikram Krishnakumar, Jason Armbruster, Colin Volpe, and Owen Ingram."
                    alt="Where the Heel webpage"
                    github="https://github.com/Awesomeness7/HackNC-24"
                />
                <ProjectBox
                    name="Chamaquest - Hack_NCState 2025"
                    image="/chamaquest_small.png"
                    description="ChamaQuest was a project built for the Hack_NCState hackathon in 2025 by Vikram Krishnakumar, Anna Lynch, Colin Volpe, and May Yamanaka. The prototype aims to be a way to connect Rotating Savings and Credit Associations (ROSCAs) in developing countries with banks in order to provide institutional security, while keeping the social aspect many ROSCAs provide."
                    alt="Chamaquest Hackathon Project Page"
                    github="https://github.com/hinuiiik/chamaquest"
                />
                <ProjectBox
                    name="The Carolina Razor"
                    image="/carolinarazor_small.png"
                    description="The Carolina Razor was a concept newspaper for UNC aimed at providing left-wing opinions in a digestible format. The website was created by Vikram Krishnakumar and Alex Kreidler."
                    alt="Carolina Razor Webpage"
                    github="https://github.com/CarolinaRazor/website"
                />
            </div>

        </div>
    )
}
