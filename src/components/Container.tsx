import { cn } from "@/lib/cn";

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
}

export default function Container({ children, className }: ContainerProps) {
  return (
    <div className={cn("mx-auto w-full max-w-[1660px] px-5 sm:px-8 lg:px-[52px] xl:px-20", className)}>
      {children}
    </div>
  );
}
