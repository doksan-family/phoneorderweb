type AdminEmptyStateProps = {
  message: string;
  fill?: boolean;
};

export function AdminEmptyState({
  message,
  fill = false,
}: AdminEmptyStateProps) {
  return (
    <div className={fill ? fillClass : panelClass}>
      <div className="rounded-[10px] border border-dashed border-slate-200 bg-slate-50 px-6 py-5 text-center text-sm font-bold text-slate-500">
        {message}
      </div>
    </div>
  );
}

const panelClass = "grid min-h-[calc(100vh_-_230px)] place-items-center";
const fillClass = "grid min-h-full flex-1 place-items-center";
