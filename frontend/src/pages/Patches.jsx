import { usePageTitle } from "@/lib/usePageTitle";
import { useMemo, useState } from "react";
import { patchCategories } from "@/data/constants";
import { useCatalog } from "@/context/CatalogContext";
import { PatchCard } from "@/components/PatchCard";
import { Page, SectionHeading } from "@/components/Section";
import { cn } from "@/lib/utils";
export default function Patches() {
    usePageTitle("Patch Collection — LA VIDA STITCH");
    const { patches } = useCatalog();
    const [cat, setCat] = useState("All");
    const list = useMemo(() => (cat === "All" ? patches : patches.filter((p) => p.category === cat)), [cat]);
    return (<Page className="py-14 lg:py-20">
      <SectionHeading align="left" eyebrow="Mix. Match. Swap." title="The Patch Library" subtitle="Every patch is the same 20 x 20 cm panel — printed canvas face, hook tape across the whole back, stitched all the way round. Tap any patch to see its reverse."/>

      <div className="mt-12 flex flex-wrap gap-x-6 gap-y-3 border-y border-border py-4">
        {patchCategories.map((c) => (<button key={c} type="button" onClick={() => setCat(c)} className={cn("eyebrow transition-colors", c === cat ? "text-foreground" : "text-muted-foreground hover:text-foreground")}>
            {c}
          </button>))}
      </div>

      <div className="mt-12 grid grid-cols-2 gap-5 lg:grid-cols-4">
        {list.map((p) => (<PatchCard key={p.id} patch={p}/>))}
      </div>
    </Page>);
}
