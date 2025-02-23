import {FiMail, FiGithub, FiLinkedin} from 'react-icons/fi'

export default function Socials() {
    return (
        <div className="flex space-x-4">
            <a href="mailto:hello@vikramk.dev" className="p-2 rounded-full bg-[#1E293B] hover:bg-[#334155]">
                <FiMail className="text-white" size={20}/>
            </a>
            <a
                href="https://github.com/hinuiiik"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-[#0D1117] hover:bg-[#21262D]"
            >
                <FiGithub className="text-white" size={20}/>
            </a>
            <a
                href="https://linkedin.com/in/vikram-krishnakumar-226479237"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-[#0072b1] hover:bg-[#005582]"
            >
                <FiLinkedin className="text-white" size={20}/>
            </a>
        </div>
    )
}