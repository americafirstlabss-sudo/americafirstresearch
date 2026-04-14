import Image from "next/image";

export function BrandMark() {
  return (
    <div className="flex min-w-0 items-center gap-2 sm:gap-3">
      <div className="flex shrink-0 flex-col items-center">
        <div className="relative h-20 w-20 overflow-hidden bg-transparent sm:h-16 sm:w-16">
          <Image
            src="/logo.png"
            alt="America First eagle logo"
            fill
            className="object-contain p-0.5 sm:p-1"
            sizes="(max-width: 640px) 80px, 64px"
          />
        </div>
        <p className="-mt-1 text-[11px] font-black uppercase tracking-[0.34em] text-black sm:mt-0.5 sm:text-[10px] sm:font-semibold sm:tracking-[0.2em]">
          AFL
        </p>
      </div>
      <div className="hidden min-w-0 sm:block">
        <p className="truncate text-sm font-semibold uppercase tracking-[0.2em] text-black">
          AMERICA FIRST RESEARCH
        </p>
      </div>
    </div>
  );
}
