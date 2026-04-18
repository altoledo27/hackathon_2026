// LandingPage.jsx
// Uso: <LandingPage onStart={() => { /* tu lógica para mostrar la app */ }} />

const steps = [
  {
    num: "01",
    title: "Activa la cámara",
    desc: "Permite el acceso a tu cámara web. No se graba ni almacena ningún video.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="#185FA5" strokeWidth="1.8" width={20} height={20}>
        <rect x="3" y="3" width="18" height="18" rx="3" />
        <path d="M15 10l-4 4-2-2" />
      </svg>
    ),
  },
  {
    num: "02",
    title: "Realiza tus señas",
    desc: "Frente a la cámara, haz las señas de forma natural. El modelo las detecta en tiempo real.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="#185FA5" strokeWidth="1.8" width={20} height={20}>
        <path d="M12 2a5 5 0 0 1 5 5v5a5 5 0 0 1-10 0V7a5 5 0 0 1 5-5z" />
        <path d="M3 11v1a9 9 0 0 0 18 0v-1" />
      </svg>
    ),
  },
  {
    num: "03",
    title: "IA interpreta",
    desc: "TensorFlow analiza los gestos de tu mano y los clasifica con alta precisión.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="#185FA5" strokeWidth="1.8" width={20} height={20}>
        <circle cx="12" cy="12" r="9" />
        <path d="M9 12l2 2 4-4" />
      </svg>
    ),
  },
  {
    num: "04",
    title: "Escucha la traducción",
    desc: "El texto reconocido se convierte en audio al instante usando síntesis de voz.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="#185FA5" strokeWidth="1.8" width={20} height={20}>
        <path d="M9 18V5l12-2v13" />
        <circle cx="6" cy="18" r="3" />
        <circle cx="18" cy="16" r="3" />
      </svg>
    ),
  },
];

const features = [
  ["Tiempo real", "sin retrasos perceptibles"],
  ["Sin instalación", "corre en el navegador"],
  ["Privado", "la cámara no se graba"],
  ["Texto + audio", "doble salida"],
  ["Accesible", "diseñado para todos"],
  ["Ligero", "modelo optimizado"],
];

const techs = [
  "TensorFlow.js",
  "Web Speech API",
  "MediaDevices API",
  "Hand Pose Detection",
  "React",
];

