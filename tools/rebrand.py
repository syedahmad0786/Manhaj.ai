#!/usr/bin/env python3
"""
Manhaj rebrand: anonymizes the three kiosk dashboards (replaces client names,
logos, and brand palette colors with Manhaj equivalents) by patching their
embedded bundler manifest + template. Run after `cp` of the originals.
"""
import json, base64, gzip, re, sys
from pathlib import Path

# ----- Manhaj palette -----
INK     = "#0A0A0B"
INK_DEEP= "#000000"
INK_2   = "#16161A"
LINE    = "#2A2A30"
GOLD    = "#C9A961"
GOLD_HOV= "#B8965A"
GOLD_LT = "#D4B872"
GOLD_DK = "#A88B4F"
CREAM   = "#F5F2EA"

DIAMOND_SVG_TPL = (
  '<svg width={S} height={S} viewBox="0 0 24 24" fill="none" aria-hidden="true">'
  '<path d="M12 1.5 L22.5 12 L12 22.5 L1.5 12 Z" stroke={STROKE} strokeWidth="1.1" fill="none" opacity="0.55"/>'
  '<path d="M12 6 L18 12 L12 18 L6 12 Z" fill={FILL}/></svg>'
)

# ---------- universal text rebrand ----------
def rebrand_text(s):
    s = s.replace('ChiroCandy Command Center', 'Manhaj · Command Center')
    s = s.replace('A Modern Amenities product', 'An AOS-001 product')
    s = s.replace('Modern Amenities · Operator Onboarding', 'Manhaj · Operator Onboarding')
    s = s.replace('Modern Amenities', 'Manhaj')
    s = s.replace('MODERN AMENITIES', 'MANHAJ')
    s = s.replace('modern amenities', 'manhaj')
    s = s.replace('modern-amenities.com', 'manhaj.ai')
    s = s.replace('modern-amenities', 'manhaj')
    s = s.replace('ChiroCandy', 'Manhaj')
    s = s.replace('CHIROCANDY', 'MANHAJ')
    s = s.replace('chirocandy', 'manhaj')
    s = s.replace('ErrorLens — redesign', 'ErrorLens')
    s = s.replace('Vendingpreneurs · Onboarding', 'Operator · Onboarding')
    s = s.replace('Vendingpreneurs', 'Operator')
    s = s.replace('vendingpreneurs-dashboard', 'manhaj-dashboard')
    s = s.replace('vendingpreneurs', 'operator')
    return s

# ---------- ChiroCandy specifics ----------
def rebrand_chirocandy(s):
    # Component-level hex swaps (covers brand object AND inline style props).
    pairs = [
        # navys
        ("#0B1F3A", INK),       ("#0b1f3a", INK),
        ("#08172B", INK_DEEP),  ("#08172b", INK_DEEP),
        ("#142B4D", INK_2),     ("#142b4d", INK_2),
        ("#1E3866", LINE),      ("#1e3866", LINE),
        # greens -> gold tones
        ("#7FBA3F", GOLD),      ("#7fba3f", GOLD),
        ("#9FD157", GOLD_LT),   ("#9fd157", GOLD_LT),
        ("#5E8F2A", GOLD_DK),   ("#5e8f2a", GOLD_DK),
        # url-encoded forms in template SVGs
        ("%230B1F3A", "%230A0A0B"),
        ("%237FBA3F", "%23C9A961"),
    ]
    for a, b in pairs:
        s = s.replace(a, b)
    return s

def replace_ccmark(s):
    pat = re.compile(
        r"function CCMark\([^)]*\)\s*\{\s*return\s*\(\s*<svg[^>]*>.*?</svg>\s*\)\s*;\s*\}",
        re.S,
    )
    new_body = (
        "function CCMark({ size = 28, accent = '" + GOLD + "', stroke = '" + CREAM + "' }) {\n"
        "  return (\n"
        "    <svg width={size} height={size} viewBox=\"0 0 24 24\" fill=\"none\" aria-hidden=\"true\">\n"
        "      <path d=\"M12 1.5 L22.5 12 L12 22.5 L1.5 12 Z\" stroke={stroke} strokeWidth=\"1.1\" fill=\"none\" opacity=\"0.6\"/>\n"
        "      <path d=\"M12 6 L18 12 L12 18 L6 12 Z\" fill={accent}/>\n"
        "    </svg>\n"
        "  );\n"
        "}"
    )
    return pat.sub(new_body, s)

def replace_ccwordmark(s):
    s = s.replace(
        "chiro<span style={{fontWeight:400}}>candy</span>",
        "MAN<span style={{fontWeight:400}}>HAJ</span>"
    )
    s = s.replace(">COMMAND CENTER<", ">AOS-001 · COMMAND CENTER<")
    return s

