 "use client";

import Image from "next/image";
import { Button } from "../components/Button";
import { motion } from "framer-motion";

type HeroProps = {
  title?: string;
  subtitle?: string;
};

export function Hero({
  title = "WAX ORIGINAL PARA QUIEN BUSCA CALIDAD",
  subtitle = "Puedes cambiar este texto pasando props al componente Hero.",
}: HeroProps) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="relative mx-auto max-w-8xl overflow-hidden border border-black/5 bg-black/5 dark:border-white/10 dark:bg-white/5"
    >
      {/* Contenedor que controla la altura */}
      <div className="relative h-[520px] w-full sm:h-[500px] md:h-[550px]">
        <motion.div
          initial={{ scale: 1.05 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="absolute inset-0"
        >
          <Image
            src="/images/2.png"
            alt={title}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        </motion.div>

        {/* Overlay oscuro */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-black/0" />

        {/* Contenido */}
        <div className="absolute inset-0 flex items-center justify-center text-start">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.15 }}
            className="pointer-events-auto flex w-full flex-col gap-4 px-6 pb-10 sm:px-10 sm:pb-14"
          >
            <h1 className="max-w-2xl text-balance text-2xl font-semibold leading-tight tracking-tight text-white sm:text-4xl font-bebas tracking-wide uppercase">
              {title}
            </h1>

            <p className="max-w-xl text-pretty text-sm leading-6 text-white/80 sm:text-base font-bebas">
              {subtitle}
            </p>

            <div className="mt-2 flex flex-wrap gap-3">
              <motion.div
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 260, damping: 20 }}
              >
                <Button href="#productos">VER PRODUCTOS</Button>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}
