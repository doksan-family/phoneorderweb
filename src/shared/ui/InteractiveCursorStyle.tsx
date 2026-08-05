"use client";

import { useEffect } from "react";

const STYLE_ID = "interactive-cursor-style";

const INTERACTIVE_CURSOR_CSS = `
a[href],
a[href] *,
button,
button *,
[role="button"],
[role="button"] *,
label[for],
label[for] *,
summary,
summary *,
select,
.cursor-pointer,
input[type="button"],
input[type="checkbox"],
input[type="file"],
input[type="radio"],
input[type="reset"],
input[type="submit"] {
  cursor: pointer !important;
}

button:disabled,
button:disabled *,
[aria-disabled="true"],
[aria-disabled="true"] *,
input:disabled,
select:disabled,
textarea:disabled {
  cursor: not-allowed !important;
}
`;

export function InteractiveCursorStyle() {
  useEffect(() => {
    const existingStyle = document.getElementById(STYLE_ID);
    const styleElement =
      existingStyle instanceof HTMLStyleElement
        ? existingStyle
        : document.createElement("style");

    styleElement.id = STYLE_ID;
    styleElement.textContent = INTERACTIVE_CURSOR_CSS;

    if (!styleElement.parentElement) {
      document.head.appendChild(styleElement);
    }
  }, []);

  return null;
}
