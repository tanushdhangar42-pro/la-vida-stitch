import { Link } from "react-router-dom";
import { Heart } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { useCart } from "@/context/CartContext";
import { cn } from "@/lib/utils";
export function ProductCard({ product }) {
    const { addItem } = useCart();
    const [fav, setFav] = useState(false);
    const quickAdd = () => {
        const color = product.colors[0];
        addItem({
            productId: product.id,
            name: product.name,
            image: product.image,
            patchId: null,
            patchName: null,
            size: "M",
            color: color?.name ?? "Black",
            colorHex: color?.hex ?? "#1a1a1a",
            quantity: 1,
            unitPrice: 699,
        });
        toast.success(`${product.name} added to bag`);
    };
    return (<article className="group">
      <div className="relative overflow-hidden bg-secondary">
        <Link to={`/product/${product.id}`}>
          <img src={product.image} alt={product.name} loading="lazy" className="aspect-square w-full bg-secondary object-contain transition-transform duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.05]"/>
        </Link>
        <button type="button" onClick={() => setFav((f) => !f)} aria-label="Add to wishlist" className="absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-full bg-card/85 backdrop-blur transition-colors hover:bg-card">
          <Heart className={cn("h-4 w-4", fav ? "fill-accent text-accent" : "text-foreground")} strokeWidth={1.4}/>
        </button>
        <button type="button" onClick={quickAdd} className="absolute inset-x-0 bottom-0 translate-y-full bg-foreground py-3 text-[11px] tracking-[0.22em] text-background transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-y-0">
          QUICK ADD
        </button>
      </div>

      <div className="mt-4 flex items-start justify-between gap-3">
        <div className="min-w-0">
          <Link to={`/product/${product.id}`} className="link-underline inline-block text-sm">
            {product.name}
          </Link>
          <div className="mt-2 flex items-center gap-1.5">
            {product.colors.map((c) => (<span key={c.name} title={c.name} className="h-3 w-3 rounded-full border border-border" style={{ backgroundColor: c.hex }}/>))}
          </div>
        </div>
        <span className="shrink-0 text-sm text-muted-foreground">
          From ₹699
        </span>
      </div>
    </article>);
}