export default function LandingPage({ onStart }) {
  return (
    <div style={{ fontFamily: "sans-serif", maxWidth: 720, margin: "0 auto" }}>

      {/* Hero */}
      <div style={{ textAlign: "center", padding: "3.5rem 1.5rem 2.5rem" }}>
        <span style={{
          display: "inline-block",
          background: "#E6F1FB",
          border: "0.5px solid #85B7EB",
          borderRadius: 99,
          fontSize: 12,
          padding: "4px 14px",
          color: "#185FA5",
          marginBottom: "1.2rem",
          letterSpacing: "0.03em",
        }}>
          Powered by TensorFlow
        </span>
        <h1 style={{ fontSize: 32, fontWeight: 500, lineHeight: 1.25, maxWidth: 560, margin: "0 auto 1rem" }}>
          Traduce señas a voz en tiempo real
        </h1>
        <p style={{ fontSize: 16, color: "#555", maxWidth: 460, margin: "0 auto 2rem", lineHeight: 1.7 }}>
          Usa tu cámara para comunicarte sin barreras. Nuestra IA reconoce señas al instante y las convierte en palabras habladas.
        </p>
        <CtaButton onClick={onStart}>Empezar ahora</CtaButton>
      </div>

      <Divider />

      {/* Cómo funciona */}
      <Section label="Cómo funciona">
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))", gap: 12 }}>
          {steps.map((step) => (
            <div key={step.num} style={{
              background: "#F8FBFF",
              border: "0.5px solid #B5D4F4",
              borderRadius: 12,
              padding: "1.2rem",
            }}>
              <p style={{ fontSize: 11, fontWeight: 500, color: "#85B7EB", marginBottom: "0.7rem" }}>{step.num}</p>
              <div style={{
                width: 36, height: 36, borderRadius: 8,
                background: "#E6F1FB",
                display: "flex", alignItems: "center", justifyContent: "center",
                marginBottom: "0.8rem",
              }}>
                {step.icon}
              </div>
              <p style={{ fontSize: 14, fontWeight: 500, marginBottom: "0.4rem" }}>{step.title}</p>
              <p style={{ fontSize: 13, color: "#666", lineHeight: 1.5 }}>{step.desc}</p>
            </div>
          ))}
        </div>
      </Section>

      <Divider />

      {/* Demo del flujo */}
      <Section label="Demostración del flujo">
        <div style={{
          background: "#F0F7FF",
          border: "0.5px solid #B5D4F4",
          borderRadius: 12,
          padding: "1.5rem",
        }}>
          <div style={{ display: "flex", gap: 10, alignItems: "center", flexWrap: "wrap" }}>
            <div style={{
              background: "#fff", border: "0.5px solid #B5D4F4",
              borderRadius: 8, padding: "8px 14px", fontSize: 13,
              display: "flex", alignItems: "center", gap: 8,
            }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#185FA5" strokeWidth="2">
                <path d="M18 8a6 6 0 0 0-12 0v4" />
                <rect x="3" y="12" width="18" height="8" rx="2" />
              </svg>
              Seña detectada: ✋ Hola
            </div>
            <span style={{ color: "#85B7EB", fontSize: 18 }}>→</span>
            <div style={{
              background: "#E6F1FB", border: "0.5px solid #85B7EB",
              borderRadius: 8, padding: "8px 14px", fontSize: 13,
              color: "#0C447C", display: "flex", alignItems: "center", gap: 8, flex: 1,
            }}>
              <PulseDot />
              Reproduciendo: "Hola"
            </div>
          </div>
        </div>
      </Section>

      <Divider />

      {/* Características */}
      <Section label="Características">
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
          {features.map(([title, desc]) => (
            <div key={title} style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
              <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#378ADD", marginTop: 7, flexShrink: 0 }} />
              <p style={{ fontSize: 13, color: "#666", lineHeight: 1.5, margin: 0 }}>
                <strong style={{ color: "#111", fontWeight: 500 }}>{title}</strong> — {desc}
              </p>
            </div>
          ))}
        </div>
      </Section>

      <Divider />

      {/* Tecnologías */}
      <Section label="Tecnologías">
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          {techs.map((t) => (
            <span key={t} style={{
              background: "#E6F1FB", border: "0.5px solid #B5D4F4",
              borderRadius: 99, fontSize: 12, padding: "5px 12px", color: "#185FA5",
            }}>
              {t}
            </span>
          ))}
        </div>
      </Section>

      {/* CTA final */}
      <div style={{ textAlign: "center", padding: "2.5rem 1.5rem 3rem" }}>
        <CtaButton onClick={onStart}>Ir al traductor →</CtaButton>
        <p style={{ fontSize: 14, color: "#888", marginTop: "0.9rem" }}>No requiere cuenta ni registro</p>
      </div>

    </div>
  );
}

/* ── Componentes auxiliares ── */

function CtaButton({ onClick, children }) {
  return (
    <button
      onClick={onClick} //Redirrige a la aplicación principal
      style={{
        background: "#185FA5", color: "#fff", border: "none",
        borderRadius: 12, padding: "12px 28px",
        fontSize: 15, fontWeight: 500, cursor: "pointer",
      }}
      onMouseEnter={e => (e.currentTarget.style.background = "#0C447C")}
      onMouseLeave={e => (e.currentTarget.style.background = "#185FA5")}
    >
      {children}
    </button>
  );
}

function Section({ label, children }) {
  return (
    <div style={{ padding: "2.5rem 1.5rem" }}>
      <p style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: "0.1em", color: "#aaa", marginBottom: "1.2rem" }}>
        {label}
      </p>
      {children}
    </div>
  );
}

function Divider() {
  return <hr style={{ border: "none", borderTop: "0.5px solid #e0e0e0", margin: "0 1.5rem" }} />;
}

function PulseDot() {
  return (
    <>
      <style>{`@keyframes aura-pulse { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:.4;transform:scale(.65)} }`}</style>
      <div style={{
        width: 8, height: 8, borderRadius: "50%",
        background: "#185FA5", flexShrink: 0,
        animation: "aura-pulse 1.5s ease-in-out infinite",
      }} />
    </>
  );
}