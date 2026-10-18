import { usePageTitle } from "@/lib/usePageTitle";
import { useState } from "react";
import { Mail, MapPin, Phone } from "lucide-react";
import { toast } from "sonner";
import { Page } from "@/components/Section";
import { postContact } from "@/services/api";
const FAQS = [
    {
        q: "How do the detachable patches work?",
        a: "Each tee has a concealed mount at the chest. Patches align and press on securely, and lift off just as easily.",
    },
    {
        q: "What is your shipping timeline?",
        a: "Orders dispatch within 48 hours. Metro delivery takes 2–4 days, rest of India 4–7 days. Free above ₹999.",
    },
    {
        q: "Can I return a patch?",
        a: "Unused patches can be returned within 14 days. Tees are returnable within 14 days if unworn and unwashed.",
    },
    {
        q: "Do patches survive washing?",
        a: "Remove the patch before washing the tee. Patches can be wiped clean with a damp cloth.",
    },
];
export default function Contact() {
    usePageTitle("Contact & Support — LA VIDA STITCH");
    const [sent, setSent] = useState(false);
    const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
    const update = (key, value) => setForm((f) => ({ ...f, [key]: value }));
    return (<Page className="py-12 sm:py-16">
      <h1 className="display text-3xl sm:text-4xl">Get in touch</h1>
      <p className="mt-4 max-w-xl text-sm leading-relaxed text-muted-foreground">
        Sizing help, order updates, patch care or wholesale — send us a note and
        we'll reply within one working day.
      </p>

      <div className="mt-12 grid gap-14 lg:grid-cols-[1.2fr_1fr]">
        <form onSubmit={async (e) => {
            e.preventDefault();
            try {
                await postContact(form);
                setSent(true);
                toast.success("Message sent — we'll be in touch shortly");
            }
            catch (err) {
                toast.error(err instanceof Error ? err.message : "Could not send your message.");
            }
        }} className="space-y-6">
          <div className="grid gap-6 sm:grid-cols-2">
            <label className="block">
              <span className="eyebrow">Name</span>
              <input required value={form.name} onChange={(e) => update("name", e.target.value)} className="mt-2 w-full border-b border-border bg-transparent py-2 text-sm outline-none focus:border-foreground"/>
            </label>
            <label className="block">
              <span className="eyebrow">Email</span>
              <input required type="email" value={form.email} onChange={(e) => update("email", e.target.value)} className="mt-2 w-full border-b border-border bg-transparent py-2 text-sm outline-none focus:border-foreground"/>
            </label>
          </div>
          <label className="block">
            <span className="eyebrow">Subject</span>
            <input value={form.subject} onChange={(e) => update("subject", e.target.value)} className="mt-2 w-full border-b border-border bg-transparent py-2 text-sm outline-none focus:border-foreground"/>
          </label>
          <label className="block">
            <span className="eyebrow">Message</span>
            <textarea required rows={5} value={form.message} onChange={(e) => update("message", e.target.value)} className="mt-2 w-full resize-none border-b border-border bg-transparent py-2 text-sm outline-none focus:border-foreground"/>
          </label>
          <button type="submit" className="bg-foreground px-8 py-4 text-[11px] tracking-[0.22em] text-background">
            {sent ? "MESSAGE SENT" : "SEND MESSAGE"}
          </button>
        </form>

        <aside className="space-y-6 bg-secondary/60 p-8 text-sm">
          <div className="flex gap-3">
            <Mail className="h-4 w-4 shrink-0 text-accent" strokeWidth={1.3}/>
            <span className="text-muted-foreground">hello@lavidastitch.com</span>
          </div>
          <div className="flex gap-3">
            <Phone className="h-4 w-4 shrink-0 text-accent" strokeWidth={1.3}/>
            <span className="text-muted-foreground">+91 98765 43210</span>
          </div>
          <div className="flex gap-3">
            <MapPin className="h-4 w-4 shrink-0 text-accent" strokeWidth={1.3}/>
            <span className="text-muted-foreground">
              Studio 12, Linking Road, Mumbai 400050
            </span>
          </div>
        </aside>
      </div>

      <section className="mt-24">
        <h2 className="display text-2xl sm:text-3xl">Frequently asked</h2>
        <dl className="mt-8 divide-y divide-border border-y border-border">
          {FAQS.map((f) => (<div key={f.q} className="py-6">
              <dt className="text-sm">{f.q}</dt>
              <dd className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">
                {f.a}
              </dd>
            </div>))}
        </dl>
      </section>
    </Page>);
}
