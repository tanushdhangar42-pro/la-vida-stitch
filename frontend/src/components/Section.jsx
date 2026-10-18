import { cn } from "@/lib/utils";
export function SectionHeading({ eyebrow, title, subtitle, align = "center", className, }) {
    return (<div className={cn("max-w-2xl", align === "center" ? "mx-auto text-center" : "", className)}>
      {eyebrow ? <p className="eyebrow text-accent">{eyebrow}</p> : null}
      <h2 className="display mt-3 text-3xl sm:text-4xl md:text-5xl">{title}</h2>
      {subtitle ? (<p className="mt-4 text-sm leading-relaxed text-muted-foreground">
          {subtitle}
        </p>) : null}
    </div>);
}
export function Page({ children, className, }) {
    return (<div className={cn("mx-auto w-full max-w-[1400px] px-5 sm:px-8 lg:px-12", className)}>
      {children}
    </div>);
}
