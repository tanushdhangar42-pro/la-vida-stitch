import { usePageTitle } from "@/lib/usePageTitle";
import { Link } from "react-router-dom";
import diagram from "@/assets/diagram-system.svg";
import velcroDetail from "@/assets/velcro-detail.svg";
import teePanel from "@/assets/photo/uploaded-classic-black.jpg";
import teePanelLight from "@/assets/photo/real-tee-white.png";
import patchBack from "@/assets/patch-back.svg";
import modelBlack from "@/assets/photo/model-real-black-patched.jpg";
import patchFrontPhoto from "@/assets/photo/patch-front-fuji.jpg";
import patchDetailPhoto from "@/assets/photo/detail-patch-front.jpg";
import teeFrontPhoto from "@/assets/photo/tee-front-view.jpg";
import stepPlace from "@/assets/photo/step-1.jpg";
import stepPress from "@/assets/photo/step-2.jpg";
import stepWear from "@/assets/photo/step-3.jpg";
import stepPeel from "@/assets/photo/step-4.jpg";
import { PATCH_SPEC } from "@/data/constants";
import { Page, SectionHeading } from "@/components/Section";
const STEPS = [
    {
        image: stepPlace,
        title: "Line the patch up",
        body: "The loop panel sits at the centre of the chest, about a hand's width below the collar. Hold the patch square to it — the stitched border gives you the edge to judge by.",
    },
    {
        image: stepPress,
        title: "Press it down",
        body: "Flatten the patch with your palm, working from the middle outwards. Thousands of hooks bite into thousands of loops and the panel is fixed.",
    },
    {
        image: stepWear,
        title: "Wear it like a print",
        body: "It sits flush against the cotton. No lifting at the corners, no rattling, nothing showing on the outside except the design.",
    },
    {
        image: stepPeel,
        title: "Peel a corner to swap",
        body: "Lift one corner and pull steadily across. Takes about three seconds, leaves no residue, no holes and no outline on the shirt.",
    },
];
const PARTS = [
    {
        image: teePanel,
        title: "The loop panel, with the patch off",
        body: "A 20 x 20 cm square of soft loop tape, edge-stitched flat into the chest panel. It is the fuzzy half of the pair — smooth to touch, nothing to catch on.",
    },
    {
        image: patchBack,
        title: "The hook side of a patch",
        body: "Nylon hook tape covers the entire back of every patch, stitched round all four edges so it can never peel away from the canvas.",
    },
    {
        image: velcroDetail,
        title: "What happens between them",
        body: "Stiff hooks on the patch catch soft loops on the shirt. Press to close, peel to open — the same closure used on jackets and packs, sized to a chest panel.",
    },
    {
        image: patchFrontPhoto,
        title: "The face of a patch",
        body: "Printed cotton canvas with a stitched border, cut to 20 x 20 cm. Every design in the library uses this same panel.",
    },
    {
        image: teeFrontPhoto,
        title: "The tee itself",
        body: "240–280 GSM combed cotton, bio-washed. With no patch on it, the panel lies flat enough that the tee reads as a plain tee.",
    },
    {
        image: teePanelLight,
        title: "The same panel on a light tee",
        body: "Tonal loop tape is used on pale colours so the square stays discreet when you are between patches.",
    },
];
const FAQ = [
    {
        q: "Will the patch fall off?",
        a: "Not in normal wear. Full-back hook coverage over a 400 cm² panel is far more grip than a 40-gram patch needs. It handles walking, cycling, a bag strap and a crowded train. It is not designed for contact sport.",
    },
    {
        q: "Can I wash the tee?",
        a: "Yes — peel the patch off first. Wash cold, inside out. Exposed loop tape can pick up lint, so turning the tee inside out matters more here than with an ordinary shirt. The patch itself should only be wiped clean.",
    },
    {
        q: "Does the velcro scratch or itch?",
        a: "The half that stays in the shirt is the soft loop side, and it sits on the outside face of the chest panel, not against your skin. The scratchy hook half only ever lives on the back of the patch.",
    },
    {
        q: "Does it damage the fabric?",
        a: "No. There is no adhesive, no heat and no needle going through the outer fabric in wear. Take a patch off after a year and the cotton underneath looks like the rest of the tee.",
    },
    {
        q: "Do all patches fit all tees?",
        a: "Yes. Every tee uses one panel size and every patch is 20 x 20 cm. Any patch goes on any tee, regular or oversized.",
    },
    {
        q: "How long does the velcro last?",
        a: "Hook-and-loop is rated for thousands of open-close cycles. Swapping a patch daily, you would be well past a year before the grip noticeably softens.",
    },
];
const SPECS = [
    ["Patch size", PATCH_SPEC.size],
    ["Closure", PATCH_SPEC.closure],
    ["Strength", PATCH_SPEC.strength],
    ["Patch face", PATCH_SPEC.face],
    ["Patch back", PATCH_SPEC.back],
    ["Patch care", PATCH_SPEC.care],
    ["Panel on the tee", "Soft loop tape, 20 x 20 cm, edge-stitched"],
    ["Tee fabric", "240–280 GSM combed cotton"],
    ["Visible hardware", "None — just the printed panel"],
];
export default function HowItWorks() {
    usePageTitle("How It Works — LA VIDA STITCH");
    return (<>
      <Page className="py-14 lg:py-20">
        <div className="grid items-center gap-10 lg:grid-cols-[1.15fr_1fr] lg:gap-20">
          <SectionHeading align="left" eyebrow="The system" title="A soft panel in the shirt. Hook tape on the patch." subtitle="No magnets, no glue, no iron-on. Velcro — the closure everyone already knows how to use — sized to a chest panel and finished so it looks like a print." className="max-w-2xl"/>
          <img src={modelBlack} alt="Model wearing the black tee with a patch attached" className="w-full bg-secondary"/>
        </div>
      </Page>

      <section className="bg-[#15171b] text-[#e9e5dc]">
        <Page className="py-16 lg:py-24">
          <img src={diagram} alt="The tee with its loop panel, the panel itself, and the patch that presses onto it" className="w-full"/>
          <dl className="mt-14 grid gap-x-10 border-t border-white/15 pt-10 sm:grid-cols-2 lg:grid-cols-3">
            {SPECS.map(([k, v]) => (<div key={k} className="flex gap-4 border-b border-white/10 py-4">
                <dt className="eyebrow w-36 shrink-0 text-[#8b8878]">{k}</dt>
                <dd className="text-sm">{v}</dd>
              </div>))}
          </dl>
        </Page>
      </section>

      <Page className="py-16 lg:py-24">
        <SectionHeading align="left" eyebrow="Four steps" title="Swapping a patch" className="max-w-xl"/>
        <ol className="mt-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((s, i) => (<li key={s.title}>
              <img src={s.image} alt="" loading="lazy" className="aspect-[4/3] w-full bg-[#15171b] object-cover"/>
              <p className="eyebrow mt-5 text-accent">Step {i + 1}</p>
              <h3 className="mt-2 text-base leading-snug">{s.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {s.body}
              </p>
            </li>))}
        </ol>
      </Page>

      <section className="border-y border-border bg-secondary/50">
        <Page className="py-16 lg:py-24">
          <SectionHeading align="left" eyebrow="Every part" title="Both halves, close up" className="max-w-xl"/>
          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {PARTS.map((p) => (<figure key={p.title}>
                <img src={p.image} alt={p.title} loading="lazy" className="aspect-[4/3] w-full bg-[#15171b] object-cover"/>
                <figcaption className="mt-4">
                  <h3 className="text-sm tracking-[0.08em]">{p.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {p.body}
                  </p>
                </figcaption>
              </figure>))}
          </div>
        </Page>
      </section>

      <Page className="py-16 lg:py-24">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <img src={patchDetailPhoto} alt="A patch photographed on the tee" className="w-full bg-[#15171b] object-cover"/>
            <p className="mt-4 text-xs text-muted-foreground">
              A patch pressed onto the panel, photographed straight on.
            </p>
          </div>

          <div>
            <SectionHeading align="left" eyebrow="Questions" title="Before you buy"/>
            <dl className="mt-10">
              {FAQ.map((f) => (<div key={f.q} className="border-b border-border py-6">
                  <dt className="text-base">{f.q}</dt>
                  <dd className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    {f.a}
                  </dd>
                </div>))}
            </dl>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <Link to="/shop" className="inline-flex items-center justify-center bg-foreground px-9 py-4 text-[11px] tracking-[0.22em] text-background transition-opacity duration-300 hover:opacity-85">
                SHOP THE TEES
              </Link>
              <Link to="/patches" className="inline-flex items-center justify-center border border-foreground px-9 py-4 text-[11px] tracking-[0.22em] transition-colors duration-300 hover:bg-foreground hover:text-background">
                BROWSE PATCHES
              </Link>
            </div>
          </div>
        </div>
      </Page>
    </>);
}
