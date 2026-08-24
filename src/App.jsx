import React, { useState, useEffect, useRef, useMemo } from "react";
import {
  Lock, LogOut, Users, BookOpen, ClipboardCheck, Award, Clock, LayoutGrid,
  Key, ShieldCheck, Search, Plus, X, Check, ChevronRight, ChevronDown,
  Play, Square, FileText, Eye, Printer, ExternalLink, AlertTriangle,
  CheckCircle2, XCircle, Radio, Pencil, Save, ArrowLeft, GraduationCap,
  BadgeCheck, Building2, CalendarDays, TrendingUp, StickyNote, ListChecks, Sparkles,
  Video
} from "lucide-react";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell
} from "recharts";

/* ============================================================
   ESTILO — sistema de tokens tipo "libro de registro académico"
   ============================================================ */
const GlobalStyle = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600;9..144,700&family=IBM+Plex+Sans:wght@400;500;600;700&family=IBM+Plex+Mono:wght@400;500;600;700&display=swap');

    :root{
      --ink:#182338;
      --ink-2:#2c3a56;
      --teal:#0f3d3e;
      --paper:#f2efe6;
      --paper-2:#e9e4d6;
      --paper-3:#ffffff;
      --brass:#a97d3f;
      --brass-lt:#d9b476;
      --rust:#a94a2e;
      --moss:#3f6d52;
      --line:#cbc2a8;
      --line-dark:#3a4a68;
      --shadow: 0 10px 30px -12px rgba(24,35,56,0.35);
      --radius: 3px;
      --font-display: 'Fraunces', serif;
      --font-body: 'IBM Plex Sans', sans-serif;
      --font-mono: 'IBM Plex Mono', monospace;
    }
    *{ box-sizing:border-box; }
    .acad-root{
      font-family: var(--font-body);
      color: var(--ink);
      background: var(--paper);
      min-height: 640px;
      width: 100%;
      position: relative;
      line-height:1.45;
    }
    .acad-root ::selection{ background: var(--brass-lt); color: var(--ink); }
    .acad-root button{ font-family: inherit; cursor:pointer; }
    .acad-root input, .acad-root select, .acad-root textarea{ font-family: inherit; }
    .acad-root:focus-visible, .acad-root *:focus-visible{
      outline: 2px solid var(--brass); outline-offset: 2px;
    }
    .h-display{ font-family: var(--font-display); }
    .mono{ font-family: var(--font-mono); letter-spacing: 0.02em; }

    .paper-texture{
      background-image:
        linear-gradient(var(--paper) 0%, var(--paper) 100%),
        repeating-linear-gradient(0deg, rgba(24,35,56,0.018) 0px, rgba(24,35,56,0.018) 1px, transparent 1px, transparent 3px);
    }

    /* ---------- LOGIN ---------- */
    .login-wrap{
      min-height: 640px;
      display:flex;
      align-items:center;
      justify-content:center;
      background:
        radial-gradient(1200px 500px at 15% -10%, rgba(169,125,63,0.18), transparent 60%),
        linear-gradient(160deg, var(--ink) 0%, #101a2c 60%, #0c1420 100%);
      padding: 40px 20px;
    }
    .login-card{
      width: 100%; max-width: 420px;
      background: var(--paper);
      border: 1px solid var(--line);
      border-radius: var(--radius);
      box-shadow: var(--shadow);
      padding: 40px 36px 32px;
      position: relative;
    }
    .login-seal{
      width:56px; height:56px; border-radius:50%;
      border: 2px solid var(--brass);
      display:flex; align-items:center; justify-content:center;
      margin: 0 auto 18px;
      color: var(--brass);
      background: var(--paper-3);
    }
    .login-title{ text-align:center; font-size:26px; font-weight:600; margin:0 0 4px; color:var(--ink); }
    .login-sub{ text-align:center; font-size:13px; color:var(--ink-2); margin:0 0 28px; letter-spacing:0.04em; text-transform:uppercase; }
    .field-label{ display:block; font-size:11px; text-transform:uppercase; letter-spacing:0.09em; color:var(--ink-2); margin-bottom:6px; font-weight:600; }
    .code-input{
      width:100%; padding:14px 14px; font-size:20px; text-align:center;
      border:1px solid var(--line); border-radius: var(--radius);
      background: var(--paper-3); color: var(--ink);
      letter-spacing:0.12em; font-family: var(--font-mono); font-weight:600;
      text-transform: uppercase;
    }
    .code-input::placeholder{ color:#b7ae95; letter-spacing:0.08em; }
    .btn{
      display:inline-flex; align-items:center; justify-content:center; gap:8px;
      padding:11px 18px; border-radius: var(--radius); font-size:13.5px; font-weight:600;
      border:1px solid transparent; transition: transform .12s ease, background .15s ease, border-color .15s ease;
      letter-spacing:0.01em;
    }
    .btn:active{ transform: translateY(1px); }
    .btn-primary{ background: var(--ink); color: var(--paper); }
    .btn-primary:hover{ background: var(--line-dark); }
    .btn-brass{ background: var(--brass); color:#fff; }
    .btn-brass:hover{ background:#94682f; }
    .btn-ghost{ background: transparent; color: var(--ink); border-color: var(--line); }
    .btn-ghost:hover{ background: var(--paper-2); }
    .btn-danger{ background: transparent; color: var(--rust); border-color: var(--rust); }
    .btn-danger:hover{ background: rgba(169,74,46,0.08); }
    .btn-full{ width:100%; }
    .btn-sm{ padding:7px 12px; font-size:12.5px; }
    .btn:disabled{ opacity:0.5; cursor:not-allowed; }

    .login-error{
      margin-top:14px; padding:10px 12px; border-radius:var(--radius);
      background: rgba(169,74,46,0.08); border:1px solid rgba(169,74,46,0.35);
      color: var(--rust); font-size:12.5px; display:flex; gap:8px; align-items:flex-start;
    }
    .login-hint{
      margin-top:22px; padding-top:18px; border-top:1px dashed var(--line);
      font-size:11.5px; color:#8b8368; text-align:center;
    }
    .login-verify-link{
      margin-top:16px; text-align:center;
    }
    .link-btn{ background:none; border:none; color: var(--ink-2); font-size:12.5px; text-decoration:underline; text-underline-offset:3px; }
    .link-btn:hover{ color: var(--brass); }

    /* ---------- SHELL ---------- */
    .shell{ display:flex; min-height:640px; }
    .sidebar{
      width:236px; flex-shrink:0; background: var(--ink);
      color: var(--paper); display:flex; flex-direction:column;
      padding: 22px 0 16px;
    }
    .sidebar-brand{ display:flex; align-items:center; gap:10px; padding: 0 20px 20px; border-bottom:1px solid rgba(242,239,230,0.12); margin-bottom:14px; }
    .sidebar-brand-mark{ width:34px; height:34px; border-radius:50%; border:1.5px solid var(--brass-lt); display:flex; align-items:center; justify-content:center; color:var(--brass-lt); flex-shrink:0; }
    .sidebar-brand-text .name{ font-family: var(--font-display); font-size:16px; font-weight:600; line-height:1.1; }
    .sidebar-brand-text .role{ font-size:10px; text-transform:uppercase; letter-spacing:0.08em; color:#9fb0c9; }
    .nav-item{
      display:flex; align-items:center; gap:11px; padding:11px 20px; font-size:13.5px;
      color:#c7d0e0; border-left:3px solid transparent; background:none; border-top:none; border-right:none; border-bottom:none;
      width:100%; text-align:left;
    }
    .nav-item:hover{ background: rgba(255,255,255,0.05); color:#fff; }
    .nav-item.active{ background: rgba(217,180,118,0.12); border-left-color: var(--brass-lt); color:#fff; font-weight:600; }
    .sidebar-foot{ margin-top:auto; padding: 14px 20px 0; border-top:1px solid rgba(242,239,230,0.12); }
    .user-chip{ display:flex; align-items:center; gap:9px; margin-bottom:12px; }
    .user-chip-av{ width:30px; height:30px; border-radius:50%; background: var(--brass); color:#fff; display:flex; align-items:center; justify-content:center; font-weight:700; font-size:12px; flex-shrink:0; }
    .user-chip-name{ font-size:12.5px; font-weight:600; color:#fff; line-height:1.2; }
    .user-chip-code{ font-size:10.5px; color:#9fb0c9; font-family: var(--font-mono); }

    .main{ flex:1; min-width:0; padding: 26px 34px 50px; overflow-y:auto; }
    .topbar{ display:flex; align-items:center; justify-content:space-between; margin-bottom:22px; flex-wrap:wrap; gap:10px; }
    .page-title{ font-family: var(--font-display); font-size:26px; font-weight:600; margin:0; color:var(--ink); }
    .page-eyebrow{ font-size:11px; text-transform:uppercase; letter-spacing:0.1em; color: var(--brass); font-weight:700; margin:0 0 4px; }
    .live-pill{ display:inline-flex; align-items:center; gap:6px; font-size:11px; color: var(--moss); font-weight:600; text-transform:uppercase; letter-spacing:0.05em; }
    .meet-pill{
      display:inline-flex; align-items:center; gap:6px; font-size:10.5px; font-weight:700;
      text-transform:uppercase; letter-spacing:0.05em; padding:4px 9px; border-radius:20px;
      background: rgba(63,109,82,0.14); color: var(--moss); border:1px solid rgba(63,109,82,0.35);
    }
    .meet-pill .live-dot{ background: var(--moss); }
    .meet-pill.on-dark{ background: rgba(159,227,184,0.16); color:#9fe3b8; border-color: rgba(159,227,184,0.4); }
    .meet-pill.on-dark .live-dot{ background: #9fe3b8; }    .live-dot{ width:7px; height:7px; border-radius:50%; background: var(--moss); animation: pulse 1.6s infinite; }
    @keyframes pulse{ 0%,100%{opacity:1;} 50%{opacity:0.25;} }

    /* ---------- CARDS / GRIDS ---------- */
    .grid{ display:grid; gap:16px; }
    .grid-4{ grid-template-columns: repeat(4, 1fr); }
    .grid-3{ grid-template-columns: repeat(3, 1fr); }
    .grid-2{ grid-template-columns: repeat(2, 1fr); }
    @media (max-width: 980px){ .grid-4{ grid-template-columns: repeat(2,1fr);} .grid-3{ grid-template-columns: repeat(2,1fr);} }

    .card{
      background: var(--paper-3); border:1px solid var(--line); border-radius: var(--radius);
      padding: 18px 20px;
    }
    .card-tight{ padding:14px 16px; }
    .stat-card{ position:relative; overflow:hidden; }
    .stat-card::before{ content:""; position:absolute; left:0; top:0; bottom:0; width:3px; background: var(--brass); }
    .stat-label{ font-size:11px; text-transform:uppercase; letter-spacing:0.08em; color: var(--ink-2); font-weight:600; margin:0 0 8px; }
    .stat-value{ font-family: var(--font-display); font-size:32px; font-weight:600; margin:0; color: var(--ink); }
    .stat-sub{ font-size:12px; color:#8b8368; margin-top:4px; }

    .section-title{ font-family: var(--font-display); font-size:17px; font-weight:600; margin: 30px 0 12px; display:flex; align-items:center; gap:8px; color: var(--ink); }
    .section-title:first-child{ margin-top:0; }

    /* ---------- TABLES ---------- */
    .table-wrap{ background: var(--paper-3); border:1px solid var(--line); border-radius: var(--radius); overflow:hidden; }
    table.data-table{ width:100%; border-collapse: collapse; font-size:13px; }
    .data-table thead th{
      text-align:left; padding:10px 14px; background: var(--paper-2); color: var(--ink-2);
      font-size:10.5px; text-transform:uppercase; letter-spacing:0.07em; font-weight:700;
      border-bottom:1px solid var(--line);
    }
    .data-table tbody td{ padding:11px 14px; border-bottom:1px solid #eee7d4; color: var(--ink); vertical-align:middle; }
    .data-table tbody tr:last-child td{ border-bottom:none; }
    .data-table tbody tr:hover{ background: rgba(169,125,63,0.05); }
    .data-table input[type=number], .data-table input[type=text]{
      width:70px; padding:6px 8px; border:1px solid var(--line); border-radius:3px; background:#fff; font-size:13px;
    }

    .badge{ display:inline-flex; align-items:center; gap:5px; padding:3px 9px; border-radius:20px; font-size:11px; font-weight:600; letter-spacing:0.02em; }
    .badge-role-alumno{ background:#e4ecf7; color:#2b527d; }
    .badge-role-profesor{ background:#e7f0e8; color:#356047; }
    .badge-role-staff{ background:#f5e6d3; color:#8a5a24; }
    .badge-ok{ background:#e4f1e7; color: var(--moss); }
    .badge-warn{ background:#fbeee0; color:#a9662e; }
    .badge-bad{ background:#f6e1db; color: var(--rust); }
    .badge-muted{ background:#eee9dc; color:#7d7660; }

    .att-btns{ display:flex; gap:6px; }
    .att-btn{
      width:32px; height:32px; border-radius:50%; border:1.5px solid var(--line); background:#fff;
      display:flex; align-items:center; justify-content:center; color:#9c9575; transition: all .12s ease;
    }
    .att-btn:hover{ transform: scale(1.07); }
    .att-btn.p.active{ background: var(--moss); border-color: var(--moss); color:#fff; }
    .att-btn.a.active{ background: var(--rust); border-color: var(--rust); color:#fff; }
    .att-btn.t.active{ background: var(--brass); border-color: var(--brass); color:#fff; }

    .toolbar{ display:flex; align-items:center; gap:10px; margin-bottom:16px; flex-wrap:wrap; }
    .select-input{
      padding:8px 12px; border:1px solid var(--line); border-radius: var(--radius); background:#fff; font-size:13px; color: var(--ink);
    }
    .search-input-wrap{ position:relative; flex:1; min-width:180px; }
    .search-input-wrap svg{ position:absolute; left:10px; top:50%; transform:translateY(-50%); color:#a39c80; }
    .search-input{ width:100%; padding:8px 12px 8px 32px; border:1px solid var(--line); border-radius: var(--radius); background:#fff; font-size:13px; }

    .empty-state{ text-align:center; padding: 44px 20px; color:#8b8368; }
    .empty-state svg{ margin-bottom:10px; opacity:0.5; }
    .empty-state p{ margin:0; font-size:13.5px; }

    /* ---------- MODAL ---------- */
    .modal-overlay{
      position:absolute; inset:0; background: rgba(15,20,32,0.55);
      display:flex; align-items:center; justify-content:center; padding:24px; z-index:50;
      backdrop-filter: blur(2px);
    }
    .modal-box{
      background: var(--paper-3); border-radius: var(--radius); width:100%; max-width:560px;
      max-height: 90%; overflow-y:auto; box-shadow: var(--shadow); border:1px solid var(--line);
    }
    .modal-box.wide{ max-width: 760px; }
    .modal-head{ display:flex; align-items:center; justify-content:space-between; padding:18px 22px; border-bottom:1px solid var(--line); position:sticky; top:0; background:var(--paper-3); }
    .modal-head h3{ margin:0; font-family: var(--font-display); font-size:19px; font-weight:600; }
    .modal-close{ background:none; border:none; color:#8b8368; padding:4px; border-radius:4px; }
    .modal-close:hover{ background: var(--paper-2); color: var(--ink); }
    .modal-body{ padding:20px 22px; }
    .modal-foot{ padding:16px 22px; border-top:1px solid var(--line); display:flex; justify-content:flex-end; gap:10px; }

    .form-row{ margin-bottom:14px; }
    .form-row label{ display:block; font-size:11.5px; text-transform:uppercase; letter-spacing:0.06em; color: var(--ink-2); font-weight:600; margin-bottom:6px; }
    .form-row input, .form-row select, .form-row textarea{
      width:100%; padding:9px 11px; border:1px solid var(--line); border-radius: var(--radius); background:#fff; font-size:13.5px; color: var(--ink);
    }
    .form-row textarea{ font-family: var(--font-mono); font-size:12px; min-height:160px; resize:vertical; }
    .form-grid-2{ display:grid; grid-template-columns:1fr 1fr; gap:14px; }

    /* ---------- CERTIFICATE ---------- */
    .cert-sheet{
      border: 3px double var(--brass); border-radius:2px; padding: 34px 30px;
      background: linear-gradient(180deg, #fffdf8 0%, #fbf6ea 100%);
      text-align:center; position:relative;
    }
    .cert-sheet::before, .cert-sheet::after{
      content:""; position:absolute; width:36px; height:36px; border: 1.5px solid var(--brass-lt); opacity:0.6;
    }
    .cert-sheet::before{ top:8px; left:8px; border-right:none; border-bottom:none; }
    .cert-sheet::after{ bottom:8px; right:8px; border-left:none; border-top:none; }
    .cert-eyebrow{ font-size:11px; text-transform:uppercase; letter-spacing:0.22em; color: var(--brass); font-weight:700; margin-bottom:14px; }
    .cert-title{ font-family: var(--font-display); font-size:15px; letter-spacing:0.03em; color:#5c5333; margin-bottom:4px; }
    .cert-name{ font-family: var(--font-display); font-size:30px; font-weight:600; color: var(--ink); margin:10px 0 14px; border-bottom:1.5px solid var(--brass-lt); display:inline-block; padding-bottom:8px; }
    .cert-body-text{ font-size:13.5px; color:#4a4432; max-width:420px; margin:0 auto 18px; line-height:1.7; }
    .cert-meta{ display:flex; justify-content:center; gap:26px; font-size:11.5px; color:#6b6448; margin-bottom:20px; flex-wrap:wrap; }
    .cert-seal-row{ display:flex; align-items:center; justify-content:center; gap:16px; margin-top:22px; }
    .cert-seal{ width:58px; height:58px; border-radius:50%; border:2px solid var(--brass); display:flex; align-items:center; justify-content:center; color: var(--brass); background:#fff; flex-shrink:0; }
    .cert-verify-code{ font-family: var(--font-mono); font-size:14px; font-weight:700; letter-spacing:0.12em; background: var(--ink); color: var(--paper); padding:6px 12px; border-radius:3px; }

    /* ---------- CRONOMETRO ---------- */
    .clock-face{
      width:180px; height:180px; border-radius:50%; border:3px solid var(--ink); margin: 0 auto 20px;
      display:flex; align-items:center; justify-content:center; flex-direction:column; background: var(--paper-3);
      box-shadow: inset 0 0 0 6px var(--paper);
    }
    .clock-time{ font-family: var(--font-mono); font-size:30px; font-weight:700; color: var(--ink); }
    .clock-label{ font-size:10px; text-transform:uppercase; letter-spacing:0.08em; color: var(--ink-2); margin-top:4px; }

    /* verificacion publica */
    .verify-wrap{ min-height:640px; background: linear-gradient(160deg, var(--ink) 0%, #101a2c 100%); display:flex; align-items:center; justify-content:center; padding:40px 20px; }
    .verify-card{ width:100%; max-width:480px; background: var(--paper); border-radius: var(--radius); padding:34px; border:1px solid var(--line); box-shadow: var(--shadow); }
    .verify-result-ok{ border:1.5px solid var(--moss); background: rgba(63,109,82,0.08); border-radius: var(--radius); padding:18px; margin-top:16px; }
    .verify-result-bad{ border:1.5px solid var(--rust); background: rgba(169,74,46,0.08); border-radius: var(--radius); padding:18px; margin-top:16px; }

    .breadcrumb{ display:flex; align-items:center; gap:6px; font-size:12.5px; color: var(--ink-2); margin-bottom:16px; flex-wrap:wrap; }
    .breadcrumb button{ background:none; border:none; color: var(--ink-2); font-weight:600; padding:0; }
    .breadcrumb button:hover{ color: var(--brass); }
    .breadcrumb .sep{ color:#c3bb9e; }
    .breadcrumb .current{ color: var(--ink); font-weight:600; }

    .avg-pill{ font-family: var(--font-mono); font-weight:700; padding:3px 10px; border-radius:20px; font-size:12.5px; }
    .toast{
      position:absolute; bottom:20px; right:20px; background: var(--ink); color:#fff; padding:11px 18px;
      border-radius: var(--radius); font-size:13px; display:flex; align-items:center; gap:9px; box-shadow: var(--shadow); z-index:80;
    }
    .kbd{ font-family: var(--font-mono); background: var(--paper-2); padding:1px 6px; border-radius:3px; font-size:11px; border:1px solid var(--line); }
    .clickable-row{ cursor:pointer; }
    @media print{
      .no-print{ display:none !important; }
    }
  `}</style>
);

/* ============================================================
   DATOS SEMILLA
   ============================================================ */
function seedData() {
  // Arranque en limpio: sin cursos, sin alumnos, sin profesores.
  // El único acceso inicial es el código de Staff — desde ahí se crea todo lo demás
  // (cursos, asignaturas, y se asciende a alumnos registrados a profesor o staff).
  const templates = [
    {
      id: "tpl-default",
      name: "Plantilla estándar CESI",
      html:
        "<div class='cert-eyebrow'>CESI Academy · Certificado Oficial</div>" +
        "<div class='cert-title'>Se certifica que</div>" +
        "<div class='cert-name'>{{studentName}}</div>" +
        "<div class='cert-body-text'>ha completado satisfactoriamente el curso <strong>{{courseName}}</strong>, impartido por {{teacherName}}, cursado entre el {{startDate}} y el {{endDate}}.</div>",
    },
  ];

  return {
    courses: [],
    teachers: [],
    students: [],
    codes: [
      { code: "STAFF-2026", role: "staff", name: "Administración CESI", linkedId: null },
    ],
    attendance: [],
    grades: [],
    certificates: [],
    templates,
    clockRecords: [],
    classSessions: [],
    activityLog: [
      { id: 1, text: "Sistema inicializado", ts: Date.now() },
    ],
  };
}

/* ============================================================
   UTILIDADES
   ============================================================ */
const uid = (prefix) => `${prefix}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`;

/* Genera un enlace de Google Meet con el formato estándar xxx-xxxx-xxx */
const generateMeetLink = () => {
  const chars = "abcdefghijklmnopqrstuvwxyz";
  const seg = (len) => Array.from({ length: len }, () => chars[Math.floor(Math.random() * chars.length)]).join("");
  return `https://meet.google.com/${seg(3)}-${seg(4)}-${seg(3)}`;
};
const genVerifyCode = () => {
  const s = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let out = "";
  for (let i = 0; i < 10; i++) { if (i === 4) out += "-"; out += s[Math.floor(Math.random() * s.length)]; }
  return "CESI-" + out;
};
const initials = (name) => name.split(" ").map((p) => p[0]).slice(0, 2).join("").toUpperCase();
const fmtDate = (iso) => {
  if (!iso) return "—";
  const d = new Date(iso + (iso.length === 10 ? "T00:00:00" : ""));
  return d.toLocaleDateString("es-ES", { day: "2-digit", month: "short", year: "numeric" });
};
const attLabel = { presente: "Presente", ausente: "Ausente", tarde: "Retraso" };
const attBadgeClass = { presente: "badge-ok", ausente: "badge-bad", tarde: "badge-warn" };

function renderTemplate(html, data) {
  return html.replace(/{{(\w+)}}/g, (_, key) => data[key] ?? "");
}

/* ============================================================
   COMPONENTES GENÉRICOS
   ============================================================ */
function Modal({ title, onClose, children, wide, footer }) {
  return (
    <div className="modal-overlay" onMouseDown={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div className={"modal-box" + (wide ? " wide" : "")}>
        <div className="modal-head">
          <h3>{title}</h3>
          <button className="modal-close" onClick={onClose}><X size={18} /></button>
        </div>
        <div className="modal-body">{children}</div>
        {footer && <div className="modal-foot">{footer}</div>}
      </div>
    </div>
  );
}

function StatCard({ label, value, sub, icon: Icon }) {
  return (
    <div className="card stat-card">
      <p className="stat-label">{label}</p>
      <p className="stat-value">{value}</p>
      {sub && <p className="stat-sub">{sub}</p>}
    </div>
  );
}

function Toast({ message, onDone }) {
  useEffect(() => {
    const t = setTimeout(onDone, 2400);
    return () => clearTimeout(t);
  }, [message]);
  if (!message) return null;
  return (
    <div className="toast"><CheckCircle2 size={16} /> {message}</div>
  );
}

function RoleBadge({ role }) {
  const map = {
    alumno: { cls: "badge-role-alumno", label: "Alumno" },
    profesor: { cls: "badge-role-profesor", label: "Profesor" },
    staff: { cls: "badge-role-staff", label: "Staff" },
  };
  const m = map[role] || { cls: "badge-muted", label: role };
  return <span className={"badge " + m.cls}>{m.label}</span>;
}

/* ============================================================
   LOGIN
   ============================================================ */
function LoginScreen({ onLogin, onRegister, onGoVerify }) {
  const [mode, setMode] = useState("login"); // login | register
  const [code, setCode] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [registered, setRegistered] = useState(null); // { code } tras registrarse
  const [copied, setCopied] = useState(false);

  const submitLogin = () => {
    if (!code.trim() || loading) return;
    setLoading(true);
    setError("");
    try {
      const res = onLogin(code.trim());
      if (!res || !res.ok) {
        setError((res && res.error) || "No se ha podido validar el código.");
        setLoading(false);
      }
      // si res.ok, el componente padre cambia de pantalla; no hace falta tocar loading aquí
    } catch (err) {
      setError("Ha ocurrido un error inesperado. Inténtalo de nuevo.");
      setLoading(false);
    }
  };

  const submitRegister = () => {
    if (!name.trim() || loading) return;
    setLoading(true);
    setError("");
    try {
      const res = onRegister(name.trim());
      if (!res || !res.ok) {
        setError((res && res.error) || "No se ha podido completar el registro.");
        setLoading(false);
        return;
      }
      setRegistered({ code: res.code });
      setLoading(false);
    } catch (err) {
      setError("Ha ocurrido un error inesperado. Inténtalo de nuevo.");
      setLoading(false);
    }
  };

  const copyCode = () => {
    if (!registered) return;
    navigator.clipboard?.writeText(registered.code).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  const enterWithNewCode = () => {
    setLoading(true);
    const res = onLogin(registered.code);
    if (!res || !res.ok) {
      setError((res && res.error) || "No se ha podido iniciar sesión con el código generado.");
      setLoading(false);
    }
  };

  // Pantalla de éxito tras registrarse: mostrar el código antes de entrar
  if (registered) {
    return (
      <div className="login-wrap">
        <div className="login-card">
          <div className="login-seal"><Check size={26} /></div>
          <h1 className="login-title" style={{ fontSize: 22 }}>¡Ya estás dentro!</h1>
          <p className="login-sub">Este es tu código de acceso personal</p>

          <div
            className="code-input mono"
            style={{ display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, fontWeight: 700, letterSpacing: "0.06em" }}
          >
            {registered.code}
          </div>
          <button type="button" className="btn btn-ghost btn-full" style={{ marginTop: 10 }} onClick={copyCode}>
            {copied ? <>Copiado <Check size={14} /></> : <>Copiar código</>}
          </button>

          <div className="login-error" style={{ background: "rgba(169,74,46,0.08)", borderColor: "var(--rust)" }}>
            <AlertTriangle size={15} style={{ flexShrink: 0, marginTop: 1 }} />
            Guarda este código: es la única forma de volver a entrar. No hay contraseña ni email de recuperación.
          </div>

          <button type="button" className="btn btn-brass btn-full" style={{ marginTop: 18 }} disabled={loading} onClick={enterWithNewCode}>
            {loading ? "Entrando…" : <>Ya lo he guardado, entrar <Lock size={14} /></>}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="login-wrap">
      <div className="login-card">
        <div className="login-seal"><GraduationCap size={26} /></div>
        <h1 className="login-title">CESI Academy</h1>
        <p className="login-sub">Portal académico</p>

        <div className="tabs" style={{ display: "flex", gap: 8, marginBottom: 18 }}>
          <button
            type="button"
            className={"btn btn-sm" + (mode === "login" ? " btn-brass" : " btn-ghost")}
            style={{ flex: 1 }}
            onClick={() => { setMode("login"); setError(""); }}
          >
            Ya tengo un código
          </button>
          <button
            type="button"
            className={"btn btn-sm" + (mode === "register" ? " btn-brass" : " btn-ghost")}
            style={{ flex: 1 }}
            onClick={() => { setMode("register"); setError(""); }}
          >
            Soy nuevo/a
          </button>
        </div>

        {mode === "login" ? (
          <>
            <label className="field-label" htmlFor="code-input">Código de acceso único</label>
            <input
              id="code-input"
              className="code-input"
              placeholder="EJ. ALU-0001"
              value={code}
              onChange={(e) => setCode(e.target.value.toUpperCase())}
              onKeyDown={(e) => { if (e.key === "Enter") submitLogin(); }}
              autoFocus
            />
            {error && (
              <div className="login-error"><AlertTriangle size={15} style={{ flexShrink: 0, marginTop: 1 }} />{error}</div>
            )}
            <button type="button" className="btn btn-brass btn-full" style={{ marginTop: 18 }} disabled={loading} onClick={submitLogin}>
              {loading ? "Verificando…" : <>Entrar <Lock size={14} /></>}
            </button>
            <div className="login-hint">
              Tu código determina tu rol (Alumno, Profesor o Staff) automáticamente.
            </div>
          </>
        ) : (
          <>
            <label className="field-label" htmlFor="name-input">Tu nombre completo</label>
            <input
              id="name-input"
              className="code-input"
              placeholder="Nombre y apellidos"
              value={name}
              onChange={(e) => setName(e.target.value)}
              onKeyDown={(e) => { if (e.key === "Enter") submitRegister(); }}
              autoFocus
            />
            {error && (
              <div className="login-error"><AlertTriangle size={15} style={{ flexShrink: 0, marginTop: 1 }} />{error}</div>
            )}
            <button type="button" className="btn btn-brass btn-full" style={{ marginTop: 18 }} disabled={loading} onClick={submitRegister}>
              {loading ? "Creando tu acceso…" : <>Generar mi código y entrar <ChevronRight size={14} /></>}
            </button>
            <div className="login-hint">
              Entrarás como Alumno. El equipo de Staff podrá ascenderte a Profesor más adelante si corresponde.
            </div>
          </>
        )}

        <div className="login-verify-link">
          <button type="button" className="link-btn" onClick={onGoVerify}>
            ¿Necesitas verificar un certificado? Ir a verificación pública →
          </button>
        </div>
      </div>
    </div>
  );
}

/* ============================================================
   VERIFICACIÓN PÚBLICA
   ============================================================ */
function PublicVerify({ data, onBack }) {
  const [code, setCode] = useState("");
  const [result, setResult] = useState(null); // null | cert | 'notfound'

  const check = (e) => {
    e.preventDefault();
    const found = data.certificates.find(
      (c) => c.verificationCode.toUpperCase() === code.trim().toUpperCase() && c.published
    );
    setResult(found || "notfound");
  };

  return (
    <div className="verify-wrap">
      <div className="verify-card">
        <button className="link-btn" onClick={onBack} style={{ marginBottom: 16, display: "flex", alignItems: "center", gap: 6 }}>
          <ArrowLeft size={13} /> Volver al acceso
        </button>
        <div className="login-seal"><ShieldCheck size={24} /></div>
        <h1 className="login-title" style={{ fontSize: 22 }}>Verificación de certificado</h1>
        <p className="login-sub">Introduce el código de verificación</p>
        <form onSubmit={check}>
          <input
            className="code-input"
            placeholder="CESI-XXXX-XXXXX"
            value={code}
            onChange={(e) => setCode(e.target.value.toUpperCase())}
          />
          <button className="btn btn-primary btn-full" style={{ marginTop: 14 }}>
            <Search size={14} /> Verificar
          </button>
        </form>

        {result && result !== "notfound" && (
          <div className="verify-result-ok">
            <div style={{ display: "flex", alignItems: "center", gap: 8, color: "var(--moss)", fontWeight: 700, marginBottom: 10 }}>
              <CheckCircle2 size={17} /> Certificado válido
            </div>
            <p style={{ margin: "4px 0", fontSize: 13.5 }}><strong>Titular:</strong> {result.studentName}</p>
            <p style={{ margin: "4px 0", fontSize: 13.5 }}><strong>Curso:</strong> {result.courseName}</p>
            <p style={{ margin: "4px 0", fontSize: 13.5 }}><strong>Docente:</strong> {result.teacherName}</p>
            <p style={{ margin: "4px 0", fontSize: 13.5 }}><strong>Periodo:</strong> {fmtDate(result.startDate)} – {fmtDate(result.endDate)}</p>
            <p style={{ margin: "4px 0", fontSize: 13.5 }}><strong>Emitido:</strong> {fmtDate(result.issueDate)}</p>
          </div>
        )}
        {result === "notfound" && (
          <div className="verify-result-bad">
            <div style={{ display: "flex", alignItems: "center", gap: 8, color: "var(--rust)", fontWeight: 700 }}>
              <XCircle size={17} /> Código no válido o certificado no publicado
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

/* ============================================================
   CERTIFICADO — vista renderizada
   ============================================================ */
function CertificateSheet({ cert, template }) {
  const html = renderTemplate(template?.html || "", {
    studentName: cert.studentName,
    courseName: cert.courseName,
    teacherName: cert.teacherName,
    startDate: fmtDate(cert.startDate),
    endDate: fmtDate(cert.endDate),
  });
  return (
    <div className="cert-sheet">
      <div dangerouslySetInnerHTML={{ __html: html }} />
      <div className="cert-meta">
        <span><CalendarDays size={12} style={{ verticalAlign: "-2px", marginRight: 4 }} />Emitido {fmtDate(cert.issueDate)}</span>
        <span>{cert.published ? "Publicado" : "Borrador — no visible aún"}</span>
      </div>
      <div className="cert-seal-row">
        <div className="cert-seal"><BadgeCheck size={26} /></div>
        <div>
          <div style={{ fontSize: 10, textTransform: "uppercase", letterSpacing: "0.08em", color: "#6b6448", marginBottom: 4 }}>Código de verificación</div>
          <div className="cert-verify-code">{cert.verificationCode}</div>
        </div>
      </div>
    </div>
  );
}

/* ============================================================
   SHELL + SIDEBAR
   ============================================================ */
const NAV = {
  alumno: [
    { key: "resumen", label: "Resumen general", icon: LayoutGrid },
    { key: "clase-en-vivo", label: "Clase en vivo", icon: Video },
    { key: "asistencia", label: "Mi asistencia", icon: ClipboardCheck },
    { key: "calificaciones", label: "Mi boletín", icon: BookOpen },
    { key: "certificados", label: "Certificados", icon: Award },
  ],
  profesor: [
    { key: "resumen", label: "Resumen general", icon: LayoutGrid },
    { key: "clase-en-curso", label: "Clase en curso", icon: Play },
    { key: "pase-lista", label: "Pase de lista", icon: ClipboardCheck },
    { key: "calificaciones", label: "Calificaciones", icon: BookOpen },
    { key: "fichaje", label: "Fichaje laboral", icon: Clock },
    { key: "certificados", label: "Certificados", icon: Award },
  ],
  staff: [
    { key: "dashboard", label: "Panel principal", icon: LayoutGrid },
    { key: "explorador", label: "Cursos y clases", icon: Building2 },
    { key: "usuarios", label: "Usuarios", icon: Users },
    { key: "certificados", label: "Certificados", icon: Award },
  ],
};

function Sidebar({ user, view, setView, onLogout }) {
  const items = NAV[user.role];
  return (
    <div className="sidebar">
      <div className="sidebar-brand">
        <div className="sidebar-brand-mark"><GraduationCap size={17} /></div>
        <div className="sidebar-brand-text">
          <div className="name">CESI Academy</div>
          <div className="role">Portal académico</div>
        </div>
      </div>
      <nav>
        {items.map((it) => (
          <button
            key={it.key}
            className={"nav-item" + (view === it.key ? " active" : "")}
            onClick={() => setView(it.key)}
          >
            <it.icon size={16} /> {it.label}
          </button>
        ))}
      </nav>
      <div className="sidebar-foot">
        <div className="user-chip">
          <div className="user-chip-av">{initials(user.name)}</div>
          <div>
            <div className="user-chip-name">{user.name}</div>
            <div className="user-chip-code">{user.code}</div>
          </div>
        </div>
        <button className="btn btn-ghost btn-sm btn-full" onClick={onLogout} style={{ borderColor: "rgba(242,239,230,0.25)", color: "#e7e2d3" }}>
          <LogOut size={13} /> Cerrar sesión
        </button>
      </div>
    </div>
  );
}

/* ============================================================
   VISTAS — ALUMNO
   ============================================================ */
function AlumnoResumen({ data, student }) {
  const myAtt = data.attendance.filter((a) => a.studentId === student.id);
  const presentPct = myAtt.length ? Math.round((myAtt.filter((a) => a.status === "presente").length / myAtt.length) * 100) : 0;
  const myGrades = data.grades.filter((g) => g.studentId === student.id);
  const avg = myGrades.length
    ? (myGrades.reduce((acc, g) => acc + (g.practica + g.examen + g.proyecto) / 3, 0) / myGrades.length).toFixed(1)
    : "—";
  const myCerts = data.certificates.filter((c) => c.studentId === student.id && c.published);
  const course = data.courses.find((c) => c.id === student.courseId);
  const liveSession = (data.classSessions || []).find((s) => s.status === "active" && s.courseId === student.courseId);
  const liveSubject = liveSession && data.courses.flatMap((c) => c.subjects).find((s) => s.id === liveSession.subjectId);

  return (
    <>
      <div className="grid grid-3">
        <StatCard label="Asistencia global" value={presentPct + "%"} sub={`${myAtt.length} sesiones registradas`} />
        <StatCard label="Media general" value={avg} sub="Sobre 10" />
        <StatCard label="Certificados emitidos" value={myCerts.length} sub="Disponibles para ti" />
      </div>

      <h3 className="section-title"><BookOpen size={16} /> Mi curso</h3>
      <div className="card">
        {!course ? (
          <p style={{ margin: 0, fontSize: 13, color: "var(--ink-2)" }}>
            Todavía no estás matriculado en ningún curso. El equipo de Staff te asignará uno en breve.
          </p>
        ) : (
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 12 }}>
          <div>
            <p style={{ margin: "0 0 6px", fontWeight: 600, fontSize: 15 }}>{course?.name}</p>
            <p style={{ margin: 0, fontSize: 13, color: "var(--ink-2)" }}>
              Asignaturas: {course?.subjects.map((s) => s.name).join(" · ")}
            </p>
          </div>
          {liveSession ? (
            <div style={{ textAlign: "right" }}>
              <span className="live-pill" style={{ color: "var(--moss)" }}><span className="live-dot" style={{ background: "var(--moss)" }} /> {liveSubject?.name} en curso</span>
              <div style={{ marginTop: 6 }}>
                <span className="meet-pill"><span className="live-dot" /> Meet activo</span>
              </div>
              <div style={{ marginTop: 8 }}>
                <button
                  className="btn btn-brass btn-sm"
                  disabled={!liveSession.meetLink}
                  onClick={() => window.open(liveSession.meetLink, "_blank", "noopener,noreferrer")}
                >
                  <Video size={13} /> Unirme al Meet <ExternalLink size={12} />
                </button>
              </div>
            </div>
          ) : (
            <span className="badge badge-muted">Sin clase en curso</span>
          )}
        </div>
        )}
      </div>

      <h3 className="section-title"><ClipboardCheck size={16} /> Últimas sesiones</h3>
      <div className="table-wrap">
        <table className="data-table">
          <thead><tr><th>Fecha</th><th>Asignatura</th><th>Estado</th></tr></thead>
          <tbody>
            {myAtt.slice(-5).reverse().map((a) => (
              <tr key={a.id}>
                <td>{fmtDate(a.date)}</td>
                <td>{data.courses.flatMap((c) => c.subjects).find((s) => s.id === a.subjectId)?.name}</td>
                <td><span className={"badge " + attBadgeClass[a.status]}>{attLabel[a.status]}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

function AlumnoAsistencia({ data, student }) {
  const [subjectFilter, setSubjectFilter] = useState("all");
  const course = data.courses.find((c) => c.id === student.courseId);
  const myAtt = data.attendance
    .filter((a) => a.studentId === student.id)
    .filter((a) => subjectFilter === "all" || a.subjectId === subjectFilter)
    .sort((a, b) => (a.date < b.date ? 1 : -1));

  const counts = { presente: 0, ausente: 0, tarde: 0 };
  myAtt.forEach((a) => counts[a.status]++);

  return (
    <>
      <div className="grid grid-3">
        <StatCard label="Presentes" value={counts.presente} icon={CheckCircle2} />
        <StatCard label="Ausencias" value={counts.ausente} icon={XCircle} />
        <StatCard label="Retrasos" value={counts.tarde} icon={AlertTriangle} />
      </div>
      <div className="toolbar" style={{ marginTop: 22 }}>
        <select className="select-input" value={subjectFilter} onChange={(e) => setSubjectFilter(e.target.value)}>
          <option value="all">Todas las asignaturas</option>
          {course?.subjects.map((s) => <option key={s.id} value={s.id}>{s.name}</option>)}
        </select>
      </div>
      <div className="table-wrap">
        <table className="data-table">
          <thead><tr><th>Fecha</th><th>Asignatura</th><th>Estado</th></tr></thead>
          <tbody>
            {myAtt.map((a) => (
              <tr key={a.id}>
                <td>{fmtDate(a.date)}</td>
                <td>{course?.subjects.find((s) => s.id === a.subjectId)?.name}</td>
                <td><span className={"badge " + attBadgeClass[a.status]}>{attLabel[a.status]}</span></td>
              </tr>
            ))}
            {myAtt.length === 0 && <tr><td colSpan={3}><div className="empty-state"><p>No hay registros para este filtro.</p></div></td></tr>}
          </tbody>
        </table>
      </div>
    </>
  );
}

function AlumnoCalificaciones({ data, student }) {
  const course = data.courses.find((c) => c.id === student.courseId);
  const myGrades = data.grades.filter((g) => g.studentId === student.id);

  return (
    <div className="table-wrap">
      <table className="data-table">
        <thead><tr><th>Asignatura</th><th>Práctica</th><th>Examen</th><th>Proyecto</th><th>Media</th></tr></thead>
        <tbody>
          {myGrades.map((g) => {
            const avg = ((g.practica + g.examen + g.proyecto) / 3).toFixed(1);
            const cls = avg >= 7 ? "badge-ok" : avg >= 5 ? "badge-warn" : "badge-bad";
            return (
              <tr key={g.id}>
                <td>{course?.subjects.find((s) => s.id === g.subjectId)?.name}</td>
                <td>{g.practica}</td>
                <td>{g.examen}</td>
                <td>{g.proyecto}</td>
                <td><span className={"avg-pill " + cls}>{avg}</span></td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

function AlumnoCertificados({ data, student }) {
  const [open, setOpen] = useState(null);
  const template = data.templates[0];
  const myCerts = data.certificates.filter((c) => c.studentId === student.id && c.published);

  return (
    <>
      {myCerts.length === 0 && (
        <div className="empty-state"><Award size={30} /><p>Aún no tienes certificados publicados. El Staff los emitirá cuando corresponda.</p></div>
      )}
      <div className="grid grid-2">
        {myCerts.map((c) => (
          <div key={c.id} className="card clickable-row" onClick={() => setOpen(c)}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
              <div>
                <p style={{ margin: "0 0 4px", fontWeight: 600 }}>{c.courseName}</p>
                <p style={{ margin: 0, fontSize: 12.5, color: "var(--ink-2)" }}>Emitido {fmtDate(c.issueDate)}</p>
              </div>
              <Eye size={16} color="var(--brass)" />
            </div>
          </div>
        ))}
      </div>
      {open && (
        <Modal title="Certificado" onClose={() => setOpen(null)} wide
          footer={<button className="btn btn-ghost" onClick={() => setOpen(null)}>Cerrar</button>}>
          <CertificateSheet cert={open} template={template} />
        </Modal>
      )}
    </>
  );
}

/* ============================================================
   VISTAS — ALUMNO: Clase en vivo (Meet)
   Solo visible si el alumno está inscrito en el curso de la sesión activa.
   ============================================================ */
function AlumnoClaseEnVivo({ data, student }) {
  const activeSessions = (data.classSessions || []).filter(
    (s) => s.status === "active" && s.courseId === student.courseId
  );
  const subjectsById = new Map(
    data.courses.flatMap((c) => c.subjects.map((s) => [s.id, { ...s, courseName: c.name }]))
  );
  const teacherName = (teacherId) => data.teachers.find((t) => t.id === teacherId)?.name || "—";

  if (activeSessions.length === 0) {
    return (
      <div className="card" style={{ maxWidth: 460, margin: "0 auto", textAlign: "center", padding: "32px 26px" }}>
        <div className="login-seal" style={{ margin: "0 auto 16px" }}><Video size={22} /></div>
        <p style={{ fontWeight: 600, fontSize: 16, marginBottom: 6 }}>Ninguna clase en vivo ahora mismo</p>
        <p style={{ fontSize: 12.5, color: "var(--ink-2)" }}>
          Cuando tu profesor inicie una sesión de tu curso, el enlace de Google Meet aparecerá aquí.
        </p>
      </div>
    );
  }

  return (
    <>
      {activeSessions.map((session) => {
        const subject = subjectsById.get(session.subjectId);
        return (
          <div
            key={session.id}
            className="card"
            style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16, marginBottom: 18, background: "linear-gradient(135deg, var(--ink), #1f3050)", color: "#fff", border: "none" }}
          >
            <div>
              <span className="live-pill" style={{ color: "#9fe3b8" }}><span className="live-dot" style={{ background: "#9fe3b8" }} /> Clase en curso</span>
              <p style={{ margin: "6px 0 0", fontWeight: 600, fontSize: 17 }}>{subject?.name}</p>
              <p style={{ margin: 0, fontSize: 12, color: "#c7d0e0" }}>
                Profesor: {teacherName(session.teacherId)} · Iniciada a las {new Date(session.startTime).toLocaleTimeString("es-ES")}
              </p>
              <span className="meet-pill on-dark" style={{ marginTop: 8 }}><span className="live-dot" /> Meet activo</span>
            </div>
            <button
              className="btn btn-brass"
              onClick={() => window.open(session.meetLink, "_blank", "noopener,noreferrer")}
              disabled={!session.meetLink}
            >
              <Video size={14} /> Unirme al Meet <ExternalLink size={12} />
            </button>
          </div>
        );
      })}
    </>
  );
}

/* ============================================================
   VISTAS — PROFESOR
   ============================================================ */
function ProfesorResumen({ data, teacher }) {
  const mySubjects = data.courses.flatMap((c) => c.subjects.map((s) => ({ ...s, courseName: c.name }))).filter((s) => s.teacherId === teacher.id);
  const myStudentIds = new Set(
    data.students.filter((st) => data.courses.find((c) => c.id === st.courseId)?.subjects.some((s) => s.teacherId === teacher.id)).map((s) => s.id)
  );
  const myAtt = data.attendance.filter((a) => mySubjects.some((s) => s.id === a.subjectId));
  const presentPct = myAtt.length ? Math.round((myAtt.filter((a) => a.status === "presente").length / myAtt.length) * 100) : 0;
  const liveByCourse = new Map(
    (data.classSessions || [])
      .filter((cs) => cs.status === "active" && cs.teacherId === teacher.id)
      .map((cs) => [cs.subjectId, cs])
  );

  return (
    <>
      <div className="grid grid-3">
        <StatCard label="Asignaturas a cargo" value={mySubjects.length} />
        <StatCard label="Alumnos" value={myStudentIds.size} />
        <StatCard label="Asistencia media" value={presentPct + "%"} />
      </div>
      <h3 className="section-title"><BookOpen size={16} /> Mis asignaturas</h3>
      <div className="grid grid-2">
        {mySubjects.map((s) => {
          const live = liveByCourse.get(s.id);
          return (
            <div key={s.id} className="card">
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 10 }}>
                <div>
                  <p style={{ margin: "0 0 4px", fontWeight: 600 }}>{s.name}</p>
                  <p style={{ margin: 0, fontSize: 12.5, color: "var(--ink-2)" }}>{s.courseName}</p>
                </div>
                {live ? (
                  <span className="live-pill" style={{ color: "var(--moss)" }}><span className="live-dot" style={{ background: "var(--moss)" }} /> En curso</span>
                ) : null}
              </div>
              {live && (
                <>
                  <div style={{ marginTop: 10 }}>
                    <span className="meet-pill"><span className="live-dot" /> Meet activo</span>
                  </div>
                  <button
                    className="btn btn-brass btn-sm"
                    style={{ marginTop: 10 }}
                    disabled={!live.meetLink}
                    onClick={() => window.open(live.meetLink, "_blank", "noopener,noreferrer")}
                  >
                    <Video size={13} /> Abrir Meet <ExternalLink size={12} />
                  </button>
                </>
              )}
            </div>
          );
        })}
      </div>
    </>
  );
}

function ProfesorPaseLista({ data, teacher, toggleAttendance }) {
  const mySubjects = data.courses.flatMap((c) => c.subjects.map((s) => ({ ...s, courseId: c.id }))).filter((s) => s.teacherId === teacher.id);
  const [subjectId, setSubjectId] = useState(mySubjects[0]?.id || "");
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const subject = mySubjects.find((s) => s.id === subjectId);
  const roster = data.students.filter((s) => s.courseId === subject?.courseId);

  const statusFor = (studentId) => data.attendance.find((a) => a.studentId === studentId && a.subjectId === subjectId && a.date === date)?.status;

  return (
    <>
      <div className="toolbar">
        <select className="select-input" value={subjectId} onChange={(e) => setSubjectId(e.target.value)}>
          {mySubjects.map((s) => <option key={s.id} value={s.id}>{s.name}</option>)}
        </select>
        <input type="date" className="select-input" value={date} onChange={(e) => setDate(e.target.value)} />
        <span style={{ fontSize: 12, color: "var(--ink-2)" }}>{roster.length} alumnos en esta clase</span>
      </div>
      <div className="table-wrap">
        <table className="data-table">
          <thead><tr><th>Alumno</th><th>Marcar asistencia</th><th>Estado actual</th></tr></thead>
          <tbody>
            {roster.map((s) => {
              const st = statusFor(s.id);
              return (
                <tr key={s.id}>
                  <td>{s.name}</td>
                  <td>
                    <div className="att-btns">
                      <button title="Presente" className={"att-btn p" + (st === "presente" ? " active" : "")} onClick={() => toggleAttendance(s.id, subjectId, date, "presente")}><Check size={15} /></button>
                      <button title="Retraso" className={"att-btn t" + (st === "tarde" ? " active" : "")} onClick={() => toggleAttendance(s.id, subjectId, date, "tarde")}><Clock size={14} /></button>
                      <button title="Ausente" className={"att-btn a" + (st === "ausente" ? " active" : "")} onClick={() => toggleAttendance(s.id, subjectId, date, "ausente")}><X size={15} /></button>
                    </div>
                  </td>
                  <td>{st ? <span className={"badge " + attBadgeClass[st]}>{attLabel[st]}</span> : <span className="badge badge-muted">Sin marcar</span>}</td>
                </tr>
              );
            })}
            {roster.length === 0 && <tr><td colSpan={3}><div className="empty-state"><p>Selecciona una asignatura con alumnos.</p></div></td></tr>}
          </tbody>
        </table>
      </div>
    </>
  );
}

function ProfesorCalificaciones({ data, teacher, updateGrade }) {
  const mySubjects = data.courses.flatMap((c) => c.subjects.map((s) => ({ ...s, courseId: c.id }))).filter((s) => s.teacherId === teacher.id);
  const [subjectId, setSubjectId] = useState(mySubjects[0]?.id || "");
  const subject = mySubjects.find((s) => s.id === subjectId);
  const roster = data.students.filter((s) => s.courseId === subject?.courseId);
  const [toast, setToast] = useState("");

  const gradeFor = (studentId) => data.grades.find((g) => g.studentId === studentId && g.subjectId === subjectId);

  const classAvg = useMemo(() => {
    const vals = roster.map((s) => {
      const g = gradeFor(s.id);
      return g ? (g.practica + g.examen + g.proyecto) / 3 : null;
    }).filter((v) => v !== null);
    return vals.length ? (vals.reduce((a, b) => a + b, 0) / vals.length).toFixed(2) : "—";
  }, [data.grades, subjectId, roster.length]);

  return (
    <>
      <div className="toolbar" style={{ justifyContent: "space-between" }}>
        <select className="select-input" value={subjectId} onChange={(e) => setSubjectId(e.target.value)}>
          {mySubjects.map((s) => <option key={s.id} value={s.id}>{s.name}</option>)}
        </select>
        <div className="card-tight card" style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <TrendingUp size={15} color="var(--brass)" />
          <span style={{ fontSize: 12.5, color: "var(--ink-2)" }}>Promedio de la clase</span>
          <span className="mono" style={{ fontWeight: 700, fontSize: 15 }}>{classAvg}</span>
        </div>
      </div>
      <div className="table-wrap">
        <table className="data-table">
          <thead><tr><th>Alumno</th><th>Práctica</th><th>Examen</th><th>Proyecto</th><th>Media (en vivo)</th></tr></thead>
          <tbody>
            {roster.map((s) => {
              const g = gradeFor(s.id);
              if (!g) return null;
              const avg = ((g.practica + g.examen + g.proyecto) / 3).toFixed(1);
              const cls = avg >= 7 ? "badge-ok" : avg >= 5 ? "badge-warn" : "badge-bad";
              return (
                <tr key={s.id}>
                  <td>{s.name}</td>
                  {["practica", "examen", "proyecto"].map((field) => (
                    <td key={field}>
                      <input
                        type="number" min={0} max={10}
                        value={g[field]}
                        onChange={(e) => {
                          updateGrade(g.id, field, Math.max(0, Math.min(10, Number(e.target.value))));
                          setToast("Calificación actualizada");
                        }}
                      />
                    </td>
                  ))}
                  <td><span className={"avg-pill " + cls}>{avg}</span></td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <Toast message={toast} onDone={() => setToast("")} />
    </>
  );
}

function ProfesorFichaje({ teacher, clockRecords, clockAction }) {
  const [now, setNow] = useState(Date.now());
  useEffect(() => { const t = setInterval(() => setNow(Date.now()), 1000); return () => clearInterval(t); }, []);

  const today = new Date().toISOString().slice(0, 10);
  const record = clockRecords.find((r) => r.teacherId === teacher.id && r.date === today);
  const openEntry = record?.entries.find((e) => !e.out);
  const isClockedIn = !!openEntry;

  const elapsed = isClockedIn ? Math.floor((now - openEntry.in) / 1000) : 0;
  const hh = String(Math.floor(elapsed / 3600)).padStart(2, "0");
  const mm = String(Math.floor((elapsed % 3600) / 60)).padStart(2, "0");
  const ss = String(elapsed % 60).padStart(2, "0");

  const totalTodaySec = (record?.entries || []).reduce((acc, e) => acc + ((e.out || (isClockedIn && e === openEntry ? now : e.in)) - e.in) / 1000, 0);

  return (
    <>
      <div className="card" style={{ maxWidth: 420, margin: "0 auto", textAlign: "center", padding: "30px 24px" }}>
        <div className="clock-face">
          <div className="clock-time">{isClockedIn ? `${hh}:${mm}:${ss}` : "00:00:00"}</div>
          <div className="clock-label">{isClockedIn ? "En curso" : "Detenido"}</div>
        </div>
        <div style={{ display: "flex", gap: 10, justifyContent: "center" }}>
          {!isClockedIn ? (
            <button className="btn btn-brass" onClick={() => clockAction(teacher.id, "in")}><Play size={14} /> Fichar entrada</button>
          ) : (
            <button className="btn btn-danger" onClick={() => clockAction(teacher.id, "out")}><Square size={14} /> Fichar salida</button>
          )}
        </div>
        <p style={{ marginTop: 18, fontSize: 12.5, color: "var(--ink-2)" }}>
          Tiempo total hoy: <span className="mono" style={{ fontWeight: 700 }}>{Math.floor(totalTodaySec / 3600)}h {Math.floor((totalTodaySec % 3600) / 60)}m</span>
        </p>
      </div>

      <h3 className="section-title"><Clock size={16} /> Registro de hoy</h3>
      <div className="table-wrap">
        <table className="data-table">
          <thead><tr><th>Entrada</th><th>Salida</th><th>Duración</th></tr></thead>
          <tbody>
            {(record?.entries || []).slice().reverse().map((e, i) => {
              const dur = ((e.out || now) - e.in) / 1000;
              return (
                <tr key={i}>
                  <td>{new Date(e.in).toLocaleTimeString("es-ES")}</td>
                  <td>{e.out ? new Date(e.out).toLocaleTimeString("es-ES") : "—"}</td>
                  <td>{Math.floor(dur / 60)} min</td>
                </tr>
              );
            })}
            {(!record || record.entries.length === 0) && <tr><td colSpan={3}><div className="empty-state"><p>Aún no has fichado hoy.</p></div></td></tr>}
          </tbody>
        </table>
      </div>
    </>
  );
}

function ProfesorCertificados({ data, teacher }) {
  const [open, setOpen] = useState(null);
  const template = data.templates[0];
  const myCerts = data.certificates.filter((c) => c.teacherName === teacher.name && c.published);

  return (
    <>
      <p style={{ fontSize: 12.5, color: "var(--ink-2)", marginBottom: 16 }}>
        Solo lectura — el Staff es quien genera y publica los certificados.
      </p>
      {myCerts.length === 0 && (
        <div className="empty-state"><Award size={30} /><p>Ningún certificado publicado de tus alumnos todavía.</p></div>
      )}
      <div className="table-wrap">
        {myCerts.length > 0 && (
          <table className="data-table">
            <thead><tr><th>Alumno</th><th>Curso</th><th>Emitido</th><th></th></tr></thead>
            <tbody>
              {myCerts.map((c) => (
                <tr key={c.id} className="clickable-row" onClick={() => setOpen(c)}>
                  <td>{c.studentName}</td>
                  <td>{c.courseName}</td>
                  <td>{fmtDate(c.issueDate)}</td>
                  <td><Eye size={14} color="var(--brass)" /></td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
      {open && (
        <Modal title="Certificado" onClose={() => setOpen(null)} wide footer={<button className="btn btn-ghost" onClick={() => setOpen(null)}>Cerrar</button>}>
          <CertificateSheet cert={open} template={template} />
        </Modal>
      )}
    </>
  );
}

function ClassSummaryCard({ summary }) {
  if (!summary) return null;
  return (
    <div className="card">
      <p style={{ margin: "0 0 4px", fontWeight: 600, fontSize: 15 }}>{summary.subjectName}</p>
      <p style={{ margin: "0 0 14px", fontSize: 12.5, color: "var(--ink-2)" }}>{fmtDate(summary.date)} · Duración {summary.durationMin} min</p>
      <div className="grid grid-3" style={{ marginBottom: 18 }}>
        <StatCard label="Presentes" value={summary.present} />
        <StatCard label="Ausentes" value={summary.absent} />
        <StatCard label="Retrasos" value={summary.late} />
      </div>
      {summary.content && (
        <>
          <p style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: "0.06em", color: "var(--ink-2)", fontWeight: 700, marginBottom: 6 }}>Contenido tratado</p>
          <p style={{ fontSize: 13.5, marginBottom: 16, whiteSpace: "pre-wrap" }}>{summary.content}</p>
        </>
      )}
      {summary.tasks.length > 0 && (
        <>
          <p style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: "0.06em", color: "var(--ink-2)", fontWeight: 700, marginBottom: 6 }}>Tareas asignadas</p>
          <ul style={{ margin: "0 0 16px", paddingLeft: 18, fontSize: 13 }}>
            {summary.tasks.map((t) => <li key={t.id}>{t.title}{t.dueDate ? ` — entrega ${fmtDate(t.dueDate)}` : ""}</li>)}
          </ul>
        </>
      )}
      {summary.notes.length > 0 && (
        <>
          <p style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: "0.06em", color: "var(--ink-2)", fontWeight: 700, marginBottom: 6 }}>Notas por alumno</p>
          <ul style={{ margin: 0, paddingLeft: 18, fontSize: 13 }}>
            {summary.notes.map((n) => <li key={n.id}><strong>{n.studentName}:</strong> {n.text}</li>)}
          </ul>
        </>
      )}
      {!summary.content && summary.tasks.length === 0 && summary.notes.length === 0 && (
        <p style={{ fontSize: 12.5, color: "var(--ink-2)", margin: 0 }}>No se registró contenido, tareas ni notas en esta sesión.</p>
      )}
    </div>
  );
}

function ProfesorClaseEnCurso({ data, teacher, session, startSession, finishSession, updateSessionContent, addTask, addNote, toggleAttendance }) {
  const [now, setNow] = useState(Date.now());
  useEffect(() => {
    if (!session) return;
    const t = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(t);
  }, [session?.id]);

  const mySubjects = data.courses.flatMap((c) => c.subjects.map((s) => ({ ...s, courseId: c.id, courseName: c.name }))).filter((s) => s.teacherId === teacher.id);
  const [subjectId, setSubjectId] = useState(mySubjects[0]?.id || "");
  const [taskModal, setTaskModal] = useState(false);
  const [noteModal, setNoteModal] = useState(false);
  const [taskTitle, setTaskTitle] = useState("");
  const [taskDue, setTaskDue] = useState("");
  const [noteStudentId, setNoteStudentId] = useState("");
  const [noteText, setNoteText] = useState("");
  const [finishedSummary, setFinishedSummary] = useState(null);
  const [toast, setToast] = useState("");

  if (!session) {
    return (
      <>
        <div className="card" style={{ maxWidth: 460, margin: "0 auto", textAlign: "center", padding: "32px 26px" }}>
          <div className="login-seal" style={{ margin: "0 auto 16px" }}><Play size={22} /></div>
          <p style={{ fontWeight: 600, fontSize: 16, marginBottom: 6 }}>Ninguna clase en curso</p>
          <p style={{ fontSize: 12.5, color: "var(--ink-2)", marginBottom: 20 }}>
            Selecciona la asignatura e inicia la sesión. Se fichará tu entrada automáticamente y se abrirá el pase de lista.
          </p>
          <div className="form-row" style={{ textAlign: "left" }}>
            <label>Asignatura</label>
            <select value={subjectId} onChange={(e) => setSubjectId(e.target.value)}>
              {mySubjects.map((s) => <option key={s.id} value={s.id}>{s.name} · {s.courseName}</option>)}
            </select>
          </div>
          <button
            className="btn btn-brass btn-full"
            disabled={!subjectId}
            onClick={() => {
              const meetLink = startSession(subjectId);
              if (meetLink) window.open(meetLink, "_blank", "noopener,noreferrer");
            }}
          >
            <Play size={14} /> Iniciar clase
          </button>
          <p style={{ fontSize: 11, color: "var(--ink-2)", marginTop: 10 }}>
            Se generará automáticamente un enlace de Google Meet y se abrirá en una nueva pestaña.
          </p>
        </div>
        {finishedSummary && (
          <>
            <h3 className="section-title"><Sparkles size={16} /> Resumen de la última clase</h3>
            <ClassSummaryCard summary={finishedSummary} />
          </>
        )}
      </>
    );
  }

  const subject = data.courses.flatMap((c) => c.subjects.map((s) => ({ ...s, courseId: c.id }))).find((s) => s.id === session.subjectId);
  const roster = data.students.filter((s) => s.courseId === subject?.courseId);
  const elapsed = Math.max(0, Math.floor((now - session.startTime) / 1000));
  const hh = String(Math.floor(elapsed / 3600)).padStart(2, "0");
  const mm = String(Math.floor((elapsed % 3600) / 60)).padStart(2, "0");
  const ss = String(elapsed % 60).padStart(2, "0");
  const today = session.date;
  const statusFor = (studentId) => data.attendance.find((a) => a.studentId === studentId && a.subjectId === session.subjectId && a.date === today)?.status;

  const handleFinish = () => {
    const summary = finishSession(session);
    setFinishedSummary(summary);
  };

  return (
    <>
      <div className="card" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16, marginBottom: 24, background: "linear-gradient(135deg, var(--ink), #1f3050)", color: "#fff", border: "none" }}>
        <div>
          <span className="live-pill" style={{ color: "#9fe3b8" }}><span className="live-dot" style={{ background: "#9fe3b8" }} /> Clase en curso</span>
          <p style={{ margin: "6px 0 0", fontWeight: 600, fontSize: 17 }}>{subject?.name}</p>
          <p style={{ margin: 0, fontSize: 12, color: "#c7d0e0" }}>Iniciada a las {new Date(session.startTime).toLocaleTimeString("es-ES")} · Fichaje automático registrado</p>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginTop: 10, flexWrap: "wrap" }}>
            {session.meetLink && <span className="meet-pill on-dark"><span className="live-dot" /> Meet activo</span>}
            {session.meetLink && (
              <button
                className="btn btn-sm"
                style={{ background: "rgba(255,255,255,0.12)", color: "#fff", border: "1px solid rgba(255,255,255,0.3)" }}
                onClick={() => window.open(session.meetLink, "_blank", "noopener,noreferrer")}
              >
                <Video size={13} /> Abrir Meet <ExternalLink size={12} />
              </button>
            )}
          </div>
        </div>
        <div style={{ textAlign: "center" }}>
          <div className="mono" style={{ fontSize: 30, fontWeight: 700 }}>{hh}:{mm}:{ss}</div>
          <button className="btn btn-sm" style={{ marginTop: 8, background: "#fff", color: "var(--rust)" }} onClick={handleFinish}><Square size={13} /> Finalizar clase</button>
        </div>
      </div>

      <div className="toolbar">
        <button
          className="btn btn-brass btn-sm"
          disabled={!session.meetLink}
          onClick={() => window.open(session.meetLink, "_blank", "noopener,noreferrer")}
        >
          <Video size={13} /> Abrir Meet
        </button>
        {session.meetLink && <span className="meet-pill"><span className="live-dot" /> Meet activo</span>}
        <button className="btn btn-ghost btn-sm" onClick={() => setTaskModal(true)}><ListChecks size={13} /> Tarea rápida</button>
        <button className="btn btn-ghost btn-sm" onClick={() => setNoteModal(true)}><StickyNote size={13} /> Nota rápida por alumno</button>
        <span style={{ fontSize: 12, color: "var(--ink-2)", marginLeft: "auto" }}>{session.tasks.length} tareas · {session.notes.length} notas</span>
      </div>

      <h3 className="section-title"><ClipboardCheck size={16} /> Pase de lista</h3>
      <div className="table-wrap">
        <table className="data-table">
          <thead><tr><th>Alumno</th><th>Marcar asistencia</th><th>Estado actual</th></tr></thead>
          <tbody>
            {roster.map((s) => {
              const st = statusFor(s.id);
              return (
                <tr key={s.id}>
                  <td>{s.name}</td>
                  <td>
                    <div className="att-btns">
                      <button title="Presente" className={"att-btn p" + (st === "presente" ? " active" : "")} onClick={() => toggleAttendance(s.id, session.subjectId, today, "presente")}><Check size={15} /></button>
                      <button title="Retraso" className={"att-btn t" + (st === "tarde" ? " active" : "")} onClick={() => toggleAttendance(s.id, session.subjectId, today, "tarde")}><Clock size={14} /></button>
                      <button title="Ausente" className={"att-btn a" + (st === "ausente" ? " active" : "")} onClick={() => toggleAttendance(s.id, session.subjectId, today, "ausente")}><X size={15} /></button>
                    </div>
                  </td>
                  <td>{st ? <span className={"badge " + attBadgeClass[st]}>{attLabel[st]}</span> : <span className="badge badge-muted">Sin marcar</span>}</td>
                </tr>
              );
            })}
            {roster.length === 0 && <tr><td colSpan={3}><div className="empty-state"><p>Sin alumnos matriculados en este curso.</p></div></td></tr>}
          </tbody>
        </table>
      </div>

      <h3 className="section-title"><FileText size={16} /> Contenido de la clase</h3>
      <div className="card">
        <textarea
          style={{ width: "100%", minHeight: 110, border: "1px solid var(--line)", borderRadius: 3, padding: 10, fontSize: 13.5, fontFamily: "inherit" }}
          placeholder="Anota aquí el temario, ejercicios o material tratado en esta sesión…"
          value={session.content}
          onChange={(e) => updateSessionContent(session.id, e.target.value)}
        />
      </div>

      {session.tasks.length > 0 && (
        <>
          <h3 className="section-title"><ListChecks size={16} /> Tareas creadas en esta clase</h3>
          <div className="table-wrap">
            <table className="data-table">
              <thead><tr><th>Tarea</th><th>Fecha límite</th></tr></thead>
              <tbody>
                {session.tasks.map((t) => (
                  <tr key={t.id}><td>{t.title}</td><td>{t.dueDate ? fmtDate(t.dueDate) : "—"}</td></tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}

      {session.notes.length > 0 && (
        <>
          <h3 className="section-title"><StickyNote size={16} /> Notas rápidas</h3>
          <div className="table-wrap">
            <table className="data-table">
              <thead><tr><th>Alumno</th><th>Nota</th><th>Hora</th></tr></thead>
              <tbody>
                {session.notes.slice().reverse().map((n) => (
                  <tr key={n.id}>
                    <td>{data.students.find((s) => s.id === n.studentId)?.name}</td>
                    <td>{n.text}</td>
                    <td>{new Date(n.ts).toLocaleTimeString("es-ES")}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}

      {taskModal && (
        <Modal title="Crear tarea rápida" onClose={() => setTaskModal(false)}
          footer={<>
            <button className="btn btn-ghost" onClick={() => setTaskModal(false)}>Cancelar</button>
            <button className="btn btn-brass" onClick={() => {
              if (!taskTitle.trim()) return;
              addTask(session.id, taskTitle.trim(), taskDue);
              setTaskTitle(""); setTaskDue(""); setTaskModal(false); setToast("Tarea añadida");
            }}><Plus size={14} /> Añadir tarea</button>
          </>}>
          <div className="form-row"><label>Título de la tarea</label><input value={taskTitle} onChange={(e) => setTaskTitle(e.target.value)} placeholder="Ej. Ejercicios capítulo 3" autoFocus /></div>
          <div className="form-row"><label>Fecha límite (opcional)</label><input type="date" value={taskDue} onChange={(e) => setTaskDue(e.target.value)} /></div>
        </Modal>
      )}

      {noteModal && (
        <Modal title="Nota rápida por alumno" onClose={() => setNoteModal(false)}
          footer={<>
            <button className="btn btn-ghost" onClick={() => setNoteModal(false)}>Cancelar</button>
            <button className="btn btn-brass" onClick={() => {
              if (!noteStudentId || !noteText.trim()) return;
              addNote(session.id, noteStudentId, noteText.trim());
              setNoteText(""); setNoteModal(false); setToast("Nota añadida");
            }}><Plus size={14} /> Añadir nota</button>
          </>}>
          <div className="form-row">
            <label>Alumno</label>
            <select value={noteStudentId} onChange={(e) => setNoteStudentId(e.target.value)}>
              <option value="">Selecciona un alumno</option>
              {roster.map((s) => <option key={s.id} value={s.id}>{s.name}</option>)}
            </select>
          </div>
          <div className="form-row"><label>Nota</label><textarea style={{ minHeight: 90 }} value={noteText} onChange={(e) => setNoteText(e.target.value)} placeholder="Ej. Buena participación hoy" /></div>
        </Modal>
      )}

      <Toast message={toast} onDone={() => setToast("")} />
    </>
  );
}

/* ============================================================
   VISTAS — STAFF
   ============================================================ */
function StaffDashboard({ data, activityLog }) {
  const chartData = data.courses.map((c) => {
    const subjIds = c.subjects.map((s) => s.id);
    const recs = data.attendance.filter((a) => subjIds.includes(a.subjectId));
    const pct = recs.length ? Math.round((recs.filter((a) => a.status === "presente").length / recs.length) * 100) : 0;
    return { name: c.name.length > 18 ? c.name.slice(0, 16) + "…" : c.name, asistencia: pct };
  });

  const activeSessions = (data.classSessions || []).filter((s) => s.status === "active");
  const subjectsById = new Map(
    data.courses.flatMap((c) => c.subjects.map((s) => [s.id, { ...s, courseName: c.name }]))
  );
  const teacherName = (teacherId) => data.teachers.find((t) => t.id === teacherId)?.name || "—";
  const [copiedId, setCopiedId] = useState(null);
  const copyLink = (session) => {
    if (session.meetLink && navigator.clipboard) {
      navigator.clipboard.writeText(session.meetLink).catch(() => {});
    }
    setCopiedId(session.id);
    setTimeout(() => setCopiedId((c) => (c === session.id ? null : c)), 1500);
  };

  return (
    <>
      <div className="grid grid-4">
        <StatCard label="Cursos activos" value={data.courses.length} />
        <StatCard label="Alumnos" value={data.students.length} />
        <StatCard label="Profesores" value={data.teachers.length} />
        <StatCard label="Certificados publicados" value={data.certificates.filter((c) => c.published).length} />
      </div>

      <div className="topbar" style={{ marginTop: 30 }}>
        <h3 className="section-title" style={{ margin: 0 }}><Video size={15} color="var(--moss)" /> Clases en curso ahora</h3>
        {activeSessions.length > 0 && <span className="live-pill"><span className="live-dot" /> {activeSessions.length} en vivo</span>}
      </div>
      {activeSessions.length === 0 ? (
        <div className="empty-state"><Video size={26} /><p>No hay ninguna clase en curso en este momento.</p></div>
      ) : (
        <div className="table-wrap">
          <table className="data-table">
            <thead><tr><th>Profesor</th><th>Asignatura · Curso</th><th>Enlace de Meet</th><th>Iniciada</th></tr></thead>
            <tbody>
              {activeSessions.map((s) => {
                const subject = subjectsById.get(s.subjectId);
                return (
                  <tr key={s.id}>
                    <td>{teacherName(s.teacherId)}</td>
                    <td>{subject?.name} · {subject?.courseName}</td>
                    <td>
                      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                        <span className="mono" style={{ fontSize: 12 }}>{s.meetLink || "—"}</span>
                        {s.meetLink && (
                          <button className="btn btn-ghost btn-sm" onClick={() => copyLink(s)} title="Solo copiar — el Staff no ingresa a la videollamada">
                            {copiedId === s.id ? <Check size={12} /> : <FileText size={12} />} {copiedId === s.id ? "Copiado" : "Copiar"}
                          </button>
                        )}
                      </div>
                    </td>
                    <td>{new Date(s.startTime).toLocaleTimeString("es-ES")}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
      <p style={{ fontSize: 11, color: "var(--ink-2)", marginTop: -8, marginBottom: 24 }}>
        Vista de supervisión: el Staff puede ver y copiar el enlace, pero no se une a la videollamada.
      </p>

      <h3 className="section-title"><TrendingUp size={16} /> Asistencia por curso</h3>
      <div className="card" style={{ height: 260 }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData} margin={{ top: 10, right: 10, left: -14, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e4ddc7" />
            <XAxis dataKey="name" tick={{ fontSize: 11, fill: "#5c5333" }} />
            <YAxis tick={{ fontSize: 11, fill: "#5c5333" }} domain={[0, 100]} unit="%" />
            <Tooltip formatter={(v) => v + "%"} contentStyle={{ fontSize: 12, borderRadius: 4, borderColor: "#cbc2a8" }} />
            <Bar dataKey="asistencia" radius={[3, 3, 0, 0]}>
              {chartData.map((_, i) => <Cell key={i} fill={i % 2 === 0 ? "#a97d3f" : "#0f3d3e"} />)}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="topbar" style={{ marginTop: 30 }}>
        <h3 className="section-title" style={{ margin: 0 }}><Radio size={15} color="var(--moss)" /> Actividad reciente</h3>
        <span className="live-pill"><span className="live-dot" /> En vivo</span>
      </div>
      <div className="table-wrap">
        <table className="data-table">
          <tbody>
            {activityLog.slice(0, 8).map((a) => (
              <tr key={a.id}>
                <td style={{ width: 110 }} className="mono" >{new Date(a.ts).toLocaleTimeString("es-ES")}</td>
                <td>{a.text}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

function StaffExplorador({ data, createCourse, createSubject, assignStudentToCourse, deleteCourse, deleteSubject }) {
  const [courseId, setCourseId] = useState(null);
  const [subjectModal, setSubjectModal] = useState(null);
  const [courseModalOpen, setCourseModalOpen] = useState(false);
  const [newCourseName, setNewCourseName] = useState("");
  const [subjectFormOpen, setSubjectFormOpen] = useState(false);
  const [newSubject, setNewSubject] = useState({ name: "", teacherId: "" });
  const [enrollStudentId, setEnrollStudentId] = useState("");
  const [toast, setToast] = useState("");
  const course = data.courses.find((c) => c.id === courseId);

  const submitCourse = () => {
    if (!newCourseName.trim()) return;
    createCourse(newCourseName.trim());
    setToast(`Curso "${newCourseName.trim()}" creado`);
    setNewCourseName("");
    setCourseModalOpen(false);
  };

  const submitSubject = () => {
    if (!newSubject.name.trim() || !course) return;
    createSubject(course.id, newSubject.name.trim(), newSubject.teacherId || null);
    setToast(`Asignatura "${newSubject.name.trim()}" creada`);
    setNewSubject({ name: "", teacherId: "" });
    setSubjectFormOpen(false);
  };

  const enrolledStudents = course ? data.students.filter((s) => s.courseId === course.id) : [];
  const unenrolledStudents = course ? data.students.filter((s) => s.courseId !== course.id) : [];

  const submitEnroll = () => {
    if (!enrollStudentId || !course) return;
    assignStudentToCourse(enrollStudentId, course.id);
    setToast("Alumno matriculado");
    setEnrollStudentId("");
  };

  const handleDeleteCourse = (c, e) => {
    e.stopPropagation();
    if (!window.confirm(`¿Eliminar el curso "${c.name}"? Se perderán sus asignaturas y se desmatricularán sus alumnos.`)) return;
    deleteCourse(c.id);
    setToast(`Curso "${c.name}" eliminado`);
    if (courseId === c.id) setCourseId(null);
  };

  const handleDeleteSubject = (s, e) => {
    e.stopPropagation();
    if (!window.confirm(`¿Eliminar la asignatura "${s.name}"?`)) return;
    deleteSubject(course.id, s.id);
    setToast(`Asignatura "${s.name}" eliminada`);
  };

  return (
    <>
      <div className="breadcrumb">
        <button onClick={() => setCourseId(null)}>Cursos</button>
        {course && <><span className="sep">/</span><span className="current">{course.name}</span></>}
      </div>

      {!course && (
        <>
          <div className="toolbar" style={{ justifyContent: "flex-end" }}>
            <button className="btn btn-brass" onClick={() => setCourseModalOpen(true)}><Plus size={14} /> Nuevo curso</button>
          </div>
          <div className="grid grid-3">
            {data.courses.map((c) => {
              const studentCount = data.students.filter((s) => s.courseId === c.id).length;
              return (
                <div key={c.id} className="card clickable-row" onClick={() => setCourseId(c.id)}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                    <div>
                      <p style={{ margin: "0 0 6px", fontWeight: 600 }}>{c.name}</p>
                      <p style={{ margin: 0, fontSize: 12.5, color: "var(--ink-2)" }}>{c.subjects.length} asignaturas · {studentCount} alumnos</p>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <button className="btn btn-danger btn-sm" onClick={(e) => handleDeleteCourse(c, e)}><X size={12} /></button>
                      <ChevronRight size={16} color="var(--brass)" />
                    </div>
                  </div>
                </div>
              );
            })}
            {data.courses.length === 0 && (
              <div className="empty-state"><p>Todavía no hay cursos. Crea el primero con "Nuevo curso".</p></div>
            )}
          </div>
        </>
      )}

      {course && (
        <>
          <div className="toolbar" style={{ justifyContent: "flex-end" }}>
            <button className="btn btn-brass" onClick={() => setSubjectFormOpen(true)}><Plus size={14} /> Nueva asignatura</button>
          </div>
          <div className="grid grid-2">
            {course.subjects.map((s) => {
              const teacher = data.teachers.find((t) => t.id === s.teacherId);
              return (
                <div key={s.id} className="card clickable-row" onClick={() => setSubjectModal(s)}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                    <div>
                      <p style={{ margin: "0 0 6px", fontWeight: 600 }}>{s.name}</p>
                      <p style={{ margin: 0, fontSize: 12.5, color: "var(--ink-2)" }}>Docente: {teacher?.name || "Sin asignar"}</p>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <button className="btn btn-danger btn-sm" onClick={(e) => handleDeleteSubject(s, e)}><X size={12} /></button>
                      <ChevronRight size={16} color="var(--brass)" />
                    </div>
                  </div>
                </div>
              );
            })}
            {course.subjects.length === 0 && (
              <div className="empty-state"><p>Sin asignaturas todavía. Crea la primera con "Nueva asignatura".</p></div>
            )}
          </div>

          <h3 className="section-title"><Users size={16} /> Alumnos matriculados</h3>
          <div className="toolbar" style={{ justifyContent: "flex-start", gap: 8 }}>
            <select value={enrollStudentId} onChange={(e) => setEnrollStudentId(e.target.value)}>
              <option value="">Selecciona un alumno registrado…</option>
              {unenrolledStudents.map((s) => <option key={s.id} value={s.id}>{s.name}</option>)}
            </select>
            <button className="btn btn-ghost btn-sm" disabled={!enrollStudentId} onClick={submitEnroll}>
              <Plus size={13} /> Matricular
            </button>
          </div>
          <div className="table-wrap">
            <table className="data-table">
              <thead><tr><th>Nombre</th><th></th></tr></thead>
              <tbody>
                {enrolledStudents.map((s) => (
                  <tr key={s.id}>
                    <td>{s.name}</td>
                    <td><button className="btn btn-danger btn-sm" onClick={() => assignStudentToCourse(s.id, null)}><X size={12} /> Quitar del curso</button></td>
                  </tr>
                ))}
                {enrolledStudents.length === 0 && <tr><td colSpan={2}><div className="empty-state"><p>Sin alumnos matriculados todavía.</p></div></td></tr>}
              </tbody>
            </table>
          </div>
        </>
      )}

      {courseModalOpen && (
        <Modal title="Nuevo curso" onClose={() => setCourseModalOpen(false)}
          footer={<>
            <button className="btn btn-ghost" onClick={() => setCourseModalOpen(false)}>Cancelar</button>
            <button className="btn btn-brass" onClick={submitCourse}><Save size={14} /> Crear curso</button>
          </>}>
          <div className="form-row">
            <label>Nombre del curso</label>
            <input value={newCourseName} onChange={(e) => setNewCourseName(e.target.value)} placeholder="Ej. Desarrollo Web Full Stack" autoFocus />
          </div>
        </Modal>
      )}

      {subjectFormOpen && (
        <Modal title="Nueva asignatura" onClose={() => setSubjectFormOpen(false)}
          footer={<>
            <button className="btn btn-ghost" onClick={() => setSubjectFormOpen(false)}>Cancelar</button>
            <button className="btn btn-brass" onClick={submitSubject}><Save size={14} /> Crear asignatura</button>
          </>}>
          <div className="form-row">
            <label>Nombre de la asignatura</label>
            <input value={newSubject.name} onChange={(e) => setNewSubject({ ...newSubject, name: e.target.value })} placeholder="Ej. Frontend Avanzado" autoFocus />
          </div>
          <div className="form-row">
            <label>Profesor</label>
            <select value={newSubject.teacherId} onChange={(e) => setNewSubject({ ...newSubject, teacherId: e.target.value })}>
              <option value="">Sin asignar</option>
              {data.teachers.map((t) => <option key={t.id} value={t.id}>{t.name}</option>)}
            </select>
            {data.teachers.length === 0 && (
              <p style={{ fontSize: 12, color: "var(--ink-2)", marginTop: 6 }}>
                Todavía no hay profesores. Asciende a un usuario a Profesor desde el panel "Usuarios".
              </p>
            )}
          </div>
        </Modal>
      )}

      {subjectModal && (
        <Modal title={subjectModal.name} onClose={() => setSubjectModal(null)} footer={<button className="btn btn-ghost" onClick={() => setSubjectModal(null)}>Cerrar</button>}>
          <p style={{ fontSize: 12.5, color: "var(--ink-2)", marginBottom: 14 }}>
            Sesiones registradas y su estado agregado.
          </p>
          {(() => {
            const recs = data.attendance.filter((a) => a.subjectId === subjectModal.id);
            const dates = [...new Set(recs.map((r) => r.date))].sort().reverse();
            return (
              <table className="data-table">
                <thead><tr><th>Fecha</th><th>Presentes</th><th>Ausentes</th><th>Retrasos</th></tr></thead>
                <tbody>
                  {dates.map((d) => {
                    const day = recs.filter((r) => r.date === d);
                    return (
                      <tr key={d}>
                        <td>{fmtDate(d)}</td>
                        <td>{day.filter((r) => r.status === "presente").length}</td>
                        <td>{day.filter((r) => r.status === "ausente").length}</td>
                        <td>{day.filter((r) => r.status === "tarde").length}</td>
                      </tr>
                    );
                  })}
                  {dates.length === 0 && <tr><td colSpan={4}><div className="empty-state"><p>Sin sesiones registradas todavía.</p></div></td></tr>}
                </tbody>
              </table>
            );
          })()}
        </Modal>
      )}
      <Toast message={toast} onDone={() => setToast("")} />
    </>
  );
}

function StaffUsuarios({ data, createCode, deleteCode, updateUserRole }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [form, setForm] = useState({ role: "alumno", name: "", code: "" });
  const [search, setSearch] = useState("");
  const [toast, setToast] = useState("");

  const filtered = data.codes.filter((c) => (c.name + c.code).toLowerCase().includes(search.toLowerCase()));

  const suggestCode = (role) => {
    const prefix = role === "alumno" ? "ALU" : role === "profesor" ? "PROF" : "STAFF";
    return `${prefix}-${Math.random().toString(36).slice(2, 7).toUpperCase()}`;
  };

  const openModal = () => {
    setForm({ role: "alumno", name: "", code: suggestCode("alumno") });
    setModalOpen(true);
  };

  const submit = () => {
    if (!form.name.trim() || !form.code.trim()) return;
    createCode(form);
    setToast(`Código ${form.code} creado`);
    setModalOpen(false);
  };

  const handleRoleChange = (c, newRole) => {
    if (newRole === c.role) return;
    updateUserRole(c.code, newRole);
    setToast(`${c.name} ahora es ${newRole}`);
  };

  return (
    <>
      <p style={{ margin: "0 0 14px", fontSize: 12.5, color: "var(--ink-2)" }}>
        Todas las personas registradas en el portal. Los alumnos se registran ellos mismos desde la pantalla de acceso;
        desde aquí puedes ascender a cualquiera a Profesor o Staff, o crear un código manualmente.
      </p>
      <div className="toolbar" style={{ justifyContent: "space-between" }}>
        <div className="search-input-wrap">
          <Search size={14} />
          <input className="search-input" placeholder="Buscar por nombre o código…" value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>
        <button className="btn btn-brass" onClick={openModal}><Plus size={14} /> Nuevo código manual</button>
      </div>

      <div className="table-wrap">
        <table className="data-table">
          <thead><tr><th>Código</th><th>Nombre</th><th>Rol</th><th>Cambiar rol</th><th></th></tr></thead>
          <tbody>
            {filtered.map((c) => (
              <tr key={c.code}>
                <td className="mono" style={{ fontWeight: 700 }}>{c.code}</td>
                <td>{c.name}</td>
                <td><RoleBadge role={c.role} /></td>
                <td>
                  <select value={c.role} onChange={(e) => handleRoleChange(c, e.target.value)}>
                    <option value="alumno">Alumno</option>
                    <option value="profesor">Profesor</option>
                    <option value="staff">Staff</option>
                  </select>
                </td>
                <td>
                  <button className="btn btn-danger btn-sm" onClick={() => deleteCode(c.code)}><X size={12} /> Revocar</button>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && <tr><td colSpan={5}><div className="empty-state"><p>Sin resultados.</p></div></td></tr>}
          </tbody>
        </table>
      </div>

      {modalOpen && (
        <Modal title="Generar código de acceso" onClose={() => setModalOpen(false)}
          footer={<>
            <button className="btn btn-ghost" onClick={() => setModalOpen(false)}>Cancelar</button>
            <button className="btn btn-brass" onClick={submit}><Save size={14} /> Crear código</button>
          </>}>
          <div className="form-row">
            <label>Rol</label>
            <select value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value, code: suggestCode(e.target.value) })}>
              <option value="alumno">Alumno</option>
              <option value="profesor">Profesor</option>
              <option value="staff">Staff</option>
            </select>
          </div>
          <div className="form-row">
            <label>Nombre completo</label>
            <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Nombre y apellidos" />
          </div>
          <div className="form-row">
            <label>Código único</label>
            <input className="mono" value={form.code} onChange={(e) => setForm({ ...form, code: e.target.value.toUpperCase() })} />
          </div>
        </Modal>
      )}
      <Toast message={toast} onDone={() => setToast("")} />
    </>
  );
}

function StaffCertificados({ data, createCertificate, togglePublish, updateTemplate }) {
  const [tab, setTab] = useState("lista");
  const [formOpen, setFormOpen] = useState(false);
  const [viewCert, setViewCert] = useState(null);
  const [toast, setToast] = useState("");
  const template = data.templates[0];
  const [tplDraft, setTplDraft] = useState(template.html);

  const [form, setForm] = useState({
    studentId: data.students[0]?.id || "", courseId: "", teacherId: "", startDate: "", endDate: "",
  });

  const submitCert = () => {
    const student = data.students.find((s) => s.id === form.studentId);
    const course = data.courses.find((c) => c.id === (form.courseId || student?.courseId));
    const teacher = data.teachers.find((t) => t.id === form.teacherId) || data.teachers.find((t) => course?.subjects.some((s) => s.teacherId === t.id));
    if (!student || !course) return;
    createCertificate({
      studentId: student.id,
      studentName: student.name,
      courseName: course.name,
      teacherName: teacher?.name || "—",
      startDate: form.startDate,
      endDate: form.endDate,
    });
    setToast("Certificado generado como borrador");
    setFormOpen(false);
  };

  return (
    <>
      <div className="toolbar">
        <button className={"btn btn-sm " + (tab === "lista" ? "btn-primary" : "btn-ghost")} onClick={() => setTab("lista")}>Todos los certificados</button>
        <button className={"btn btn-sm " + (tab === "plantilla" ? "btn-primary" : "btn-ghost")} onClick={() => setTab("plantilla")}><Pencil size={12} /> Editar plantilla</button>
        {tab === "lista" && <button className="btn btn-brass btn-sm" style={{ marginLeft: "auto" }} onClick={() => setFormOpen(true)}><Plus size={13} /> Generar certificado</button>}
      </div>

      {tab === "lista" && (
        <div className="table-wrap">
          <table className="data-table">
            <thead><tr><th>Alumno</th><th>Curso</th><th>Código</th><th>Estado</th><th></th></tr></thead>
            <tbody>
              {data.certificates.map((c) => (
                <tr key={c.id}>
                  <td>{c.studentName}</td>
                  <td>{c.courseName}</td>
                  <td className="mono">{c.verificationCode}</td>
                  <td>{c.published ? <span className="badge badge-ok">Publicado</span> : <span className="badge badge-muted">Borrador</span>}</td>
                  <td style={{ display: "flex", gap: 6 }}>
                    <button className="btn btn-ghost btn-sm" onClick={() => setViewCert(c)}><Eye size={12} /></button>
                    <button className={"btn btn-sm " + (c.published ? "btn-danger" : "btn-brass")} onClick={() => togglePublish(c.id)}>
                      {c.published ? "Despublicar" : "Publicar"}
                    </button>
                  </td>
                </tr>
              ))}
              {data.certificates.length === 0 && <tr><td colSpan={5}><div className="empty-state"><Award size={28} /><p>Aún no se ha generado ningún certificado.</p></div></td></tr>}
            </tbody>
          </table>
        </div>
      )}

      {tab === "plantilla" && (
        <div className="card">
          <div className="form-row">
            <label>HTML de la plantilla (usa {"{{studentName}}"}, {"{{courseName}}"}, {"{{teacherName}}"}, {"{{startDate}}"}, {"{{endDate}}"})</label>
            <textarea value={tplDraft} onChange={(e) => setTplDraft(e.target.value)} />
          </div>
          <button className="btn btn-brass btn-sm" onClick={() => { updateTemplate(tplDraft); setToast("Plantilla actualizada"); }}><Save size={13} /> Guardar plantilla</button>
          <h4 style={{ marginTop: 22, marginBottom: 10, fontSize: 13, color: "var(--ink-2)", textTransform: "uppercase", letterSpacing: "0.05em" }}>Vista previa</h4>
          <CertificateSheet cert={{ studentName: "Nombre de ejemplo", courseName: "Curso de ejemplo", teacherName: "Docente", startDate: "2026-01-01", endDate: "2026-06-01", issueDate: "2026-06-05", verificationCode: "CESI-PREV-IEW01", published: false }} template={{ html: tplDraft }} />
        </div>
      )}

      {formOpen && (
        <Modal title="Generar certificado" onClose={() => setFormOpen(false)} wide
          footer={<>
            <button className="btn btn-ghost" onClick={() => setFormOpen(false)}>Cancelar</button>
            <button className="btn btn-brass" onClick={submitCert}><FileText size={14} /> Generar</button>
          </>}>
          <div className="form-grid-2">
            <div className="form-row">
              <label>Alumno</label>
              <select value={form.studentId} onChange={(e) => setForm({ ...form, studentId: e.target.value })}>
                {data.students.map((s) => <option key={s.id} value={s.id}>{s.name}</option>)}
              </select>
            </div>
            <div className="form-row">
              <label>Curso</label>
              <select value={form.courseId} onChange={(e) => setForm({ ...form, courseId: e.target.value })}>
                <option value="">(curso del alumno)</option>
                {data.courses.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
              </select>
            </div>
            <div className="form-row">
              <label>Profesor</label>
              <select value={form.teacherId} onChange={(e) => setForm({ ...form, teacherId: e.target.value })}>
                <option value="">(automático por curso)</option>
                {data.teachers.map((t) => <option key={t.id} value={t.id}>{t.name}</option>)}
              </select>
            </div>
            <div className="form-row">
              <label>Fecha inicio</label>
              <input type="date" value={form.startDate} onChange={(e) => setForm({ ...form, startDate: e.target.value })} />
            </div>
            <div className="form-row">
              <label>Fecha fin</label>
              <input type="date" value={form.endDate} onChange={(e) => setForm({ ...form, endDate: e.target.value })} />
            </div>
          </div>
        </Modal>
      )}

      {viewCert && (
        <Modal title="Certificado" onClose={() => setViewCert(null)} wide
          footer={<>
            <button className="btn btn-ghost no-print" onClick={() => setViewCert(null)}>Cerrar</button>
            <button className="btn btn-primary no-print" onClick={() => window.print()}><Printer size={13} /> Imprimir / Exportar PDF</button>
          </>}>
          <CertificateSheet cert={viewCert} template={template} />
        </Modal>
      )}
      <Toast message={toast} onDone={() => setToast("")} />
    </>
  );
}

/* ============================================================
   APP PRINCIPAL
   ============================================================ */
const STORAGE_KEY = "cesi-academy-data";

/*
 * Adaptador de almacenamiento local (localStorage del navegador).
 * NOTA IMPORTANTE: localStorage guarda los datos SOLO en el navegador de cada
 * persona. Si un profesor entra desde su portátil y un alumno desde el suyo,
 * cada uno verá sus propios datos por separado — no están sincronizados entre
 * dispositivos. Esto es suficiente para probar la app tal cual, pero para que
 * funcione de verdad entre distintas personas hace falta una base de datos
 * real compartida (paso siguiente del despliegue).
 */
const localStore = {
  get: async (key) => {
    const raw = window.localStorage.getItem(key);
    return raw ? { value: raw } : null;
  },
  set: async (key, value) => {
    window.localStorage.setItem(key, value);
    return { value };
  },
};


export default function App() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [route, setRoute] = useState("login"); // login | app | verify
  const [user, setUser] = useState(null);
  const [view, setView] = useState("resumen");

  // Cargar / inicializar datos persistentes compartidos
  useEffect(() => {
    let cancelled = false;
    // Si el almacenamiento tarda o no responde, no dejamos la app colgada en "Cargando…"
    const safety = setTimeout(() => { if (!cancelled) setLoading(false); }, 4000);
    (async () => {
      try {
        const res = await localStore.get(STORAGE_KEY);
        if (!cancelled) setData(res ? { classSessions: [], ...JSON.parse(res.value) } : null);
      } catch {
        if (!cancelled) setData(null);
      }
      if (!cancelled) setLoading(false);
    })();
    return () => { cancelled = true; clearTimeout(safety); };
  }, []);

  useEffect(() => {
    if (!loading && !data) {
      const seed = seedData();
      setData(seed);
      try {
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(seed));
      } catch (err) {
        // seguimos igualmente con los datos semilla en memoria aunque no se puedan persistir
      }
    }
  }, [loading, data]);

  const persist = (updater) => {
    setData((prev) => {
      const next = typeof updater === "function" ? updater(prev) : updater;
      try {
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      } catch (err) {
        // el guardado en almacenamiento nunca debe bloquear la navegación de la app
      }
      return next;
    });
  };

  const logActivity = (d, text) => ({
    ...d,
    activityLog: [{ id: uid("log"), text, ts: Date.now() }, ...d.activityLog].slice(0, 30),
  });

  // Actividad "en vivo" simulada en el panel de Staff
  useEffect(() => {
    if (route !== "app" || user?.role !== "staff") return;
    const phrases = [
      "Un profesor ha fichado entrada",
      "Nueva sesión de asistencia registrada",
      "Se ha consultado el boletín de un alumno",
      "Código de acceso utilizado",
      "Certificado consultado desde verificación pública",
    ];
    const t = setInterval(() => {
      persist((prev) => logActivity(prev, phrases[Math.floor(Math.random() * phrases.length)]));
    }, 9000);
    return () => clearInterval(t);
  }, [route, user]);

  // Sincronización entre pestañas del MISMO navegador (por ejemplo, si tienes
  // la app abierta como profesor en una pestaña y como alumno en otra).
  // Con localStorage esto NO sincroniza entre dispositivos distintos — para eso
  // hace falta una base de datos real compartida (ver Parte 2 del despliegue).
  useEffect(() => {
    if (route !== "app") return;
    let cancelled = false;
    const poll = async () => {
      try {
        const res = await localStore.get(STORAGE_KEY);
        if (cancelled || !res) return;
        const fetched = { classSessions: [], ...JSON.parse(res.value) };
        setData((prev) => (JSON.stringify(prev) === JSON.stringify(fetched) ? prev : fetched));
      } catch {
        // si falla el sondeo, se mantiene el último estado conocido en memoria
      }
    };
    const t = setInterval(poll, 4000);
    return () => { cancelled = true; clearInterval(t); };
  }, [route]);

  if (loading || !data) {
    return (
      <div className="acad-root paper-texture">
        <GlobalStyle />
        <div className="login-wrap"><p style={{ color: "#e7e2d3" }}>Cargando portal académico…</p></div>
      </div>
    );
  }

  /* ------- Auth ------- */
  const handleLogin = (code) => {
    const found = data.codes.find((c) => c.code.toUpperCase() === code.toUpperCase());
    if (!found) return { ok: false, error: "Código no reconocido. Comprueba que lo has escrito correctamente." };
    setUser(found);
    setRoute("app");
    setView(NAV[found.role][0].key);
    persist((prev) => logActivity(prev, `${found.name} ha iniciado sesión (${found.role})`));
    return { ok: true };
  };

  const handleLogout = () => { setUser(null); setRoute("login"); };

  // Autorregistro: cualquier persona nueva entra como alumno con un código único generado al vuelo
  const registerStudent = (name) => {
    const trimmed = (name || "").trim();
    if (!trimmed) return { ok: false, error: "Escribe tu nombre para continuar." };
    let code;
    do {
      code = `ALU-${Math.random().toString(36).slice(2, 7).toUpperCase()}`;
    } while (data.codes.some((c) => c.code === code));
    const linkedId = uid("a");
    persist((prev) => {
      const students = [...prev.students, { id: linkedId, name: trimmed, courseId: null }];
      const codes = [...prev.codes, { code, role: "alumno", name: trimmed, linkedId }];
      return logActivity({ ...prev, codes, students }, `${trimmed} se ha registrado como alumno`);
    });
    return { ok: true, code };
  };

  // Staff asciende (o cambia) el rol de cualquier usuario ya registrado
  const updateUserRole = (code, newRole) => {
    persist((prev) => {
      const entry = prev.codes.find((c) => c.code === code);
      if (!entry || entry.role === newRole) return prev;
      let students = prev.students, teachers = prev.teachers, linkedId = entry.linkedId;

      if (entry.role === "alumno") students = students.filter((s) => s.id !== entry.linkedId);
      if (entry.role === "profesor") teachers = teachers.filter((t) => t.id !== entry.linkedId);

      if (newRole === "alumno") {
        linkedId = uid("a");
        students = [...students, { id: linkedId, name: entry.name, courseId: null }];
      } else if (newRole === "profesor") {
        linkedId = uid("t");
        teachers = [...teachers, { id: linkedId, name: entry.name }];
      } else {
        linkedId = null;
      }

      const codes = prev.codes.map((c) => (c.code === code ? { ...c, role: newRole, linkedId } : c));
      return logActivity({ ...prev, codes, students, teachers }, `${entry.name} ahora tiene el rol ${newRole}`);
    });
  };

  const createCourse = (name) => {
    persist((prev) => {
      const course = { id: uid("c"), name, subjects: [] };
      return logActivity({ ...prev, courses: [...prev.courses, course] }, `Curso creado: ${name}`);
    });
  };

  const createSubject = (courseId, name, teacherId) => {
    persist((prev) => {
      const courses = prev.courses.map((c) =>
        c.id === courseId ? { ...c, subjects: [...c.subjects, { id: uid("s"), name, teacherId: teacherId || null }] } : c
      );
      return logActivity({ ...prev, courses }, `Asignatura creada: ${name}`);
    });
  };

  const deleteCourse = (courseId) => {
    persist((prev) => {
      const course = prev.courses.find((c) => c.id === courseId);
      if (!course) return prev;
      const subjectIds = course.subjects.map((s) => s.id);
      const courses = prev.courses.filter((c) => c.id !== courseId);
      const students = prev.students.map((s) => (s.courseId === courseId ? { ...s, courseId: null } : s));
      const attendance = prev.attendance.filter((a) => !subjectIds.includes(a.subjectId));
      const grades = prev.grades.filter((g) => !subjectIds.includes(g.subjectId));
      const classSessions = (prev.classSessions || []).filter((s) => s.courseId !== courseId);
      return logActivity({ ...prev, courses, students, attendance, grades, classSessions }, `Curso eliminado: ${course.name}`);
    });
  };

  const deleteSubject = (courseId, subjectId) => {
    persist((prev) => {
      const course = prev.courses.find((c) => c.id === courseId);
      const subject = course?.subjects.find((s) => s.id === subjectId);
      const courses = prev.courses.map((c) =>
        c.id === courseId ? { ...c, subjects: c.subjects.filter((s) => s.id !== subjectId) } : c
      );
      const attendance = prev.attendance.filter((a) => a.subjectId !== subjectId);
      const grades = prev.grades.filter((g) => g.subjectId !== subjectId);
      const classSessions = (prev.classSessions || []).filter((s) => s.subjectId !== subjectId);
      return logActivity({ ...prev, courses, attendance, grades, classSessions }, `Asignatura eliminada: ${subject?.name || ""}`);
    });
  };

  const assignStudentToCourse = (studentId, courseId) => {
    persist((prev) => {
      const students = prev.students.map((s) => (s.id === studentId ? { ...s, courseId: courseId || null } : s));
      return logActivity({ ...prev, students }, courseId ? "Alumno matriculado en un curso" : "Alumno retirado de un curso");
    });
  };

  /* ------- Acciones sobre datos ------- */
  const toggleAttendance = (studentId, subjectId, date, status) => {
    persist((prev) => {
      const existing = prev.attendance.find((a) => a.studentId === studentId && a.subjectId === subjectId && a.date === date);
      let attendance;
      if (existing) {
        attendance = existing.status === status
          ? prev.attendance.filter((a) => a.id !== existing.id)
          : prev.attendance.map((a) => (a.id === existing.id ? { ...a, status } : a));
      } else {
        attendance = [...prev.attendance, { id: uid("att"), studentId, subjectId, date, status }];
      }
      return { ...prev, attendance };
    });
  };

  const updateGrade = (gradeId, field, value) => {
    persist((prev) => ({ ...prev, grades: prev.grades.map((g) => (g.id === gradeId ? { ...g, [field]: value } : g)) }));
  };

  const clockAction = (teacherId, action) => {
    const today = new Date().toISOString().slice(0, 10);
    persist((prev) => {
      let clockRecords = [...prev.clockRecords];
      let record = clockRecords.find((r) => r.teacherId === teacherId && r.date === today);
      if (!record) {
        record = { teacherId, date: today, entries: [] };
        clockRecords.push(record);
      }
      clockRecords = clockRecords.map((r) => {
        if (r !== record) return r;
        if (action === "in") return { ...r, entries: [...r.entries, { in: Date.now(), out: null }] };
        const entries = r.entries.map((e, i) => (i === r.entries.length - 1 && !e.out ? { ...e, out: Date.now() } : e));
        return { ...r, entries };
      });
      const teacherName = prev.teachers.find((t) => t.id === teacherId)?.name;
      return logActivity({ ...prev, clockRecords }, `${teacherName} ha fichado ${action === "in" ? "entrada" : "salida"}`);
    });
  };

  const startClassSession = (teacherId, subjectId) => {
    if (!subjectId) return null;
    // Si ya hay una clase activa hoy para esta asignatura, no se genera un enlace nuevo: se reutiliza la sesión en curso.
    const today = new Date().toISOString().slice(0, 10);
    const existingActive = (data?.classSessions || []).find(
      (s) => s.status === "active" && s.subjectId === subjectId && s.date === today
    );
    if (existingActive) return existingActive.meetLink || null;

    const sessionId = uid("cls");
    // Genera un enlace de Meet único: nunca coincide con uno ya usado por otra clase (de cualquier día).
    const usedLinks = new Set((data?.classSessions || []).map((s) => s.meetLink).filter(Boolean));
    let meetLink = generateMeetLink();
    let attempts = 0;
    while (usedLinks.has(meetLink) && attempts < 10) {
      meetLink = generateMeetLink();
      attempts++;
    }
    persist((prev) => {
      const subject = prev.courses.flatMap((c) => c.subjects.map((s) => ({ ...s, courseId: c.id }))).find((s) => s.id === subjectId);
      const session = {
        id: sessionId, teacherId, subjectId, courseId: subject?.courseId,
        date: today, startTime: Date.now(), endTime: null,
        status: "active", content: "", tasks: [], notes: [], meetLink,
      };
      const teacherName = prev.teachers.find((t) => t.id === teacherId)?.name;
      return logActivity({ ...prev, classSessions: [...(prev.classSessions || []), session] }, `${teacherName} ha iniciado la clase de ${subject?.name} — fichaje automático · Google Meet generado`);
    });
    clockAction(teacherId, "in");
    return meetLink;
  };

  const finishClassSession = (session) => {
    const subject = data.courses.flatMap((c) => c.subjects.map((s) => ({ ...s, courseId: c.id }))).find((s) => s.id === session.subjectId);
    const endTime = Date.now();
    const attToday = data.attendance.filter((a) => a.subjectId === session.subjectId && a.date === session.date);
    const summary = {
      subjectName: subject?.name,
      date: session.date,
      durationMin: Math.max(1, Math.round((endTime - session.startTime) / 60000)),
      present: attToday.filter((a) => a.status === "presente").length,
      absent: attToday.filter((a) => a.status === "ausente").length,
      late: attToday.filter((a) => a.status === "tarde").length,
      content: session.content,
      tasks: session.tasks,
      notes: session.notes.map((n) => ({ ...n, studentName: data.students.find((s) => s.id === n.studentId)?.name })),
    };
    persist((prev) => {
      const classSessions = prev.classSessions.map((s) => (s.id === session.id ? { ...s, status: "finished", endTime, summary } : s));
      const teacherName = prev.teachers.find((t) => t.id === session.teacherId)?.name;
      return logActivity({ ...prev, classSessions }, `${teacherName} ha finalizado la clase de ${subject?.name}`);
    });
    clockAction(session.teacherId, "out");
    return summary;
  };

  const updateSessionContent = (sessionId, content) => {
    persist((prev) => ({ ...prev, classSessions: prev.classSessions.map((s) => (s.id === sessionId ? { ...s, content } : s)) }));
  };

  const addQuickTask = (sessionId, title, dueDate) => {
    persist((prev) => ({ ...prev, classSessions: prev.classSessions.map((s) => (s.id === sessionId ? { ...s, tasks: [...s.tasks, { id: uid("task"), title, dueDate }] } : s)) }));
  };

  const addStudentNote = (sessionId, studentId, text) => {
    persist((prev) => ({ ...prev, classSessions: prev.classSessions.map((s) => (s.id === sessionId ? { ...s, notes: [...s.notes, { id: uid("note"), studentId, text, ts: Date.now() }] } : s)) }));
  };

  const createCode = (form) => {
    persist((prev) => {
      let students = prev.students, teachers = prev.teachers;
      let linkedId = null;
      if (form.role === "alumno") {
        linkedId = uid("a");
        students = [...students, { id: linkedId, name: form.name, courseId: prev.courses[0]?.id }];
      } else if (form.role === "profesor") {
        linkedId = uid("t");
        teachers = [...teachers, { id: linkedId, name: form.name }];
      }
      const codes = [...prev.codes, { code: form.code, role: form.role, name: form.name, linkedId }];
      return logActivity({ ...prev, codes, students, teachers }, `Staff generó un código nuevo para ${form.name} (${form.role})`);
    });
  };

  const deleteCode = (code) => {
    persist((prev) => logActivity({ ...prev, codes: prev.codes.filter((c) => c.code !== code) }, `Código ${code} revocado`));
  };

  const createCertificate = (partial) => {
    persist((prev) => {
      const cert = {
        id: uid("cert"),
        verificationCode: genVerifyCode(),
        issueDate: new Date().toISOString().slice(0, 10),
        published: false,
        ...partial,
      };
      return logActivity({ ...prev, certificates: [cert, ...prev.certificates] }, `Certificado generado para ${partial.studentName}`);
    });
  };

  const togglePublish = (certId) => {
    persist((prev) => {
      const cert = prev.certificates.find((c) => c.id === certId);
      const certificates = prev.certificates.map((c) => (c.id === certId ? { ...c, published: !c.published } : c));
      return logActivity({ ...prev, certificates }, `Certificado de ${cert?.studentName} ${cert?.published ? "despublicado" : "publicado"}`);
    });
  };

  const updateTemplate = (html) => {
    persist((prev) => ({ ...prev, templates: [{ ...prev.templates[0], html }] }));
  };

  /* ------- Render ------- */
  if (route === "verify") {
    return (
      <div className="acad-root paper-texture">
        <GlobalStyle />
        <PublicVerify data={data} onBack={() => setRoute("login")} />
      </div>
    );
  }

  if (route === "login" || !user) {
    return (
      <div className="acad-root paper-texture">
        <GlobalStyle />
        <LoginScreen onLogin={handleLogin} onRegister={registerStudent} onGoVerify={() => setRoute("verify")} />
      </div>
    );
  }

  const titleMap = {
    resumen: "Resumen general", asistencia: "Mi asistencia", calificaciones: user.role === "alumno" ? "Mi boletín" : "Calificaciones",
    certificados: "Certificados", "pase-lista": "Pase de lista", fichaje: "Fichaje laboral", "clase-en-curso": "Clase en curso",
    "clase-en-vivo": "Clase en vivo", dashboard: "Panel principal", explorador: "Cursos, asignaturas y clases", usuarios: "Usuarios",
  };

  let content = null;
  if (user.role === "alumno") {
    const student = data.students.find((s) => s.id === user.linkedId) || data.students[0];
    if (view === "resumen") content = <AlumnoResumen data={data} student={student} />;
    if (view === "clase-en-vivo") content = <AlumnoClaseEnVivo data={data} student={student} />;
    if (view === "asistencia") content = <AlumnoAsistencia data={data} student={student} />;
    if (view === "calificaciones") content = <AlumnoCalificaciones data={data} student={student} />;
    if (view === "certificados") content = <AlumnoCertificados data={data} student={student} />;
  } else if (user.role === "profesor") {
    const teacher = data.teachers.find((t) => t.id === user.linkedId) || data.teachers[0];
    const activeSession = (data.classSessions || []).find((s) => s.teacherId === teacher.id && s.status === "active");
    if (view === "resumen") content = <ProfesorResumen data={data} teacher={teacher} />;
    if (view === "clase-en-curso") content = (
      <ProfesorClaseEnCurso
        data={data} teacher={teacher} session={activeSession}
        startSession={(subjectId) => startClassSession(teacher.id, subjectId)}
        finishSession={finishClassSession}
        updateSessionContent={updateSessionContent}
        addTask={addQuickTask}
        addNote={addStudentNote}
        toggleAttendance={toggleAttendance}
      />
    );
    if (view === "pase-lista") content = <ProfesorPaseLista data={data} teacher={teacher} toggleAttendance={toggleAttendance} />;
    if (view === "calificaciones") content = <ProfesorCalificaciones data={data} teacher={teacher} updateGrade={updateGrade} />;
    if (view === "fichaje") content = <ProfesorFichaje teacher={teacher} clockRecords={data.clockRecords} clockAction={clockAction} />;
    if (view === "certificados") content = <ProfesorCertificados data={data} teacher={teacher} />;
  } else if (user.role === "staff") {
    if (view === "dashboard") content = <StaffDashboard data={data} activityLog={data.activityLog} />;
    if (view === "explorador") content = <StaffExplorador data={data} createCourse={createCourse} createSubject={createSubject} assignStudentToCourse={assignStudentToCourse} deleteCourse={deleteCourse} deleteSubject={deleteSubject} />;
    if (view === "usuarios") content = <StaffUsuarios data={data} createCode={createCode} deleteCode={deleteCode} updateUserRole={updateUserRole} />;
    if (view === "certificados") content = <StaffCertificados data={data} createCertificate={createCertificate} togglePublish={togglePublish} updateTemplate={updateTemplate} />;
  }

  return (
    <div className="acad-root paper-texture">
      <GlobalStyle />
      <div className="shell">
        <Sidebar user={user} view={view} setView={setView} onLogout={handleLogout} />
        <div className="main">
          <div className="topbar">
            <div>
              <p className="page-eyebrow">{user.role === "staff" ? "Staff · Administración" : user.role === "profesor" ? "Profesor" : "Alumno"}</p>
              <h2 className="page-title">{titleMap[view]}</h2>
            </div>
            <RoleBadge role={user.role} />
          </div>
          {content}
        </div>
      </div>
    </div>
  );
}
