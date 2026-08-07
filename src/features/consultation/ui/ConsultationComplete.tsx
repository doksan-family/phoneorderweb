type ConsultationCompleteProps = {
  productName: string;
};

export function ConsultationComplete({ productName }: ConsultationCompleteProps) {
  return (
    <section className="grid gap-5 brand-card p-8">
      <h2>{productName} 상담 신청이 접수되었습니다.</h2>
      <p>
        신청 내역 조회에서 이름, 휴대폰 번호, 비밀번호를 입력하면 진행 상태를
        확인할 수 있습니다.
      </p>
    </section>
  );
}
