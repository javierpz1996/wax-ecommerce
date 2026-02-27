import Image from "next/image";

const categories = [
  { id: "tienda", label: "Tienda", icon: "/images/icons/icon1.png" },
  { id: "plumas-wax", label: "Plumas de wax", icon: "/images/icons/icon2.png" },
  { id: "cartuchos", label: "Cartuchos", icon: "/images/icons/icon3.png" },
  { id: "concentrados", label: "Concentrados", icon: "/images/icons/icon4.jpg" },
  { id: "vaporizadores", label: "Vaporizadores", icon: "/images/icons/icon5.jpg" },
  { id: "accesorios", label: "Accesorios", icon: "/images/icons/icon6.jpg" },
  { id: "ofertas", label: "Ofertas", icon: "/images/icons/icon7.jpg" },
];

export function CategoriesSection() {
  return (
    <section
      id="categorias"
      className="mx-auto mt-0 mb-9 hidden w-full flex-col items-center gap-6 md:flex"
    >
      <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6">
        {categories.map((cat) => (
          <div
            key={cat.id}
            className="flex items-center gap-4 rounded-full bg-black/80 px-4 py-2 text-white shadow-sm backdrop-blur-sm dark:bg-white/90 dark:text-black"
          >
            <div className="relative size-9 shrink-0 overflow-hidden bg-white/10">
              <Image
                src={cat.icon}
                alt={cat.label}
                fill
                sizes="32px"
                className="object-cover"
              />
            </div>
            <span className="whitespace-nowrap text-sm font-bebas tracking-wide">
              {cat.label}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}

