import type { LegalDocumentType } from "@/entities/legal-document/api/admin";

export const legalDocumentTypeOptions: Array<{
  value: LegalDocumentType;
  label: string;
}> = [
  { value: "terms_of_service", label: "이용약관" },
  { value: "privacy_policy", label: "개인정보처리방침" },
  { value: "privacy_collection_consent", label: "개인정보 수집 동의" },
  { value: "marketing_consent", label: "마케팅 수신 동의" },
];

export function legalDocumentTypeLabel(type: LegalDocumentType) {
  return (
    legalDocumentTypeOptions.find((option) => option.value === type)?.label ??
    type
  );
}
