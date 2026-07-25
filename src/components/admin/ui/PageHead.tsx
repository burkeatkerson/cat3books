import type { ReactNode } from "react";

export function PageHead({
  title,
  sub,
  actions,
}: {
  title: ReactNode;
  sub?: ReactNode;
  actions?: ReactNode;
}) {
  return (
    <div className="flex items-end gap-5 mb-6">
      <div>
        <h1 className="font-disp text-[46px] tracking-[0.02em] leading-[0.9]">
          {title}
        </h1>
        {sub && (
          <div className="font-body text-[14px] text-c3-mid mt-1.5 max-w-[560px]">
            {sub}
          </div>
        )}
      </div>
      {actions && <div className="ml-auto flex gap-2.5">{actions}</div>}
    </div>
  );
}
