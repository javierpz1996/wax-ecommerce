type InfoTextProps = {
  children?: React.ReactNode;
};

const defaultContent = (
  <>
    <p>
      Lugar para texto informativo. Podés explicar cómo funciona el menú,
      horarios de atención o condiciones de envío.
    </p>
    <p>
      Este módulo se adapta a celular, tablet y desktop.
    </p>
  </>
);

export function InfoText({ children = defaultContent }: InfoTextProps) {
  return (
    <div className="space-y-1 text-xs leading-5 text-[var(--pac-blue)] md:space-y-2 md:text-sm md:leading-6">
      {children}
    </div>
  );
}
