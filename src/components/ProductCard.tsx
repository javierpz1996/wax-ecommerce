import Image from "next/image";
import type { Product } from "../typos/products";
import { motion } from "framer-motion";

function clamp(n: number, min: number, max: number) {
  return Math.min(max, Math.max(min, n));
}

type ProductCardProps = {
  product: Product;
  index?: number;
};

export function ProductCard({ product, index = 0 }: ProductCardProps) {
  return (
    <motion.article
      data-card={index === 0 ? "1" : undefined}
      className="w-[240px] shrink-0 snap-start overflow-hidden rounded-2xl border border-black/5 bg-white shadow-sm dark:border-white/10 dark:bg-black sm:w-[290px]"
      whileHover={{ y: -6, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 260, damping: 20 }}
    >
      <div className="relative aspect-[3/3] mx-6 my-4 overflow-hidden">
        <Image
          src={product.imageSrc}
          alt={product.name}
          fill
          sizes="(max-width: 640px) 240px, 260px"
          className="object-cover"
          priority={index < 2}
        />
        {product.badge ? (
          <div className="absolute left-2 top-2 rounded-full bg-black/80 px-2 py-1 text-xs font-medium text-white backdrop-blur dark:bg-white/80 dark:text-black">
            {product.badge}
          </div>
        ) : null}
      </div>

      <div className="h-px w-full bg-black/5 dark:bg-white/10" />

      <div className="space-y-1.5 bg-zinc-100 px-4 py-3 dark:bg-zinc-900">
        <div className="line-clamp-1 text-sm font-semibold text-black dark:text-white">
          {product.name}
        </div>
        <div className="text-sm font-bold text-yellow-300">
          ${clamp(product.price, 0, 999999).toFixed(2)}
        </div>
        {product.description ? (
          <p className="line-clamp-2 text-xs text-black/70 dark:text-white/70">
            {product.description}
          </p>
        ) : null}
      </div>
    </motion.article>
  );
}

