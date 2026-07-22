const USE_CASES = [
  { name: "Quirófano", letter: "Q" },
  { name: "Farmacia hospitalaria", letter: "F" },
  { name: "Laboratorio", letter: "L" },
  { name: "Sala limpia", letter: "S" },
  { name: "Centro quirúrgico", letter: "C" },
  { name: "Sustancias controladas", letter: "S" },
];

function UseCaseItem({ name, letter }: { name: string; letter: string }) {
  return (
    <div className="flex shrink-0 items-center gap-3">
      <div className="liquid-glass flex h-7 w-7 items-center justify-center rounded-lg text-[13px] font-semibold text-foreground">
        {letter}
      </div>
      <span className="whitespace-nowrap text-[15px] font-medium text-foreground">
        {name}
      </span>
    </div>
  );
}

export default function Marquee() {
  return (
    <div className="mx-auto flex max-w-6xl items-center gap-12 px-8">
      <div className="hidden shrink-0 text-[13px] leading-tight text-foreground/50 sm:block">
        Aplicado en
        <br />
        entornos críticos
      </div>

      <div className="relative flex-1 overflow-hidden">
        <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-16 bg-gradient-to-r from-bg to-transparent" />
        <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-16 bg-gradient-to-l from-bg to-transparent" />
        <div className="flex w-max animate-marquee gap-12">
          {[...USE_CASES, ...USE_CASES].map((item, i) => (
            <UseCaseItem
              key={`${item.name}-${i}`}
              name={item.name}
              letter={item.letter}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
