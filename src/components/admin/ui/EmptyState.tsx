export function EmptyState({ message }: { message: string }) {
  return (
    <div className="py-[60px] px-5 text-center">
      <div className="font-disp text-[64px] leading-none text-c3-b2">∅</div>
      <p className="font-body text-[14px] text-c3-mid mt-3">{message}</p>
    </div>
  );
}
