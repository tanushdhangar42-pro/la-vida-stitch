import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { fetchProducts, fetchPatches, fetchFabrics } from "@/services/api";

// Loads products, patches and fabrics from the backend once, then shares them with every page.
const CatalogContext = createContext(null);

export function CatalogProvider({ children }) {
  const [catalog, setCatalog] = useState({ products: [], patches: [], fabrics: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const load = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const [products, patches, fabrics] = await Promise.all([fetchProducts(), fetchPatches(), fetchFabrics()]);
      setCatalog({ products, patches, fabrics });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  if (loading) {
    return <div className="grid min-h-screen place-items-center text-sm text-muted-foreground">Loading La Vida Stitch…</div>;
  }

  if (error) {
    return (
      <div className="grid min-h-screen place-items-center px-4 text-center">
        <div>
          <h1 className="display text-3xl">We could not load the store</h1>
          <p className="mt-3 text-sm text-muted-foreground">{error}</p>
          <button onClick={load} className="mt-8 bg-foreground px-8 py-3 text-[11px] tracking-[0.22em] text-background">
            TRY AGAIN
          </button>
        </div>
      </div>
    );
  }

  const value = {
    ...catalog,
    getProduct: (id) => catalog.products.find((p) => p.id === id),
    getPatch: (id) => catalog.patches.find((p) => p.id === id),
  };

  return <CatalogContext.Provider value={value}>{children}</CatalogContext.Provider>;
}

export function useCatalog() {
  const ctx = useContext(CatalogContext);
  if (!ctx) throw new Error("useCatalog must be used inside CatalogProvider");
  return ctx;
}
