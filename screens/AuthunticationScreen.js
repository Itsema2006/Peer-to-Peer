import { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { Dimensions } from "react-native";

const style = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;800;900&family=DM+Sans:ital,wght@0,300;0,400;0,500;0,600;1,400&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  body {
    font-family: 'DM Sans', sans-serif;
    background: #0f0e17;
    min-height: 100vh;
  }

  /* ══════════════════════════════════════════════
     DESKTOP LAYOUT  (≥ 768px)
  ══════════════════════════════════════════════ */
  .app-root {
    min-height: 100vh;
    display: flex;
  }

  /* LEFT PANEL — decorative / branding */
  .left-panel {
    display: none;
  }

  /* RIGHT PANEL — form area */
  .right-panel {
    flex: 1;
    min-height: 100vh;
    background: #0f0e17;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 40px 24px;
  }

  .form-shell {
    width: 100%;
    max-width: 460px;
  }

  @media (min-width: 768px) {
    .left-panel {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: flex-start;
      width: 52%;
      min-height: 100vh;
      position: relative;
      overflow: hidden;
      padding: 60px 56px;
      background: linear-gradient(135deg, #1a0533 0%, #2d0a5e 40%, #1a1060 100%);
    }

    .right-panel {
      width: 48%;
      padding: 60px 48px;
      background: #0f0e17;
    }

    .form-shell {
      max-width: 420px;
    }
  }

  @media (min-width: 1200px) {
    .left-panel { padding: 80px 72px; }
    .right-panel { padding: 60px 72px; }
  }

  /* ── Left panel decorations ── */
  .lp-blob {
    position: absolute;
    border-radius: 50%;
    filter: blur(80px);
    pointer-events: none;
  }
  .lp-blob-1 { width: 400px; height: 400px; background: rgba(244,114,182,.25); top: -100px; right: -80px; }
  .lp-blob-2 { width: 320px; height: 320px; background: rgba(129,140,248,.2);  bottom: -60px; left: -60px; }
  .lp-blob-3 { width: 200px; height: 200px; background: rgba(251,191,36,.15);  top: 45%; left: 30%; animation: lpFloat 7s ease-in-out infinite; }
  @keyframes lpFloat { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-24px)} }

  .lp-grid {
    position: absolute;
    inset: 0;
    opacity: .06;
    background-image:
      linear-gradient(rgba(255,255,255,.6) 1px, transparent 1px),
      linear-gradient(90deg, rgba(255,255,255,.6) 1px, transparent 1px);
    background-size: 40px 40px;
  }

  .lp-brand {
    position: relative;
    z-index: 2;
    margin-bottom: 48px;
    display: flex;
    align-items: center;
    gap: 10px;
  }
  .lp-logo {
    width: 40px; height: 40px;
    background: linear-gradient(135deg,#f472b6,#818cf8);
    border-radius: 12px;
    display: flex; align-items: center; justify-content: center;
    font-size: 20px;
  }
  .lp-brand-name {
    font-family: 'Playfair Display', serif;
    font-size: 20px;
    font-weight: 800;
    color: #fff;
  }

  .lp-headline {
    position: relative;
    z-index: 2;
    font-family: 'Playfair Display', serif;
    font-size: clamp(32px, 3.5vw, 52px);
    font-weight: 900;
    color: #fff;
    line-height: 1.1;
    margin-bottom: 20px;
  }
  .lp-headline em {
    font-style: normal;
    background: linear-gradient(90deg,#f472b6,#c084fc,#818cf8);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
  .lp-desc {
    position: relative; z-index: 2;
    font-size: 15px;
    color: rgba(255,255,255,.55);
    line-height: 1.7;
    max-width: 360px;
    margin-bottom: 48px;
  }

  .lp-stats {
    position: relative; z-index: 2;
    display: flex;
    gap: 32px;
  }
  .lp-stat-num {
    font-family: 'Playfair Display', serif;
    font-size: 28px;
    font-weight: 800;
    color: #fff;
    line-height: 1;
  }
  .lp-stat-lbl {
    font-size: 12px;
    color: rgba(255,255,255,.45);
    margin-top: 4px;
  }

  .lp-illo {
    position: relative; z-index: 2;
    margin: 40px 0;
    display: flex;
    justify-content: center;
  }

  .lp-features {
    position: relative; z-index: 2;
    display: flex;
    flex-direction: column;
    gap: 14px;
    margin-top: 40px;
  }
  .lp-feat {
    display: flex;
    align-items: center;
    gap: 12px;
    color: rgba(255,255,255,.7);
    font-size: 14px;
  }
  .lp-feat-icon {
    width: 32px; height: 32px;
    border-radius: 9px;
    background: rgba(255,255,255,.08);
    border: 1px solid rgba(255,255,255,.1);
    display: flex; align-items: center; justify-content: center;
    font-size: 15px;
    flex-shrink: 0;
  }

  /* ══════════════════════════════════════════════
     FORM AREA (right panel / mobile full)
  ══════════════════════════════════════════════ */

  /* Mobile: full-screen gradient like before */
  @media (max-width: 767px) {
    .app-root { display: block; }
    .right-panel {
      width: 100%; min-height: 100vh;
      background: linear-gradient(160deg,#fbcfe8 0%,#c4b5fd 45%,#a5b4fc 100%);
      padding: 0;
      position: relative;
    }
    .form-shell {
      max-width: 100%;
      padding: 0;
    }
    /* mobile blobs */
    .mobile-blob { display: block; }
    /* hide desktop left panel elements on mobile */
    .left-panel { display: none !important; }
  }

  @media (min-width: 768px) {
    .mobile-blob { display: none; }
  }

  /* ── Form brand header (desktop only) ── */
  .form-brand {
    display: none;
  }
  @media (min-width: 768px) {
    .form-brand {
      display: flex;
      align-items: center;
      gap: 10px;
      margin-bottom: 40px;
    }
    .form-brand-logo {
      width: 36px; height: 36px;
      background: linear-gradient(135deg,#f472b6,#818cf8);
      border-radius: 10px;
      display: flex; align-items: center; justify-content: center;
      font-size: 18px;
    }
    .form-brand-name {
      font-family: 'Playfair Display', serif;
      font-size: 18px; font-weight: 800;
      background: linear-gradient(90deg,#f472b6,#818cf8);
      -webkit-background-clip: text; -webkit-text-fill-color: transparent;
      background-clip: text;
    }
  }

  /* ── Page title ── */
  .pg-title {
    font-family: 'Playfair Display', serif;
    font-size: clamp(26px, 3vw, 34px);
    font-weight: 800;
    color: #fff;
    line-height: 1.15;
    margin-bottom: 6px;
  }
  .pg-sub {
    font-size: 14px;
    color: rgba(255,255,255,.45);
    margin-bottom: 32px;
    line-height: 1.6;
  }
  .pg-sub strong { color: #c084fc; font-weight: 600; }

  /* Mobile overrides for titles */
  @media (max-width: 767px) {
    .pg-title { color: #1e1b4b; }
    .pg-sub { color: #6b7280; }
  }

  /* ── Back btn ── */
  .back-btn {
    display: inline-flex; align-items: center; gap: 6px;
    font-size: 13px; font-weight: 500;
    color: rgba(255,255,255,.5);
    background: none; border: none; cursor: pointer;
    padding: 6px 0; margin-bottom: 28px;
    transition: color .2s;
  }
  .back-btn:hover { color: rgba(255,255,255,.85); }
  @media (max-width: 767px) {
    .back-btn { color: rgba(30,27,75,.6); }
    .back-btn:hover { color: rgba(30,27,75,.9); }
  }

  /* ── Input groups ── */
  .ig { margin-bottom: 16px; position: relative; }
  .ilbl {
    font-size: 11px; font-weight: 700;
    letter-spacing: .8px; text-transform: uppercase;
    color: #a78bfa; margin-bottom: 6px; display: block;
  }
  @media (max-width: 767px) { .ilbl { color: #7c3aed; } }

  .ifield {
    width: 100%;
    padding: 13px 42px 13px 14px;
    border: 1.5px solid rgba(167,139,250,.25);
    border-radius: 12px;
    background: rgba(255,255,255,.06);
    font-family: 'DM Sans', sans-serif;
    font-size: 14px; color: #fff;
    outline: none; transition: all .25s;
  }
  .ifield::placeholder { color: rgba(255,255,255,.25); }
  .ifield:focus { border-color: #a78bfa; background: rgba(167,139,250,.1); box-shadow: 0 0 0 3px rgba(167,139,250,.15); }
  .ifield.err { border-color: #f87171; box-shadow: 0 0 0 3px rgba(248,113,113,.12); }

  @media (max-width: 767px) {
    .ifield { background: rgba(255,255,255,.82); color: #1e1b4b; border-color: rgba(196,181,253,.5); }
    .ifield::placeholder { color: #9ca3af; }
    .ifield:focus { background: #fff; }
    .ifield.err { border-color: #f87171; }
  }

  .iico { position: absolute; right: 13px; bottom: 13px; color: rgba(255,255,255,.3); cursor: pointer; font-size: 15px; }
  @media (max-width: 767px) { .iico { color: #9ca3af; } }
  .emsg { font-size: 11px; color: #f87171; margin-top: 4px; padding-left: 3px; }

  /* two-col row */
  .two-col { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }

  /* phone row */
  .ph-row { display: flex; gap: 8px; }
  .cc {
    width: 70px; padding: 13px 8px;
    border: 1.5px solid rgba(167,139,250,.25); border-radius: 12px;
    background: rgba(255,255,255,.06); font-family: 'DM Sans', sans-serif;
    font-size: 13px; color: #fff; outline: none; text-align: center; transition: all .25s;
  }
  .cc:focus { border-color: #a78bfa; box-shadow: 0 0 0 3px rgba(167,139,250,.15); }
  @media (max-width: 767px) {
    .cc { background: rgba(255,255,255,.82); color: #1e1b4b; border-color: rgba(196,181,253,.5); }
  }

  /* ── Buttons ── */
  .btn-p {
    width: 100%; padding: 14px;
    border: none; border-radius: 12px;
    background: linear-gradient(135deg,#f472b6 0%,#c084fc 50%,#818cf8 100%);
    color: #fff; font-family: 'DM Sans', sans-serif;
    font-size: 15px; font-weight: 600; cursor: pointer;
    letter-spacing: .3px; box-shadow: 0 8px 28px rgba(192,132,252,.35);
    transition: all .25s; position: relative; overflow: hidden;
  }
  .btn-p:hover:not(:disabled) { transform: translateY(-2px); box-shadow: 0 14px 36px rgba(192,132,252,.5); }
  .btn-p:active { transform: translateY(0); }
  .btn-p:disabled { opacity: .65; cursor: not-allowed; }

  .btn-outline {
    width: 100%; padding: 13px;
    border: 1.5px solid rgba(255,255,255,.12); border-radius: 12px;
    background: transparent; color: rgba(255,255,255,.7);
    font-family: 'DM Sans', sans-serif; font-size: 15px; font-weight: 500;
    cursor: pointer; transition: all .25s;
  }
  .btn-outline:hover { border-color: rgba(255,255,255,.25); background: rgba(255,255,255,.05); color: #fff; }
  @media (max-width: 767px) {
    .btn-outline { border-color: rgba(30,27,75,.2); color: #1e1b4b; background: rgba(255,255,255,.35); }
    .btn-outline:hover { background: rgba(255,255,255,.55); }
  }

  /* ── Social ── */
  .divider { display: flex; align-items: center; gap: 12px; margin: 24px 0 20px; font-size: 12px; color: rgba(255,255,255,.25); }
  .divider::before,.divider::after { content:''; flex:1; height:1px; background: rgba(255,255,255,.1); }
  @media (max-width: 767px) {
    .divider { color: rgba(107,114,128,.6); }
    .divider::before,.divider::after { background: rgba(196,181,253,.4); }
  }

  .social-row { display: flex; justify-content: center; gap: 12px; margin-bottom: 24px; }
  .soc {
    flex: 1; max-width: 90px; height: 44px;
    border-radius: 10px;
    background: rgba(255,255,255,.06);
    border: 1.5px solid rgba(255,255,255,.1);
    display: flex; align-items: center; justify-content: center;
    cursor: pointer; font-size: 18px; transition: all .2s;
  }
  .soc:hover { background: rgba(255,255,255,.1); transform: translateY(-2px); }
  .soc:disabled { opacity: .6; cursor: not-allowed; transform: none; }

  .soc-auth {
    max-width: none;
    gap: 8px;
    padding: 0 10px;
    font-size: 13px;
    font-weight: 600;
    color: rgba(255,255,255,.85);
  }

  .soc-label {
    font-size: 13px;
    font-weight: 600;
  }
  @media (max-width: 767px) {
    .soc { background: rgba(255,255,255,.82); border-color: rgba(196,181,253,.4); }
    .soc:hover { box-shadow: 0 6px 20px rgba(124,58,237,.15); }
    .soc-auth { color: #1e1b4b; }
  }

  .ftxt { text-align: center; font-size: 13px; color: rgba(255,255,255,.4); }
  .lnk { font-size: 13px; color: #c084fc; font-weight: 600; cursor: pointer; background: none; border: none; font-family: 'DM Sans', sans-serif; transition: color .2s; }
  .lnk:hover { color: #f472b6; }
  @media (max-width: 767px) { .ftxt { color: #6b7280; } .lnk { color: #7c3aed; } }

  /* ── Step progress ── */
  .stepbar { display: flex; align-items: center; gap: 5px; margin-bottom: 24px; }
  .sdot { width: 6px; height: 6px; border-radius: 50%; background: rgba(167,139,250,.2); transition: all .35s; }
  .sdot.active { width: 20px; border-radius: 3px; background: linear-gradient(90deg,#f472b6,#818cf8); }
  .sdot.done { background: #7c3aed; }
  .slbl { font-size: 11px; color: #a78bfa; font-weight: 700; margin-left: auto; letter-spacing: .5px; }
  @media (max-width: 767px) { .slbl { color: #7c3aed; } .sdot { background: rgba(196,181,253,.4); } }

  /* ── Edu pills ── */
  .edu-grid { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 8px; margin-bottom: 12px; }
  .epill {
    padding: 14px 6px; border-radius: 12px;
    border: 1.5px solid rgba(167,139,250,.2);
    background: rgba(255,255,255,.04);
    text-align: center; cursor: pointer; transition: all .22s;
  }
  .epill:hover { border-color: #c084fc; background: rgba(192,132,252,.08); }
  .epill.sel { border-color: #7c3aed; background: rgba(124,58,237,.15); box-shadow: 0 0 0 2px rgba(124,58,237,.2); }
  .epill .eico { font-size: 22px; display: block; margin-bottom: 5px; }
  .epill .elbl { font-size: 10px; font-weight: 700; color: rgba(255,255,255,.6); line-height: 1.35; white-space: pre-line; }
  .epill.sel .elbl { color: #c084fc; }
  @media (max-width: 767px) {
    .epill { background: rgba(255,255,255,.7); border-color: rgba(196,181,253,.45); }
    .epill.sel { background: rgba(124,58,237,.1); }
    .epill .elbl { color: #1e1b4b; }
    .epill.sel .elbl { color: #7c3aed; }
  }

  .cls-grid { display: grid; gap: 7px; margin-bottom: 12px; }
  .cpill {
    padding: 10px 6px; border-radius: 10px;
    border: 1.5px solid rgba(167,139,250,.2);
    background: rgba(255,255,255,.04);
    text-align: center; cursor: pointer;
    font-size: 12px; font-weight: 600; color: rgba(255,255,255,.6);
    transition: all .2s; white-space: pre-line; line-height: 1.35;
    font-family: 'DM Sans', sans-serif;
  }
  .cpill:hover { border-color: #c084fc; color: #fff; }
  .cpill.sel { border-color: #7c3aed; background: rgba(124,58,237,.18); color: #c084fc; }
  @media (max-width: 767px) {
    .cpill { background: rgba(255,255,255,.7); border-color: rgba(196,181,253,.4); color: #1e1b4b; }
    .cpill.sel { background: rgba(124,58,237,.12); color: #7c3aed; }
  }

  .sec-hd { font-size: 11px; font-weight: 700; color: rgba(255,255,255,.5); letter-spacing: .6px; text-transform: uppercase; margin-bottom: 8px; display: flex; align-items: center; gap: 5px; }
  @media (max-width: 767px) { .sec-hd { color: #6b7280; } }

  /* PW strength */
  .pws { display: flex; gap: 4px; margin-top: 6px; }
  .pwb { flex: 1; height: 3px; border-radius: 2px; background: rgba(167,139,250,.15); transition: background .3s; }
  .pwb.weak { background: #f87171; }
  .pwb.med  { background: #fbbf24; }
  .pwb.str  { background: #34d399; }
  .pwhint { font-size: 11px; color: rgba(255,255,255,.35); margin-top: 3px; }
  @media (max-width: 767px) { .pwhint { color: #9ca3af; } }

  /* checkbox row */
  .cb-row { display: flex; align-items: center; justify-content: space-between; margin-bottom: 20px; }
  .cb-label { display: flex; align-items: center; gap: 8px; font-size: 13px; color: rgba(255,255,255,.5); cursor: pointer; }
  .cb-label input { accent-color: #c084fc; }
  @media (max-width: 767px) { .cb-label { color: #6b7280; } }

  /* ══════════════════════════════════════════════
     MOBILE-ONLY: wrap everything in a card on mobile
  ══════════════════════════════════════════════ */
  .mobile-card-wrap {
    position: relative;
    z-index: 5;
    padding: 20px 22px 36px;
  }
  .mobile-top-bg {
    position: absolute;
    inset: 0;
    background: linear-gradient(160deg,#fbcfe8 0%,#c4b5fd 45%,#a5b4fc 100%);
    z-index: 0;
  }
  .mobile-wavy {
    position: absolute; inset: 0; z-index: 0; opacity: .12;
    background-image: repeating-linear-gradient(0deg,transparent,transparent 18px,rgba(255,255,255,.7) 18px,rgba(255,255,255,.7) 19px);
  }
  .m-blob { position: absolute; border-radius: 50%; filter: blur(60px); opacity: .5; }
  .mb1 { width: 220px; height: 220px; background: #f9a8d4; top: -60px; right: -40px; }
  .mb2 { width: 180px; height: 180px; background: #ddd6fe; bottom: 60px; left: -40px; }

  .mobile-inner-card {
    position: relative; z-index: 5;
    background: rgba(255,255,255,.72);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    border-radius: 24px;
    border: 1px solid rgba(255,255,255,.6);
    padding: 24px 20px;
    box-shadow: 0 8px 40px rgba(124,58,237,.12);
    margin-top: 8px;
  }

  /* ── Mobile status bar ── */
  .msb {
    position: relative; z-index: 10;
    display: flex; justify-content: space-between; align-items: center;
    padding: 14px 24px 0;
    font-size: 12px; font-weight: 600; color: rgba(30,27,75,.6);
  }
  .notch { width: 110px; height: 28px; background: #1e1b4b; border-radius: 0 0 18px 18px; position: absolute; top: 0; left: 50%; transform: translateX(-50%); }

  /* ── Mobile hero ── */
  .mobile-hero {
    position: relative; z-index: 5;
    padding: 16px 22px 32px;
    text-align: center;
  }
  .mh-title { font-family: 'Playfair Display', serif; font-size: 32px; font-weight: 800; color: #1e1b4b; margin-bottom: 10px; }
  .mh-sub { font-size: 14px; color: rgba(30,27,75,.6); line-height: 1.6; margin-bottom: 28px; }

  /* ── Success overlay ── */
  .sov { position: absolute; inset: 0; z-index: 100; background: linear-gradient(160deg,#fbcfe8,#c4b5fd); display: flex; align-items: center; justify-content: center; flex-direction: column; gap: 14px; animation: fin .3s ease both; }
  @keyframes fin { from{opacity:0} to{opacity:1} }
  .sico { width: 72px; height: 72px; border-radius: 50%; background: #fff; display: flex; align-items: center; justify-content: center; font-size: 32px; box-shadow: 0 10px 40px rgba(124,58,237,.3); animation: pop .5s cubic-bezier(.34,1.56,.64,1) .2s both; }
  @keyframes pop { from{transform:scale(0)} to{transform:scale(1)} }
  .stxt { font-family: 'Playfair Display', serif; font-size: 22px; font-weight: 800; color: #1e1b4b; text-align: center; }

  /* ── Animations ── */
  .scr-in { animation: scIn .4s cubic-bezier(.34,1.56,.64,1) both; }
  @keyframes scIn { from{opacity:0;transform:translateY(22px)} to{opacity:1;transform:translateY(0)} }
  .step-in { animation: stIn .35s cubic-bezier(.34,1.56,.64,1) both; }
  @keyframes stIn { from{opacity:0;transform:translateX(24px)} to{opacity:1;transform:translateX(0)} }

  .f1{animation:fup .32s ease .04s both}
  .f2{animation:fup .32s ease .09s both}
  .f3{animation:fup .32s ease .14s both}
  .f4{animation:fup .32s ease .19s both}
  .f5{animation:fup .32s ease .24s both}
  .f6{animation:fup .32s ease .29s both}
  @keyframes fup { from{opacity:0;transform:translateY(12px)} to{opacity:1;transform:translateY(0)} }

  .rip-c { position: absolute; border-radius: 50%; background: rgba(255,255,255,.3); animation: rip .6s linear forwards; pointer-events: none; }
  @keyframes rip { from{transform:scale(0);opacity:1} to{transform:scale(4);opacity:0} }
  @keyframes spin { to{transform:rotate(360deg)} }
  .spin { width: 15px; height: 15px; border: 2.5px solid rgba(255,255,255,.35); border-top-color: #fff; border-radius: 50%; display: inline-block; animation: spin .7s linear infinite; }

  /* info box */
  .info-box { background: rgba(167,139,250,.08); border: 1px solid rgba(167,139,250,.15); border-radius: 10px; padding: 12px 14px; font-size: 12px; color: rgba(255,255,255,.45); line-height: 1.6; margin-bottom: 16px; }
  .info-box strong { color: #c084fc; }
  @media (max-width: 767px) { .info-box { background: rgba(124,58,237,.06); border-color: rgba(196,181,253,.25); color: #6b7280; } }

  /* pw match */
  .pwmatch { font-size: 11px; color: #34d399; margin-top: 3px; }
`;

/* ─── DATA ─────────────────────────────────────────────────────────────────── */
const EDU_LEVELS = [
  { id:"secondary", icon:"🏫", label:"Secondary\nSchool"     },
  { id:"higher",    icon:"🎓", label:"Higher\nSecondary"     },
  { id:"college",   icon:"🏛️",  label:"College /\nUniversity" },
];
const CLASSES = {
  secondary: [
    {id:"8",label:"Class 8"},{id:"9",label:"Class 9"},{id:"10",label:"Class 10"},
  ],
  higher: [
    {id:"11s",label:"11\nScience"},{id:"11c",label:"11\nCommerce"},{id:"11a",label:"11\nArts"},
    {id:"12s",label:"12\nScience"},{id:"12c",label:"12\nCommerce"},{id:"12a",label:"12\nArts"},
  ],
  college: [
    {id:"fy",label:"FY"},{id:"sy",label:"SY"},{id:"ty",label:"TY"},{id:"ly",label:"LY"},
    {id:"pg1",label:"PG-I"},{id:"pg2",label:"PG-II"},{id:"phd",label:"Ph.D"},{id:"oth",label:"Other"},
  ],
};

const AUTH_USERS_KEY = "learnpath_users";

/* ─── UTILS ─────────────────────────────────────────────────────────────────── */
function useRipple() {
  return (e) => {
    const b = e.currentTarget;
    const c = document.createElement("span");
    const d = Math.max(b.clientWidth, b.clientHeight);
    const r = b.getBoundingClientRect();
    c.style.cssText = `width:${d}px;height:${d}px;left:${e.clientX-r.left-d/2}px;top:${e.clientY-r.top-d/2}px`;
    c.className = "rip-c";
    b.appendChild(c);
    setTimeout(() => c.remove(), 700);
  };
}
const pwStr = pw => { if(!pw)return 0; let s=0; if(pw.length>=8)s++; if(/[A-Z]/.test(pw))s++; if(/[0-9!@#$%]/.test(pw))s++; return s; };
const normalizeEmail = (value="") => value.trim().toLowerCase();

const getStoredUsers = () => {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(AUTH_USERS_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter((u) => typeof u?.email === "string" && typeof u?.pw === "string");
  } catch {
    return [];
  }
};

const saveStoredUsers = (users) => {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(AUTH_USERS_KEY, JSON.stringify(users));
  } catch {
    // Ignore storage failures and keep auth flow usable.
  }
};

const upsertStoredUser = (user) => {
  const users = getStoredUsers();
  const index = users.findIndex((u) => u.email === user.email);
  if (index >= 0) {
    users[index] = { ...users[index], ...user };
  } else {
    users.push(user);
  }
  saveStoredUsers(users);
};

const findStoredUserByEmail = (email) => {
  const normalized = normalizeEmail(email);
  if (!normalized) return null;
  const users = getStoredUsers();
  return users.find((u) => u.email === normalized) || null;
};

/* ─── LEFT PANEL ILLUSTRATION SVG ───────────────────────────────────────────── */
const Illo = () => (
  <svg viewBox="0 0 300 260" width="100%" style={{maxWidth:320}} xmlns="http://www.w3.org/2000/svg">
    {/* floating cards */}
    <rect x="20" y="60" width="110" height="70" rx="14" fill="rgba(255,255,255,0.08)" stroke="rgba(255,255,255,0.15)" strokeWidth="1"/>
    <rect x="30" y="72" width="55" height="6" rx="3" fill="rgba(255,255,255,0.4)"/>
    <rect x="30" y="84" width="40" height="4" rx="2" fill="rgba(255,255,255,0.2)"/>
    <rect x="30" y="93" width="30" height="14" rx="7" fill="#f472b6"/>
    <text x="35" y="104" fontSize="9" fill="white" fontWeight="600">Enroll</text>

    <rect x="170" y="30" width="110" height="70" rx="14" fill="rgba(255,255,255,0.08)" stroke="rgba(255,255,255,0.15)" strokeWidth="1"/>
    <text x="182" y="58" fontSize="26">🎓</text>
    <rect x="182" y="68" width="50" height="5" rx="2.5" fill="rgba(255,255,255,0.35)"/>
    <rect x="182" y="78" width="36" height="4" rx="2" fill="rgba(255,255,255,0.18)"/>

    {/* main laptop */}
    <rect x="75" y="115" width="150" height="96" rx="10" fill="#1e1b4b"/>
    <rect x="82" y="122" width="136" height="82" rx="7" fill="#312e81"/>
    <rect x="55" y="211" width="190" height="10" rx="5" fill="#14123a"/>
    {/* screen content */}
    <rect x="92" y="132" width="80" height="7" rx="3.5" fill="rgba(255,255,255,0.45)"/>
    <rect x="92" y="145" width="55" height="5" rx="2.5" fill="rgba(255,255,255,0.22)"/>
    <rect x="92" y="155" width="65" height="5" rx="2.5" fill="rgba(255,255,255,0.22)"/>
    <rect x="92" y="168" width="44" height="14" rx="7" fill="#f472b6"/>
    <text x="98" y="178" fontSize="8" fill="white" fontWeight="700">Get Started</text>

    {/* person */}
    <circle cx="210" cy="155" r="18" fill="#fde68a"/>
    <path d="M195 195 Q210 175 225 195 L228 230 H192 Z" fill="#7c3aed"/>
    <path d="M195 195 L182 218 L189 220 L197 200Z" fill="#7c3aed"/>
    <path d="M225 195 L238 218 L231 220 L223 200Z" fill="#7c3aed"/>
    <path d="M197 230 L195 255 H203 L207 235Z" fill="#fde68a"/>
    <path d="M219 230 L221 255 H213 L209 235Z" fill="#fde68a"/>

    {/* floating elements */}
    <circle cx="38" cy="170" r="14" fill="#f472b6" opacity="0.8"><animate attributeName="cy" values="170;155;170" dur="3.5s" repeatCount="indefinite"/></circle>
    <circle cx="265" cy="120" r="10" fill="#fbbf24" opacity="0.8"><animate attributeName="cy" values="120;108;120" dur="4s" repeatCount="indefinite"/></circle>
    <polygon points="270,200 278,215 262,215" fill="#a5b4fc" opacity="0.8"><animateTransform attributeName="transform" type="rotate" from="0 270 208" to="360 270 208" dur="9s" repeatCount="indefinite"/></polygon>
    <text x="40" y="130" fontSize="16" fill="#fbbf24" opacity="0.8">✦</text>
    <text x="250" y="170" fontSize="11" fill="#f472b6" opacity="0.8">✦</text>
  </svg>
);

/* ─── SHARED: Desktop form wrapper vs Mobile card ────────────────────────────── */
function FormWrap({ children, isMobile }) {
  if (isMobile) {
    return <div className="mobile-inner-card">{children}</div>;
  }
  return <div>{children}</div>;
}

/* ─── SUCCESS overlay (shared) ──────────────────────────────────────────────── */
function SuccessOverlay({ icon, title, msg }) {
  return (
    <div className="sov">
      <div className="sico">{icon}</div>
      <div className="stxt">{title}</div>
      <p style={{color:"#6b7280",fontSize:14}}>{msg}</p>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   LANDING
═══════════════════════════════════════════════════════ */
function Landing({ onLogin, onRegister, onSuccess, isMobile }) {
  const rip = useRipple();

  if (isMobile) {
    return (
      <div style={{position:"relative",minHeight:"100vh"}}>
        <div className="mobile-top-bg"/><div className="mobile-wavy"/>
        <div className="m-blob mb1"/><div className="m-blob mb2"/>
        <div className="msb"><div className="notch"/><span style={{marginLeft:8}}>9:41</span><span style={{marginRight:8}}>●●●</span></div>
        <div className="mobile-hero scr-in">
          <div className="f1 mh-title">Welcome <span style={{color:"#7c3aed"}}>=)</span></div>
          <p className="f2 mh-sub">Here to help you learn new skills.<br/><strong style={{color:"#7c3aed"}}>Log In</strong> or <strong style={{color:"#7c3aed"}}>create an account.</strong></p>
          <div className="f3" style={{marginBottom:28,display:"flex",justifyContent:"center"}}><Illo/></div>
          <button className="btn-p f4" style={{marginBottom:10}} onClick={e=>{rip(e);setTimeout(onRegister,120);}}>Create Account</button>
          <button className="btn-outline f5" onClick={onLogin}>Log In</button>
        </div>
      </div>
    );
  }

  // Desktop landing — full split view
  return (
    <div className="app-root scr-in">
      <div className="left-panel">
        <div className="lp-grid"/><div className="lp-blob lp-blob-1"/><div className="lp-blob lp-blob-2"/><div className="lp-blob lp-blob-3"/>
        <div className="lp-brand">
          <div className="lp-logo">🎓</div>
          <span className="lp-brand-name">LearnPath</span>
        </div>
        <div className="lp-headline">Learn without<br/><em>limits.</em></div>
        <p className="lp-desc">Join thousands of students already mastering new skills on our platform. Your journey starts with a single step.</p>
        <div className="lp-illo"><Illo/></div>
        <div className="lp-features">
          {[["📚","10,000+ courses across all levels"],["🏆","Personalised learning paths"],["🎯","Track progress in real time"]].map(([ic,t])=>(
            <div className="lp-feat" key={t}><div className="lp-feat-icon">{ic}</div>{t}</div>
          ))}
        </div>
      </div>
      <div className="right-panel">
        <div className="form-shell">
          <div className="form-brand">
            <div className="form-brand-logo">🎓</div>
            <span className="form-brand-name">LearnPath</span>
          </div>
          <div className="pg-title f1">Welcome back 👋</div>
          <p className="pg-sub f2">New here? <strong onClick={onRegister} style={{cursor:"pointer"}}>Create a free account →</strong></p>
          {/* Inline login form on landing for desktop */}
          <LoginForm onSuccess={onSuccess} onRegister={onRegister}/>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   LOGIN
═══════════════════════════════════════════════════════ */
function LoginForm({ onSuccess, onRegister }) {
  const [showPw,setShowPw]=useState(false);
  const [loadingMethod,setLoadingMethod]=useState("");
  const [done,setDone]=useState(false);
  const [email,setEmail]=useState("");
  const [pw,setPw]=useState("");
  const [err,setErr]=useState({});
  const rip=useRipple();

  const finishLogin=(method)=>{
    setLoadingMethod(method);
    setTimeout(()=>{setLoadingMethod("");setDone(true);},1500);
    setTimeout(()=>{setDone(false);onSuccess?.();},3200);
  };

  const loginWithEmail=(e)=>{
    rip(e);
    const nextErr={};
    const normalizedEmail = normalizeEmail(email);
    if(!normalizedEmail||!/\S+@\S+\.\S+/.test(normalizedEmail)) nextErr.email="Valid email required";
    if(!pw.trim()) nextErr.pw="Password is required";
    const storedUser = findStoredUserByEmail(normalizedEmail);
    if(!nextErr.email && !nextErr.pw) {
      if(!storedUser) {
        nextErr.form = "Account not found. Please sign up first.";
      } else if(storedUser.pw !== pw) {
        nextErr.form = "Incorrect password. Please try again.";
      }
    }
    setErr(nextErr);
    if(Object.keys(nextErr).length) return;
    finishLogin("email");
  };

  const loginWithGoogle=(e)=>{
    rip(e);
    if(typeof window === "undefined" || typeof window.prompt !== "function") {
      setErr({ form: "Google verification is unavailable on this device." });
      return;
    }

    const enteredEmail = window.prompt("Enter your Google email to verify login:", email || "");
    if(enteredEmail === null) return;

    const normalizedEmail = normalizeEmail(enteredEmail);
    if(!normalizedEmail || !/\S+@\S+\.\S+/.test(normalizedEmail)) {
      setErr({ form: "Please enter a valid Google email." });
      return;
    }

    const storedUser = findStoredUserByEmail(normalizedEmail);
    if(!storedUser) {
      setErr({ form: "No verified account found for this Google email." });
      return;
    }

    setErr({});
    setEmail(normalizedEmail);
    finishLogin("google");
  };

  if(done) return <SuccessOverlay icon="🎉" title="Welcome Back!" msg="You're all set."/>;

  return (
    <>
      <div className="ig f3"><span className="ilbl">Email</span><input type="email" className={`ifield ${err.email?"err":""}`} placeholder="Enter your email" value={email} onChange={e=>setEmail(e.target.value)}/><span className="iico">✉</span>{err.email&&<div className="emsg">{err.email}</div>}</div>
      <div className="ig f4"><span className="ilbl">Password</span><input type={showPw?"text":"password"} className={`ifield ${err.pw?"err":""}`} placeholder="Enter password" value={pw} onChange={e=>setPw(e.target.value)}/><span className="iico" onClick={()=>setShowPw(!showPw)}>{showPw?"🙈":"👁"}</span>{err.pw&&<div className="emsg">{err.pw}</div>}</div>
      <div className="cb-row f5">
        <label className="cb-label"><input type="checkbox" style={{accentColor:"#c084fc"}}/> Remember me</label>
        <button className="lnk">Forgot password?</button>
      </div>
      {err.form&&<div className="emsg" style={{marginBottom:10}}>{err.form}</div>}
      <button className="btn-p f6" style={{marginBottom:20}} onClick={loginWithEmail} disabled={!!loadingMethod}>
        {loadingMethod==="email"?<span style={{display:"flex",alignItems:"center",justifyContent:"center",gap:8}}><span className="spin"/>Signing in…</span>:"Log In"}
      </button>
      <div className="divider">or sign in with</div>
      <div className="social-row">
        <button className="soc soc-auth" onClick={loginWithGoogle} disabled={!!loadingMethod}>
          {loadingMethod==="google"?
            <><span className="spin"/><span className="soc-label">Verifying</span></>:
            <><span style={{fontSize:16,fontWeight:700}}>G</span><span className="soc-label">Google</span></>
          }
        </button>
        <button className="soc soc-auth" onClick={loginWithEmail} disabled={!!loadingMethod}>
          <span style={{fontSize:15}}>✉</span>
          <span className="soc-label">Email</span>
        </button>
      </div>
      {onRegister&&<p className="ftxt">Don't have an account? <button className="lnk" onClick={onRegister}>Sign Up</button></p>}
    </>
  );
}

function Login({ onBack, onRegister, onSuccess, isMobile }) {
  const [done,setDone]=useState(false);

  if (isMobile) {
    return (
      <div style={{position:"relative",minHeight:"100vh"}}>
        <div className="mobile-top-bg"/><div className="mobile-wavy"/>
        <div className="m-blob mb1"/><div className="m-blob mb2"/>
        {done&&<SuccessOverlay icon="🎉" title="Welcome Back!" msg="You're all set."/>}
        <div className="msb"><div className="notch"/><span style={{marginLeft:8}}>9:41</span><span style={{marginRight:8}}>●●●</span></div>
        <div className="mobile-card-wrap scr-in">
          <button className="back-btn" onClick={onBack}>‹ Back</button>
          <div className="mobile-inner-card">
            <div className="ttl f1" style={{color:"#1e1b4b",fontFamily:"'Playfair Display',serif",fontSize:24,fontWeight:800,marginBottom:4}}>Welcome Back</div>
            <p className="sub f2" style={{fontSize:13,color:"#6b7280",marginBottom:18}}>Continue your learning journey.<br/><strong style={{color:"#7c3aed"}}>Your path is right here.</strong></p>
            <LoginForm onSuccess={onSuccess} onRegister={onRegister}/>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="app-root scr-in">
      <div className="left-panel">
        <div className="lp-grid"/><div className="lp-blob lp-blob-1"/><div className="lp-blob lp-blob-2"/><div className="lp-blob lp-blob-3"/>
        <div className="lp-brand"><div className="lp-logo">🎓</div><span className="lp-brand-name">LearnPath</span></div>
        <div className="lp-headline">Your knowledge<br/><em>awaits.</em></div>
        <p className="lp-desc">Welcome back! Pick up right where you left off. Your progress is saved and ready.</p>
        <div className="lp-illo"><Illo/></div>
        <div className="lp-stats">
          {[["50K+","Students"],["98%","Satisfaction"],["200+","Courses"]].map(([n,l])=>(<div key={l}><div className="lp-stat-num">{n}</div><div className="lp-stat-lbl">{l}</div></div>))}
        </div>
      </div>
      <div className="right-panel">
        <div className="form-shell">
          <button className="back-btn" onClick={onBack}>← Back to home</button>
          <div className="form-brand"><div className="form-brand-logo">🎓</div><span className="form-brand-name">LearnPath</span></div>
          <div className="pg-title f1">Sign in</div>
          <p className="pg-sub f2">Don't have an account? <strong onClick={onRegister} style={{cursor:"pointer",color:"#c084fc"}}>Create one free →</strong></p>
          {done&&<SuccessOverlay icon="🎉" title="Welcome Back!" msg="You're all set."/>}
          <LoginForm onSuccess={onSuccess} onRegister={onRegister}/>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   REGISTER — 3-STEP WIZARD
═══════════════════════════════════════════════════════ */
function Register({ onBack, onLogin, onSuccess, isMobile }) {
  const rip=useRipple();
  const [step,setStep]=useState(1);
  const [ak,setAk]=useState(0);
  const [loading,setLoading]=useState(false);
  const [done,setDone]=useState(false);

  const [name,setName]=useState(""); const [email,setEmail]=useState(""); const [phone,setPhone]=useState(""); const [cc,setCc]=useState("+91");
  const [pw,setPw]=useState(""); const [cpw,setCpw]=useState(""); const [showPw,setShowPw]=useState(false); const [showCpw,setShowCpw]=useState(false);
  const [lvl,setLvl]=useState(""); const [cls,setCls]=useState("");
  const [err,setErr]=useState({});

  const go=n=>{setErr({});setStep(n);setAk(k=>k+1);};
  const v1=()=>{ const e={}; if(!name.trim())e.name="Required"; if(!email.trim()||!/\S+@\S+\.\S+/.test(email))e.email="Valid email required"; if(!phone.trim()||phone.length<8)e.phone="Valid number required"; setErr(e); return !Object.keys(e).length; };
  const v2=()=>{ const e={}; if(pw.length<8)e.pw="Min 8 characters"; if(pw!==cpw)e.cpw="Passwords don't match"; setErr(e); return !Object.keys(e).length; };
  const v3=()=>{ const e={}; if(!lvl)e.lvl="Select a level"; if(!cls)e.cls="Select your class"; setErr(e); return !Object.keys(e).length; };

  const next=e=>{rip(e);if(step===1&&!v1())return;if(step===2&&!v2())return;if(step<3)go(step+1);};
  const submit=e=>{
    rip(e);
    if(!v3())return;

    upsertStoredUser({
      name: name.trim(),
      email: normalizeEmail(email),
      pw,
      phone: `${cc}${phone}`,
      level: lvl,
      classId: cls,
      updatedAt: Date.now(),
    });

    setLoading(true);
    setTimeout(()=>{setLoading(false);setDone(true);},1600);
    setTimeout(()=>{setDone(false);onSuccess?.();},3400);
  };

  const st=pwStr(pw); const stC=["","weak","med","str"][st]; const stL=["","Weak — add complexity","Good — try adding symbols","Strong password! 🔒"][st];
  const clsOpts=CLASSES[lvl]||[];

  const stepProgress = (
    <div className="stepbar">
      {[1,2,3].map(i=>(<div key={i} className={`sdot ${i===step?"active":i<step?"done":""}`}/>))}
      <span className="slbl">{["Personal Info","Set Password","Education"][step-1]} · {step}/3</span>
    </div>
  );

  const step1 = (
    <div key={"s1"+ak} className="step-in">
      <div className="two-col">
        <div className="ig f2">
          <span className="ilbl">Full Name</span>
          <input type="text" className={`ifield ${err.name?"err":""}`} placeholder="Your name" value={name} onChange={e=>setName(e.target.value)}/>
          {err.name&&<div className="emsg">{err.name}</div>}
        </div>
        <div className="ig f2">
          <span className="ilbl">Email</span>
          <input type="email" className={`ifield ${err.email?"err":""}`} placeholder="you@email.com" value={email} onChange={e=>setEmail(e.target.value)}/>
          {err.email&&<div className="emsg">{err.email}</div>}
        </div>
      </div>
      <div className="ig f3">
        <span className="ilbl">Mobile Number</span>
        <div className="ph-row">
          <input type="text" className="cc" value={cc} onChange={e=>setCc(e.target.value)} placeholder="+91"/>
          <input type="tel" className={`ifield ${err.phone?"err":""}`} placeholder="Mobile number" value={phone} onChange={e=>setPhone(e.target.value.replace(/\D/g,"").slice(0,10))} style={{flex:1}}/>
        </div>
        {err.phone&&<div className="emsg">{err.phone}</div>}
      </div>
      <button className="btn-p f4" style={{marginTop:4}} onClick={next}>Continue →</button>
    </div>
  );

  const step2 = (
    <div key={"s2"+ak} className="step-in">
      <div className="ig f2">
        <span className="ilbl">Password</span>
        <input type={showPw?"text":"password"} className={`ifield ${err.pw?"err":""}`} placeholder="Create password" value={pw} onChange={e=>setPw(e.target.value)}/>
        <span className="iico" onClick={()=>setShowPw(!showPw)}>{showPw?"🙈":"👁"}</span>
        {pw&&(<><div className="pws">{[1,2,3].map(i=>(<div key={i} className={`pwb ${i<=st?stC:""}`}/>))}</div><div className="pwhint" style={{color:["","#f87171","#fbbf24","#34d399"][st]}}>{stL}</div></>)}
        {err.pw&&<div className="emsg">{err.pw}</div>}
      </div>
      <div className="ig f3">
        <span className="ilbl">Confirm Password</span>
        <input type={showCpw?"text":"password"} className={`ifield ${err.cpw?"err":""}`} placeholder="Re-enter password" value={cpw} onChange={e=>setCpw(e.target.value)}/>
        <span className="iico" onClick={()=>setShowCpw(!showCpw)}>{showCpw?"🙈":"👁"}</span>
        {cpw&&pw===cpw&&<div className="pwmatch">✓ Passwords match</div>}
        {err.cpw&&<div className="emsg">{err.cpw}</div>}
      </div>
      <div className="info-box f4">Use <strong>8+ characters</strong> with uppercase letters & numbers for a strong password.</div>
      <button className="btn-p f5" onClick={next}>Continue →</button>
    </div>
  );

  const step3 = (
    <div key={"s3"+ak} className="step-in">
      <div className="sec-hd f2">🏫 Education Level</div>
      <div className="edu-grid f3">
        {EDU_LEVELS.map(l=>(
          <div key={l.id} className={`epill ${lvl===l.id?"sel":""}`} onClick={()=>{setLvl(l.id);setCls("");setErr({});}}>
            <span className="eico">{l.icon}</span><span className="elbl">{l.label}</span>
          </div>
        ))}
      </div>
      {err.lvl&&<div className="emsg" style={{marginBottom:8}}>{err.lvl}</div>}
      {lvl&&(
        <div className="f4">
          <div className="sec-hd" style={{marginTop:8}}>
            📚 {lvl==="secondary"?"Select Class":lvl==="higher"?"Select Stream & Class":"Select Year / Semester"}
          </div>
          <div className="cls-grid" style={{gridTemplateColumns:lvl==="secondary"?"1fr 1fr 1fr":lvl==="higher"?"1fr 1fr 1fr":"repeat(4,1fr)"}}>
            {clsOpts.map(c=>(<div key={c.id} className={`cpill ${cls===c.id?"sel":""}`} onClick={()=>{setCls(c.id);setErr({});}}>{c.label}</div>))}
          </div>
          {err.cls&&<div className="emsg" style={{marginBottom:8}}>{err.cls}</div>}
        </div>
      )}
      <button className="btn-p" style={{marginTop:12}} onClick={submit} disabled={loading}>
        {loading?<span style={{display:"flex",alignItems:"center",justifyContent:"center",gap:8}}><span className="spin"/>Creating…</span>:"🚀 Get Started"}
      </button>
    </div>
  );

  if (isMobile) {
    return (
      <div style={{position:"relative",minHeight:"100vh"}}>
        <div className="mobile-top-bg"/><div className="mobile-wavy"/>
        <div className="m-blob mb1" style={{background:"#ddd6fe"}}/><div className="m-blob mb2" style={{background:"#fbcfe8"}}/>
        {done&&<SuccessOverlay icon="🚀" title="Account Created!" msg="Your journey begins now."/>}
        <div className="msb"><div className="notch"/><span style={{marginLeft:8}}>9:41</span><span style={{marginRight:8}}>●●●</span></div>
        <div className="mobile-card-wrap scr-in">
          <button className="back-btn" onClick={step===1?onBack:()=>go(step-1)}>‹ Back</button>
          <div className="mobile-inner-card">
            {stepProgress}
            {step===1&&<><div style={{fontFamily:"'Playfair Display',serif",fontSize:22,fontWeight:800,color:"#1e1b4b",marginBottom:4}}>Create Account</div><p style={{fontSize:12,color:"#6b7280",marginBottom:16}}>Tell us about yourself. <strong style={{color:"#7c3aed"}}>Are you ready?</strong></p>{step1}</>}
            {step===2&&<><div style={{fontFamily:"'Playfair Display',serif",fontSize:22,fontWeight:800,color:"#1e1b4b",marginBottom:4}}>Secure Account</div><p style={{fontSize:12,color:"#6b7280",marginBottom:16}}>Choose a strong password. <strong style={{color:"#7c3aed"}}>Keep it safe!</strong></p>{step2}</>}
            {step===3&&<><div style={{fontFamily:"'Playfair Display',serif",fontSize:22,fontWeight:800,color:"#1e1b4b",marginBottom:4}}>Education Details</div><p style={{fontSize:12,color:"#6b7280",marginBottom:16}}>Personalise your experience. <strong style={{color:"#7c3aed"}}>What's your level?</strong></p>{step3}</>}
          </div>
          <div className="divider" style={{marginTop:14}}>Sign up with</div>
          <div className="social-row"><button className="soc" style={{fontSize:16}}>G</button><button className="soc" style={{fontSize:15}}>✉</button></div>
          <p className="ftxt">Already have an account? <button className="lnk" onClick={onLogin}>Log In</button></p>
        </div>
      </div>
    );
  }

  // Desktop register
  return (
    <div className="app-root scr-in">
      <div className="left-panel">
        <div className="lp-grid"/><div className="lp-blob lp-blob-1"/><div className="lp-blob lp-blob-2"/><div className="lp-blob lp-blob-3"/>
        <div className="lp-brand"><div className="lp-logo">🎓</div><span className="lp-brand-name">LearnPath</span></div>
        <div className="lp-headline">Start your<br/><em>journey</em><br/>today.</div>
        <p className="lp-desc">Create your free account in under 2 minutes and get access to thousands of courses tailored to your level.</p>
        <div className="lp-illo"><Illo/></div>
        <div className="lp-features">
          {[["🎯","Personalised to your education level"],["📈","Track your progress daily"],["🏆","Earn certificates & badges"]].map(([ic,t])=>(
            <div className="lp-feat" key={t}><div className="lp-feat-icon">{ic}</div>{t}</div>
          ))}
        </div>
      </div>
      <div className="right-panel">
        <div className="form-shell">
          <button className="back-btn" onClick={step===1?onBack:()=>go(step-1)}>← {step===1?"Back to home":"Previous step"}</button>
          <div className="form-brand"><div className="form-brand-logo">🎓</div><span className="form-brand-name">LearnPath</span></div>
          {done&&<SuccessOverlay icon="🚀" title="Account Created!" msg="Your journey begins now."/>}
          <div className="pg-title f1">
            {step===1?"Create account":step===2?"Set your password":"Education details"}
          </div>
          <p className="pg-sub f2">
            {step===1&&<>Already have an account? <strong onClick={onLogin} style={{cursor:"pointer",color:"#c084fc"}}>Sign in →</strong></>}
            {step===2&&"Choose a strong, unique password."}
            {step===3&&"Help us personalise your learning experience."}
          </p>
          {stepProgress}
          {step===1&&step1}
          {step===2&&step2}
          {step===3&&step3}
          {step===1&&(
            <>
              <div className="divider" style={{marginTop:20}}>or sign up with</div>
              <div className="social-row"><button className="soc" style={{fontSize:16}}>G</button><button className="soc" style={{fontSize:15}}>✉</button></div>
              <p className="ftxt">Already have an account? <button className="lnk" onClick={onLogin}>Sign in</button></p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   ROOT — detects mobile vs desktop
═══════════════════════════════════════════════════════ */
function useIsMobile() {
  const [mobile, setMobile] = useState(() => Dimensions.get("window").width < 768);
  useEffect(() => {
    const subscription = Dimensions.addEventListener("change", ({ window }) => {
      setMobile(window.width < 768);
    });
    return () => subscription?.remove();
  }, []);
  return mobile;
}

export default function AuthunticationScreen() {
  const [screen,setScreen] = useState("landing");
  const isMobile = useIsMobile();
  const navigation = useNavigation();

  return (
    <>
      <style>{style}</style>
      {screen==="landing" && <Landing isMobile={isMobile} onLogin={()=>setScreen("login")} onRegister={()=>setScreen("register")} onSuccess={()=>setTimeout(()=>navigation.replace("Home"),600)}/>}
      {screen==="login"   && <Login   isMobile={isMobile} onBack={()=>setScreen("landing")} onRegister={()=>setScreen("register")} onSuccess={()=>setTimeout(()=>navigation.replace("Home"),600)}/>}
      {screen==="register"&& <Register isMobile={isMobile} onBack={()=>setScreen("landing")} onLogin={()=>setScreen("login")} onSuccess={()=>setTimeout(()=>navigation.replace("Home"),600)}/>}
    </>
  );
}