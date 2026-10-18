import { createContext, useContext, useMemo, useState, } from "react";
import { colorSwatches } from "@/data/constants";
import { useCatalog } from "@/context/CatalogContext";
const CustomizationContext = createContext(null);
export function CustomizationProvider({ children }) {
    const [color, setColor] = useState(colorSwatches[1]);
    const { fabrics } = useCatalog();
    const [fabric, setFabric] = useState(fabrics[0]);
    const [patchIds, setPatchIds] = useState(["goodvibes"]);
    const [size, setSize] = useState("M");
    const setPatchId = (id) => setPatchIds(id ? [id] : []);
    const togglePatch = (id) => {
        setPatchIds((current) => current.includes(id) ? current.filter((item) => item !== id) : [...current, id]);
    };
    const removePatch = (id) => setPatchIds((current) => current.filter((item) => item !== id));
    const clearPatches = () => setPatchIds([]);
    const value = useMemo(() => ({
        color,
        fabric,
        patchId: patchIds[0] ?? "",
        patchIds,
        size,
        price: fabric.price,
        setColor,
        setFabric,
        setPatchId,
        togglePatch,
        removePatch,
        clearPatches,
        setSize,
    }), [color, fabric, patchIds, size]);
    return <CustomizationContext.Provider value={value}>{children}</CustomizationContext.Provider>;
}
export function useCustomization() {
    const ctx = useContext(CustomizationContext);
    if (!ctx)
        throw new Error("useCustomization must be used within CustomizationProvider");
    return ctx;
}
