// All communication with the Spring Boot backend lives in this one file.
// Every function matches one REST endpoint, so it is easy to explain and to test in Postman.
import { getImage } from "@/lib/images";
import { colorSwatches } from "@/data/constants";

const BASE_URL = import.meta.env.VITE_API_BASE_URL || "/api";
const SESSION_KEY = "lavida_session";

// ---------- session (JWT token is kept in localStorage) ----------
export const getSession = () => {
  try {
    return JSON.parse(localStorage.getItem(SESSION_KEY));
  } catch {
    return null;
  }
};
export const saveSession = (session) => localStorage.setItem(SESSION_KEY, JSON.stringify(session));
export const clearSession = () => localStorage.removeItem(SESSION_KEY);

// ---------- one helper that every API call uses ----------
async function request(path, { method = "GET", body } = {}) {
  const headers = { "Content-Type": "application/json" };
  const session = getSession();
  if (session?.token) headers.Authorization = `Bearer ${session.token}`;

  let response;
  try {
    response = await fetch(BASE_URL + path, {
      method,
      headers,
      body: body ? JSON.stringify(body) : undefined,
    });
  } catch {
    throw new Error("Cannot reach the server. Please check that the backend is running.");
  }

  const data = await response.json().catch(() => null);
  if (response.status === 401 && session) {
    // Token expired or invalid: sign the user out.
    clearSession();
    window.dispatchEvent(new Event("lavida:logout"));
  }
  if (!response.ok) throw new Error(data?.message || `Request failed (${response.status})`);
  return data;
}

// ---------- catalogue ----------
const swatch = (name) => colorSwatches.find((c) => c.name === name) ?? { name, hex: "#999999" };

// The database stores image keys and colour names; the UI needs real URLs and colour objects.
const toProduct = (p) => ({
  ...p,
  image: getImage(p.image),
  modelImage: p.modelImage ? getImage(p.modelImage) : undefined,
  gallery: p.gallery.map(getImage),
  colors: p.colors.map(swatch),
});
const toPatch = (p) => ({ ...p, image: getImage(p.image) });

/** GET /api/products */
export const fetchProducts = async () => (await request("/products")).map(toProduct);
/** GET /api/patches */
export const fetchPatches = async () => (await request("/patches")).map(toPatch);
/** GET /api/fabrics */
export const fetchFabrics = () => request("/fabrics");

// ---------- authentication ----------
/** POST /api/auth/login */
export const login = (email, password) => request("/auth/login", { method: "POST", body: { email, password } });
/** POST /api/auth/register */
export const register = (name, email, password) =>
  request("/auth/register", { method: "POST", body: { name, email, password } });

// ---------- customer actions ----------
/** POST /api/customizations */
export const postCustomization = (payload) => request("/customizations", { method: "POST", body: payload });
/** POST /api/orders  (needs login) */
export const postOrder = (order) => request("/orders", { method: "POST", body: order });
/** GET /api/orders/my  (needs login) */
export const fetchMyOrders = () => request("/orders/my");
/** POST /api/contact */
export const postContact = (message) => request("/contact", { method: "POST", body: message });

// ---------- admin only ----------
/** GET /api/admin/orders */
export const fetchAllOrders = () => request("/admin/orders");
/** GET /api/admin/messages */
export const fetchAllMessages = () => request("/admin/messages");
