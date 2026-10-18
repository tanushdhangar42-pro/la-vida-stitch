import { useCatalog } from "@/context/CatalogContext";
import realTeeBlack from "@/assets/photo/real-tees/black.jpg";
import realTeeWhite from "@/assets/photo/real-tees/white.jpg";
import realTeeSand from "@/assets/photo/real-tees/sand.jpg";
import realTeeOlive from "@/assets/photo/real-tees/olive.jpg";
import realTeeClay from "@/assets/photo/real-tees/clay.jpg";
import realTeeLilac from "@/assets/photo/real-tees/lilac.jpg";
import realTeePink from "@/assets/photo/real-tees/pink.jpg";
import realTeeBlue from "@/assets/photo/real-tees/blue.jpg";
import { cn } from "@/lib/utils";
const REAL_TEE_BY_COLOR = {
    "#1b1c1f": realTeeBlack,
    "#f3f0e9": realTeeWhite,
    "#d9c8ae": realTeeSand,
    "#6b7350": realTeeOlive,
    "#6a4c37": realTeeClay,
    "#a08bbb": realTeeLilac,
    "#d38b9c": realTeePink,
    "#7197b9": realTeeBlue,
};
const DEFAULT_POSITIONS = [
    { x: 43, y: 37 }, { x: 56, y: 37 }, { x: 43, y: 51 }, { x: 56, y: 51 },
    { x: 49, y: 61 }, { x: 36, y: 48 }, { x: 63, y: 48 }, { x: 49, y: 29 },
];
export function TShirtPreview({ colorHex, patchId, patchIds, patchPositions = {}, size, showFrame = false, className, onDropPatch }) {
    const { getPatch } = useCatalog();
    const ids = patchIds ?? (patchId ? [patchId] : []);
    const teeImage = REAL_TEE_BY_COLOR[colorHex.toLowerCase()] ?? realTeeBlack;
    const handleDrop = (event) => {
        event.preventDefault();
        const id = event.dataTransfer.getData("text/la-vida-patch");
        if (!id || !onDropPatch)
            return;
        const rect = event.currentTarget.getBoundingClientRect();
        const x = ((event.clientX - rect.left) / rect.width) * 100;
        const y = ((event.clientY - rect.top) / rect.height) * 100;
        onDropPatch(id, Math.min(68, Math.max(32, x)), Math.min(65, Math.max(27, y)));
    };
    const handlePatchDragStart = (event, id) => {
        event.dataTransfer.setData("text/la-vida-patch", id);
        event.dataTransfer.effectAllowed = "move";
    };
    return (<div className={cn("customizer-preview relative w-full overflow-hidden rounded-xl bg-[#f7f7f5]", className)} onDragOver={(event) => event.preventDefault()} onDrop={handleDrop}>
      <div className="relative aspect-square w-full">
        <img src={teeImage} alt="Real La Vida Stitch T-shirt preview" className="absolute inset-0 h-full w-full object-contain" draggable={false}/>

        {showFrame && <div className="pointer-events-none absolute left-[27%] top-[28%] h-[40%] w-[46%] rounded-md border border-dashed border-black/20"/>}

        {ids.map((id, index) => {
            const patch = getPatch(id);
            if (!patch)
                return null;
            const position = patchPositions[id] ?? DEFAULT_POSITIONS[index % DEFAULT_POSITIONS.length];
            return (<div key={id} draggable={!!onDropPatch} onDragStart={(event) => handlePatchDragStart(event, id)} className="absolute z-10 w-[9%] min-w-[38px] max-w-[68px] -translate-x-1/2 -translate-y-1/2 cursor-grab active:cursor-grabbing" style={{ left: `${position.x}%`, top: `${position.y}%` }} title={`${patch.name} patch — drag to move`}>
              <img src={patch.image} alt={`${patch.name} stitched patch`} draggable={false} className="block w-full rounded-[5px] border border-black/20 bg-white shadow-[0_2px_7px_rgba(0,0,0,.24)]"/>
            </div>);
        })}

        <div className="absolute left-3 top-3 rounded-full bg-white/90 px-3 py-1.5 text-[9px] font-semibold tracking-[0.12em] text-[#333] shadow-sm">REAL TEE PREVIEW</div>
        <span className="eyebrow absolute right-3 top-3 rounded-full border border-black/10 bg-white/90 px-3 py-1.5 text-[#333] shadow-sm">{size ? `SIZE ${size}` : "CHOOSE SIZE"}</span>
        {onDropPatch && <div className="absolute bottom-3 left-1/2 z-20 -translate-x-1/2 rounded-full bg-white/95 px-3 py-1.5 text-[9px] font-semibold tracking-[0.1em] text-[#333] shadow-sm">DRAG PATCHES ONTO THE TEE</div>}
      </div>
    </div>);
}
