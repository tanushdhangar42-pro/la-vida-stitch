import { usePageTitle } from "@/lib/usePageTitle";
import { Link, useNavigate } from "react-router-dom";
import { useMemo, useState } from "react";
import { Check, CreditCard, Landmark, Smartphone, Truck } from "lucide-react";
import { toast } from "sonner";
import { formatINR } from "@/data/constants";
import { postOrder } from "@/services/api";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { Page } from "@/components/Section";
import { cn } from "@/lib/utils";
const METHODS = [
    { id: "upi", label: "UPI", hint: "Pay with any UPI app", icon: Smartphone },
    { id: "card", label: "Card", hint: "Visa, Mastercard, RuPay", icon: CreditCard },
    { id: "netbanking", label: "Net banking", hint: "All major banks", icon: Landmark },
    { id: "cod", label: "Cash on delivery", hint: "Pay the courier, ₹40 fee", icon: Truck },
];
const STEPS = [
    { id: "address", label: "Delivery" },
    { id: "payment", label: "Payment" },
    { id: "done", label: "Confirmed" },
];
const field = "w-full border border-border bg-card px-4 py-3 text-sm outline-none transition-colors focus:border-foreground";
export default function Checkout() {
    usePageTitle("Checkout — LA VIDA STITCH");
    const { items, subtotal, shipping, total, clear } = useCart();
    const { user } = useAuth();
    const navigate = useNavigate();
    const [step, setStep] = useState("address");
    const [method, setMethod] = useState("upi");
    const [processing, setProcessing] = useState(false);
    const [placed, setPlaced] = useState(null);
    const [address, setAddress] = useState({
        name: user?.name ?? "",
        email: user?.email ?? "",
        phone: "",
        line1: "",
        city: "",
        state: "",
        pincode: "",
    });
    const [card, setCard] = useState({ number: "", expiry: "", cvv: "", name: "" });
    const [upi, setUpi] = useState("");
    const codFee = method === "cod" ? 40 : 0;
    const payable = useMemo(() => total + codFee, [total, codFee]);
    if (!items.length && step !== "done") {
        return (<Page className="py-24 text-center">
        <h1 className="display text-4xl">Your bag is empty</h1>
        <p className="mt-4 text-sm text-muted-foreground">
          Add a tee or a patch and the checkout will open up.
        </p>
        <Link to="/shop" className="mt-8 inline-block bg-foreground px-9 py-4 text-[11px] tracking-[0.22em] text-background">
          SHOP THE TEES
        </Link>
      </Page>);
    }
    if (!user && step !== "done") {
        return (<Page className="py-24 text-center">
        <h1 className="display text-4xl">Sign in to place your order</h1>
        <p className="mt-4 text-sm text-muted-foreground">
          Your bag is saved. Sign in or create an account to continue to checkout.
        </p>
        <Link to="/login" className="mt-8 inline-block bg-foreground px-9 py-4 text-[11px] tracking-[0.22em] text-background">
          SIGN IN
        </Link>
      </Page>);
    }
    function submitAddress(e) {
        e.preventDefault();
        if (!/^\d{6}$/.test(address.pincode)) {
            toast.error("Enter a 6-digit PIN code.");
            return;
        }
        if (!/^\d{10}$/.test(address.phone.replace(/\s/g, ""))) {
            toast.error("Enter a 10-digit phone number.");
            return;
        }
        setStep("payment");
        window.scrollTo({ top: 0, behavior: "smooth" });
    }
    async function pay(e) {
        e.preventDefault();
        if (method === "card") {
            const digits = card.number.replace(/\s/g, "");
            if (digits.length < 12) {
                toast.error("Enter a card number (any digits work in this demo).");
                return;
            }
            if (card.cvv.length < 3) {
                toast.error("Enter the 3-digit CVV.");
                return;
            }
        }
        if (method === "upi" && !upi.includes("@")) {
            toast.error("Enter a UPI ID, like yourname@bank.");
            return;
        }
        setProcessing(true);
        try {
            // The order is saved in MySQL by the Spring Boot API. Payment itself is only simulated.
            const order = await postOrder({
                ...address,
                phone: address.phone.replace(/\s/g, ""),
                paymentMethod: method,
                items: items.map((i) => ({
                    productId: i.productId,
                    name: i.name,
                    patchIds: i.patchIds ?? (i.patchId ? [i.patchId] : []),
                    patchName: i.patchName,
                    size: i.size,
                    color: i.color,
                    quantity: i.quantity,
                    unitPrice: i.unitPrice,
                })),
            });
            setPlaced({ id: order.orderCode, total: order.total });
            setStep("done");
            clear();
            toast.success("Order placed successfully");
            window.scrollTo({ top: 0, behavior: "smooth" });
        }
        catch (err) {
            toast.error(err instanceof Error ? err.message : "Could not place the order.");
        }
        finally {
            setProcessing(false);
        }
    }
    const activeIndex = STEPS.findIndex((s) => s.id === step);
    return (<Page className="py-14 lg:py-20">
      <div className="max-w-2xl">
        <p className="eyebrow text-accent">Checkout</p>
        <h1 className="display mt-4 text-4xl sm:text-5xl">
          {step === "done" ? "Order confirmed" : "Almost yours"}
        </h1>
      </div>

      {/* progress */}
      <ol className="mt-10 flex flex-wrap items-center gap-x-4 gap-y-3 border-y border-border py-4">
        {STEPS.map((s, i) => (<li key={s.id} className="flex items-center gap-3">
            <span className={cn("grid h-6 w-6 place-items-center rounded-full border text-[11px]", i <= activeIndex
                ? "border-foreground bg-foreground text-background"
                : "border-border text-muted-foreground")}>
              {i < activeIndex ? <Check className="h-3 w-3"/> : i + 1}
            </span>
            <span className={cn("eyebrow", i <= activeIndex ? "text-foreground" : "text-muted-foreground")}>
              {s.label}
            </span>
            {i < STEPS.length - 1 ? (<span className="hidden h-px w-10 bg-border sm:block"/>) : null}
          </li>))}
      </ol>

      {step === "done" && placed ? (<div className="mx-auto mt-16 max-w-xl border border-border bg-card p-10 text-center">
          <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-secondary">
            <Check className="h-6 w-6" strokeWidth={1.4}/>
          </div>
          <h2 className="display mt-6 text-3xl">Thank you, {address.name.split(" ")[0] || "friend"}.</h2>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
            Order <span className="text-foreground">{placed.id}</span> is
            confirmed for {formatINR(placed.total)}. A confirmation has gone to{" "}
            {address.email || "your email"}. Delivery to {address.city || "your address"} takes 4–6 working days.
          </p>
          <p className="mt-6 border-t border-border pt-6 text-xs text-muted-foreground">
            This is a demonstration checkout. No payment was taken and no card
            details were stored or sent anywhere.
          </p>
          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            <Link to="/shop" className="bg-foreground py-4 text-[11px] tracking-[0.22em] text-background">
              KEEP SHOPPING
            </Link>
            <Link to="/" className="border border-foreground py-4 text-[11px] tracking-[0.22em]">
              BACK TO HOME
            </Link>
          </div>
        </div>) : (<div className="mt-12 grid gap-12 lg:grid-cols-[1.35fr_1fr] lg:gap-16">
          <div>
            {step === "address" ? (<form onSubmit={submitAddress}>
                <h2 className="eyebrow">Delivery address</h2>
                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  <input required className={field} placeholder="Full name" value={address.name} onChange={(e) => setAddress({ ...address, name: e.target.value })}/>
                  <input required type="email" className={field} placeholder="Email" value={address.email} onChange={(e) => setAddress({ ...address, email: e.target.value })}/>
                  <input required inputMode="numeric" className={field} placeholder="Phone (10 digits)" value={address.phone} onChange={(e) => setAddress({ ...address, phone: e.target.value })}/>
                  <input required inputMode="numeric" className={field} placeholder="PIN code" value={address.pincode} onChange={(e) => setAddress({ ...address, pincode: e.target.value })}/>
                  <input required className={cn(field, "sm:col-span-2")} placeholder="Flat / street / area" value={address.line1} onChange={(e) => setAddress({ ...address, line1: e.target.value })}/>
                  <input required className={field} placeholder="City" value={address.city} onChange={(e) => setAddress({ ...address, city: e.target.value })}/>
                  <input required className={field} placeholder="State" value={address.state} onChange={(e) => setAddress({ ...address, state: e.target.value })}/>
                </div>

                {!user ? (<p className="mt-6 text-xs text-muted-foreground">
                    Checking out as a guest.{" "}
                    <Link to="/login" className="link-underline text-foreground">
                      Sign in
                    </Link>{" "}
                    to save this address for next time.
                  </p>) : null}

                <button type="submit" className="mt-8 w-full bg-foreground py-4 text-[11px] tracking-[0.22em] text-background transition-opacity hover:opacity-85 sm:w-auto sm:px-12">
                  CONTINUE TO PAYMENT
                </button>
              </form>) : (<form onSubmit={pay}>
                <div className="flex items-baseline justify-between gap-4">
                  <h2 className="eyebrow">Payment method</h2>
                  <button type="button" onClick={() => setStep("address")} className="text-xs text-muted-foreground underline underline-offset-4 hover:text-foreground">
                    Edit address
                  </button>
                </div>

                <div className="mt-6 grid gap-3 sm:grid-cols-2">
                  {METHODS.map((m) => (<button key={m.id} type="button" onClick={() => setMethod(m.id)} aria-pressed={method === m.id} className={cn("flex items-center gap-4 border p-4 text-left transition-colors", method === m.id
                        ? "border-foreground bg-card"
                        : "border-border hover:border-foreground/40")}>
                      <m.icon className="h-5 w-5 shrink-0" strokeWidth={1.3}/>
                      <span className="min-w-0">
                        <span className="block text-sm">{m.label}</span>
                        <span className="block text-xs text-muted-foreground">
                          {m.hint}
                        </span>
                      </span>
                    </button>))}
                </div>

                <div className="mt-8">
                  {method === "upi" ? (<input className={field} placeholder="UPI ID — e.g. yourname@okbank" value={upi} onChange={(e) => setUpi(e.target.value)}/>) : null}

                  {method === "card" ? (<div className="grid gap-4 sm:grid-cols-2">
                      <input className={cn(field, "sm:col-span-2")} placeholder="Card number" inputMode="numeric" value={card.number} onChange={(e) => setCard({ ...card, number: e.target.value })}/>
                      <input className={cn(field, "sm:col-span-2")} placeholder="Name on card" value={card.name} onChange={(e) => setCard({ ...card, name: e.target.value })}/>
                      <input className={field} placeholder="MM / YY" value={card.expiry} onChange={(e) => setCard({ ...card, expiry: e.target.value })}/>
                      <input className={field} placeholder="CVV" inputMode="numeric" maxLength={4} value={card.cvv} onChange={(e) => setCard({ ...card, cvv: e.target.value })}/>
                    </div>) : null}

                  {method === "netbanking" ? (<select className={field} defaultValue="">
                      <option value="" disabled>
                        Choose your bank
                      </option>
                      {["HDFC Bank", "ICICI Bank", "State Bank of India", "Axis Bank", "Kotak Mahindra"].map((b) => (<option key={b} value={b}>
                            {b}
                          </option>))}
                    </select>) : null}

                  {method === "cod" ? (<p className="border border-border bg-card p-4 text-sm text-muted-foreground">
                      Pay the courier when the parcel arrives. A ₹40 handling fee
                      is added to the total.
                    </p>) : null}
                </div>

                <p className="mt-6 text-xs leading-relaxed text-muted-foreground">
                  Demonstration checkout. Nothing is charged, and nothing you
                  type here is sent anywhere or saved — please use made-up
                  details rather than a real card.
                </p>

                <button type="submit" disabled={processing} className="mt-8 w-full bg-foreground py-4 text-[11px] tracking-[0.22em] text-background transition-opacity hover:opacity-85 disabled:opacity-60 sm:w-auto sm:px-12">
                  {processing
                    ? "PROCESSING…"
                    : `PAY ${formatINR(payable)}`}
                </button>
              </form>)}
          </div>

          <aside className="h-fit border border-border bg-secondary/50 p-8">
            <p className="eyebrow">Order summary</p>
            <ul className="mt-6 space-y-4">
              {items.map((i) => (<li key={i.key} className="flex items-center gap-4">
                  {i.image ? (<img src={i.image} alt="" className="h-16 w-16 shrink-0 bg-card object-contain"/>) : (<span className="h-16 w-16 shrink-0" style={{ background: i.colorHex }}/>)}
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-sm">{i.name}</span>
                    <span className="block text-xs text-muted-foreground">
                      {i.color} · {i.size} · ×{i.quantity}
                    </span>
                  </span>
                  <span className="shrink-0 text-sm">
                    {formatINR(i.unitPrice * i.quantity)}
                  </span>
                </li>))}
            </ul>

            <dl className="mt-8 space-y-3 border-t border-border pt-6 text-sm">
              <div className="flex justify-between">
                <dt className="text-muted-foreground">Subtotal</dt>
                <dd>{formatINR(subtotal)}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-muted-foreground">Shipping</dt>
                <dd>{shipping ? formatINR(shipping) : "Free"}</dd>
              </div>
              {codFee ? (<div className="flex justify-between">
                  <dt className="text-muted-foreground">Cash-on-delivery fee</dt>
                  <dd>{formatINR(codFee)}</dd>
                </div>) : null}
              <div className="flex justify-between border-t border-border pt-3 text-base">
                <dt>Total</dt>
                <dd>{formatINR(payable)}</dd>
              </div>
            </dl>

            <button type="button" onClick={() => navigate("/cart")} className="mt-6 w-full border border-foreground py-3 text-[11px] tracking-[0.22em] transition-colors hover:bg-foreground hover:text-background">
              BACK TO BAG
            </button>
          </aside>
        </div>)}
    </Page>);
}
