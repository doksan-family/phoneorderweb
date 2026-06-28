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
      <label className="flex gap-2.5 items-start text-slate-500 font-medium">
        <input
          type="checkbox"
          checked={privacyAgreed}
          onChange={(event) => onChange("privacyAgreed", event.target.checked)}
          className="w-[18px] min-w-[18px] mt-[3px]"
        />
        개인정보 수집 및 이용에 동의합니다.
      </label>
      <label className="flex gap-2.5 items-start text-slate-500 font-medium">
        <input
          type="checkbox"
          checked={marketingAgreed}
          onChange={(event) => onChange("marketingAgreed", event.target.checked)}
          className="w-[18px] min-w-[18px] mt-[3px]"
        />
        마케팅 수신에 동의합니다. 선택 항목입니다.
      </label>
    </>
  );
}
