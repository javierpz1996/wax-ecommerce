export function Footbar() {
  return (
    <footer
      id="contacto"
      className="mt-10 border-t border-black/5 bg-white dark:border-white/10 dark:bg-black"
    >
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-6 py-10 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-1">
          <div className="text-sm font-semibold tracking-tight">Wax</div>
          <div className="text-sm text-black/60 dark:text-white/60">
            Productos destacados por secciones.
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-black/70 dark:text-white/70">
          <a className="hover:text-black dark:hover:text-white" href="#secciones">
            Secciones
          </a>
          <a className="hover:text-black dark:hover:text-white" href="#productos">
            Productos
          </a>
          <a className="hover:text-black dark:hover:text-white" href="#contacto">
            Contacto
          </a>
        </div>
      </div>
    </footer>
  );
}

