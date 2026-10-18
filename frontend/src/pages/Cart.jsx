import { usePageTitle } from "@/lib/usePageTitle";
import { Link } from "react-router-dom";
import { Minus, Plus, Trash2 } from "lucide-react";
import { Page } from "@/components/Section";
import { TShirtPreview } from "@/components/TShirtPreview";
import { useCart } from "@/context/CartContext";
import { formatINR } from "@/data/constants";
export default function CartPage() {
    usePageTitle("Your Bag — LA VIDA STITCH");
    const { items, subtotal, shipping, total, removeItem, setQuantity } = useCart();
    if (!items.length) {
        return (<Page className="py-28 text-center">
        <h1 className="display text-4xl">Your bag is empty</h1>
        <p className="mt-4 text-sm text-muted-foreground">
          One tee. Multiple styles. Start with a base.
        </p>
        <Link to="/shop" className="mt-8 inline-block bg-foreground px-8 py-3 text-[11px] tracking-[0.22em] text-background">
          SHOP TEES
        </Link>
      </Page>);
    }
    return (<Page className="py-12 sm:py-16">
      <h1 className="display text-3xl sm:text-4xl">Your Bag</h1>

      <div className="mt-10 grid gap-12 lg:grid-cols-[1.6fr_1fr]">
        <ul className="divide-y divide-border border-y border-border">
          {items.map((item) => (<li key={item.key} className="flex gap-5 py-6">
              {item.productId === "custom-tee" ? (<div className="w-36 shrink-0">
                  <TShirtPreview colorHex={item.colorHex} patchIds={item.patchIds ?? (item.patchId ? [item.patchId] : [])} size={item.size} className="rounded-md"/>
                </div>) : item.image ? (<img src={item.image} alt="" loading="lazy" className="h-28 w-28 shrink-0 bg-secondary object-contain"/>) : (<span className="h-32 w-24 shrink-0" style={{ backgroundColor: item.colorHex }}/>)}

              <div className="min-w-0 flex-1">
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0">
                    <p className="text-sm">{item.name}</p>
                    <p className="mt-1 text-xs text-muted-foreground">
                      {item.color} · Size {item.size}
                      {item.patchName ? ` · ${item.patchName} patch` : ""}
                    </p>
                  </div>
                  <span className="shrink-0 text-sm">
                    {formatINR(item.unitPrice * item.quantity)}
                  </span>
                </div>

                <div className="mt-5 flex items-center gap-4">
                  <div className="flex items-center border border-border">
                    <button type="button" aria-label="Decrease quantity" onClick={() => setQuantity(item.key, item.quantity - 1)} className="px-3 py-2">
                      <Minus className="h-3.5 w-3.5" strokeWidth={1.3}/>
                    </button>
                    <span className="min-w-7 text-center text-sm">{item.quantity}</span>
                    <button type="button" aria-label="Increase quantity" onClick={() => setQuantity(item.key, item.quantity + 1)} className="px-3 py-2">
                      <Plus className="h-3.5 w-3.5" strokeWidth={1.3}/>
                    </button>
                  </div>
                  <button type="button" onClick={() => removeItem(item.key)} className="flex items-center gap-2 text-xs text-muted-foreground hover:text-foreground">
                    <Trash2 className="h-3.5 w-3.5" strokeWidth={1.3}/> Remove
                  </button>
                </div>
              </div>
            </li>))}
        </ul>

        <aside className="h-fit bg-secondary/60 p-8">
          <p className="eyebrow">Order Summary</p>
          <dl className="mt-6 space-y-3 text-sm">
            <div className="flex justify-between">
              <dt className="text-muted-foreground">Subtotal</dt>
              <dd>{formatINR(subtotal)}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-muted-foreground">Shipping</dt>
              <dd>{shipping ? formatINR(shipping) : "Free"}</dd>
            </div>
            <div className="flex justify-between border-t border-border pt-3 text-base">
              <dt>Total</dt>
              <dd>{formatINR(total)}</dd>
            </div>
          </dl>

          <Link to="/checkout" className="mt-8 block w-full bg-foreground py-4 text-center text-[11px] tracking-[0.22em] text-background transition-opacity hover:opacity-85">
            PROCEED TO CHECKOUT
          </Link>
          <Link to="/shop" className="mt-3 block w-full border border-foreground py-3 text-center text-[11px] tracking-[0.22em]">
            CONTINUE SHOPPING
          </Link>
        </aside>
      </div>
    </Page>);
}
