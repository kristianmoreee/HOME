import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

export const buttonVariants = cva(
  [
    "group/button relative inline-flex shrink-0 items-center justify-center gap-2 whitespace-nowrap",
    "rounded-full font-medium tracking-[-0.01em] select-none",
    "transition-[background-color,border-color,color,box-shadow,transform,filter] duration-200 ease-out-quart",
    "active:scale-[0.98] disabled:pointer-events-none disabled:opacity-40",
    "focus-visible:outline-2 focus-visible:outline-offset-[3px] focus-visible:outline-ring",
    "[&_svg]:size-4 [&_svg]:shrink-0",
  ],
  {
    variants: {
      variant: {
        /** Highest emphasis: the Converter blue to violet, white label (≥ 4.5:1 across the gradient). */
        primary:
          "bg-[linear-gradient(100deg,var(--color-electric-500),var(--color-violet-500))] text-white shadow-[inset_0_1px_0_rgb(255_255_255/0.18),0_10px_30px_-12px_rgb(42_92_240/0.7)] hover:brightness-110 hover:shadow-[inset_0_1px_0_rgb(255_255_255/0.22),0_12px_36px_-10px_rgb(117_82_245/0.75)]",
        /** Brand accent. Use once per view for the key conversion action. */
        accent:
          "bg-accent text-accent-fg shadow-[inset_0_1px_0_rgb(255_255_255/0.18)] hover:bg-accent-hover hover:shadow-glow-electric",
        /** Glass, for secondary actions on dark backgrounds. */
        secondary: "glass text-fg hover:border-line-strong hover:bg-glass-strong",
        /** Hairline outline, quieter than secondary. */
        outline:
          "border border-line-strong bg-transparent text-fg hover:border-white/30 hover:bg-white/[0.03]",
        /** No chrome. Navigation and tertiary actions. */
        ghost: "bg-transparent text-fg-muted hover:bg-white/[0.05] hover:text-fg",
        /** Inline text link with animated underline. */
        link: "h-auto rounded-none px-0 text-fg underline-offset-4 decoration-line-strong hover:underline hover:decoration-white/60",
      },
      size: {
        sm: "h-9 px-4 text-body-sm",
        md: "h-11 px-6 text-body-sm",
        lg: "h-14 px-8 text-body",
        icon: "size-11 p-0",
      },
    },
    compoundVariants: [{ variant: "link", className: "h-auto px-0" }],
    defaultVariants: { variant: "primary", size: "md" },
  },
);

type ButtonVariantProps = VariantProps<typeof buttonVariants>;

type ButtonContentProps = {
  /** Icon rendered after the label. Nudges right on hover. */
  trailingIcon?: ReactNode;
  /** Icon rendered before the label. */
  leadingIcon?: ReactNode;
};

function ButtonContent({
  leadingIcon,
  trailingIcon,
  children,
}: ButtonContentProps & { children?: ReactNode }) {
  return (
    <>
      {leadingIcon}
      {children}
      {trailingIcon ? (
        <span
          aria-hidden="true"
          className="inline-flex transition-transform duration-300 ease-out-expo group-hover/button:translate-x-0.5"
        >
          {trailingIcon}
        </span>
      ) : null}
    </>
  );
}

export type ButtonProps = ComponentProps<"button"> & ButtonVariantProps & ButtonContentProps;

export function Button({
  className,
  variant,
  size,
  leadingIcon,
  trailingIcon,
  children,
  type = "button",
  ...props
}: ButtonProps) {
  return (
    <button type={type} className={cn(buttonVariants({ variant, size }), className)} {...props}>
      <ButtonContent leadingIcon={leadingIcon} trailingIcon={trailingIcon}>
        {children}
      </ButtonContent>
    </button>
  );
}

export type ButtonLinkProps = ComponentProps<typeof Link> &
  ButtonVariantProps &
  ButtonContentProps & { external?: boolean };

/** A link styled as a button. Uses next/link for internal routes. */
export function ButtonLink({
  className,
  variant,
  size,
  leadingIcon,
  trailingIcon,
  children,
  external,
  ...props
}: ButtonLinkProps) {
  const externalProps = external ? { target: "_blank", rel: "noopener noreferrer" } : {};
  return (
    <Link
      className={cn(buttonVariants({ variant, size }), className)}
      {...externalProps}
      {...props}
    >
      <ButtonContent leadingIcon={leadingIcon} trailingIcon={trailingIcon}>
        {children}
      </ButtonContent>
    </Link>
  );
}
