// src/components/ui/Button.jsx
"use client";

import React from "react";
import Link from "next/link";
import clsx from "clsx";


const VARIANT_CLASSES = {
  primary: "btn btn-primary",
  secondary: "btn btn-secondary",
  outline: "btn btn-outline",
  ghost: "btn btn-ghost",
  link: "btn btn-link",
  circle: "btn btn-circle btn-ghost",
};

const SIZE_CLASSES = {
  sm: "btn-sm",
  md: "", // default size (no extra class)
  lg: "btn-lg",
};

const Button = React.forwardRef(function Button(
  {
    as = "button",
    variant = "primary",
    size = "md",
    fullWidth = false,
    loading = false,
    iconLeft = null,
    iconRight = null,
    children,
    className,
    href,
    target,
    rel,
    type = "button",
    disabled = false,
    ...rest
  },
  ref
) {
  const base = VARIANT_CLASSES[variant] || VARIANT_CLASSES.primary;
  const sizeCls = SIZE_CLASSES[size] ?? "";
  const widthCls = fullWidth ? "w-full" : "";
  const disabledCls = disabled ? "opacity-50 pointer-events-none" : "";
  const combined = clsx(base, sizeCls, widthCls, disabledCls, className);

  const content = (
    <>
      {loading ? (
        <>
          <svg
            className="animate-spin mr-2 h-4 w-4 inline-block"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
          </svg>
        </>
      ) : null}

      {iconLeft ? <span className="mr-2 inline-flex items-center">{iconLeft}</span> : null}
      <span className={clsx(loading ? "opacity-80" : "")}>{children}</span>
      {iconRight ? <span className="ml-2 inline-flex items-center">{iconRight}</span> : null}
    </>
  );

  if (as === "link") {
    // next/link
    return (
      <Link href={href || "#"} ref={ref} className={combined} target={target} rel={rel} {...rest}>
        {content}
      </Link>
    );
  }

  if (as === "a") {
    return (
      <a href={href} ref={ref} className={combined} target={target} rel={rel} {...rest}>
        {content}
      </a>
    );
  }

  // default: button
  return (
    <button ref={ref} type={type} className={combined} disabled={disabled} {...rest}>
      {content}
    </button>
  );
});

export default Button;
