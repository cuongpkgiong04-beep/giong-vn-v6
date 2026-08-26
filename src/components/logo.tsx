import { cn } from "@/lib/utils";

export function Logo({ className, markClassName, compact = false }: { className?: string; markClassName?: string; compact?: boolean }) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <img
        src="/giong-vina-logo.png"
        alt="Giong Vina"
        className={cn("size-8 shrink-0 rounded-full object-cover ring-1 ring-white/10", markClassName)}
      />
      <span
        className={cn(
          "leading-tight transition-all duration-200",
          compact ? "w-0 overflow-hidden opacity-0 group-hover:w-auto group-hover:opacity-100" : "opacity-100",
        )}
      >
        <span className="block text-[13px] font-semibold tracking-[0.14em] uppercase">Giong</span>
        <span className="block text-[11px] font-medium tracking-[0.18em] uppercase opacity-70">Việt Nam</span>
      </span>
    </span>
  );
}

export function LogoMark({ className }: { className?: string }) {
  return <img src="/giong-vina-logo.png" alt="Giong Vina" className={cn("size-8 rounded-full object-cover", className)} />;
}
