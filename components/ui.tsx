import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

/** Klassen-Helfer. Akzeptiert bewusst alles Falsy, damit `bedingung && "klasse"`
 *  auch mit ReactNode-Bedingungen ohne Cast funktioniert. */
export function cx(...classes: unknown[]) {
  return classes.filter((c): c is string => typeof c === "string" && c.length > 0).join(" ");
}

export function Container({
  children,
  className,
  width = "default",
}: {
  children: ReactNode;
  className?: string;
  width?: "default" | "narrow" | "wide";
}) {
  const max =
    width === "narrow" ? "max-w-3xl" : width === "wide" ? "max-w-[88rem]" : "max-w-6xl";
  return (
    <div className={cx("mx-auto w-full px-6 sm:px-8", max, className)}>{children}</div>
  );
}

export function Section({
  children,
  className,
  id,
  tone = "paper",
  size = "default",
}: {
  children: ReactNode;
  className?: string;
  id?: string;
  tone?: "paper" | "soft" | "deep" | "sage";
  size?: "default" | "compact" | "tall";
}) {
  const tones = {
    paper: "bg-paper text-ink-800",
    soft: "surface-soft text-ink-800",
    deep: "surface-deep text-sage-100 grain relative overflow-hidden",
    sage: "bg-sage-100 text-pine-900",
  } as const;

  const sizes = {
    compact: "py-16 sm:py-20",
    default: "py-20 sm:py-28 lg:py-32",
    tall: "py-24 sm:py-32 lg:py-40",
  } as const;

  return (
    <section id={id} className={cx(tones[tone], sizes[size], className)}>
      {children}
    </section>
  );
}

export function Eyebrow({
  children,
  tone = "dark",
}: {
  children: ReactNode;
  tone?: "dark" | "light";
}) {
  return (
    <p
      className={cx(
        "mb-5 flex items-center gap-3 text-[0.78rem] font-semibold tracking-[0.16em] uppercase",
        tone === "dark" ? "text-moss-600" : "text-sage-300",
      )}
    >
      <span
        aria-hidden
        className={cx(
          "inline-block h-px w-8",
          tone === "dark" ? "bg-moss-500/50" : "bg-sage-300/50",
        )}
      />
      {children}
    </p>
  );
}

export function SectionHeader({
  eyebrow,
  title,
  lead,
  tone = "dark",
  align = "left",
  className,
}: {
  eyebrow?: string;
  title: ReactNode;
  lead?: ReactNode;
  tone?: "dark" | "light";
  align?: "left" | "center";
  className?: string;
}) {
  return (
    <div
      className={cx(
        align === "center" ? "mx-auto max-w-3xl text-center" : "max-w-3xl",
        className,
      )}
    >
      {eyebrow ? (
        <div className={align === "center" ? "flex justify-center" : undefined}>
          <Eyebrow tone={tone}>{eyebrow}</Eyebrow>
        </div>
      ) : null}
      <h2
        className={cx(
          "text-[2rem] leading-[1.12] font-semibold sm:text-[2.6rem] lg:text-[3.1rem]",
          tone === "light" && "text-white",
        )}
      >
        {title}
      </h2>
      {lead ? (
        <p
          className={cx(
            "prose-de mt-6 text-lg leading-relaxed sm:text-xl",
            tone === "light" ? "text-sage-100/80" : "text-ink-600",
          )}
        >
          {lead}
        </p>
      ) : null}
    </div>
  );
}

type ButtonVariant = "primary" | "secondary" | "ghost" | "onDark" | "onDarkGhost";

const buttonBase =
  "group inline-flex items-center justify-center gap-2.5 rounded-full px-7 py-3.5 text-[0.95rem] font-medium transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] active:scale-[0.98]";

const buttonVariants: Record<ButtonVariant, string> = {
  primary:
    "bg-pine-800 text-white shadow-[0_1px_2px_rgb(15_21_18/0.12)] hover:bg-pine-700 hover:shadow-[0_12px_28px_-12px_rgb(16_56_43/0.6)]",
  secondary:
    "bg-white text-pine-800 hairline hover:bg-mist-50 hover:shadow-[0_10px_24px_-16px_rgb(15_21_18/0.5)]",
  ghost: "text-pine-800 hover:bg-mist-100",
  onDark: "bg-white text-pine-900 hover:bg-sage-100",
  onDarkGhost: "text-white hairline-invert hover:bg-white/10",
};

export function ButtonLink({
  href,
  children,
  variant = "primary",
  className,
  withArrow = false,
  ...rest
}: {
  href: string;
  children: ReactNode;
  variant?: ButtonVariant;
  className?: string;
  withArrow?: boolean;
} & Omit<ComponentProps<typeof Link>, "href" | "className" | "children">) {
  return (
    <Link
      href={href}
      className={cx(buttonBase, buttonVariants[variant], className)}
      {...rest}
    >
      {children}
      {withArrow ? <Arrow /> : null}
    </Link>
  );
}

export function Arrow({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 16 16"
      className={cx(
        "h-3.5 w-3.5 transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-1",
        className,
      )}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M2 8h11M9 4l4 4-4 4" />
    </svg>
  );
}

export function TextLink({
  href,
  children,
  tone = "dark",
  className,
}: {
  href: string;
  children: ReactNode;
  tone?: "dark" | "light";
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={cx(
        "group inline-flex items-center gap-2 text-[0.95rem] font-medium transition-colors",
        tone === "light"
          ? "text-sage-200 hover:text-white"
          : "text-moss-600 hover:text-pine-800",
        className,
      )}
    >
      {children}
      <Arrow />
    </Link>
  );
}

export function Card({
  children,
  className,
  tone = "paper",
}: {
  children: ReactNode;
  className?: string;
  tone?: "paper" | "soft" | "dark";
}) {
  const tones = {
    paper: "bg-white hairline",
    soft: "bg-mist-50 hairline",
    dark: "bg-pine-800/60 hairline-invert",
  } as const;
  return (
    <div className={cx("rounded-[var(--radius-xl3)] p-8", tones[tone], className)}>
      {children}
    </div>
  );
}

/** Kleine Auszeichnung für Rechtsgrundlagen, Zielgruppen, Vertragsformen. */
export function Tag({
  children,
  tone = "dark",
}: {
  children: ReactNode;
  tone?: "dark" | "light";
}) {
  return (
    <span
      className={cx(
        "inline-flex items-center rounded-full px-3 py-1 text-[0.78rem] font-medium",
        tone === "light"
          ? "bg-white/10 text-sage-100 hairline-invert"
          : "bg-mist-100 text-pine-700",
      )}
    >
      {children}
    </span>
  );
}

export function Check({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 20 20"
      className={cx("h-5 w-5 shrink-0", className)}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4.5 10.5l3.5 3.5 7.5-8" />
    </svg>
  );
}

export function CheckList({
  items,
  tone = "dark",
  className,
}: {
  items: readonly string[];
  tone?: "dark" | "light";
  className?: string;
}) {
  return (
    <ul className={cx("space-y-3.5", className)}>
      {items.map((item) => (
        <li key={item} className="flex gap-3.5">
          <Check className={tone === "light" ? "text-sage-300" : "text-moss-500"} />
          <span
            className={cx(
              "prose-de text-[0.98rem] leading-relaxed",
              tone === "light" ? "text-sage-100/85" : "text-ink-600",
            )}
          >
            {item}
          </span>
        </li>
      ))}
    </ul>
  );
}
