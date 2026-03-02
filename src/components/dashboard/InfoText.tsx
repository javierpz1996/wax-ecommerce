type InfoTextProps = {
  children?: React.ReactNode;
};

const defaultContent = (
  <>

  </>
);

export function InfoText({ children = defaultContent }: InfoTextProps) {
  return (
    <div className="space-y-1 text-xs leading-5 text-[var(--pac-blue)] md:space-y-2 md:text-sm md:leading-6">
      {children}
    </div>
  );
}
