"use client";

import type { Product, ProductSection } from "../typos/products";
import { useMemo, useRef } from "react";
import { ProductCard } from "../components/ProductCard";

function useScrollByCard() {
  const ref = useRef<HTMLDivElement | null>(null);

  const scrollBy = (direction: -1 | 1) => {
    const el = ref.current;
    if (!el) return;

    const firstCard = el.querySelector<HTMLElement>("[data-card='1']");
    const cardWidth = firstCard?.offsetWidth ?? 280;
    const gap = 16;
    const delta = direction * (cardWidth + gap) * 2;
    el.scrollBy({ left: delta, behavior: "smooth" });
  };

  return { ref, scrollBy };
}

export function ProductCarousel({ sections }: { sections: ProductSection[] }) {
  const safeSections = useMemo(() => sections ?? [], [sections]);

  return (
    <section id="secciones" className="space-y-12">

      <div className="space-y-12">
        {safeSections.map((section) => (
          <ProductSectionCarousel
            key={section.id}
            title={section.title}
            description={section.description}
            products={section.products}
          />
        ))}
      </div>
    </section>
  );
}

function ProductSectionCarousel({
  title,
  description,
  products,
}: {
  title: string;
  description?: string;
  products: Product[];
}) {
  const { ref, scrollBy } = useScrollByCard();
  const count = products.length;

  return (
    <section className="space-y-4">
      <header className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div className="space-y-1">
          <h3 className="text-lg font-semibold tracking-tight text-black dark:text-white">
            {title}
          </h3>
          {description ? (
            <p className="text-sm text-black/60 dark:text-white/60">
              {description}
            </p>
          ) : null}
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => scrollBy(-1)}
            className="inline-flex h-9 items-center justify-center rounded-full border border-black/10 bg-white/60 px-4 text-sm font-medium text-black hover:bg-white disabled:opacity-40 dark:border-white/15 dark:bg-black/30 dark:text-white dark:hover:bg-black/40"
            aria-label={`Desplazar ${title} hacia la izquierda`}
            disabled={count <= 1}
          >
            ←
          </button>
          <button
            type="button"
            onClick={() => scrollBy(1)}
            className="inline-flex h-9 items-center justify-center rounded-full border border-black/10 bg-white/60 px-4 text-sm font-medium text-black hover:bg-white disabled:opacity-40 dark:border-white/15 dark:bg-black/30 dark:text-white dark:hover:bg-black/40"
            aria-label={`Desplazar ${title} hacia la derecha`}
            disabled={count <= 1}
          >
            →
          </button>
        </div>
      </header>

      <div
        ref={ref}
        className="no-scrollbar -mx-6 flex snap-x snap-mandatory gap-4 overflow-x-auto px-6 pb-2"
        role="region"
        aria-label={`Carrusel de ${title}`}
      >
        {products.map((p, idx) => (
          <ProductCard key={p.id} product={p} index={idx} />
        ))}
      </div>
    </section>
  );
}

