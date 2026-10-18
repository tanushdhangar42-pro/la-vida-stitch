import { usePageTitle } from "@/lib/usePageTitle";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { categories } from "@/data/constants";
import { useCatalog } from "@/context/CatalogContext";
import { ProductCard } from "@/components/ProductCard";
import { Page, SectionHeading } from "@/components/Section";
const EDITS = [
    { name: "Regular Fit", count: "240 GSM · 5 tees" },
    { name: "Oversized", count: "280 GSM · 5 tees" },
    { name: "Patches", count: "20 × 20 cm · 12 designs" },
    { name: "Starter Kits", count: "Tee + 3 patches · 2 kits" },
];
export default function Collections() {
    usePageTitle("Collections — LA VIDA STITCH");
    const { products } = useCatalog();
    return (<Page className="py-14 lg:py-20">
      <SectionHeading align="left" eyebrow="Curated" title="Collections" subtitle="Four ways in. Every tee carries the same velcro panel, so anything here works with anything else."/>

      <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {categories.map((c, i) => (<Link key={c.id} to={c.to} className="group block">
            <div className="overflow-hidden bg-secondary">
              <img src={c.image} alt={EDITS[i]?.name ?? c.title} loading="lazy" className="aspect-[4/5] w-full object-cover transition-transform duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105"/>
            </div>
            <h3 className="mt-4 text-sm tracking-[0.14em]">
              {(EDITS[i]?.name ?? c.title).toUpperCase()}
            </h3>
            <p className="mt-1 text-xs text-muted-foreground">
              {EDITS[i]?.count}
            </p>
          </Link>))}
      </div>

      <div className="mt-24 flex flex-wrap items-end justify-between gap-4">
        <SectionHeading align="left" title="Currently restyling" className="max-w-lg"/>
        <Link to="/shop" className="eyebrow link-underline inline-flex items-center gap-2 pb-2">
          Shop all <ArrowRight className="h-3.5 w-3.5"/>
        </Link>
      </div>
      <div className="mt-12 grid grid-cols-2 gap-x-5 gap-y-12 lg:grid-cols-4">
        {products.slice(2, 6).map((p) => (<ProductCard key={p.id} product={p}/>))}
      </div>
    </Page>);
}
