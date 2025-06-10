'use client';

import PlanInfoLoggedIn from "@/components/page-component/Plan/PlanInfoLoggedIn";
import GuestPrompt from "@/components/page-component/Plan/GuestPrompt";
import {usePlanStore} from "@/lib/usePlanStore";
import GuestPlanSelector from "@/components/page-component/Plan/GuestPlanSelector";

export default function PlanBox() {
    const {username, isGuest, selectedPlan} = usePlanStore();

    if (username) {
        //로그인 한 사용자
        return (
            <PlanInfoLoggedIn
                username={username}
                planName={selectedPlan?.name ?? '알 수 없음'}
                price={selectedPlan?.price ?? '0원'}
                voice={selectedPlan?.call ?? '-'}
                sms={selectedPlan?.sms ?? '-'}
                network={selectedPlan?.tech ?? '-'}
                dataAmount={selectedPlan?.data ?? '-'}
                dataAfterLimit={selectedPlan?.speed ?? '-'}
                extraVoice={selectedPlan?.extraCall ?? '-'}
                portingFee={selectedPlan?.numberChangeFee ?? '-'}
            />
        );
    }

    if (isGuest) {
        //비회원 사용자
        return <GuestPlanSelector />
    }
    //첫 진입 화면
    return <GuestPrompt />;
}