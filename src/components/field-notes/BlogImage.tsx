import Image from "next/image";
import { cn } from "@/lib/cn";

interface Props {
  src?: string;
  alt: string;
  caption?: string;
  width?: number;
  height?: number;
  className?: string;
}

/**
 * Responsive blog image with optional caption. When no `src` is provided
 * (e.g., image not yet created), renders a placeholder that preserves the
 * alt text and caption for AI indexing. The alt text is read by search engines
 * and AI engines even when the image itself is absent.
 */
export default function BlogImage({ src, alt, caption, width = 780, height = 440, className }: Props) {
  return (
    <figure className={cn("not-prose my-8", className)}>
      {src ? (
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          className="w-full h-auto border border-c3-border"
        />
      ) : (
        <div
          className="w-full border border-dashed border-c3-border bg-c3-card flex items-center justify-center"
          style={{ aspectRatio: `${width}/${height}` }}
          aria-label={alt}
          role="img"
        >
          <span className="font-mono text-[9px] tracking-[0.18em] uppercase text-c3-dim text-center px-4">
            Image coming: {alt}
          </span>
        </div>
      )}
      {caption && (
        <figcaption className="mt-2 font-mono text-[9.5px] tracking-[0.14em] text-c3-dim leading-relaxed">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
