import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

/*
 * Official Converter brand assets (public/brand). The artwork is used exactly
 * as supplied: never redrawn, recoloured or replaced with text. The full logo
 * includes the "AI" supplement as part of the artwork; written copy always
 * says "Converter".
 */
const LOGO = { src: "/brand/converter-logo.png", width: 468, height: 142 };
const SYMBOL = { src: "/brand/converter-symbol.png", width: 142, height: 142 };

/** The Converter symbol on its own, for places where the full logo does not fit. */
export function LogoMark({ className }: { className?: string }) {
  return (
    <Image
      src={SYMBOL.src}
      width={SYMBOL.width}
      height={SYMBOL.height}
      alt=""
      aria-hidden="true"
      className={cn("size-7 shrink-0 object-contain", className)}
    />
  );
}

/** Full official logo linking home. Height is set by className, width follows the artwork. */
export function Logo({
  className,
  href = "/",
  priority = false,
}: {
  className?: string;
  href?: string;
  priority?: boolean;
}) {
  return (
    <Link
      href={href}
      aria-label="Converter, domov"
      className={cn("inline-flex shrink-0 items-center rounded-md", className)}
    >
      <Image
        src={LOGO.src}
        width={LOGO.width}
        height={LOGO.height}
        alt="Converter"
        priority={priority}
        sizes="180px"
        className="h-9 w-auto md:h-10"
      />
    </Link>
  );
}
