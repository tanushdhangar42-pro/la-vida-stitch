import { usePageTitle } from "@/lib/usePageTitle";
import { Link } from "react-router-dom";
import { ArrowRight, Heart, RotateCcw, ShieldCheck, Truck } from "lucide-react";
import modelBlack from "@/assets/photo/lookbook/lookbook-black-male.jpg";
import modelWhite from "@/assets/photo/lookbook/lookbook-cream-male.jpg";
import modelSand from "@/assets/photo/lookbook/lookbook-olive-male.jpg";
import modelOlive from "@/assets/photo/lookbook/lookbook-white-male.jpg";
import femaleBlack from "@/assets/photo/lookbook/lookbook-black-female.jpg";
import femaleSand from "@/assets/photo/lookbook/lookbook-white-female.jpg";
import femaleOlive from "@/assets/photo/lookbook/lookbook-pink-female.jpg";
import femaleLilac from "@/assets/photo/lookbook/lookbook-lilac-female.jpg";
import femaleBlue from "@/assets/photo/lookbook/lookbook-blue-female.jpg";
import maleBack from "@/assets/photo/lookbook/lookbook-back-male.jpg";
import heroCinematic from "@/assets/photo/hero-cinematic-right.jpg";
import { categories } from "@/data/constants";
import { useCatalog } from "@/context/CatalogContext";
import { PatchSwatch } from "@/components/PatchSwatch";
import { ProductCard } from "@/components/ProductCard";
import { Page, SectionHeading } from "@/components/Section";
const modelCards = [
    { productId: "signature-white-tee", src: modelWhite, alt: "Model wearing the cream La Vida Stitch patch tee", label: "Signature Cream Tee", save: "SAVE 20%", price: "₹1,999.00", old: "₹2,499.00" },
    { productId: "essential-black-tee", src: modelBlack, alt: "Model wearing the black La Vida Stitch patch tee", label: "Essential Black Tee", save: "SAVE 25%", price: "₹1,899.00", old: "₹2,499.00" },
    { productId: "sand-oversized-tee", src: modelSand, alt: "Model wearing the olive La Vida Stitch patch tee", label: "Olive Oversized Tee", save: "SAVE 30%", price: "₹1,749.00", old: "₹2,499.00" },
    { productId: "olive-regular-tee", src: femaleLilac, alt: "Female model wearing the lilac La Vida Stitch patch tee", label: "Lilac Women's Tee", save: "SAVE 25%", price: "₹1,899.00", old: "₹2,499.00" },
];
export default function Home() {
    usePageTitle("LA VIDA STITCH — More Than Just a Tee");
    const { products, patches } = useCatalog();
    return (<>
      <div className="lv-home">
        <section className="lv-hero">
          <div className="lv-hero-copy">
            <p className="lv-kicker">LA VIDA STITCH</p>
            <h1>MORE THAN<br />JUST A TEE</h1>
            <p className="lv-hero-sub">Premium quality. Unique patches.<br />Made for your story.</p>
            <Link to="/shop" className="lv-primary-btn">SHOP NOW <ArrowRight size={18}/></Link>
          </div>
          <img src={heroCinematic} alt="La Vida Stitch patched tee on model in an urban streetwear setting" className="lv-hero-image"/>
        </section>

        <section className="lv-section lv-best">
          <div className="lv-section-head">
            <h2>BEST SELLERS</h2>
            <Link to="/shop">VIEW ALL <ArrowRight size={17}/></Link>
          </div>
          <div className="lv-product-grid">
            {modelCards.map((item) => (<Link key={item.productId} to={`/product/${item.productId}`} className="lv-model-card">
                <div className="lv-card-photo">
                  <img src={item.src} alt={item.alt}/>
                  <span className="lv-sale">{item.save}</span>
                  <Heart className="lv-heart" size={23} strokeWidth={1.7}/>
                </div>
                <h3>{item.label}</h3>
                <div className="lv-price"><span>{item.old}</span> <strong>{item.price}</strong></div>
              </Link>))}
          </div>
        </section>

        <section className="lv-real-models">
          <div className="lv-real-copy">
            <h2>SEE IT ON A<br />REAL MODEL</h2>
            <p>Same fit. Same vibe.<br />Real people. Real style.</p>
            <Link to="/shop" className="lv-dark-btn">VIEW GALLERY <ArrowRight size={18}/></Link>
          </div>
          <div className="lv-gallery">
            <img src={modelWhite} alt="Male model wearing the cream La Vida Stitch patch tee"/>
            <img src={femaleBlack} alt="Female model wearing the black La Vida Stitch patch tee"/>
            <img src={modelSand} alt="Male model wearing the olive La Vida Stitch patch tee"/>
            <img src={femaleLilac} alt="Female model wearing the lilac La Vida Stitch patch tee"/>
            <img src={maleBack} alt="Male model wearing the La Vida Stitch tee from the back"/>
            <img src={femaleBlue} alt="Female model wearing the blue La Vida Stitch patch tee"/>
          </div>
        </section>

        <section className="lv-female-models">
          <div className="lv-female-head">
            <div>
              <p className="lv-kicker lv-kicker-dark">LA VIDA STITCH WOMEN</p>
              <h2>THE SAME PATCHES.<br />A DIFFERENT ATTITUDE.</h2>
            </div>
            <p>Clean fits, different colours, and interchangeable patches made for every style.</p>
          </div>
          <div className="lv-female-grid">
            <div className="lv-female-card"><div className="lv-photo-wrap"><img src={femaleBlack} alt="Female model wearing black La Vida Stitch patch tee with patches"/></div><b>BLACK / PATCHED</b></div>
            <div className="lv-female-card"><div className="lv-photo-wrap"><img src={femaleSand} alt="Female model wearing white La Vida Stitch patch tee with patches"/></div><b>WHITE / PATCHED</b></div>
            <div className="lv-female-card"><div className="lv-photo-wrap"><img src={femaleOlive} alt="Female model wearing pink La Vida Stitch patch tee with patches"/></div><b>PINK / PATCHED</b></div>
            <div className="lv-female-card"><div className="lv-photo-wrap"><img src={femaleLilac} alt="Female model wearing lilac La Vida Stitch patch tee with patches"/></div><b>LILAC / PATCHED</b></div>
            <div className="lv-female-card"><div className="lv-photo-wrap"><img src={femaleBlue} alt="Female model wearing blue La Vida Stitch patch tee with patches"/></div><b>BLUE / PATCHED</b></div>
          </div>
        </section>

        <section className="lv-customize-strip">
          <div className="lv-customize-copy">
            <p className="lv-kicker lv-kicker-dark">MAKE IT YOURS</p>
            <h2>CUSTOMIZE YOUR TEE</h2>
            <p>Add stitched patches. Change the colour. Make it yours.</p>
            <Link to="/customize" className="lv-dark-btn">START CUSTOMIZING <ArrowRight size={18}/></Link>
          </div>
          <div className="lv-patch-strip">
            {patches.slice(0, 8).map((p) => <Link key={p.id} to="/patches" className="lv-patch-tile"><img src={p.image} alt={p.name}/><span>{p.name}</span></Link>)}
          </div>
        </section>

        <section className="lv-benefits">
          <div><Truck /><div><b>FREE SHIPPING</b><small>On orders above ₹999</small></div></div>
          <div><ShieldCheck /><div><b>SECURE PAYMENTS</b><small>100% secure checkout</small></div></div>
          <div><RotateCcw /><div><b>EASY RETURNS</b><small>Hassle free returns</small></div></div>
          <div><Heart /><div><b>PREMIUM QUALITY</b><small>Crafted for comfort</small></div></div>
        </section>
      </div>

      <Page className="py-16 lg:py-24">
        <SectionHeading eyebrow="Browse" title="Where to start"/>
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((c) => (<Link key={c.id} to={c.to} className="group block">
              <div className="overflow-hidden bg-secondary">
                <img src={c.image} alt={c.title} className="aspect-[4/5] w-full object-cover transition-transform duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105"/>
              </div>
              <h3 className="mt-4 text-base tracking-[0.1em]">{c.title}</h3>
              <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{c.blurb}</p>
            </Link>))}
        </div>
      </Page>

      <section className="border-y border-border bg-[#15171b] text-[#e9e5dc]">
        <Page className="grid items-center gap-10 py-16 lg:grid-cols-[1.1fr_1fr] lg:gap-20 lg:py-24">
          <div>
            <p className="eyebrow text-[#c9a978]">The idea</p>
            <h2 className="display mt-3 text-3xl sm:text-4xl md:text-5xl">Press it on. Peel it off.</h2>
            <p className="mt-5 max-w-md text-sm leading-relaxed text-[#a7a396]">A soft loop panel in the shirt, hook tape across the back of every patch. No glue, no iron, no stitching. The full breakdown — the materials, the washing, the questions people ask — lives on its own page.</p>
            <Link to="/how-it-works" className="mt-8 inline-flex items-center gap-3 border border-[#e9e5dc]/40 px-8 py-4 text-[11px] tracking-[0.22em] transition-colors hover:bg-[#e9e5dc] hover:text-[#15171b]">HOW IT WORKS <ArrowRight className="h-3.5 w-3.5"/></Link>
          </div>
          <img src={modelSand} alt="Model wearing the sand La Vida Stitch tee" loading="lazy" className="w-full"/>
        </Page>
      </section>

      <Page className="py-16 lg:py-24">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <SectionHeading align="left" eyebrow="Best sellers" title="Tees people keep restyling" className="max-w-lg"/>
          <Link to="/shop" className="eyebrow link-underline inline-flex items-center gap-2 pb-2">Shop all <ArrowRight className="h-3.5 w-3.5"/></Link>
        </div>
        <div className="mt-12 grid grid-cols-2 gap-x-5 gap-y-12 lg:grid-cols-4">
          {products.slice(0, 4).map((p) => <ProductCard key={p.id} product={p}/>)}
        </div>
      </Page>

      <section className="border-y border-border bg-secondary/50">
        <Page className="py-16 lg:py-24">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <SectionHeading align="left" eyebrow="The library" title="Twelve patches, one fitting" subtitle="Every panel is the same size with the same hook backing, so any patch goes on any tee." className="max-w-lg"/>
            <Link to="/patches" className="eyebrow link-underline inline-flex items-center gap-2 pb-2">All patches <ArrowRight className="h-3.5 w-3.5"/></Link>
          </div>
          <ul className="mt-12 grid grid-cols-3 gap-4 sm:grid-cols-4 lg:grid-cols-6">
            {patches.slice(0, 6).map((p) => (<li key={p.id}><Link to="/patches" className="block"><PatchSwatch patch={p}/><p className="mt-3 text-center text-xs text-muted-foreground">{p.name}</p></Link></li>))}
          </ul>
        </Page>
      </section>

      <Page className="grid items-center gap-10 py-16 lg:grid-cols-[1fr_1.1fr] lg:gap-20 lg:py-24">
        <img src={modelOlive} alt="Model wearing the white La Vida Stitch tee" loading="lazy" className="w-full bg-secondary"/>
        <div>
          <p className="eyebrow text-accent">Build it yourself</p>
          <h2 className="display mt-3 text-3xl sm:text-4xl md:text-5xl">Your tee. Your patch.</h2>
          <p className="mt-5 max-w-md text-sm leading-relaxed text-muted-foreground">Pick a colour, pick a panel, watch the tee update as you go — then add the finished combination to your bag.</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link to="/customize" className="inline-flex items-center justify-center bg-foreground px-9 py-4 text-[11px] tracking-[0.22em] text-background transition-opacity duration-300 hover:opacity-85">START CUSTOMIZING</Link>
            <Link to="/patches" className="inline-flex items-center justify-center border border-foreground px-9 py-4 text-[11px] tracking-[0.22em] transition-colors duration-300 hover:bg-foreground hover:text-background">BROWSE PATCHES</Link>
          </div>
        </div>
      </Page>
    </>);
}
