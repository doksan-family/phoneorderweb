import type { ProductDetailProfile } from "@/entities/product/model/types";

type ProductDetailTabsProps = {
  profile: ProductDetailProfile;
};

export function ProductDetailTabs({ profile }: ProductDetailTabsProps) {
  return (
    <section className="detail-tabs">
      <div className="detail-tabs__nav">
        <span>모델정보</span>
        <span>유의사항</span>
        <span>구매후기</span>
      </div>
      <div className="detail-tabs__content">
        <InfoColumn title="모델정보" items={profile.detailTabs.modelInfo} />
        <InfoColumn title="상담 유의사항" items={profile.detailTabs.cautions} />
        <InfoColumn title="후기" items={["후기는 관리자 등록 방식으로 노출됩니다."]} />
      </div>
    </section>
  );
}

function InfoColumn({ title, items }: { title: string; items: string[] }) {
  return (
    <article>
      <h2>{title}</h2>
      <ul>
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </article>
  );
}
