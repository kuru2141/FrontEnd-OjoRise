import React from 'react';

const MyPage = () => {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm flex flex-col items-start text-left gap-12 overflow-hidden">
        <div>
          <p className="text-[24px] mb-2">안녕하세요</p>
          <p className="font-bold text-[24px]">이다예 님의 마이페이지입니다.</p>
        </div>
      </div>
    </div>
  );
};

export default MyPage;