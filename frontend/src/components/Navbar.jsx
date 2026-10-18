import { Link, useNavigate } from "react-router-dom";
import { Menu, Search, ShoppingBag, UserRound, X } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { useCatalog } from "@/context/CatalogContext";
import { formatINR } from "@/data/constants";
import { cn } from "@/lib/utils";
const NAV = [
    { label: "SHOP", to: "/shop" },
    { label: "PATCHES", to: "/patches" },
    { label: "COLLECTIONS", to: "/collections" },
    { label: "CUSTOMIZE", to: "/customize" },
    { label: "HOW IT WORKS", to: "/how-it-works" },
    { label: "ABOUT", to: "/about" },
    { label: "CONTACT", to: "/contact" },
];
export function AnnouncementBar() {
    return (<div className="bg-foreground py-2.5 text-center">
      <p className="eyebrow px-4 text-background">
        Free shipping on orders above ₹999
      </p>
    </div>);
}
function SearchOverlay({ onClose }) {
    const [q, setQ] = useState("");
    const navigate = useNavigate();
    const { products, patches } = useCatalog();
    const results = useMemo(() => {
        const term = q.trim().toLowerCase();
        if (!term)
            return { products: [], patches: [] };
        return {
            products: products
                .filter((p) => p.name.toLowerCase().includes(term) ||
                p.category.toLowerCase().includes(term))
                .slice(0, 5),
            patches: patches
                .filter((p) => p.name.toLowerCase().includes(term) ||
                p.category.toLowerCase().includes(term))
                .slice(0, 5),
        };
    }, [q, products, patches]);
    useEffect(() => {
        const onKey = (e) => e.key === "Escape" && onClose();
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, [onClose]);
    return (<div className="fixed inset-0 z-[60] bg-background/98 backdrop-blur-sm">
      <div className="mx-auto w-full max-w-3xl px-5 pt-24 sm:pt-32">
        <div className="flex items-center gap-4 border-b border-foreground pb-4">
          <Search className="h-5 w-5 shrink-0 text-muted-foreground" strokeWidth={1.3}/>
          <input autoFocus value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search tees and patches" className="min-w-0 flex-1 bg-transparent text-lg outline-none placeholder:text-muted-foreground"/>
          <button type="button" onClick={onClose} aria-label="Close search" className="shrink-0">
            <X className="h-5 w-5" strokeWidth={1.3}/>
          </button>
        </div>

        <div className="mt-8 max-h-[60vh] space-y-8 overflow-y-auto pb-10">
          {q && !results.products.length && !results.patches.length ? (<p className="text-sm text-muted-foreground">
              Nothing matched “{q}”. Try “oversized”, “nature” or “tee”.
            </p>) : null}

          {results.products.length ? (<div>
              <p className="eyebrow text-muted-foreground">Products</p>
              <ul className="mt-4 space-y-3">
                {results.products.map((p) => (<li key={p.id}>
                    <button type="button" onClick={() => {
                    onClose();
                    navigate(`/product/${p.id}`);
                }} className="flex w-full items-center gap-4 text-left">
                      <img src={p.image} alt="" loading="lazy" className="h-14 w-16 shrink-0 bg-secondary object-contain"/>
                      <span className="min-w-0 flex-1 truncate text-sm">{p.name}</span>
                      <span className="shrink-0 text-sm text-muted-foreground">
                        {formatINR(p.price)}
                      </span>
                    </button>
                  </li>))}
              </ul>
            </div>) : null}

          {results.patches.length ? (<div>
              <p className="eyebrow text-muted-foreground">Patches</p>
              <ul className="mt-4 space-y-3">
                {results.patches.map((p) => (<li key={p.id}>
                    <button type="button" onClick={() => {
                    onClose();
                    navigate("/patches");
                }} className="flex w-full items-center gap-4 text-left">
                      <img src={p.image} alt="" className="h-12 w-12 shrink-0 object-contain"/>
                      <span className="min-w-0 flex-1 truncate text-sm">{p.name}</span>
                      <span className="shrink-0 text-sm text-muted-foreground">
                        {formatINR(p.price)}
                      </span>
                    </button>
                  </li>))}
              </ul>
            </div>) : null}
        </div>
      </div>
    </div>);
}
export function Navbar() {
    const { count } = useCart();
    const { user } = useAuth();
    const [menu, setMenu] = useState(false);
    const [search, setSearch] = useState(false);
    return (<>
      <header className="sticky top-0 z-50 border-b border-border bg-background/92 backdrop-blur-md">
        <div className="relative mx-auto flex w-full max-w-[1400px] items-center justify-between gap-4 px-5 py-4 sm:px-8 lg:px-12">
          <div className="flex min-w-0 items-center gap-3">
            <button type="button" onClick={() => setMenu(true)} aria-label="Open menu" className="">
              <Menu className="h-5 w-5" strokeWidth={1.3}/>
            </button>
            <Link to="/" className="absolute left-1/2 top-1/2 min-w-0 -translate-x-1/2 -translate-y-1/2" aria-label="La Vida Stitch — home">
              <span className="wordmark block text-[26px] leading-none sm:text-[34px] lg:text-[40px]">
                LA VIDA
              </span>
              <span className="mt-1 block text-center text-[10px] uppercase leading-none tracking-[0.5em] text-muted-foreground sm:text-[11px]">
                Stitch
              </span>
            </Link>
          </div>

          <div className="flex items-center justify-self-end gap-4 sm:gap-5">
            <button type="button" onClick={() => setSearch(true)} aria-label="Search">
              <Search className="h-[18px] w-[18px]" strokeWidth={1.3}/>
            </button>
            <Link to="/login" aria-label="Account">
              <UserRound className="h-[18px] w-[18px]" strokeWidth={1.3}/>
            </Link>
            <Link to="/cart" aria-label="Cart" className="relative">
              <ShoppingBag className="h-[18px] w-[18px]" strokeWidth={1.3}/>
              <span className={cn("absolute -right-2 -top-2 grid h-4 min-w-4 place-items-center rounded-full bg-foreground px-1 text-[10px] leading-none text-background transition-transform", count ? "scale-100" : "scale-0")}>
                {count}
              </span>
            </Link>
          </div>
        </div>
      </header>

      {menu ? (<div className="fixed inset-0 z-[70] bg-background">
          <div className="flex items-center justify-between px-5 py-5">
            <span>
              <span className="wordmark block text-2xl leading-none">LA VIDA</span>
              <span className="mt-1 block text-center text-[9px] uppercase tracking-[0.5em] text-muted-foreground">
                Stitch
              </span>
            </span>
            <button type="button" onClick={() => setMenu(false)} aria-label="Close menu">
              <X className="h-5 w-5" strokeWidth={1.3}/>
            </button>
          </div>
          <nav className="flex flex-col px-5 pt-6">
            <Link to="/" onClick={() => setMenu(false)} className="display border-b border-border py-5 text-3xl">
              Home
            </Link>
            {NAV.map((n) => (<Link key={n.to} to={n.to} onClick={() => setMenu(false)} className="display border-b border-border py-5 text-3xl">
                {n.label.charAt(0) + n.label.slice(1).toLowerCase().replace(/ it works/, " it works")}
              </Link>))}
            <Link to="/cart" onClick={() => setMenu(false)} className="display border-b border-border py-5 text-3xl">
              Bag
            </Link>
            {user?.role === "ADMIN" ? (<Link to="/admin" onClick={() => setMenu(false)} className="display border-b border-border py-5 text-3xl">
                Admin
              </Link>) : null}
          </nav>
        </div>) : null}

      {search ? <SearchOverlay onClose={() => setSearch(false)}/> : null}
    </>);
}
