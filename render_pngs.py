import resvg_py

# 1. Square Icon (Transparent, 1024x1024)
svg_icon_transparent = """
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024" width="1024" height="1024" fill="none">
  <defs>
    <linearGradient id="g-navy" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0F172A" />
      <stop offset="100%" stop-color="#1E293B" />
    </linearGradient>
    <linearGradient id="g-teal" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0F766E" />
      <stop offset="100%" stop-color="#14B8A6" />
    </linearGradient>
  </defs>
  <g transform="translate(102, 102) scale(17)">
    <path d="M10 14C10 10.6863 12.6863 8 16 8H36C37.1046 8 38 8.89543 38 10V16C38 17.1046 37.1046 18 36 18H20C17.7909 18 16 19.7909 16 22C16 22.5523 15.5523 23 15 23H11C10.4477 23 10 22.5523 10 22V14Z" fill="url(#g-navy)" />
    <rect x="20" y="21" width="8" height="6" rx="3" fill="#0F766E" />
    <path d="M38 34C38 37.3137 35.3137 40 32 40H12C10.8954 40 10 39.1046 10 38V32C10 30.8954 10.8954 30 12 30H28C30.2091 30 32 28.2091 32 26C32 25.4477 32.4477 25 33 25H37C37.5523 25 38 25.4477 38 26V34Z" fill="url(#g-teal)" />
  </g>
</svg>
"""

# 2. WhatsApp Profile Picture (Dark Slate Background with Safe Circular Padding, 1024x1024)
svg_whatsapp_profile = """
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024" width="1024" height="1024" fill="none">
  <rect width="1024" height="1024" fill="#0F172A" />
  <defs>
    <linearGradient id="w-white" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FFFFFF" />
      <stop offset="100%" stop-color="#E2E8F0" />
    </linearGradient>
    <linearGradient id="w-teal" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0F766E" />
      <stop offset="100%" stop-color="#14B8A6" />
    </linearGradient>
  </defs>
  <!-- Safe-padded centered icon (560px size within 1024 canvas ensures no circle crop cuts) -->
  <g transform="translate(232, 232) scale(11.66)">
    <path d="M10 14C10 10.6863 12.6863 8 16 8H36C37.1046 8 38 8.89543 38 10V16C38 17.1046 37.1046 18 36 18H20C17.7909 18 16 19.7909 16 22C16 22.5523 15.5523 23 15 23H11C10.4477 23 10 22.5523 10 22V14Z" fill="url(#w-white)" />
    <rect x="20" y="21" width="8" height="6" rx="3" fill="#14B8A6" />
    <path d="M38 34C38 37.3137 35.3137 40 32 40H12C10.8954 40 10 39.1046 10 38V32C10 30.8954 10.8954 30 12 30H28C30.2091 30 32 28.2091 32 26C32 25.4477 32.4477 25 33 25H37C37.5523 25 38 25.4477 38 26V34Z" fill="url(#w-teal)" />
  </g>
</svg>
"""

# 3. WhatsApp Profile Picture (Clean Light / Teal Accent, 1024x1024)
svg_whatsapp_profile_light = """
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024" width="1024" height="1024" fill="none">
  <rect width="1024" height="1024" fill="#F8FAFC" />
  <defs>
    <linearGradient id="l-navy" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0F172A" />
      <stop offset="100%" stop-color="#1E293B" />
    </linearGradient>
    <linearGradient id="l-teal" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0F766E" />
      <stop offset="100%" stop-color="#14B8A6" />
    </linearGradient>
  </defs>
  <g transform="translate(232, 232) scale(11.66)">
    <path d="M10 14C10 10.6863 12.6863 8 16 8H36C37.1046 8 38 8.89543 38 10V16C38 17.1046 37.1046 18 36 18H20C17.7909 18 16 19.7909 16 22C16 22.5523 15.5523 23 15 23H11C10.4477 23 10 22.5523 10 22V14Z" fill="url(#l-navy)" />
    <rect x="20" y="21" width="8" height="6" rx="3" fill="#0F766E" />
    <path d="M38 34C38 37.3137 35.3137 40 32 40H12C10.8954 40 10 39.1046 10 38V32C10 30.8954 10.8954 30 12 30H28C30.2091 30 32 28.2091 32 26C32 25.4477 32.4477 25 33 25H37C37.5523 25 38 25.4477 38 26V34Z" fill="url(#l-teal)" />
  </g>
</svg>
"""