# ---------- Onboarding (Modern Amenities) specifics ----------
def rebrand_onboarding(s):
    repl = {
        "#e8c020": GOLD,            # ma-gold
        "#d4ad12": GOLD_HOV,        # ma-gold hover
        "#184010": "#1A3D2E",       # ma-forest -> deep manhaj-aligned green
        "#faf4d3": CREAM,           # ma-light-gold -> Manhaj cream
        "#e8f0e4": "#EAE7DD",       # ma-sage -> warmer cream
        "rgba(232, 192, 32": "rgba(201, 169, 97",
        "rgba(232,192,32":  "rgba(201,169,97",
    }
    for k, v in repl.items():
        s = s.replace(k, v)
    return s

def replace_onboarding_logo(s):
    needle = (
        '<img src={(window.__resources && window.__resources.maIconUser) || '
        '"assets/ma-icon-user.png"} alt="" '
        "style={{height:28,width:'auto',display:'block'}}/>"
    )
    new = (
        '<svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden="true">'
        '<path d="M12 1.5 L22.5 12 L12 22.5 L1.5 12 Z" stroke="' + CREAM + '" strokeWidth="1" fill="none" opacity="0.55"/>'
        '<path d="M12 6 L18 12 L12 18 L6 12 Z" fill="' + GOLD + '"/></svg>'
    )
    return s.replace(needle, new)

# ---------- ErrorLens specifics ----------
def rebrand_errorlens(s):
    pairs = [
        ("--accent:         hsl(217, 91%, 60%)",    f"--accent:         {GOLD}"),
        ("--accent-hover:   hsl(217, 91%, 55%)",    f"--accent-hover:   {GOLD_HOV}"),
        ("--accent-subtle:  hsla(217, 91%, 60%, 0.12)", "--accent-subtle:  rgba(201,169,97,0.16)"),
        ("--accent:         hsl(217, 91%, 50%)",    f"--accent:         {GOLD}"),
        ("--accent-hover:   hsl(217, 91%, 45%)",    f"--accent-hover:   {GOLD_HOV}"),
        ("--accent-subtle:  hsla(217, 91%, 50%, 0.10)", "--accent-subtle:  rgba(201,169,97,0.16)"),
        ("--accent:         #e8c020",  f"--accent:         {GOLD}"),
        ("--accent-hover:   #d4ad12",  f"--accent-hover:   {GOLD_HOV}"),
        ("rgba(232, 192, 32, 0.16)",   "rgba(201,169,97,0.16)"),
        ("--accent: #e8c020",          f"--accent: {GOLD}"),
        ("--accent-hover: #d4ad12",    f"--accent-hover: {GOLD_HOV}"),
        ("rgba(232,192,32,0.16)",      "rgba(201,169,97,0.16)"),
        ("--accent: #2a7220",          f"--accent: {GOLD}"),
        ("--accent-hover: #1f5417",    f"--accent-hover: {GOLD_HOV}"),
        ("rgba(42,114,32,0.15)",       "rgba(201,169,97,0.16)"),
        ("--accent: hsl(263, 80%, 60%)", f"--accent: {GOLD}"),
        ("--accent-hover: hsl(263, 80%, 55%)", f"--accent-hover: {GOLD_HOV}"),
        ("hsla(263,80%,60%,0.12)",     "rgba(201,169,97,0.16)"),
        ("#184010", "#1A3D2E"),  # legacy forest -> Manhaj-aligned deeper green
    ]
    for a, b in pairs:
        s = s.replace(a, b)
    return s

def replace_ma_mark_css(s):
    """Swap the CSS rule for `.ma-mark` (Modern Amenities logo as background-image
    via a manifest UUID) for an inline SVG diamond mark in Manhaj colors."""
    pat = re.compile(r"\.ma-mark\s*\{[^}]+\}", re.S)
    diamond = (
        "<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'>"
        "<path d='M12 1.5 L22.5 12 L12 22.5 L1.5 12 Z' stroke='%23F5F2EA' "
        "stroke-width='1' fill='none' opacity='0.55'/>"
        "<path d='M12 6 L18 12 L12 18 L6 12 Z' fill='%23C9A961'/></svg>"
    )
    new_rule = (
        ".ma-mark { width: 26px; height: 26px; "
        f"background: url(\"data:image/svg+xml;utf8,{diamond}\") center/contain no-repeat; "
        "display: var(--logo-display); flex-shrink: 0; }"
    )
    return pat.sub(new_rule, s)

