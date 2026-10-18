import { Heart } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { patchBackImage, formatINR } from "@/data/constants";
import { useCart } from "@/context/CartContext";
import { PatchSwatch } from "./PatchSwatch";
import { cn } from "@/lib/utils";
export function PatchCard({ patch }) {
    const { addItem } = useCart();
    const [fav, setFav] = useState(false);
    const [flipped, setFlipped] = useState(false);
    return (<article className="group border border-border bg-card p-4 transition-colors duration-500 hover:border-foreground/30">
      <div className="relative grid aspect-square place-items-center bg-secondary p-6">
        <div className="w-full transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-rotate-2 group-hover:scale-[1.04]">
          <PatchSwatch patch={flipped ? { name: patch.name, image: patchBackImage } : patch} alt={flipped
            ? `Reverse of the ${patch.name} patch, showing its hook tape`
            : `${patch.name} velcro patch`}/>
        </div>

        <button type="button" onClick={() => setFav((f) => !f)} aria-label={fav ? "Remove from wishlist" : "Save to wishlist"} className="absolute right-2 top-2 grid h-8 w-8 place-items-center rounded-full bg-card/85">
          <Heart className={cn("h-4 w-4", fav ? "fill-accent text-accent" : "text-foreground")} strokeWidth={1.4}/>
        </button>

        <button type="button" onClick={() => setFlipped((f) => !f)} className="eyebrow absolute bottom-2 left-2 rounded-full bg-card/85 px-3 py-1 text-[10px] text-muted-foreground transition-colors hover:text-foreground">
          {flipped ? "Show the design" : "Show the hook side"}
        </button>
      </div>

      <div className="mt-4 flex items-start justify-between gap-2">
        <div className="min-w-0">
          <h3 className="truncate text-sm">{patch.name}</h3>
          <p className="mt-1 text-[11px] leading-relaxed text-muted-foreground">
            {patch.tagline}
          </p>
        </div>
        <span className="shrink-0 text-sm text-muted-foreground">
          {formatINR(patch.price)}
        </span>
      </div>

      <button type="button" onClick={() => {
            addItem({
                productId: "patch-" + patch.id,
                name: patch.name + " Patch",
                image: patch.image,
                patchId: patch.id,
                patchName: patch.name,
                size: "20 × 20 cm",
                color: patch.category,
                colorHex: patch.tone,
                quantity: 1,
                unitPrice: patch.price,
            });
            toast.success(`${patch.name} patch added to bag`);
        }} className="mt-4 w-full border border-foreground py-2.5 text-[11px] tracking-[0.22em] transition-colors duration-300 hover:bg-foreground hover:text-background">
        ADD TO CART
      </button>
    </article>);
}
