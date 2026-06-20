type ConsultationAgreementFieldsProps = {
  privacyAgreed: boolean;
  marketingAgreed: boolean;
  onChange: (field: "privacyAgreed" | "marketingAgreed", value: boolean) => void;
};

export function ConsultationAgreementFields({
  privacyAgreed,
  marketingAgreed,
  onChange
}: ConsultationAgreementFieldsProps) {
  return (
    <>
      <label className="check-row">
        <input
          type="checkbox"
          checked={privacyAgreed}
          onChange={(event) => onChange("privacyAgreed", event.target.checked)}
        />
        개인정보 수집 및 이용에 동의합니다.
      </label>
      <label className="check-row">
        <input
          type="checkbox"
          checked={marketingAgreed}
          onChange={(event) => onChange("marketingAgreed", event.target.checked)}
        />
        마케팅 수신에 동의합니다. 선택 항목입니다.
      </label>
    </>
  );
}
