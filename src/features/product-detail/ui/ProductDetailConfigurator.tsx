"use client";

import { useMemo, useState } from "react";
import type { ProductDetailProfile } from "@/entities/product/model/types";
import { ColorChoiceList } from "./ColorChoiceList";
import { DetailSelect } from "./DetailSelect";
import { EstimatePanel } from "./EstimatePanel";
import { OptionChoiceList } from "./OptionChoiceList";
import { PlanBox } from "./PlanBox";

type ProductDetailConfiguratorProps = {
  productId: string;
  profile: ProductDetailProfile;
};

export function ProductDetailConfigurator({
  productId,
  profile
}: ProductDetailConfiguratorProps) {
  const [colorId, setColorId] = useState(profile.colors[0]?.id ?? "");
  const [capacityId, setCapacityId] = useState(profile.capacities[0]?.id ?? "");
  const [joiningCarrierId, setJoiningCarrierId] = useState(profile.joiningCarriers[2]?.id ?? "");
  const [saleTypeId, setSaleTypeId] = useState("number-move");
  const [planId, setPlanId] = useState(profile.plans[0]?.id ?? "");
  const selectedPlan = useMemo(() => {
    return profile.plans.find((plan) => plan.id === planId) ?? profile.plans[0];
  }, [planId, profile.plans]);

  return (
    <div className="detail-config-grid">
      <section className="detail-choice-card">
        <header className="detail-card-header">
          <p className="eyebrow">Consult Option</p>
          <h2>상담 조건 선택</h2>
          <p>복잡한 계산은 상담에서 확인하고, 화면에서는 필요한 조건만 고릅니다.</p>
        </header>
        <ColorChoiceList options={profile.colors} value={colorId} onChange={setColorId} />
        <OptionChoiceList label="용량" options={profile.capacities} value={capacityId} onChange={setCapacityId} />
        <OptionChoiceList label="가입 유형" options={saleTypeOptions} value={saleTypeId} onChange={setSaleTypeId} />
        <OptionChoiceList label="희망 통신사" options={profile.joiningCarriers} value={joiningCarrierId} onChange={setJoiningCarrierId} />
        <DetailSelect
          label="요금제"
          options={profile.plans.map((plan) => ({
            id: plan.id,
            label: `${plan.label} · ${plan.monthlyPrice.toLocaleString("ko-KR")}원/월`
          }))}
          value={planId}
          onChange={setPlanId}
        />
        {selectedPlan ? <PlanBox plan={selectedPlan} /> : null}
      </section>
      <EstimatePanel productId={productId} estimate={profile.estimate} />
    </div>
  );
}

const saleTypeOptions = [
  { id: "number-move", label: "번호이동", description: "쓰던 번호 그대로 통신사만 변경" },
  { id: "device-change", label: "기기변경", description: "현재 통신사 유지" },
  { id: "new", label: "신규가입", description: "새 번호로 개통 상담" }
];
