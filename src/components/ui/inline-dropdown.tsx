"use client";

import { useState, useRef, useEffect } from "react";

interface SimpleDropdownProps {
  trigger: React.ReactNode;
  children: React.ReactNode;
}

export function SimpleDropdown({ trigger, children }: SimpleDropdownProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }

    if (open) {
      document.addEventListener("click", handleClickOutside);
    }

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [open]);

  return (
    <div ref={ref} style={{ position: "relative" }}>
      <div onClick={() => setOpen(!open)}>{trigger}</div>

      {open && (
        <div
          style={{
            position: "absolute",
            top: "100%",
            left: 0,
            marginTop: "4px",
            backgroundColor: "var(--background)",
            border: "1px solid var(--border)",
            borderRadius: "4px",
            boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
            zIndex: 1000,
            minWidth: "180px",
            padding: "4px 0",
          }}
        >
          {children}
        </div>
      )}
    </div>
  );
}

interface SimpleDropdownItemProps {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
}

export function SimpleDropdownItem({
  children,
  onClick,
  disabled = false,
}: SimpleDropdownItemProps) {
  return (
    <div
      onClick={disabled ? undefined : onClick}
      style={{
        padding: "6px 12px",
        fontSize: "14px",
        cursor: disabled ? "not-allowed" : "pointer",
        opacity: disabled ? 0.5 : 1,
        color: "var(--foreground)",
      }}
      onMouseEnter={(e) => {
        if (!disabled) {
          e.currentTarget.style.backgroundColor = "var(--accent)";
        }
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.backgroundColor = "transparent";
      }}
    >
      {children}
    </div>
  );
}

interface SimpleDropdownLabelProps {
  children: React.ReactNode;
}

export function SimpleDropdownLabel({ children }: SimpleDropdownLabelProps) {
  return (
    <div
      style={{
        padding: "6px 12px",
        fontSize: "14px",
        fontWeight: "500",
        color: "var(--muted-foreground)",
      }}
    >
      {children}
    </div>
  );
}

interface SimpleDropdownSeparatorProps {}

export function SimpleDropdownSeparator({}: SimpleDropdownSeparatorProps) {
  return (
    <div
      style={{
        height: "1px",
        backgroundColor: "var(--border)",
        margin: "2px 0",
      }}
    />
  );
}
