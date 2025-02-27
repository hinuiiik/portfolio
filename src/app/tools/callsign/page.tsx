import SubmitCallsign from "@/app/ui/callsign/SubmitCallsign";
import CallsignListBox from "@/app/ui/callsign/CallsignListBox";


export default function Tools() {
    return (
        <div className="flex justify-center items-center min-h-screen transform lg:translate-y-[-2em]">
            <div className="flex flex-col md:flex-row gap-8">
                <div className="w-full md:w-1/2">
                    <SubmitCallsign/>
                </div>

                <div className="w-full md:w-1/2">
                    <CallsignListBox/>
                </div>
            </div>
        </div>

    );
}
