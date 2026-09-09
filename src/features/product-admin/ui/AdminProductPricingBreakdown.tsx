"use client";

import { useState } from "react";
import type { AdminProductSummary } from "@/entities/product/api/admin";
import { carrierOptions } from "@/entities/plan/model/carriers";
import type { AdminPricingOption } from "@/entities/product/api/adminProductPricingTypes";
import type { PricingPolicy } from "@/entities/pricing-policy/api/types";
import { AdminProductPricingOptionCard } from "./AdminProductPricingOptionCard";
import { PlanTabs } from "./PlanTabs";
import { SubscriptionToggle } from "./SubscriptionToggle";

type AdminProductPricingBreakdownProps = {
  product: AdminProductSummary;
};

type PlanGroup = {
  planId: string;
  planName: string;
  carrierName: string;
  planMonthlyFee: number;
  planDescription: string[];
  planDataAmount: string;
  planCallText: string;
  options: AdminPricingOption[];
};

function groupByPlan(options: AdminPricingOption[]): PlanGroup[] {
  const groups = new Map<string, PlanGroup>();
  for (const option of options) {
    const key = option.planId || option.planName || option.id;
    const group = groups.get(key);
    if (group) {
      group.options.push(option);
      continue;
    }
    groups.set(key, {
      planId: option.planId,
      planName: option.planName,
      carrierName: option.carrierName,
      planMonthlyFee: option.planMonthlyFee,
      planDescription: option.planDescription,
      planDataAmount: option.planDataAmount,
      planCallText: option.planCallText,
      options: [option],
    });
  }
  return [...groups.values()];
}

function PlanPricingGroup({
  group,
  months,
  policy,
}: {
  group: PlanGroup;
  months: number[];
  policy?: PricingPolicy;
}) {
  const subTypes = [
    ...new Set(group.options.map((option) => option.subscriptionType)),
  ].filter(Boolean);
  const [subType, setSubType] = useState(subTypes[0] ?? "");
  const activeSub = subTypes.includes(subType) ? subType : subTypes[0] ?? "";
  const shownOptions =
    subTypes.length > 1
      ? group.options.filter((option) => option.subscriptionType === activeSub)
      : group.options;

  return (
    <div className="grid gap-2.5">
      <div className="grid gap-1 border-b border-slate-200 pb-2">
        <div className="flex flex-wrap items-baseline gap-x-2 text-sm">
          <strong className="font-extrabold text-slate-950">
            {group.carrierName ? `${group.carrierName} · ` : ""}
            {group.planName || "요금제"}
          </strong>
          <span className="text-slate-500">
            월 {group.planMonthlyFee.toLocaleString("ko-KR")}원
          </span>
        </div>
        {group.planDataAmount || group.planCallText ? (
          <p className="m-0 text-xs text-slate-500">
            {[group.planDataAmount, group.planCallText].filter(Boolean).join(" · ")}
          </p>
        ) : null}
        {group.planDescription.length ? (
          <ul className="m-0 grid list-none gap-0.5 p-0 text-xs text-slate-500">
            {group.planDescription.map((line) => (
              <li key={line}>· {line}</li>
            ))}
          </ul>
        ) : null}
      </div>

      <SubscriptionToggle
        options={subTypes}
        value={activeSub}
        onChange={setSubType}
      />

      <div className="grid gap-2">
        {shownOptions.map((option) => (
          <AdminProductPricingOptionCard
            key={option.id}
            option={option}
            months={months}
            policy={policy}
          />
        ))}
      </div>
    </div>
  );
}

function groupKey(group: PlanGroup) {
  return group.planId || group.planName;
}

function carrierOrder(name: string) {
  const index = carrierOptions.findIndex((item) => item.label === name);
  return index === -1 ? carrierOptions.length : index;
}

export function AdminProductPricingBreakdown({
  product,
}: AdminProductPricingBreakdownProps) {
  const groups = groupByPlan(product.pricingOptions).sort(
    (first, second) => carrierOrder(first.carrierName) - carrierOrder(second.carrierName)
  );
  const months = [...product.installmentMonthOptions].sort(
    (first, second) => first - second
  );
  const [planKey, setPlanKey] = useState(groups[0] ? groupKey(groups[0]) : "");
  const activeGroup =
    groups.find((group) => groupKey(group) === planKey) ?? groups[0];

  return (
    <section className="grid gap-4 rounded-xl border border-slate-200 p-4">
      <div>
        <h3 className="m-0 text-base font-extrabold text-slate-950">
          요금제 · 할인 적용 가격
        </h3>
        <p className="mb-0 mt-1 text-xs leading-relaxed text-slate-500">
          서버가 계산한 조합별 견적입니다. 서버 값이 없는 항목은 현재 가격 정책으로 계산해 &lsquo;추정&rsquo;으로 표시합니다.
        </p>
      </div>

      <PlanTabs
        tabs={groups.map((group) => ({
          key: groupKey(group),
          label: group.planName || "요금제",
          carrier: group.carrierName || undefined,
        }))}
        value={activeGroup ? groupKey(activeGroup) : ""}
        onChange={setPlanKey}
      />

      {activeGroup ? (
        <PlanPricingGroup
          group={activeGroup}
          key={groupKey(activeGroup)}
          months={months}
          policy={product.pricingPolicy}
        />
      ) : null}
    </section>
  );
}
