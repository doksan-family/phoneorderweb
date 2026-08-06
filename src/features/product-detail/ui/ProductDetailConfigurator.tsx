"use client";

import type { ReactNode } from "react";
import type { ProductDetailProfile } from "@/entities/product/model/types";
import { useProductDetailSelection } from "@/features/product-detail/model/useProductDetailSelection";
import { ColorChoiceList } from "./ColorChoiceList";
import { DetailSelect } from "./DetailSelect";
import { EstimatePanel } from "./EstimatePanel";
import { OptionChoiceList } from "./OptionChoiceList";
import { PlanBox } from "./PlanBox";

type ProductDetailConfiguratorProps = {
  productId: string;
  profile: ProductDetailProfile;
  priceSummary?: ReactNode;
  /** 상담 페이지 모달에서 쓸 때 목록 링크를 감춘다. */
  hideBackLink?: boolean;
  onConsultationSelect?: () => void;
};

export function ProductDetailConfigurator({
  productId,
  profile,
  priceSummary,
  hideBackLink,
  onConsultationSelect
}: ProductDetailConfiguratorProps) {
  const selection = useProductDetailSelection(profile);

  return (
    <div className="grid gap-5">
      {profile.colors.length ? (
        <ColorChoiceList
          options={profile.colors}
          value={selection.selectedColorId}
          onChange={selection.setColorId}
        />
      ) : null}

      {priceSummary}

      <section className="brand-card grid gap-4 p-5">
        <h2 className="m-0 text-[0.98rem] font-extrabold tracking-[-0.02em] text-slate-950">
          상담 조건 선택
        </h2>
        {profile.capacities.length ? (
          <OptionChoiceList label="용량" options={profile.capacities} value={selection.selectedCapacityId} onChange={selection.setCapacityId} />
        ) : null}
        {selection.subscriptionOptions.length ? (
          <OptionChoiceList label="가입 유형" options={selection.subscriptionOptions} value={selection.selectedSaleTypeId} onChange={selection.setSaleTypeId} />
        ) : null}
        {selection.carrierOptions.length ? (
          <OptionChoiceList label="희망 통신사" options={selection.carrierOptions} value={selection.selectedCarrierId} onChange={selection.setCarrierId} />
        ) : null}
        {selection.planOptions.length ? (
          <DetailSelect
            label="요금제"
            options={selection.planOptions.map((plan) => ({
              id: plan.id,
              label: `${plan.label} · ${plan.monthlyPrice.toLocaleString("ko-KR")}원/월`
            }))}
            value={selection.selectedPlanId}
            onChange={selection.setPlanId}
          />
        ) : null}
        {selection.installmentOptions.length ? (
          <OptionChoiceList
            label="할부 개월"
            options={selection.installmentOptions}
            value={selection.selectedInstallmentId}
            onChange={selection.setInstallmentId}
          />
        ) : null}
        {selection.selectedPlan ? <PlanBox plan={selection.selectedPlan} /> : null}
      </section>

      <EstimatePanel
        hideBackLink={hideBackLink}
        onConsultationSelect={onConsultationSelect}
        colorValue={selection.selectedColorId}
        consultationPayload={selection.consultationPayload}
        estimate={selection.estimate}
        productId={productId}
      />
    </div>
  );
}
