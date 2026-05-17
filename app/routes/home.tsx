import { useEffect, useRef } from "react";
import { useThreeBackground } from "./useThreeBackground";

// ─── Types ───────────────────────────────────────────────────────────────────
interface NavItem { label: string; href: string; }

const NAV_ITEMS: NavItem[] = [
  { label: "About",        href: "#about" },
  { label: "How it works", href: "#how"   },
  { label: "Rules",        href: "#rules" },
  { label: "Join",         href: "#links" },
];

// ─── Scroll-reveal hook ───────────────────────────────────────────────────────
function useReveal() {
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const el = entry.target as HTMLElement;
        if (el.classList.contains("card") || el.classList.contains("rule-item")) {
          const siblings = Array.from(el.parentElement?.children ?? []);
          setTimeout(() => el.classList.add("visible"), siblings.indexOf(el)*100);
        } else {
          el.classList.add("visible");
        }
        observer.unobserve(el);
      });
    }, { threshold: 0.12 });
    document.querySelectorAll(".reveal,.card,.rule-item").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
}

// ─── Sub-components ───────────────────────────────────────────────────────────
function SectionLabel({ n, children }: { n: string; children: React.ReactNode }) {
  return (
    <span style={{
      fontFamily:"'Instrument Sans',sans-serif", fontSize:"0.7rem", letterSpacing:"0.25em",
      textTransform:"uppercase", color:"var(--accent)", marginBottom:12, display:"block",
    }}>
      {n}. {children}
    </span>
  );
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 style={{
      fontFamily:"'Instrument Sans',sans-serif", fontWeight:700,
      fontSize:"clamp(1.8rem,4vw,2.8rem)", lineHeight:1.1, marginBottom:24,
    }}>
      {children}
    </h2>
  );
}

function Divider() {
  return <div style={{ width:48, height:2, background:"var(--accent)", margin:"20px 0 32px", borderRadius:2 }} />;
}

