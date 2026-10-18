// Fixed values used across the website. Products, patches and fabrics come from the API.
import { getImage } from "@/lib/images";

export const colorSwatches = [
  { name: "Black", hex: "#1b1c1f" },
  { name: "Off White", hex: "#f3f0e9" },
  { name: "Sand", hex: "#d9c8ae" },
  { name: "Olive", hex: "#6b7350" },
  { name: "Clay", hex: "#6a4c37" },
  { name: "Lilac", hex: "#a08bbb" },
  { name: "Pink", hex: "#d38b9c" },
  { name: "Sky Blue", hex: "#7197b9" },
];

export const patchCategories = ["All", "Graphic", "Nature", "Travel", "Typography", "Minimal"];

export const PATCH_SPEC = {
  size: "20 cm × 20 cm",
  closure: "Hook tape (the stiff half), full-back coverage",
  strength: "Holds through a full day of normal wear",
  face: "Printed cotton canvas, stitched border",
  back: "Nylon hook tape, edge-stitched so it cannot peel",
  care: "Wipe clean. Never machine wash the patch.",
};

export const patchBackImage = getImage("patch-back");

// "Where to start" tiles on the home and collections pages.
export const categories = [
  { id: "T-Shirts", title: "Regular Fit", blurb: "240 GSM · velcro panel at the chest", image: getImage("photo/model-real-white"), to: "/shop" },
  { id: "Oversized", title: "Oversized", blurb: "280 GSM · drop shoulder, more room for the patch", image: getImage("photo/model-real-sand-patched"), to: "/shop" },
  { id: "Patches", title: "Patches", blurb: "20 × 20 cm velcro panels · 12 designs", image: getImage("cat-patches"), to: "/patches" },
  { id: "Starter Kits", title: "Starter Kits", blurb: "One tee, three patches, one box", image: getImage("photo/model-real-black-patched"), to: "/shop" },
];

export const formatINR = (value) => "₹" + value.toLocaleString("en-IN");
