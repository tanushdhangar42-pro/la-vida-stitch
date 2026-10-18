import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
export function ColorSelector({ colors, value, onChange, }) {
    return (<div className="flex flex-wrap items-center gap-3">
      {colors.map((c) => {
            const active = c.name === value.name;
            return (<button key={c.name} type="button" onClick={() => onChange(c)} aria-label={c.name} aria-pressed={active} className={cn("grid h-9 w-9 place-items-center rounded-full border transition-all duration-300", active
                    ? "border-foreground ring-1 ring-foreground ring-offset-2 ring-offset-background"
                    : "border-border hover:border-foreground/40")} style={{ backgroundColor: c.hex }}>
            {active ? (<Check className="h-4 w-4" strokeWidth={2} style={{ color: c.name === "White" || c.name === "Off White" || c.name === "Sand" || c.name === "Lilac" || c.name === "Pink" ? "#1a1a1a" : "#fff" }}/>) : null}
          </button>);
        })}
    </div>);
}
export function SizeSelector({ sizes, value, onChange, }) {
    return (<div className="flex flex-wrap gap-2">
      {sizes.map((s) => (<button key={s} type="button" onClick={() => onChange(s)} aria-pressed={s === value} className={cn("min-w-12 border px-4 py-2 text-xs tracking-[0.14em] transition-colors duration-300", s === value
                ? "border-foreground bg-foreground text-background"
                : "border-border text-foreground hover:border-foreground")}>
          {s}
        </button>))}
    </div>);
}
