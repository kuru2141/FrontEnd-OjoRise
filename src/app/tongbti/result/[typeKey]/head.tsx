export default function Head({ params }: { params: { typeKey: string } }) {
  const typeKey = params.typeKey;
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  const url = `${baseUrl}/tongbti/result/${typeKey}`;
  const imageUrl = `${baseUrl}/TongBTI/${typeKey}.png`;

  return (
    <>
      <title>통BTI 결과 - {typeKey}</title>
      <meta property="og:title" content={`나의 통BTI는 ${typeKey}`} />
      <meta
        property="og:description"
        content="LG U+ 통BTI로 내 통신 성격도 보고 요금제까지 추천받아보세요!"
      />
      <meta property="og:image" content={imageUrl} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content={imageUrl} />
      <meta name="twitter:card" content="summary_large_image" />
    </>
  );
}
