import { useEffect, useRef, useState } from "react";
import * as tmImage from "@teachablemachine/image";

export default function App() {
  const videoRef = useRef(null);

  const [text, setText] = useState("Cargando IA...");
  const [confidence, setConfidence] = useState(0);
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [lastWord, setLastWord] = useState("");

  useEffect(() => {
    if (!started) return;

    let model;
    let interval;

    async function start() {
      model = await tmImage.load(
        "/model/model.json",
        "/model/metadata.json"
      );

      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
      });

      videoRef.current.srcObject = stream;
      setLoading(false);

      interval = setInterval(async () => {
        const prediction = await model.predict(videoRef.current);

        const best = prediction.reduce((a, b) =>
          a.probability > b.probability ? a : b
        );

        const prob = (best.probability * 100).toFixed(0);

        if (best.probability > 0.9) {
          setText(best.className);
          setConfidence(prob);

          if (best.className !== lastWord) {
            setLastWord(best.className);

            setHistory((prev) => [
              best.className,
              ...prev.slice(0, 4),
            ]);
          }
        }
      }, 350);
    }

    start();

    return () => clearInterval(interval);
  }, [lastWord]);

  if (!started) return <LandingPage onStart={() => setStarted(true)} />;

  return (
    <div
      style={{
        background: "#050505",
        color: "white",
        minHeight: "100vh",
        padding: "30px",
        fontFamily: "Arial",
      }}
    >
      <h1 style={{ fontSize: "52px", marginBottom: "10px" }}>
        Aura AI
      </h1>

      <p style={{ color: "#888", marginBottom: "30px" }}>
        Traductor Inteligente de Lengua de Señas
      </p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "2fr 1fr",
          gap: "20px",
        }}
      >
        {/* Cámara */}
        <div
          style={{
            background: "#111",
            borderRadius: "24px",
            padding: "15px",
            boxShadow: "0 0 20px rgba(0,255,255,.15)",
          }}
        >
          <video
            ref={videoRef}
            autoPlay
            playsInline
            muted
            width="100%"
            style={{
              borderRadius: "18px",
            }}
          />
        </div>

        {/* Panel lateral */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "20px",
          }}
        >
          {/* Resultado */}
          <div
            style={{
              background: "#111",
              padding: "20px",
              borderRadius: "24px",
            }}
          >
            <p style={{ color: "#777" }}>Detectado</p>

            <h2
              style={{
                fontSize: "42px",
                color: "#00ffff",
                margin: "10px 0",
              }}
            >
              {loading ? "..." : text}
            </h2>

            <p>{confidence}% confianza</p>
          </div>

          {/* Historial */}
          <div
            style={{
              background: "#111",
              padding: "20px",
              borderRadius: "24px",
            }}
          >
            <p style={{ color: "#777" }}>Historial</p>

            {history.map((item, i) => (
              <div
                key={i}
                style={{
                  marginTop: "10px",
                  padding: "10px",
                  background: "#1a1a1a",
                  borderRadius: "12px",
                }}
              >
                {item}
              </div>
            ))}
          </div>

          {/* Estado */}
          <div
            style={{
              background: "#111",
              padding: "20px",
              borderRadius: "24px",
            }}
          >
            <p style={{ color: "#00ff88" }}>
              ● Sistema Activo
            </p>
            <p style={{ color: "#777", marginTop: "10px" }}>
              Cámara + IA + Voz
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}