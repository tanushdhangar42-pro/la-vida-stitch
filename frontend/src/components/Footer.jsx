import { Link } from "react-router-dom";
import { Instagram, Twitter, Youtube } from "lucide-react";
export function Footer() {
    return (<footer className="mt-24 border-t border-border bg-secondary/60">
      <div className="mx-auto w-full max-w-[1400px] px-5 py-16 sm:px-8 lg:px-12">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <p className="wordmark text-4xl leading-none sm:text-5xl">LA VIDA</p>
            <p className="mt-2 text-[11px] uppercase tracking-[0.62em] text-muted-foreground sm:text-xs">
              Stitch
            </p>
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-muted-foreground">
              Velcro patch tees. One shirt, every version of you.
            </p>
            <div className="mt-6 flex gap-4">
              <a href="#" aria-label="Instagram" className="text-muted-foreground hover:text-foreground">
                <Instagram className="h-[18px] w-[18px]" strokeWidth={1.3}/>
              </a>
              <a href="#" aria-label="Twitter" className="text-muted-foreground hover:text-foreground">
                <Twitter className="h-[18px] w-[18px]" strokeWidth={1.3}/>
              </a>
              <a href="#" aria-label="YouTube" className="text-muted-foreground hover:text-foreground">
                <Youtube className="h-[18px] w-[18px]" strokeWidth={1.3}/>
              </a>
            </div>
          </div>

          <div>
            <p className="eyebrow">Shop</p>
            <ul className="mt-5 space-y-3 text-sm text-muted-foreground">
              <li><Link to="/shop" className="link-underline">T-Shirts</Link></li>
              <li><Link to="/shop" className="link-underline">Oversized</Link></li>
              <li><Link to="/shop" className="link-underline">Starter Kits</Link></li>
              <li><Link to="/patches" className="link-underline">Patches</Link></li>
            </ul>
          </div>

          <div>
            <p className="eyebrow">Help</p>
            <ul className="mt-5 space-y-3 text-sm text-muted-foreground">
              <li><Link to="/contact" className="link-underline">Contact</Link></li>
              <li><Link to="/how-it-works" className="link-underline">How It Works</Link></li>
              <li><Link to="/contact" className="link-underline">Shipping</Link></li>
              <li><Link to="/contact" className="link-underline">Returns</Link></li>
              <li><Link to="/contact" className="link-underline">FAQs</Link></li>
            </ul>
          </div>

          <div>
            <p className="eyebrow">Company</p>
            <ul className="mt-5 space-y-3 text-sm text-muted-foreground">
              <li><Link to="/about" className="link-underline">About Us</Link></li>
              <li><Link to="/about" className="link-underline">Our Story</Link></li>
              <li><Link to="/about" className="link-underline">Sustainability</Link></li>
              <li><Link to="/login" className="link-underline">Account</Link></li>
            </ul>
          </div>
        </div>

        <p className="mt-16 border-t border-border pt-6 text-xs text-muted-foreground">
          © 2026 LA VIDA STITCH. All rights reserved.
        </p>
      </div>
    </footer>);
}
