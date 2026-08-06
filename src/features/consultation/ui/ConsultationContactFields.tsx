import type { TextField } from "@/entities/consultation/model/types";
import { formatPhone } from "@/shared/lib/phone";
import { fieldClass } from "./consultationStyles";

type ConsultationContactFieldsProps = {
  name: string;
  phone: string;
  password: string;
  onChange: (field: TextField, value: string) => void;
};

export function ConsultationContactFields({
  name,
  phone,
  password,
  onChange
}: ConsultationContactFieldsProps) {
  return (
    <>
      <label className={fieldClass}>
        이름
        <input value={name} onChange={(event) => onChange("name", event.target.value)} />
      </label>
      <label className={fieldClass}>
        휴대폰 번호
        <input
          inputMode="numeric"
          maxLength={13}
          value={phone}
          onChange={(event) => onChange("phone", formatPhone(event.target.value))}
        />
      </label>
      <label className={fieldClass}>
        신청 내역 조회용 비밀번호
        <input
          type="password"
          value={password}
          onChange={(event) => onChange("password", event.target.value)}
        />
      </label>
    </>
  );
}
