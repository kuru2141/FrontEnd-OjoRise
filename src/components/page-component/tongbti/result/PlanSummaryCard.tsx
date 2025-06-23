"use client";

import type { TongBTIResultInfo } from "@/types/tongBTI";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import TextsmsIcon from "@mui/icons-material/Textsms";
import FiveGIcon from "@mui/icons-material/FiveG";
import LteMobiledataIcon from "@mui/icons-material/LteMobiledata";

export default function PlanSummaryCard(props: TongBTIResultInfo) {
  const {
    planName,
    baseDataGb,
    monthlyFee,
    voiceCallPrice,
    sms,
    planDescription,
    telecomProvider,
    planUrl,
  } = props;

  return (
    <div className="w-full max-w-xl rounded-2xl border-2 p-6 border-gray-200 bg-white flex flex-col gap-3 mb-6 shadow-md sm:flex-row justify-between items-start sm:items-center">
      <div className="flex flex-col gap-2 flex-1">
        <p className="text-[22px] font-bold text-gray-100 mb-1">나와 가장 잘 맞는 요금제는?</p>
        <h3 className="text-2xl font-bold">{planName}</h3>
        <div className="flex flex-wrap text-sm gap-2 mt-1 mb-1">
          <span className="flex items-center gap-1 px-2 py-2 bg-pink-50 text-gray-700 rounded-md font-bold">
            {telecomProvider?.includes("5G") ? (
              <>
                <FiveGIcon fontSize="small" style={{ color: "black" }} />
                {baseDataGb?.includes("무제한") ? "무제한" : `${baseDataGb}GB`}
              </>
            ) : (
              <>
                <LteMobiledataIcon fontSize="small" style={{ color: "black" }} />
                {baseDataGb?.includes("무제한") ? "무제한" : `${baseDataGb}GB`}
              </>
            )}
          </span>
          <span className="flex items-center gap-1 px-2 py-2 bg-pink-50 text-gray-700 rounded-md font-bold">
            <TextsmsIcon fontSize="small" style={{ color: "black" }} />
            {sms}
          </span>
          <span className="flex items-center gap-1 px-2 py-2 bg-pink-50 text-gray-700 rounded-md font-bold">
            <LocalPhoneIcon fontSize="small" style={{ color: "black" }} />
            {voiceCallPrice}
          </span>
        </div>
      </div>
      <div className="flex flex-col items-end gap-2 text-right min-w-[180px] mt-6 pt-2">
        <p className="text-sm text-gray-600 leading-snug max-w-[220px]">{planDescription}</p>
        <div className="flex items-center gap-3">
          <span className="text-lg font-bold text-black">월 {monthlyFee.toLocaleString()}원</span>
          <button
            onClick={() => window.open(planUrl, "_blank")}
            className="bg-[#FF008C] hover:bg-[#e6007e] text-white text-sm px-4 py-2 rounded-md"
          >
            신청하기
          </button>
        </div>
      </div>
    </div>
  );
}
