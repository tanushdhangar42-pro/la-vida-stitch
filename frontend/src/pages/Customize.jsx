import { usePageTitle } from "@/lib/usePageTitle";
import { useNavigate } from "react-router-dom";
import { Minus, Plus, Star, Scissors, RotateCcw, ShieldCheck, Truck } from "lucide-react";
import { toast } from "sonner";
import { useState } from "react";
import { colorSwatches, formatINR } from "@/data/constants";
import { useCatalog } from "@/context/CatalogContext";
import { useCustomization } from "@/context/CustomizationContext";
import { useCart } from "@/context/CartContext";
import { SizeSelector } from "@/components/Selectors";
import { Page } from "@/components/Section";
import { TShirtPreview } from "@/components/TShirtPreview";
import { postCustomization } from "@/services/api";
import { cn } from "@/lib/utils";
import realTeeBlack from "@/assets/photo/real-tees/black.jpg";
import realTeeWhite from "@/assets/photo/real-tees/white.jpg";
import realTeeSand from "@/assets/photo/real-tees/sand.jpg";
import realTeeOlive from "@/assets/photo/real-tees/olive.jpg";
import realTeeClay from "@/assets/photo/real-tees/clay.jpg";
import realTeeLilac from "@/assets/photo/real-tees/lilac.jpg";
import realTeePink from "@/assets/photo/real-tees/pink.jpg";
import realTeeBlue from "@/assets/photo/real-tees/blue.jpg";
const SIZES = ["S", "M", "L", "XL", "XXL"];
const FRONT_TEE_BY_COLOR = {
    Black: realTeeBlack,
    "Off White": realTeeWhite,
    Sand: realTeeSand,
    Olive: realTeeOlive,
    Clay: realTeeClay,
    Lilac: realTeeLilac,
    Pink: realTeePink,
    "Sky Blue": realTeeBlue,
};
export default function Customize() {
    usePageTitle("Customize Your Tee — LA VIDA STITCH");
    const { patches, fabrics, getPatch } = useCatalog();
    const { color, fabric, patchIds, size, price, setColor, setFabric, togglePatch, setSize } = useCustomization();
    const { addItem } = useCart();
    const navigate = useNavigate();
    const [qty, setQty] = useState(1);
    const [patchPositions, setPatchPositions] = useState({});
    const frontImage = FRONT_TEE_BY_COLOR[color.name] ?? realTeeBlack;
    const placePatch = (id, x, y) => {
        if (!patchIds.includes(id))
            togglePatch(id);
        setPatchPositions((current) => ({ ...current, [id]: { x, y } }));
    };
    const addToBag = async (goCart = false) => {
        const patchNames = patchIds.map((id) => getPatch(id)?.name).filter(Boolean).join(", ");
        try {
            // Save the design in the database. The bag still works if this fails.
            await postCustomization({ baseColor: color.name, fabric: fabric.name, patchIds, size, price });
        }
        catch {
            /* saving the design is optional */
        }
        addItem({
            productId: "custom-tee",
            name: `Custom La Vida Stitch Tee · ${fabric.name}`,
            image: frontImage,
            patchId: patchIds[0] ?? null,
            patchIds,
            patchName: patchNames || null,
            size,
            color: color.name,
            colorHex: color.hex,
            quantity: qty,
            unitPrice: price,
        });
        toast.success("Your custom tee is in the bag");
        if (goCart)
            navigate("/cart");
    };
    return (<Page className="reference-customizer-page">
      <div className="reference-product-layout">
        <section className="reference-gallery">
          <div className="reference-main-gallery customizer-real-gallery customizer-front-only">
            <div className="reference-photo customizer-real-photo is-active">
              <span>FRONT VIEW · CUSTOMIZE</span>
              <TShirtPreview colorHex={color.hex} patchIds={patchIds} patchPositions={patchPositions} size={size} onDropPatch={placePatch} className="h-full rounded-none border-0"/>
            </div>
          </div>

          <div className="reference-thumbnails">
            <button type="button" className="is-active">
              <img src={frontImage} alt="La Vida Stitch customizable front tee"/>
            </button>
            {patches.slice(0, 4).map((patch) => (<button key={patch.id} type="button" onClick={() => togglePatch(patch.id)} className={cn(patchIds.includes(patch.id) && "is-active")}>
                <img src={patch.image} alt={patch.name}/>
              </button>))}
          </div>

          <div className="reference-feature-row">
            <div><ShieldCheck /><span><strong>Premium Fabric</strong><small>Soft & breathable</small></span></div>
            <div><Scissors /><span><strong>Detachable Patches</strong><small>Switch your look</small></span></div>
            <div><RotateCcw /><span><strong>Easy Returns</strong><small>Hassle free</small></span></div>
            <div><Truck /><span><strong>Free Shipping</strong><small>On orders above ₹999</small></span></div>
          </div>
        </section>

        <section className="reference-info">
          <p className="eyebrow text-accent">CUSTOMIZE YOUR TEE</p>
          <h1 className="display reference-title">La Vida Stitch Custom Tee</h1>
          <div className="reference-rating"><Star className="h-4 w-4 fill-accent text-accent" strokeWidth={1.2}/><span>4.7</span><span>|</span><span>98 reviews</span></div>
          <p className="reference-price">{formatINR(price)}</p>
          <p className="reference-description">Start with the real La Vida Stitch T-shirt shown on the left. Choose your colour, then add or drag detachable patches onto the shirt.</p>

          <div className="reference-control-group">
            <p className="eyebrow mb-3">Colour — {color.name}</p>
            <div className="reference-color-row reference-color-row-all">
              {colorSwatches.map((item) => (<button key={item.name} type="button" title={item.name} onClick={() => setColor(item)} className={cn("reference-color", color.name === item.name && "is-active")} style={{ backgroundColor: item.hex }}/>))}
            </div>
          </div>

          <div className="reference-control-group">
            <p className="eyebrow mb-3">Fabric — {fabric.name} · {formatINR(fabric.price)}</p>
            <div className="reference-fabric-grid">
              {fabrics.map((option) => (<button key={option.id} type="button" onClick={() => setFabric(option)} className={cn("reference-fabric", fabric.id === option.id && "is-active")}>
                  <strong>{option.name}</strong><span>{option.gsm} · {formatINR(option.price)}</span>
                </button>))}
            </div>
          </div>

          <div className="reference-control-group">
            <p className="eyebrow mb-3">Size</p>
            <SizeSelector sizes={SIZES} value={size} onChange={setSize}/>
          </div>

          <div className="reference-control-group">
            <p className="eyebrow mb-3">Choose your detachable patch</p>
            <div className="reference-patch-row">
              <button type="button" onClick={() => patchIds.forEach((id) => togglePatch(id))} className={cn("reference-none", patchIds.length === 0 && "is-active")}>NONE</button>
              {patches.slice(0, 9).map((patch) => (<button key={patch.id} type="button" onClick={() => togglePatch(patch.id)} title={patch.name} className={cn("reference-patch", patchIds.includes(patch.id) && "is-active")}>
                  <img src={patch.image} alt={patch.name}/>
                </button>))}
            </div>
            <p className="reference-note reference-drag-note">Tip: select a patch, then drag it directly on the real T-shirt preview to place it.</p>
          </div>

          <div className="reference-buy-row">
            <div className="reference-quantity"><button type="button" onClick={() => setQty((q) => Math.max(1, q - 1))}><Minus /></button><span>{qty}</span><button type="button" onClick={() => setQty((q) => q + 1)}><Plus /></button></div>
            <button type="button" onClick={() => addToBag(false)} className="reference-add"><span>♧</span> ADD TO BAG</button>
          </div>

          <button type="button" onClick={() => addToBag(true)} className="reference-customize-button">BUY NOW <span>→</span></button>
        </section>
      </div>
    </Page>);
}
