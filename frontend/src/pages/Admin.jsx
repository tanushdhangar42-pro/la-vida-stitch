import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Page } from "@/components/Section";
import { usePageTitle } from "@/lib/usePageTitle";
import { fetchAllMessages, fetchAllOrders } from "@/services/api";
import { formatINR } from "@/data/constants";

// Admin-only page: shows every order and every contact message stored in MySQL.
export default function Admin() {
  usePageTitle("Admin — LA VIDA STITCH");
  const [orders, setOrders] = useState([]);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    fetchAllOrders().then(setOrders).catch((e) => toast.error(e.message));
    fetchAllMessages().then(setMessages).catch((e) => toast.error(e.message));
  }, []);

  const cell = "border-b border-border px-3 py-3 text-left text-sm";

  return (
    <Page className="py-14 lg:py-20">
      <p className="eyebrow text-accent">Admin panel</p>
      <h1 className="display mt-3 text-4xl">Store overview</h1>

      <h2 className="eyebrow mt-12">Orders ({orders.length})</h2>
      <div className="mt-4 overflow-x-auto">
        <table className="w-full min-w-[640px]">
          <thead>
            <tr className="text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
              <th className={cell}>Order</th>
              <th className={cell}>Customer</th>
              <th className={cell}>City</th>
              <th className={cell}>Items</th>
              <th className={cell}>Payment</th>
              <th className={cell}>Total</th>
              <th className={cell}>Date</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((o) => (
              <tr key={o.id}>
                <td className={cell}>{o.orderCode}</td>
                <td className={cell}>{o.name}<br /><span className="text-xs text-muted-foreground">{o.email}</span></td>
                <td className={cell}>{o.city}</td>
                <td className={cell}>{o.items.length}</td>
                <td className={cell}>{o.paymentMethod}</td>
                <td className={cell}>{formatINR(o.total)}</td>
                <td className={cell}>{new Date(o.createdAt).toLocaleString("en-IN")}</td>
              </tr>
            ))}
            {orders.length === 0 && (
              <tr><td className={cell} colSpan={7}>No orders yet.</td></tr>
            )}
          </tbody>
        </table>
      </div>

      <h2 className="eyebrow mt-14">Contact messages ({messages.length})</h2>
      <ul className="mt-4 divide-y divide-border border-y border-border">
        {messages.map((m) => (
          <li key={m.id} className="py-4 text-sm">
            <p>{m.name} · <span className="text-muted-foreground">{m.email}</span></p>
            {m.subject && <p className="mt-1">{m.subject}</p>}
            <p className="mt-1 text-muted-foreground">{m.message}</p>
          </li>
        ))}
        {messages.length === 0 && <li className="py-4 text-sm text-muted-foreground">No messages yet.</li>}
      </ul>
    </Page>
  );
}
