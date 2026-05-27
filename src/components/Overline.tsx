export default function Overline({
  children,
  center,
}: {
  children: React.ReactNode;
  center?: boolean;
}) {
  return (
    <div
      className={`inline-flex items-center gap-3 font-mono text-[10px] tracking-[0.28em] uppercase text-c3-yellow mb-[18px]${center ? " w-full justify-center" : ""}`}
    >
      <span className="w-7 h-px bg-c3-yellow shrink-0" aria-hidden />
      {children}
    </div>
  );
}
