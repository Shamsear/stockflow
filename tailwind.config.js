/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: 'var(--bg-base, #F8FAFC)',
        foreground: 'var(--text-primary, #0F172A)',
        surface: {
          DEFAULT: 'var(--bg-surface, #ffffff)',
          elevated: 'var(--bg-surface-elevated, #f4f3f0)',
          hover: 'var(--bg-surface-hover, #ececea)',
          popover: 'var(--bg-surface, #ffffff)',
          sticky: 'var(--bg-sticky, #faf9f6)',
        },
        border: 'var(--border-color, rgba(0, 0, 0, 0.08))',
        'border-strong': 'var(--border-color-strong, rgba(0, 0, 0, 0.16))',
        'border-accent': 'var(--border-color-accent, rgba(15, 118, 110, 0.3))',
        primary: {
          DEFAULT: 'var(--accent-primary, #0f766e)',
          hover: 'var(--accent-primary-hover, #0d9488)',
          light: 'var(--accent-primary-light, #14b8a6)',
          subtle: 'var(--accent-primary-subtle, rgba(15, 118, 110, 0.08))',
          glow: 'var(--accent-primary-glow, rgba(15, 118, 110, 0.12))',
        },
        secondary: {
          DEFAULT: 'var(--accent-secondary, #d97706)',
          hover: 'var(--accent-secondary-hover, #b45309)',
          subtle: 'var(--accent-secondary-subtle, rgba(217, 119, 6, 0.1))',
        },
        success: {
          DEFAULT: 'var(--color-success, #10b981)',
          subtle: 'var(--color-success-subtle, rgba(16, 185, 129, 0.15))',
        },
        warning: {
          DEFAULT: 'var(--color-warning, #f59e0b)',
          subtle: 'var(--color-warning-subtle, rgba(245, 158, 11, 0.15))',
        },
        danger: {
          DEFAULT: 'var(--color-danger, #ef4444)',
          hover: 'var(--color-danger-hover, #dc2626)',
          subtle: 'var(--color-danger-subtle, rgba(239, 68, 68, 0.15))',
        },
        info: {
          DEFAULT: 'var(--color-info, #06b6d4)',
          subtle: 'var(--color-info-subtle, rgba(6, 182, 212, 0.15))',
        },
        text: {
          primary: 'var(--text-primary, #0f172a)',
          secondary: 'var(--text-secondary, #475569)',
          muted: 'var(--text-muted, #94a3b8)',
          inverse: 'var(--text-inverse, #ffffff)',
        },
        brand: {
          50: "#F0FDFA",
          100: "#CCFBF1",
          500: "#14B8A6",
          600: "#0D9488",
          700: "#0F766E",
          800: "#115E59",
          900: "#134E4A",
          950: "#042F2E",
        },
        navy: {
          800: "#1E293B",
          900: "#0F172A",
          950: "#020617",
        },
        whatsapp: {
          500: "#25D366",
          600: "#1EBE5D",
          700: "#16A34A",
        },
      },
      fontFamily: {
        sans: ["var(--font-jakarta)", "Inter", "system-ui", "-apple-system", "sans-serif"],
        display: ["var(--font-display)", "Outfit", "sans-serif"],
        mono: ["var(--font-mono)", "JetBrains Mono", "monospace"],
      },
      borderRadius: {
        xs: 'var(--radius-xs, 6px)',
        sm: 'var(--radius-sm, 10px)',
        md: 'var(--radius-md, 16px)',
        lg: 'var(--radius-lg, 24px)',
      },
      boxShadow: {
        subtle: "0 1px 2px 0 rgba(15, 23, 42, 0.05)",
        card: "0 4px 6px -1px rgba(15, 23, 42, 0.05), 0 2px 4px -2px rgba(15, 23, 42, 0.05)",
        float: "0 20px 25px -5px rgba(15, 23, 42, 0.08), 0 8px 10px -6px rgba(15, 23, 42, 0.04)",
        sm: 'var(--shadow-sm, 0 1px 3px rgba(0, 0, 0, 0.05))',
        md: 'var(--shadow-md, 0 4px 12px rgba(0, 0, 0, 0.08))',
        lg: 'var(--shadow-lg, 0 10px 25px rgba(0, 0, 0, 0.1))',
        glow: 'var(--shadow-glow, 0 0 20px rgba(15, 118, 110, 0.12))',
      },
    },
  },
  plugins: [],
};
