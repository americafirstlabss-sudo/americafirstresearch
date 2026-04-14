import Image from "next/image";

export function BrandMark() {
  return (
    <div className="flex min-w-0 items-center gap-3 sm:gap-4">
      <div className="flex shrink-0 flex-col items-center">
        <div className="relative h-24 w-24 overflow-hidden bg-transparent sm:h-24 sm:w-24">
          <Image
            src="/logo.png"
            alt="America First eagle logo"
            fill
            className="object-contain p-0.5 sm:p-1"
            sizes="(max-width: 640px) 96px, 96px"
          />
        </div>
        <p className="-mt-3 text-sm font-black uppercase tracking-[0.32em] text-black sm:-mt-1 sm:text-base sm:tracking-[0.28em]">
          AFL
        </p>
      </div>
      <div className="hidden min-w-0 sm:block">
        <p className="truncate text-lg font-semibold uppercase tracking-[0.24em] text-black">
          AMERICA FIRST RESEARCH
        </p>
      </div>
    </div>
  );
}
