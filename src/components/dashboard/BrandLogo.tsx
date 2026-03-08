import Image from "next/image";

type BrandLogoProps = {
  src?: string;
  alt?: string;
};

const defaultSrc = "/images/logo1.png";

export function BrandLogo({
  src = defaultSrc,
  alt = "Logo de la marca",
}: BrandLogoProps) {
  const isExternal = typeof src === "string" && (src.startsWith("http://") || src.startsWith("https://"));

  return (
    <div className="relative flex items-center justify-center">
      {/* Glow profundo */}
      <div className="absolute h-30 w-50 md:h-72 md:w-72 rounded-full bg-emerald-500/20 blur-3xl " />
      {isExternal ? (
        <img
          src={src}
          alt={alt}
          className="relative h-41 md:h-52 w-auto object-contain mr-2 drop-shadow-[0_0_30px_rgba(16,185,129,0.8)]"
        />
      ) : (
        <Image
          src={src || defaultSrc}
          alt={alt}
          width={260}
          height={260}
          className="relative h-41 md:h-52 w-auto object-contain mr-2 drop-shadow-[0_0_30px_rgba(16,185,129,0.8)]"
          priority
        />
      )}
    </div>
  );
}