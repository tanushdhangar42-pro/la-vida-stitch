import { usePageTitle } from "@/lib/usePageTitle";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, LockKeyhole, Mail, ShieldCheck, UserRound } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useAuth } from "@/context/AuthContext";
import { cn } from "@/lib/utils";
import { fetchMyOrders } from "@/services/api";
import { formatINR } from "@/data/constants";
export default function Login() {
    usePageTitle("Account — LA VIDA STITCH");
    const navigate = useNavigate();
    const { user, signIn, signUp, signOut } = useAuth();
    const [mode, setMode] = useState("signin");
    const [showPassword, setShowPassword] = useState(false);
    const [busy, setBusy] = useState(false);
    const [form, setForm] = useState({ name: "", email: "", password: "" });
    const [orders, setOrders] = useState([]);
    useEffect(() => {
        if (!user)
            return;
        fetchMyOrders().then(setOrders).catch(() => setOrders([]));
    }, [user]);
    if (user) {
        return (<main className="min-h-[70vh] px-5 py-20">
        <div className="mx-auto max-w-lg border border-border bg-card p-8 text-center sm:p-12">
          <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-secondary">
            <UserRound className="h-6 w-6" strokeWidth={1.2}/>
          </div>
          <p className="eyebrow mt-6 text-accent">Account</p>
          <h1 className="display mt-3 text-4xl">Welcome, {user.name.split(" ")[0]}.</h1>
          <p className="mt-4 text-sm text-muted-foreground">{user.email}</p>
          {orders.length > 0 && (<div className="mt-8 border-t border-border pt-6 text-left">
              <p className="eyebrow">Your orders</p>
              <ul className="mt-4 space-y-2 text-sm">
                {orders.map((o) => (<li key={o.orderCode} className="flex justify-between">
                    <span>{o.orderCode} · {new Date(o.createdAt).toLocaleDateString("en-IN")}</span>
                    <span className="text-muted-foreground">{formatINR(o.total)} · {o.status}</span>
                  </li>))}
              </ul>
            </div>)}
          <div className="mt-8 grid gap-3 sm:grid-cols-3">
            <Link to="/shop" className="bg-foreground py-4 text-[10px] tracking-[0.18em] text-background">
              SHOP
            </Link>
            <Link to="/cart" className="border border-foreground py-4 text-[10px] tracking-[0.18em]">
              VIEW BAG
            </Link>
            {user.role === "ADMIN" && (<Link to="/admin" className="border border-foreground py-4 text-[10px] tracking-[0.18em]">
                ADMIN PANEL
              </Link>)}
            <button onClick={() => { signOut(); toast.success("You've been signed out."); }} className="border border-foreground py-4 text-[10px] tracking-[0.18em]">
              SIGN OUT
            </button>
          </div>
        </div>
      </main>);
    }
    async function submit(e) {
        e.preventDefault();
        setBusy(true);
        try {
            if (mode === "signin") {
                await signIn(form.email, form.password);
                toast.success("Welcome back to La Vida Stitch.");
            }
            else {
                if (form.password.length < 6)
                    throw new Error("Password must be at least 6 characters.");
                await signUp(form.name, form.email, form.password);
                toast.success("Your La Vida Stitch account is ready.");
            }
            navigate("/");
        }
        catch (error) {
            toast.error(error instanceof Error ? error.message : "Something went wrong.");
        }
        finally {
            setBusy(false);
        }
    }
    return (<main className="min-h-[75vh] px-5 py-12 sm:py-20">
      <div className="mx-auto grid max-w-5xl overflow-hidden border border-border bg-card lg:grid-cols-[0.85fr_1fr]">
        <div className="hidden bg-foreground p-10 text-background lg:flex lg:flex-col lg:justify-between">
          <div>
            <p className="eyebrow text-background/60">LA VIDA STITCH</p>
            <h2 className="display mt-6 text-5xl">Your style,<br />kept yours.</h2>
            <p className="mt-6 max-w-sm text-sm leading-relaxed text-background/65">
              Save your details, keep your cart close and make every patch combination easier to revisit.
            </p>
          </div>
          <div className="flex items-center gap-3 text-xs text-background/60">
            <ShieldCheck className="h-4 w-4" strokeWidth={1.2}/>
            Your account is stored securely in our database.
          </div>
        </div>

        <div className="p-7 sm:p-10 lg:p-12">
          <p className="eyebrow text-accent">Member account</p>
          <h1 className="display mt-3 text-4xl">{mode === "signin" ? "Welcome back." : "Join La Vida."}</h1>
          <p className="mt-3 text-sm text-muted-foreground">
            {mode === "signin" ? "Sign in to continue where you left off." : "Create an account in less than a minute."}
          </p>

          <div className="mt-8 grid grid-cols-2 border border-border">
            {["signin", "signup"].map((m) => (<button key={m} type="button" onClick={() => setMode(m)} className={cn("py-3 text-[11px] tracking-[0.22em]", mode === m ? "bg-foreground text-background" : "text-muted-foreground")}>
                {m === "signin" ? "SIGN IN" : "SIGN UP"}
              </button>))}
          </div>

          <form onSubmit={submit} className="mt-8 space-y-5">
            {mode === "signup" && (<label className="block">
                <span className="eyebrow">Full name</span>
                <div className="mt-2 flex items-center gap-3 border-b border-border">
                  <UserRound className="h-4 w-4 text-muted-foreground" strokeWidth={1.2}/>
                  <input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full bg-transparent py-3 text-sm outline-none" placeholder="Your name"/>
                </div>
              </label>)}
            <label className="block">
              <span className="eyebrow">Email address</span>
              <div className="mt-2 flex items-center gap-3 border-b border-border">
                <Mail className="h-4 w-4 text-muted-foreground" strokeWidth={1.2}/>
                <input required type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="w-full bg-transparent py-3 text-sm outline-none" placeholder="you@example.com"/>
              </div>
            </label>
            <label className="block">
              <div className="flex items-center justify-between">
                <span className="eyebrow">Password</span>
                {mode === "signin" && <button type="button" onClick={() => toast.info("Password reset can be connected to your backend/email service.")} className="text-[10px] tracking-[0.12em] text-muted-foreground hover:text-foreground">FORGOT PASSWORD?</button>}
              </div>
              <div className="mt-2 flex items-center gap-3 border-b border-border">
                <LockKeyhole className="h-4 w-4 text-muted-foreground" strokeWidth={1.2}/>
                <input required minLength={6} type={showPassword ? "text" : "password"} value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} className="w-full bg-transparent py-3 text-sm outline-none" placeholder="Minimum 6 characters"/>
                <button type="button" onClick={() => setShowPassword(!showPassword)} aria-label="Toggle password visibility">
                  {showPassword ? <EyeOff className="h-4 w-4" strokeWidth={1.2}/> : <Eye className="h-4 w-4" strokeWidth={1.2}/>}
                </button>
              </div>
            </label>

            <button disabled={busy} type="submit" className="mt-2 w-full bg-foreground py-4 text-[11px] tracking-[0.22em] text-background transition-opacity hover:opacity-85 disabled:cursor-not-allowed disabled:opacity-50">
              {busy ? "PLEASE WAIT..." : mode === "signin" ? "SIGN IN TO MY ACCOUNT" : "CREATE MY ACCOUNT"}
            </button>
          </form>

          <p className="mt-6 flex items-center justify-center gap-2 text-center text-[11px] text-muted-foreground">
            <ShieldCheck className="h-3.5 w-3.5" strokeWidth={1.2}/>
            Secure sign-in with JWT. Your password is stored as a BCrypt hash.
          </p>
        </div>
      </div>
    </main>);
}
