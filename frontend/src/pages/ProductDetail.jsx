import { usePageTitle } from "@/lib/usePageTitle";
import { Link, useParams } from "react-router-dom";
import { useState } from "react";
import { Minus, Plus, Star, Truck, RotateCcw, ShieldCheck, Scissors } from "lucide-react";
import { toast } from "sonner";
import { formatINR } from "@/data/constants";
import { useCatalog } from "@/context/CatalogContext";
import { ColorSelector, SizeSelector } from "@/components/Selectors";
import { Page } from "@/components/Section";
import { ProductCard } from "@/components/ProductCard";
import { useCart } from "@/context/CartContext";
import { cn } from "@/lib/utils";
import teeBackView from "@/assets/photo/tee-back-view.jpg";
import modelRealWhite from "@/assets/photo/model-real-white.jpg";
import modelRealBlack from "@/assets/photo/model-real-black.jpg";
import modelRealSand from "@/assets/photo/model-real-sand.jpg";
import modelRealOlive from "@/assets/photo/model-real-olive.jpg";
import modelRealSandPatched from "@/assets/photo/model-real-sand-patched.jpg";
import photoPatchFront from "@/assets/photo/detail-patch-front.jpg";
function ProductNotFound() {
    return (<Page className="py-28 text-center">
      <h1 className="display text-4xl">Piece not found</h1>
      <p className="mt-4 text-sm text-muted-foreground">
        This item may have sold out or moved.
      </p>
      <Link to="/shop" className="mt-8 inline-block bg-foreground px-8 py-3 text-[11px] tracking-[0.22em] text-background">
        BACK TO SHOP
      </Link>
    </Page>);
}
export default function ProductDetail() {
    const { productId } = useParams();
    const { getProduct } = useCatalog();
    const product = getProduct(productId);
    usePageTitle(product ? `${product.name} — LA VIDA STITCH` : "Product not found — LA VIDA STITCH");
    if (!product)
        return <ProductNotFound />;
    return <ProductView product={product} key={product.id}/>;
}
function ProductView({ product }) {
    const { addItem } = useCart();
    const { products, patches, fabrics, getPatch } = useCatalog();
    const [image, setImage] = useState(product.gallery[0] ?? product.image);
    const [color, setColor] = useState(product.colors[0]);
    const [fabric, setFabric] = useState(fabrics[0]);
    const [size, setSize] = useState("M");
    const [patchId, setPatchId] = useState(null);
    const [qty, setQty] = useState(1);
    const patch = getPatch(patchId);
    const unitPrice = fabric.price;
    const related = products.filter((p) => p.id !== product.id).slice(0, 4);
    const realFrontByColor = {
        "Off White": modelRealWhite,
        "Black": modelRealBlack,
        "Sand": modelRealSand,
        "Olive": modelRealOlive,
        "Clay": modelRealSandPatched,
    };
    const selectedFront = realFrontByColor[color.name] ?? product.modelImage ?? image;
    const galleryImages = [selectedFront, teeBackView, image, photoPatchFront, product.gallery[1], product.gallery[2]].filter(Boolean);
    const chooseColor = (nextColor) => {
        setColor(nextColor);
        setImage(realFrontByColor[nextColor.name] ?? product.gallery[0] ?? product.image);
    };
    return (<Page className="product-page py-6 sm:py-10 lg:py-12">
      <div className="product-detail-grid">
        <div className="product-gallery-column">
          <div className="real-product-pair product-hero-pair">
            <div className="real-product-shot product-hero-shot">
              <span>FRONT VIEW</span>
              <img src={selectedFront} alt={`${product.name} front view`}/>
            </div>
            <div className="real-product-shot product-hero-shot">
              <span>BACK VIEW</span>
              <img src={teeBackView} alt={`${product.name} back view`}/>
            </div>
          </div>
          <div className="product-thumbnail-row">
            {galleryImages.map((g, index) => (<button key={`${g}-${index}`} type="button" onClick={() => setImage(g)} className={cn("product-thumbnail", g === image && index > 1 ? "is-active" : "")}>
                <img src={g} alt="" loading="lazy"/>
              </button>))}
          </div>

          <div className="product-feature-row">
            <div><Truck /><span><strong>Free Shipping</strong><small>Orders above ₹999</small></span></div>
            <div><Scissors /><span><strong>Detachable Patches</strong><small>Switch your look</small></span></div>
            <div><RotateCcw /><span><strong>Easy Returns</strong><small>Hassle free</small></span></div>
            <div><ShieldCheck /><span><strong>Premium Fabric</strong><small>Soft & breathable</small></span></div>
          </div>
        </div>

        <div className="product-info-column">
          <p className="eyebrow text-accent">{product.category}</p>
          <h1 className="display product-title mt-3">{product.name}</h1>

          <div className="mt-4 flex items-center gap-3 text-sm text-muted-foreground">
            <span className="flex items-center gap-1"><Star className="h-4 w-4 fill-accent text-accent" strokeWidth={1.3}/>{product.rating}</span>
            <span>·</span><span>{product.reviews} reviews</span>
          </div>

          <p className="product-price mt-6">{formatINR(unitPrice)}</p>
          <p className="mt-4 max-w-xl text-sm leading-relaxed text-muted-foreground">{product.description}</p>

          <div className="mt-8 space-y-7">
            <div>
              <p className="eyebrow mb-3">Colour — {color.name}</p>
              <ColorSelector colors={product.colors} value={color} onChange={chooseColor}/>
            </div>

            <div>
              <p className="eyebrow mb-3">Fabric — {fabric.name} · {formatINR(fabric.price)}</p>
              <div className="product-fabric-grid">
                {fabrics.map((option) => (<button key={option.id} type="button" onClick={() => setFabric(option)} className={cn("product-fabric-option", fabric.id === option.id && "is-active")}>
                    <strong>{option.name}</strong><span>{option.gsm} · {formatINR(option.price)}</span>
                  </button>))}
              </div>
            </div>

            <div>
              <p className="eyebrow mb-3">Size</p>
              <SizeSelector sizes={product.sizes} value={size} onChange={setSize}/>
            </div>

            <div>
              <p className="eyebrow mb-3">Choose your detachable patch</p>
              <div className="product-patch-row">
                <button type="button" onClick={() => setPatchId(null)} className={cn("product-patch-none", patchId === null && "is-active")}>NONE</button>
                {patches.slice(0, 9).map((p) => (<button key={p.id} type="button" onClick={() => setPatchId(p.id)} title={p.name} className={cn("product-patch-button", patchId === p.id && "is-active")}>
                    <img src={p.image} alt={p.name}/>
                  </button>))}
              </div>
            </div>

            <div className="product-buy-row">
              <div className="flex items-center border border-border">
                <button type="button" onClick={() => setQty((q) => Math.max(1, q - 1))} aria-label="Decrease quantity" className="px-3 py-3"><Minus className="h-4 w-4" strokeWidth={1.3}/></button>
                <span className="min-w-8 text-center text-sm">{qty}</span>
                <button type="button" onClick={() => setQty((q) => q + 1)} aria-label="Increase quantity" className="px-3 py-3"><Plus className="h-4 w-4" strokeWidth={1.3}/></button>
              </div>
              <button type="button" onClick={() => { addItem({ productId: product.id, name: product.name, image: selectedFront, patchId: patch?.id ?? null, patchName: patch?.name ?? null, size, color: color.name, colorHex: color.hex, quantity: qty, unitPrice }); toast.success(`${product.name} added to bag`); }} className="flex-1 bg-foreground px-8 py-4 text-[11px] tracking-[0.22em] text-background transition-opacity hover:opacity-90">ADD TO BAG</button>
            </div>

            <Link to="/customize" className="product-customize-link">CUSTOMIZE THIS TEE <span>→</span></Link>
          </div>

          <dl className="mt-10 space-y-4 border-t border-border pt-8 text-sm">
            <div><dt className="eyebrow">Material</dt><dd className="mt-1 text-muted-foreground">{product.material}</dd></div>
            <div><dt className="eyebrow">Care</dt><dd className="mt-1 text-muted-foreground">{product.care}</dd></div>
            <div><dt className="eyebrow">Patch compatibility</dt><dd className="mt-1 text-muted-foreground">{product.patchCompatible}</dd></div>
          </dl>
        </div>
      </div>

      {related.length ? (<section className="mt-24">
          <h2 className="display text-2xl sm:text-3xl">You may also like</h2>
          <div className="mt-8 grid grid-cols-2 gap-x-5 gap-y-10 lg:grid-cols-4">
            {related.map((p) => (<ProductCard key={p.id} product={p}/>))}
          </div>
        </section>) : null}
    </Page>);
}