# 4. Full Horizontal Logo (Transparent Background, 2000x500)
svg_full_logo = """
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2000 500" width="2000" height="500" fill="none">
  <defs>
    <linearGradient id="fl-navy" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0F172A" />
      <stop offset="100%" stop-color="#1E293B" />
    </linearGradient>
    <linearGradient id="fl-teal" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0F766E" />
      <stop offset="100%" stop-color="#14B8A6" />
    </linearGradient>
  </defs>

  <!-- Left Glyph (360x360 scaled from 48x48) -->
  <g transform="translate(80, 70) scale(7.5)">
    <path d="M10 14C10 10.6863 12.6863 8 16 8H36C37.1046 8 38 8.89543 38 10V16C38 17.1046 37.1046 18 36 18H20C17.7909 18 16 19.7909 16 22C16 22.5523 15.5523 23 15 23H11C10.4477 23 10 22.5523 10 22V14Z" fill="url(#fl-navy)" />
    <rect x="20" y="21" width="8" height="6" rx="3" fill="#0F766E" />
    <path d="M38 34C38 37.3137 35.3137 40 32 40H12C10.8954 40 10 39.1046 10 38V32C10 30.8954 10.8954 30 12 30H28C30.2091 30 32 28.2091 32 26C32 25.4477 32.4477 25 33 25H37C37.5523 25 38 25.4477 38 26V34Z" fill="url(#fl-teal)" />
  </g>

  <!-- Wordmark -->
  <text x="500" y="325" font-family="Arial, Helvetica, sans-serif" font-size="230" font-weight="900" fill="#0F172A" letter-spacing="-8">Stock<tspan font-weight="700" fill="#0F766E">Flow</tspan></text>

  <!-- WMS Pill Badge -->
  <rect x="1650" y="180" width="220" height="90" rx="20" fill="#F0FDFA" stroke="#0F766E" stroke-width="8" />
  <text x="1690" y="245" font-family="Arial, Helvetica, sans-serif" font-size="64" font-weight="800" fill="#0F766E" letter-spacing="2">WMS</text>
</svg>
"""

# 5. Full Horizontal Logo on Dark Background (2000x500)
svg_full_logo_dark = """
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2000 500" width="2000" height="500" fill="none">
  <rect width="2000" height="500" fill="#0F172A" />
  <defs>
    <linearGradient id="fld-white" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FFFFFF" />
      <stop offset="100%" stop-color="#E2E8F0" />
    </linearGradient>
    <linearGradient id="fld-teal" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0F766E" />
      <stop offset="100%" stop-color="#14B8A6" />
    </linearGradient>
  </defs>

  <g transform="translate(80, 70) scale(7.5)">
    <path d="M10 14C10 10.6863 12.6863 8 16 8H36C37.1046 8 38 8.89543 38 10V16C38 17.1046 37.1046 18 36 18H20C17.7909 18 16 19.7909 16 22C16 22.5523 15.5523 23 15 23H11C10.4477 23 10 22.5523 10 22V14Z" fill="url(#fld-white)" />
    <rect x="20" y="21" width="8" height="6" rx="3" fill="#14B8A6" />
    <path d="M38 34C38 37.3137 35.3137 40 32 40H12C10.8954 40 10 39.1046 10 38V32C10 30.8954 10.8954 30 12 30H28C30.2091 30 32 28.2091 32 26C32 25.4477 32.4477 25 33 25H37C37.5523 25 38 25.4477 38 26V34Z" fill="url(#fld-teal)" />
  </g>

  <text x="500" y="325" font-family="Arial, Helvetica, sans-serif" font-size="230" font-weight="900" fill="#FFFFFF" letter-spacing="-8">Stock<tspan font-weight="700" fill="#14B8A6">Flow</tspan></text>

  <rect x="1650" y="180" width="220" height="90" rx="20" fill="#134E4A" stroke="#14B8A6" stroke-width="8" />
  <text x="1690" y="245" font-family="Arial, Helvetica, sans-serif" font-size="64" font-weight="800" fill="#14B8A6" letter-spacing="2">WMS</text>
</svg>
"""

renders = [
    ("c:/stockflow/public/stockflow-icon-1024.png", svg_icon_transparent),
    ("c:/stockflow/public/stockflow-whatsapp-profile.png", svg_whatsapp_profile),
    ("c:/stockflow/public/stockflow-whatsapp-profile-light.png", svg_whatsapp_profile_light),
    ("c:/stockflow/public/stockflow-logo-full.png", svg_full_logo),
    ("c:/stockflow/public/stockflow-logo-dark.png", svg_full_logo_dark),
]

for path, svg_code in renders:
    png_bytes = resvg_py.svg_to_bytes(svg_code)
    with open(path, "wb") as f:
        f.write(png_bytes)
    print(f"Generated: {path} ({len(png_bytes):,} bytes)")

print("All high-res PNG logos generated successfully!")
