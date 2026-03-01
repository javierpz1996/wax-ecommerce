import Image from "next/image";

type BrandLogoProps = {
  src?: string;
  alt?: string;
};

export function BrandLogo({
  src = "/images/logowax.png",
  alt = "Logo de la marca",
}: BrandLogoProps) {
  return (
    <div className="flex items-center justify-center">
      <div className="flex size-20 items-center justify-center rounded-full border border-emerald-400/50 bg-emerald-500/30 shadow-[0_0_25px_rgba(16,185,129,0.4)] md:size-28 md:shadow-[0_0_35px_rgba(16,185,129,0.5)]">
        <Image
          src={src}
          alt={alt}
          width={56}
          height={56}
          className="h-14 w-auto brightness-0 invert md:h-20"
        />
      </div>
    </div>
  );
}
