import Image from "next/image";

export function BrandMark() {
  return (
    <div className="flex min-w-0 items-center gap-2 sm:gap-3">
      <div className="relative h-10 w-10 shrink-0 overflow-hidden bg-transparent sm:h-14 sm:w-14">
        <Image
          src="/logo.png"
          alt="America First eagle logo"
          fill
          className="object-contain p-0.5 sm:p-1"
          sizes="(max-width: 640px) 40px, 56px"
        />
      </div>
      <div className="hidden min-w-0 sm:block">
        <p className="truncate text-sm font-semibold uppercase tracking-[0.2em] text-black">
          AMERICA FIRST RESEARCH
        </p>
      </div>
    </div>
  );
}
