import type { ConsultationRequest } from "@/entities/consultation/model/types";

type ConsultationCompleteProps = {
  request: ConsultationRequest;
};

export function ConsultationComplete({ request }: ConsultationCompleteProps) {
  return (
    <section className="form-card">
      <p className="eyebrow">접수 완료</p>
      <h2>{request.productName} 상담 신청이 접수되었습니다.</h2>
      <p>
        신청 내역 조회에서 이름, 휴대폰 번호, 비밀번호를 입력하면 진행 상태를
        확인할 수 있습니다.
      </p>
      <p className="form-card__note">
        관리자 이메일 알림은 운영 메일 연동 후 실제 발송됩니다.
      </p>
    </section>
  );
}
