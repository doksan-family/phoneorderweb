const contacts = [
  {
    icon: "📞",
    title: "전화 상담 · 02-0000-0000",
    desc: "평일 10:00 - 19:00",
    dark: true
  },
  {
    icon: "💬",
    title: "카카오톡 상담 · 채널 '핵폰'",
    desc: "24시간 접수 가능",
    dark: false
  },
  {
    icon: "✉️",
    title: "상담 신청서 접수",
    desc: "상담 신청 후 1영업일 이내 연락드립니다",
    dark: false
  }
];

export function SupportContactCards() {
  return (
    <div className="grid gap-3">
      {contacts.map((contact) => (
        <article
          className={`flex items-center gap-4 rounded-2xl p-5 ${
            contact.dark ? "bg-slate-950 text-white" : "bg-slate-100 text-slate-950"
          }`}
          key={contact.title}
        >
          <span aria-hidden className="shrink-0 text-[1.35rem]">
            {contact.icon}
          </span>
          <div className="min-w-0">
            <strong className="block text-[0.92rem] font-extrabold">{contact.title}</strong>
            <p className="m-0 mt-1 text-[0.78rem] text-slate-500">{contact.desc}</p>
          </div>
        </article>
      ))}
    </div>
  );
}
