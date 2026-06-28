import type { ProductDetailProfile } from "@/entities/product/model/types";

type ProductDetailTabsProps = {
  profile: ProductDetailProfile;
};

export function ProductDetailTabs({ profile }: ProductDetailTabsProps) {
  return (
    <section className="mt-6 border border-slate-200 rounded-xl bg-white overflow-hidden">
      <div className="grid grid-cols-3 border-b border-slate-200 bg-slate-50 max-[560px]:grid-cols-1">
        <span className="py-[15px] px-4 font-extrabold text-[0.88rem] text-center">모델정보</span>
        <span className="py-[15px] px-4 font-extrabold text-[0.88rem] text-center">유의사항</span>
        <span className="py-[15px] px-4 font-extrabold text-[0.88rem] text-center">구매후기</span>
      </div>
      <div className="grid grid-cols-3 gap-4 p-5 max-[900px]:grid-cols-1">
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
      <h2 className="mt-0 text-[1.1rem]">{title}</h2>
      <ul className="m-0 pl-[18px] text-slate-500 leading-[1.75]">
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </article>
  );
}
