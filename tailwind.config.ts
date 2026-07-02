import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      spacing: {
        "margin-desktop": "80px",
        "gutter": "24px",
        "base": "8px",
        "margin-mobile": "20px",
        "section-gap": "120px"
      },
      colors: {
  "surface-container-highest": "#353535",
  "surface-tint": "#ffb4a8",
  "surface-bright": "#393939",
  "on-tertiary-fixed-variant": "#474746",
  "outline-variant": "#603e39",
  "primary-container": "#ff5540",
  "inverse-on-surface": "#303030",
  "inverse-primary": "#c00100",
  "background": "#131313",
  "primary-fixed": "#ffdad4",
  "on-error": "#690005",
  "on-primary-fixed": "#410000",
  "on-tertiary-container": "#2a2a2a",
  "outline": "#b18780",
  "surface": "#131313",
  "error": "#ffb4ab",
  "primary-fixed-dim": "#ffb4a8",
  "on-secondary-fixed-variant": "#454747",
  "on-error-container": "#ffdad6",
  "surface-container-low": "#1b1b1b",
  "on-surface": "#e2e2e2",
  "on-tertiary-fixed": "#1c1b1b",
  "secondary-fixed-dim": "#c6c6c7",
  "on-secondary": "#2f3131",
  "surface-container-lowest": "#0e0e0e",
  "on-secondary-fixed": "#1a1c1c",
  "secondary": "#c6c6c7",
  "on-surface-variant": "#ebbbb4",
  "tertiary-fixed-dim": "#c8c6c5",
  "surface-variant": "#353535",
  "on-primary-container": "#5c0000",
  "surface-container-high": "#2a2a2a",
  "tertiary-fixed": "#e5e2e1",
  "surface-dim": "#131313",
  "inverse-surface": "#e2e2e2",
  "surface-container": "#1f1f1f",
  "on-tertiary": "#313030",
  "on-background": "#e2e2e2",
  "error-container": "#93000a",
  "secondary-container": "#454747",
  "on-primary": "#690100",
  "tertiary-container": "#929090",
  "primary": "#ffb4a8",
  "secondary-fixed": "#e2e2e2",
  "on-secondary-container": "#b4b5b5",
  "tertiary": "#c8c6c5",
  "on-primary-fixed-variant": "#930100"
},
      fontFamily: {
        display: ["var(--font-display)", "sans-serif"],
        body: ["var(--font-body)", "sans-serif"],
      },
      fontSize: {
  "headline-lg": [
    "40px",
    {
      "lineHeight": "1.2",
      "letterSpacing": "-0.01em",
      "fontWeight": "700"
    }
  ],
  "body-md": [
    "16px",
    {
      "lineHeight": "1.5",
      "fontWeight": "400"
    }
  ],
  "headline-lg-mobile": [
    "32px",
    {
      "lineHeight": "1.2",
      "fontWeight": "700"
    }
  ],
  "body-lg": [
    "18px",
    {
      "lineHeight": "1.6",
      "fontWeight": "400"
    }
  ],
  "headline-md": [
    "24px",
    {
      "lineHeight": "1.3",
      "fontWeight": "600"
    }
  ],
  "headline-xl": [
    "64px",
    {
      "lineHeight": "1.1",
      "letterSpacing": "-0.02em",
      "fontWeight": "800"
    }
  ],
  "label-md": [
    "14px",
    {
      "lineHeight": "1",
      "letterSpacing": "0.05em",
      "fontWeight": "600"
    }
  ],
  "label-sm": [
    "12px",
    {
      "lineHeight": "1",
      "fontWeight": "500"
    }
  ]
},
      borderRadius: {
        brand: "0px",
      },
    },
  },
  plugins: [],
};

export default config;
