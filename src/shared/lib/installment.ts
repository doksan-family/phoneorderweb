/**
 * 원리금균등 상환 월 납부액.
 * @param principal 할부 원금
 * @param annualRatePercent 연이율(% 단위, 예: 5.9)
 * @param months 할부 개월
 */
export function equalPaymentMonthly(
  principal: number,
  annualRatePercent: number,
  months: number
): number {
  if (months <= 0 || principal <= 0) return 0;

  const monthlyRate = annualRatePercent / 100 / 12;
  if (monthlyRate === 0) return Math.round(principal / months);

  const factor = (1 + monthlyRate) ** months;
  return Math.round((principal * monthlyRate * factor) / (factor - 1));
}
