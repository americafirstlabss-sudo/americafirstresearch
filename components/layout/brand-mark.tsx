import Image from "next/image";

export function BrandMark() {
  return (
    <div className="flex items-center gap-3">
      <div className="relative h-14 w-14 overflow-hidden bg-transparent">
        <Image
          src="/logo.png"
          alt="America First eagle logo"
          fill
          className="object-contain p-1"
          sizes="56px"
        />
      </div>
      <div>
        <p className="font-semibold tracking-[0.2em] text-black">AMERICA FIRST RESEARCH</p>
      </div>
    </div>
  );
}
