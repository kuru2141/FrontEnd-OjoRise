import { motion } from "framer-motion";

export default function TestProgress(){
    const dots = [0, 1, 2];
    function AnalyzingDots() {
        return (
        <div className="flex items-center justify-center gap-1 mb-2">
            {dots.map((i) => (
                <motion.span
                key={i}
                className="w-2 h-2 bg-[#FF008C] rounded-full"
                animate={{ opacity: [0.3, 1, 0.3] }}
                transition={{
                    repeat: Infinity,
                    duration: 1.2,
                    delay: i * 0.2,
                }}
                />
            ))}
        </div>
        );
    }

    return(
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50">
        <div className="w-[150px] h-[150px] rounded-[10px] bg-[#222022]/80 flex flex-col items-center justify-center text-white text-sm font-semibold gap-2">
          <AnalyzingDots />
          분석 중
        </div>
    </div>
    );
}