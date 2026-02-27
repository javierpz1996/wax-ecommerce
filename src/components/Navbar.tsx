 "use client";

import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";

export function Navbar() {
  const [open, setOpen] = useState(false);

  const toggle = () => setOpen((prev) => !prev);
  const close = () => setOpen(false);

  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="sticky top-0 z-50 border-b border-black/5 bg-white/80 backdrop-blur dark:border-white/10 dark:bg-black/60"
    >
      <div className="mx-auto flex w-full items-center justify-between px-4 py-3 sm:px-6 sm:py-4">
        <Link href="/" className="flex items-center gap-2" onClick={close}>
          <span className="inline-flex size-8 items-center justify-center rounded-xl bg-black text-sm font-semibold text-white dark:bg-white dark:text-black">
            W
          </span>
          <span className="text-sm font-semibold tracking-tight">Wax</span>
        </Link>

        {/* Navegación desktop */}
        <nav className="hidden items-center gap-6 text-sm text-black/70 dark:text-white/70 sm:flex">
          <Link className="hover:text-black dark:hover:text-white" href="#secciones">
            Secciones
          </Link>
          <Link className="hover:text-black dark:hover:text-white" href="#productos">
            Productos
          </Link>
          <Link className="hover:text-black dark:hover:text-white" href="#contacto">
            Contacto
          </Link>
        </nav>

        {/* Botón hamburguesa mobile */}
        <button
          type="button"
          onClick={toggle}
          className="inline-flex items-center justify-center rounded-md p-2 text-black hover:bg-black/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black dark:text-white dark:hover:bg-white/10 dark:focus-visible:ring-white sm:hidden"
          aria-label="Abrir menú"
          aria-expanded={open}
        >
          <span className="sr-only">Abrir menú</span>
          <div className="flex h-4 w-5 flex-col justify-between">
            <span
              className={`h-0.5 w-full rounded-full bg-current transition-transform ${
                open ? "translate-y-1.5 rotate-45" : ""
              }`}
            />
            <span
              className={`h-0.5 w-full rounded-full bg-current transition-opacity ${
                open ? "opacity-0" : "opacity-100"
              }`}
            />
            <span
              className={`h-0.5 w-full rounded-full bg-current transition-transform ${
                open ? "-translate-y-1.5 -rotate-45" : ""
              }`}
            />
          </div>
        </button>
      </div>

      {/* Menú desplegable mobile */}
      {open ? (
        <motion.nav
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          className="border-t border-black/5 bg-white/95 px-4 font-bold py-3 text-xs uppercase text-black/80 shadow-sm dark:border-white/10 dark:bg-gray-950 dark:text-white/80 sm:hidden"
        >
          <div className="flex flex-col gap-2">
            <Link
              href="#secciones"
              className="py-1 hover:text-black dark:hover:text-white"
              onClick={close}
            >
              Secciones
            </Link>
            <Link
              href="#productos"
              className="py-1 hover:text-black dark:hover:text-white"
              onClick={close}
            >
              Productos
            </Link>
            <Link
              href="#contacto"
              className="py-1 hover:text-black dark:hover:text-white"
              onClick={close}
            >
              Contacto
            </Link>
          </div>
        </motion.nav>
      ) : null}
    </motion.header>
  );
}

