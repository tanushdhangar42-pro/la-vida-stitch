import { usePageTitle } from "@/lib/usePageTitle";
import { useMemo, useState } from "react";
import { useCatalog } from "@/context/CatalogContext";
import { ProductCard } from "@/components/ProductCard";
import { Page, SectionHeading } from "@/components/Section";
import { cn } from "@/lib/utils";
import storeBlackClassic from "@/assets/photo/uploaded-classic-black.jpg";
import storeBlackOffroad from "@/assets/photo/uploaded-offroad-black.jpg";
const FILTERS = [
    "All",
    "T-Shirts",
    "Oversized",
    "Starter Kits",
];
const SORTS = ["Featured", "Price: Low to High", "Price: High to Low"];
export default function Shop() {
    usePageTitle("Shop All Tees — LA VIDA STITCH");
    const { products } = useCatalog();
    const [filter, setFilter] = useState("All");
    const [sort, setSort] = useState("Featured");
    const list = useMemo(() => {
        const base = filter === "All" ? products : products.filter((p) => p.category === filter);
        const sorted = [...base];
        if (sort === "Price: Low to High")
            sorted.sort((a, b) => a.price - b.price);
        if (sort === "Price: High to Low")
            sorted.sort((a, b) => b.price - a.price);
        return sorted;
    }, [filter, sort]);
    return (<Page className="py-14 lg:py-20">
      <SectionHeading align="left" eyebrow="Collection" title="Shop All" subtitle="Choose your tee first, then choose the fabric. Prices run from ₹699 to ₹1,299 depending on fabric weight and finish."/>

      <section className="store-featured mt-10">
        <div className="store-featured-head">
          <div>
            <p className="eyebrow text-accent">Featured pieces</p>
            <h2>REAL TEE DETAILS</h2>
          </div>
          <p>The exact La Vida Stitch tees you supplied, now built into the storefront.</p>
        </div>
        <div className="store-featured-grid">
          <article className="store-feature-card">
            <div className="store-feature-image"><img src={storeBlackClassic} alt="Black La Vida Stitch tee with chest wordmark"/></div>
            <div className="store-feature-info">
              <div><strong>La Vida Stitch Classic Black Tee</strong><span>Classic black · fabric changes price</span></div>
              <span className="store-feature-price">Starting ₹699</span>
            </div>
          </article>
          <article className="store-feature-card">
            <div className="store-feature-image"><img src={storeBlackOffroad} alt="Black La Vida Stitch tee with Off Road graphic"/></div>
            <div className="store-feature-info">
              <div><strong>La Vida Stitch Off Road Tee</strong><span>Off-road graphic · fabric changes price</span></div>
              <span className="store-feature-price">Up to ₹1,299</span>
            </div>
          </article>
        </div>
        <div className="store-fabric-note">
          <strong>Fabric pricing</strong>
          <span>180 GSM · ₹699</span>
          <span>200 GSM · ₹899</span>
          <span>240 GSM · ₹1,099</span>
          <span>280 GSM · ₹1,299</span>
        </div>
      </section>

      <div className="mt-12 grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4 border-y border-border py-4 sm:flex sm:justify-between">
        <div className="flex min-w-0 flex-wrap gap-x-6 gap-y-2">
          {FILTERS.map((f) => (<button key={f} type="button" onClick={() => setFilter(f)} className={cn("eyebrow transition-colors", f === filter ? "text-foreground" : "text-muted-foreground hover:text-foreground")}>
              {f}
            </button>))}
        </div>
        <select value={sort} onChange={(e) => setSort(e.target.value)} className="shrink-0 border border-border bg-transparent px-3 py-2 text-xs outline-none">
          {SORTS.map((s) => (<option key={s} value={s}>
              {s}
            </option>))}
        </select>
      </div>

      <div className="mt-12 grid grid-cols-2 gap-x-5 gap-y-12 lg:grid-cols-4">
        {list.map((p) => (<ProductCard key={p.id} product={p}/>))}
      </div>
    </Page>);
}
