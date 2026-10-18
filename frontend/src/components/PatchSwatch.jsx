import { cn } from "@/lib/utils";
/**
 * A patch rendered as the physical object it is: a square velcro panel
 * sitting slightly proud of whatever it is mounted on.
 */
export function PatchSwatch({ patch, className, alt, }) {
    return (<img src={patch.image} alt={alt ?? `${patch.name} velcro patch`} loading="lazy" draggable={false} className={cn("aspect-square w-full select-none rounded-[4px] object-contain", "shadow-[0_10px_24px_-14px_rgba(0,0,0,0.75)]", className)}/>);
}
