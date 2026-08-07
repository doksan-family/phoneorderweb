import { ApplicationLookup } from "@/features/consultation/ui/ApplicationLookup";

export function ApplicationsView() {
  return (
    <main className="site-container pt-14 pb-20">
      <h1 className="m-0 mb-5 text-[clamp(1.2rem,2.4vw,1.6rem)] font-extrabold tracking-[-0.02em] text-slate-950">
        신청 내역 조회
      </h1>
      <ApplicationLookup />
    </main>
  );
}