function SectionBody({ children }: { children: React.ReactNode }) {
  return <p style={{ fontSize:"1.05rem", lineHeight:1.7, color:"var(--pale)", maxWidth:620 }}>{children}</p>;
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function Home() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useThreeBackground(canvasRef);
  useReveal();

  const scrollTo = (href: string) => document.querySelector(href)?.scrollIntoView({ behavior:"smooth" });

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Instrument+Sans:ital,wght@0,400..700;1,400..700&display=swap' );
        *,*::before,*::after { margin:0; padding:0; box-sizing:border-box; }
        :root {
          --navy:#050d2e; --deep:#0a1640; --blue:#4a90c4; --accent:#6bb8e8;
          --pale:#aed6f0; --white:#e8f4fc;
          --glass-bg:rgba(10,22,64,0.55); --glass-border:rgba(107,184,232,0.18); --radius:18px;
        }
        html { scroll-behavior:smooth; }
        body { font-family:'Instrument Sans',sans-serif; background:var(--navy); color:var(--white); overflow-x:hidden; }

        @keyframes fadeUp { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }
        @keyframes glow {
          0%,100%{box-shadow:0 0 24px rgba(74,144,196,0.4)}
          50%    {box-shadow:0 0 40px rgba(107,184,232,0.65)}
        }

        .reveal { opacity:0; transform:translateY(30px); transition:opacity .7s ease,transform .7s ease; }
        .reveal.visible { opacity:1; transform:translateY(0); }

        .card {
          opacity:0; transform:translateY(24px);
          transition:opacity .6s ease,transform .6s ease,border-color .25s,box-shadow .25s;
          background:var(--glass-bg); border:1px solid var(--glass-border);
          border-radius:var(--radius); padding:28px 24px; backdrop-filter:blur(14px);
        }
        .card.visible { opacity:1; transform:translateY(0); }
        .card:hover { transform:translateY(-4px); border-color:rgba(107,184,232,0.4); box-shadow:0 8px 32px rgba(74,144,196,0.2); }

        .rule-item {
          opacity:0; transform:translateX(-16px);
          transition:opacity .5s ease,transform .5s ease;
          display:flex; align-items:flex-start; gap:12px;
          background:var(--glass-bg); border:1px solid var(--glass-border);
          border-radius:12px; padding:16px 20px; backdrop-filter:blur(10px);
          font-size:.9rem; color:var(--pale); line-height:1.5;
        }
        .rule-item.visible { opacity:1; transform:translateX(0); }

        .btn-primary {
          display:inline-flex; align-items:center; gap:8px;
          background:var(--blue); color:#fff;
          font-family:'Instrument Sans',sans-serif; font-weight:600; font-size:.9rem; letter-spacing:.04em;
          padding:14px 28px; border-radius:100px; text-decoration:none; border:none; cursor:pointer;
          transition:transform .2s,box-shadow .2s,background .2s;
          animation:glow 2.5s ease-in-out infinite;
        }
        .btn-primary:hover { background:var(--accent); transform:translateY(-2px); box-shadow:0 0 36px rgba(107,184,232,0.6); }

        .btn-ghost {
          display:inline-flex; align-items:center; gap:8px;
          background:var(--glass-bg); color:var(--pale);
          font-family:'Instrument Sans',sans-serif; font-weight:600; font-size:.9rem; letter-spacing:.04em;
          padding:14px 28px; border-radius:100px; text-decoration:none;
          border:1px solid var(--glass-border); cursor:pointer; backdrop-filter:blur(10px);
          transition:transform .2s,background .2s,color .2s;
        }
        .btn-ghost:hover { background:rgba(107,184,232,0.15); color:var(--white); transform:translateY(-2px); }

        .nav-link {
          font-family:'Instrument Sans',sans-serif; font-weight:600; font-size:.82rem; letter-spacing:.04em;
          color:var(--pale); text-decoration:none; padding:8px 16px; border-radius:100px;
          transition:color .2s,background .2s;
        }
        .nav-link:hover { color:var(--white); background:rgba(107,184,232,0.1); }

        footer a { color:var(--accent); text-decoration:none; }

        @media(max-width:600px){
          .nav-links { display:none !important; }
          .hero-actions { flex-direction:column; align-items:center; }
          .section-inner { padding:60px 20px !important; }
        }
      `}</style>

      {/* Canvas */}
      <canvas ref={canvasRef} style={{ position:"fixed", inset:0, width:"100%", height:"100%", zIndex:0, pointerEvents:"none" }} />

      <div style={{ position:"relative", zIndex:1 }}>

        {/* ── Navbar ── */}
        <nav style={{
          position:"fixed", top:16, left:"50%", transform:"translateX(-50%)",
          width:"calc(100% - 48px)", maxWidth:860,
          background:"rgba(5,13,46,0.72)", border:"1px solid var(--glass-border)",
          borderRadius:100, backdropFilter:"blur(20px)", WebkitBackdropFilter:"blur(20px)",
          display:"flex", alignItems:"center", justifyContent:"space-between",
          padding:"10px 10px 10px 24px", zIndex:50, boxSizing:"border-box",
        }}>
          <a href="#" onClick={(e)=>{e.preventDefault();window.scrollTo({top:0,behavior:"smooth"})}}
            style={{ fontFamily:"'Instrument Sans',sans-serif", fontWeight:800, fontSize:"1.15rem", color:"var(--white)", letterSpacing:"-0.02em", textDecoration:"none" }}>
            Haj<span style={{ color:"var(--accent)" }}>4ever</span>
          </a>

          <div className="nav-links" style={{ display:"flex", alignItems:"center", gap:4 }}>
            {NAV_ITEMS.map((item) => (
              <a key={item.href} href={item.href} className="nav-link"
                onClick={(e)=>{e.preventDefault();scrollTo(item.href);}}>
                {item.label}
              </a>
            ))}
          </div>

          <a href="https://haj4ever.fillout.com/rsvp" target="_blank" rel="noopener" className="btn-primary"
            style={{ fontSize:"0.82rem", padding:"10px 22px" }}>
            Submit
          </a>
        </nav>

        {/* ── Hero ── */}
        <section id="hero" style={{ minHeight:"100vh", display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", textAlign:"center", padding:"0 24px" }}>
          <h1 style={{ fontFamily:"'Instrument Sans',sans-serif", fontWeight:800, fontSize:"clamp(4rem,12vw,8rem )", lineHeight:1, letterSpacing:"-0.03em", color:"var(--white)", opacity:0, animation:"fadeUp 0.9s ease 0.3s forwards" }}>
            Haj<span style={{ color:"var(--accent)" }}>4ever</span>
          </h1>
          <p style={{ fontFamily:"'Instrument Sans',sans-serif", fontStyle:"italic", fontSize:"clamp(.95rem,2vw,1.15rem)", color:"var(--pale)", marginTop:20, opacity:0, animation:"fadeUp 0.9s ease 0.55s forwards" }}>
            build blåhaj projects · get a blåhaj
          </p>
          <div className="hero-actions" style={{ display:"flex", gap:14, marginTop:32, flexWrap:"wrap", justifyContent:"center", opacity:0, animation:"fadeUp 0.9s ease 0.75s forwards" }}>
            <a href="https://haj4ever.fillout.com/rsvp" target="_blank" rel="noopener" className="btn-primary">RSVP Now</a>
            <a href="https://hackclub.enterprise.slack.com/archives/C0ATRK4G5NY" target="_blank" rel="noopener" className="btn-ghost">#haj4ever</a>
          </div>
        </section>

        {/* ── About ── */}
        <section id="about">
          <div className="reveal section-inner" style={{ maxWidth:900, margin:"0 auto", padding:"80px 24px" }}>
            <SectionLabel n="01">what is this</SectionLabel>
            <SectionTitle>you ship a blåhaj project.  
we ship you a blåhaj.</SectionTitle>
            <Divider />
            <SectionBody>
              Haj4ever is a Hack Club YSWS (You Ship, We Ship ). Build anything related to Blåhaj,
              track your hours with Hackatime, and Hack Club will mail you a real IKEA Blåhaj shark.
              Free international shipping. No catch.
            </SectionBody>
          </div>
        </section>

        {/* ── How it works ── */}
        <section id="how">
          <div className="section-inner" style={{ maxWidth:900, margin:"0 auto", padding:"80px 24px" }}>
            <SectionLabel n="02">how it works</SectionLabel>
            <h2 className="reveal" style={{ fontFamily:"'Instrument Sans',sans-serif", fontWeight:700, fontSize:"clamp(1.8rem,4vw,2.8rem)", lineHeight:1.1, marginBottom:40 }}>
              three steps to your shark.
            </h2>
            <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(240px,1fr))", gap:16 }}>
              {[
                { title:"1. build something",  body:"Make any Blåhaj-related project — software, hardware, art, game, whatever you want. Just has to be made by you, not vibe-coded." },
                { title:"2. track your hours",  body:"Log your time using Hackatime. You need around 7–8 hours of tracked work. If you're in a team, everyone needs their own commits and hours." },
                { title:"3. get your blåhaj",  body:"Submit your project, we review it, and if it's good Hack Club ships you a real IKEA Blåhaj straight to your door." },
              ].map((c) => (
                <div key={c.title} className="card">
                  <div style={{ fontFamily:"'Instrument Sans',sans-serif", fontWeight:700, fontSize:"1rem", marginBottom:8, color:"var(--white)" }}>{c.title}</div>
                  <div style={{ fontSize:".88rem", color:"var(--pale)", lineHeight:1.6 }}>{c.body}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Rules ── */}
        <section id="rules">
          <div className="reveal section-inner" style={{ maxWidth:900, margin:"0 auto", padding:"80px 24px" }}>
            <SectionLabel n="03">rules</SectionLabel>
            <SectionTitle>the fine print.</SectionTitle>
            <Divider />
            <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
              {[
                "Open to teenagers aged 13–18. You'll need to verify your age (student or government ID) before we ship.",
                "Your project has to be Blåhaj-related. Software, hardware, art — anything goes as long as it's themed.",
                "No vibe coding. AI can help (max 30% usage) but the project needs to be mostly yours. Declare any AI use in your submission.",
                "No double-dipping: you can't submit the same project to another Hack Club YSWS.",
                "Teams of up to 5 are cool. Each member needs separate commits and Hackatime hours.",
                "Hack Club covers international shipping. Customs fees depend on your country.",
              ].map((rule, i) => (
                <div key={i} className="rule-item">
                  <div style={{ width:8, height:8, borderRadius:"50%", background:"var(--accent)", flexShrink:0, marginTop:6 }} />
                  {rule}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Join ── */}
        <section id="links" style={{ borderTop:"1px solid var(--glass-border)" }}>
          <div className="reveal section-inner" style={{ maxWidth:900, margin:"0 auto", padding:"80px 24px" }}>
            <SectionLabel n="04">join in</SectionLabel>
            <SectionTitle>ready to build?</SectionTitle>
            <Divider />
            <SectionBody>
              RSVP to get started, then hop in our Slack channel for updates, help, and to show off what you're making.
            </SectionBody>
            <div style={{ display:"flex", gap:14, flexWrap:"wrap", marginTop:32 }}>
              <a href="https://haj4ever.fillout.com/rsvp" target="_blank" rel="noopener" className="btn-primary">RSVP Now</a>
              <a href="https://hackclub.enterprise.slack.com/archives/C0ATRK4G5NY" target="_blank" rel="noopener" className="btn-ghost">#haj4ever on Slack</a>
              <a href="https://hackclub.enterprise.slack.com/archives/C0ATMEQQ60K" target="_blank" rel="noopener" className="btn-ghost">#haj4ever-help</a>
            </div>
          </div>
        </section>

        {/* ── Footer ── */}
        <footer style={{ textAlign:"center", padding:"40px 24px", fontSize:".8rem", color:"rgba(174,214,240,0.4 )", letterSpacing:".05em", position:"relative", zIndex:1 }}>
          made with 🦈 by{" "}
          <a href="https://hackclub.enterprise.slack.com/team/U0A6A0J7UE6" target="_blank" rel="noopener">Flux3tor</a>{" "}and{" "}
          <a href="https://vejas.zip" target="_blank" rel="noopener">Vejas</a>{" "}for{" "}
          <a href="https://hackclub.com" target="_blank" rel="noopener">Hack Club</a>{" "}· Haj4ever
        </footer>

      </div>
    </>
   );
}
