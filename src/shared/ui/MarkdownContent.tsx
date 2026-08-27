import Markdown from "react-markdown";
import type { Components } from "react-markdown";

type MarkdownContentProps = {
  content: string;
};

const components: Components = {
  h1: (props) => <h2 className="brand-title mt-6 mb-2 first:mt-0" {...props} />,
  h2: (props) => (
    <h3 className="mt-6 mb-2 text-[1.1rem] font-bold text-slate-950 first:mt-0" {...props} />
  ),
  h3: (props) => (
    <h4 className="mt-5 mb-1.5 text-[1rem] font-bold text-slate-950 first:mt-0" {...props} />
  ),
  p: (props) => <p className="my-2.5 text-[0.88rem] leading-[1.7] text-slate-600" {...props} />,
  ul: (props) => (
    <ul className="my-2.5 list-disc pl-5 text-[0.88rem] leading-[1.7] text-slate-600" {...props} />
  ),
  ol: (props) => (
    <ol className="my-2.5 list-decimal pl-5 text-[0.88rem] leading-[1.7] text-slate-600" {...props} />
  ),
  li: (props) => <li className="my-1" {...props} />,
  a: (props) => (
    <a
      className="font-bold text-[var(--brand-primary-strong)] underline underline-offset-2"
      target="_blank"
      rel="noopener noreferrer"
      {...props}
    />
  ),
  strong: (props) => <strong className="font-bold text-slate-950" {...props} />,
  hr: () => <hr className="my-5 border-[var(--line)]" />,
};

/** 약관·정책 같은 관리자 작성 Markdown을 안전하게 렌더링한다. react-markdown은 raw HTML을 파싱하지 않아 별도 sanitize 없이도 스크립트 삽입을 막는다. */
export function MarkdownContent({ content }: MarkdownContentProps) {
  return <Markdown components={components}>{content}</Markdown>;
}
