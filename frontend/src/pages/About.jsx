import { usePageTitle } from "@/lib/usePageTitle";
import { Link } from "react-router-dom";
import { Leaf, Recycle, Sparkles } from "lucide-react";
import { Page, SectionHeading } from "@/components/Section";
import hero from "@/assets/hero.svg";
const VALUES = [
    {
        icon: Sparkles,
        title: "Designed to change",
        body: "Every tee carries a velcro panel at the chest, so a new patch is a new outfit rather than a new purchase.",
    },
    {
        icon: Recycle,
        title: "Fewer, better garments",
        body: "Restyling instead of rebuying means less waste and a wardrobe that keeps working.",
    },
    {
        icon: Leaf,
        title: "Considered materials",
        body: "240–280 GSM combed cotton, low-impact dyes, and soft loop tape that stays flat against the skin.",
    },
];
export default function About() {
    usePageTitle("Our Story — LA VIDA STITCH");
    return (<Page className="py-12 sm:py-16">
      <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
        <div>
          <p className="eyebrow text-accent">Our Story</p>
          <h1 className="display mt-3 text-4xl sm:text-5xl">
            One tee. Multiple styles.
          </h1>
          <p className="mt-6 text-sm leading-relaxed text-muted-foreground">
            LA VIDA STITCH started with a simple frustration: a wardrobe full of
            clothes that only ever said one thing. We wanted a garment that could
            shift with a mood, a season, a city — without another shopping trip.
          </p>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
            So we built the velcro patch system. A soft loop panel is sewn flat
            into the chest of every tee, and every 20 x 20 cm patch carries hook
            tape across its whole back. Press one on and it holds. Peel a corner
            and it lifts. Nothing marks the cotton, and one tee carries as many
            looks as you own patches.
          </p>
          <Link to="/customize" className="mt-8 inline-block bg-foreground px-8 py-3 text-[11px] tracking-[0.22em] text-background">
            CUSTOMIZE YOUR TEE
          </Link>
        </div>
        <img src={hero} alt="LA VIDA STITCH detachable patch tee" className="w-full bg-secondary object-cover"/>
      </div>

      <section className="mt-24">
        <SectionHeading eyebrow="Sustainability" title="Restyle, don't rebuy" subtitle="Our whole system is built so a single garment earns its place many times over."/>
        <div className="mt-12 grid gap-8 md:grid-cols-3">
          {VALUES.map((v) => (<div key={v.title} className="border-t border-border pt-6">
              <v.icon className="h-6 w-6 text-accent" strokeWidth={1.3}/>
              <h3 className="mt-4 text-base">{v.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {v.body}
              </p>
            </div>))}
        </div>
      </section>
    </Page>);
}
