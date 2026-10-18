import { createContext, useContext, useMemo, useState, } from "react";
const CartContext = createContext(null);
const makeKey = (i) => [i.productId, (i.patchIds ?? (i.patchId ? [i.patchId] : [])).join(","), i.size, i.color].join("|");
export function CartProvider({ children }) {
    const [items, setItems] = useState([]);
    const value = useMemo(() => {
        const subtotal = items.reduce((s, i) => s + i.unitPrice * i.quantity, 0);
        const shipping = subtotal === 0 || subtotal >= 999 ? 0 : 79;
        return {
            items,
            count: items.reduce((s, i) => s + i.quantity, 0),
            subtotal,
            shipping,
            total: subtotal + shipping,
            addItem: (item) => setItems((prev) => {
                const key = makeKey(item);
                const existing = prev.find((p) => p.key === key);
                if (existing) {
                    return prev.map((p) => p.key === key ? { ...p, quantity: p.quantity + item.quantity } : p);
                }
                return [...prev, { ...item, key }];
            }),
            removeItem: (key) => setItems((prev) => prev.filter((p) => p.key !== key)),
            setQuantity: (key, quantity) => setItems((prev) => prev.map((p) => p.key === key ? { ...p, quantity: Math.max(1, quantity) } : p)),
            clear: () => setItems([]),
        };
    }, [items]);
    return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}
export function useCart() {
    const ctx = useContext(CartContext);
    if (!ctx)
        throw new Error("useCart must be used within CartProvider");
    return ctx;
}