# ---------- favicon swap (any bundle) ----------
MANHAJ_FAVICON = (
    "data:image/svg+xml,"
    "%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E"
    "%3Crect width='24' height='24' fill='%230A0A0B'/%3E"
    "%3Cpath d='M12 4 L20 12 L12 20 L4 12 Z' fill='none' "
    "stroke='%23F5F2EA' stroke-width='1' opacity='0.55'/%3E"
    "%3Cpath d='M12 7.5 L16.5 12 L12 16.5 L7.5 12 Z' fill='%23C9A961'/%3E"
    "%3C/svg%3E"
)

def replace_favicon(s):
    return re.sub(
        r'<link rel="(?:icon|shortcut icon)"[^>]+>',
        f'<link rel="icon" href="{MANHAJ_FAVICON}">',
        s,
    )

# ---------- per-file pipeline ----------
def kind_specific_text(s, kind):
    s = rebrand_text(s)
    s = replace_favicon(s)
    if kind == "chirocandy":
        s = rebrand_chirocandy(s)
        s = replace_ccmark(s)
        s = replace_ccwordmark(s)
    elif kind == "onboarding":
        s = rebrand_onboarding(s)
        s = replace_onboarding_logo(s)
    elif kind == "errorlens":
        s = rebrand_errorlens(s)
        s = replace_ma_mark_css(s)
    return s

# Match whole bundler script block including marker so we know we're touching the
# right one. The non-greedy capture is bounded by the closing tag.
SCRIPT_RE = lambda kind: re.compile(
    r'(<script type="__bundler/' + kind + r'">)(.*?)(</script>)', re.S
)

def process(filepath, kind):
    p = Path(filepath)
    text = p.read_text(encoding="utf-8")

    # Outer <title>
    title_map = {
        "chirocandy": "Manhaj · Command Center",
        "errorlens":  "Manhaj · ErrorLens",
        "onboarding": "Manhaj · Operator Onboarding",
    }
    text = re.sub(
        r"<title>[^<]+</title>",
        f"<title>{title_map[kind]}</title>",
        text,
        count=1,
    )

    # ----- manifest (base64-encoded asset bytes) -----
    mm = SCRIPT_RE("manifest").search(text)
    if not mm:
        raise RuntimeError(f"no manifest in {filepath}")
    manifest = json.loads(mm.group(2))
    new_manifest = {}
    text_rewrites = 0
    for uuid, entry in manifest.items():
        raw = base64.b64decode(entry["data"])
        compressed = entry.get("compressed", False)
        original_bytes = raw
        try:
            content = gzip.decompress(raw) if compressed else raw
        except Exception:
            new_manifest[uuid] = entry
            continue
        # Try utf-8 decode
        try:
            s = content.decode("utf-8")
            new_s = kind_specific_text(s, kind)
            if new_s != s:
                text_rewrites += 1
                content = new_s.encode("utf-8")
            else:
                new_manifest[uuid] = entry
                continue
        except UnicodeDecodeError:
            new_manifest[uuid] = entry
            continue
        # Recompress / re-encode
        if compressed:
            content = gzip.compress(content)
        new_entry = dict(entry)
        new_entry["data"] = base64.b64encode(content).decode("ascii")
        new_manifest[uuid] = new_entry

    new_manifest_str = json.dumps(new_manifest, separators=(",", ":"))
    text = text[:mm.start()] + mm.group(1) + new_manifest_str + mm.group(3) + text[mm.end():]

    # ----- template (JSON-encoded HTML string) -----
    tm = SCRIPT_RE("template").search(text)
    if not tm:
        raise RuntimeError(f"no template in {filepath}")
    template = json.loads(tm.group(2))
    new_template = kind_specific_text(template, kind)
    template_changed = new_template != template

    # Re-encode and ensure no raw </script> sneaks in.
    encoded = json.dumps(new_template, ensure_ascii=False)
    encoded = encoded.replace("</", "<\\/")
    text = text[:tm.start()] + tm.group(1) + encoded + tm.group(3) + text[tm.end():]

    p.write_text(text, encoding="utf-8")
    print(f"{p.name}: rewrote {text_rewrites} manifest entries; template changed: {template_changed}")

if __name__ == "__main__":
    repo = Path(__file__).resolve().parent.parent
    src_targets = [
        ("ChiroCandy Command Center _standalone_.html", "chirocandy", "command-center.html"),
        ("ErrorLens _standalone_.html",                 "errorlens",  "errorlens.html"),
        ("Onboarding Dashboard _standalone_.html",      "onboarding", "onboarding.html"),
    ]
    app_dir = repo / "public" / "kiosks" / "_app"
    app_dir.mkdir(parents=True, exist_ok=True)
    for src_name, kind, out_name in src_targets:
        src = repo / src_name
        dst = app_dir / out_name
        dst.write_bytes(src.read_bytes())
        process(str(dst), kind)
