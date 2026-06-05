/**
 * ObsidianShader — "Obsidian Refraction"
 *
 * Fixed full-viewport background shader. Polished dark glass with visible
 * color refractions — deep amber from upper-left, cyan from upper-right,
 * a slow luminance sweep, and corner vignettes pulling back to pure black.
 *
 * Previous version was invisible — colors were too close to background.
 * This version uses much higher lightness (0.35–0.55) and real opacity (0.2–0.5)
 * so the gradients are actually perceptible while staying dark and minimal.
 */
export function ObsidianShader() {
  return (
    <>
      <div className="obsidian-shader" aria-hidden="true">
        {/* Amber pool — upper left warm glow */}
        <div className="obsidian-amber" />
        {/* Cyan pool — upper right accent echo */}
        <div className="obsidian-cyan" />
        {/* Indigo base tone — lower center depth */}
        <div className="obsidian-indigo" />
        {/* Rotating luminance sweep */}
        <div className="obsidian-sweep" />
        {/* Corner vignette — keeps edges dark */}
        <div className="obsidian-vignette" />
      </div>

      <style>{`
        /* ── Container ───────────────────────────────────────── */
        .obsidian-shader {
          position: fixed;
          inset: 0;
          z-index: -1;
          pointer-events: none;
          overflow: hidden;
          background-color: #080a0f;
          isolation: isolate;
        }

        /* ── Amber pool ──────────────────────────────────────── */
        /* Warm golden-amber from upper-left — like sunrise through dark glass */
        .obsidian-amber {
          position: absolute;
          inset: 0;
          background: radial-gradient(
            ellipse 65% 55% at -5% 0%,
            oklch(0.48 0.12 50 / 0.72) 0%,
            oklch(0.32 0.09 45 / 0.38) 40%,
            transparent 72%
          );
          animation: obsidianAmberPulse 18s ease-in-out infinite alternate;
        }

        /* ── Cyan pool ───────────────────────────────────────── */
        /* Electric cyan from upper-right — the site accent colour bleeding in */
        .obsidian-cyan {
          position: absolute;
          inset: 0;
          background: radial-gradient(
            ellipse 55% 50% at 105% 5%,
            oklch(0.52 0.18 220 / 0.62) 0%,
            oklch(0.35 0.12 215 / 0.32) 40%,
            transparent 68%
          );
          animation: obsidianCyanPulse 22s ease-in-out infinite alternate-reverse;
        }

        /* ── Indigo depth ────────────────────────────────────── */
        /* Cool blue-indigo settling at the bottom — gives the page weight */
        .obsidian-indigo {
          position: absolute;
          inset: 0;
          background: radial-gradient(
            ellipse 80% 45% at 50% 110%,
            oklch(0.30 0.10 265 / 0.65) 0%,
            oklch(0.18 0.06 260 / 0.40) 45%,
            transparent 75%
          );
        }

        /* ── Luminance sweep ─────────────────────────────────── */
        /* Slow conic rotation — ghost of light moving behind the glass */
        .obsidian-sweep {
          position: absolute;
          inset: -60%;
          background: conic-gradient(
            from 0deg at 55% 45%,
            transparent                        0deg,
            oklch(0.55 0.14 220 / 0.18)       18deg,
            transparent                       45deg,
            transparent                      170deg,
            oklch(0.50 0.11 48  / 0.15)      190deg,
            transparent                      220deg,
            transparent                      360deg
          );
          animation: obsidianRotate 55s linear infinite;
        }

        /* ── Edge vignette ───────────────────────────────────── */
        /* Pulls corners back into deep black — prevents colour bleeding */
        .obsidian-vignette {
          position: absolute;
          inset: 0;
          background: radial-gradient(
            ellipse 75% 65% at 50% 38%,
            transparent 0%,
            rgba(4, 5, 10, 0.60) 70%,
            rgba(2, 3, 7,  0.90) 100%
          );
          pointer-events: none;
        }

        /* ── Keyframes ───────────────────────────────────────── */

        @keyframes obsidianAmberPulse {
          0%   { opacity: 1;    transform: scale(1)    translate(0%, 0%); }
          50%  { opacity: 0.75; transform: scale(1.08) translate(2%, 3%); }
          100% { opacity: 0.90; transform: scale(0.95) translate(-1%, 1%); }
        }

        @keyframes obsidianCyanPulse {
          0%   { opacity: 1;    transform: scale(1)    translate(0%, 0%); }
          50%  { opacity: 0.70; transform: scale(1.10) translate(-2%, 2%); }
          100% { opacity: 0.85; transform: scale(0.98) translate(1%, -1%); }
        }

        @keyframes obsidianRotate {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
      `}</style>
    </>
  );
}
