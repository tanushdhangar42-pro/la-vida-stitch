// Products and patches in the database store an image KEY such as "photo/real-tee-black".
// This file turns that key into the real image URL bundled by Vite.
const files = import.meta.glob("../assets/**/*.{jpg,jpeg,png,svg}", {
  eager: true,
  query: "?url",
  import: "default",
});

const IMAGES = {};
for (const path in files) {
  const key = path.replace("../assets/", "").replace(/\.\w+$/, "");
  IMAGES[key] = files[path];
}

export const getImage = (key) => IMAGES[key] ?? "";
