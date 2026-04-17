import { useEffect, useRef, useState } from "react";
import * as tf from "@tensorflow/tfjs";
import * as handpose from "@tensorflow-models/handpose";

export default function App() {
  const videoRef = useRef(null);
  const [text, setText] = useState("Esperando mano...");

  useEffect(() => {
    let model;

    async function run() {
      await tf.ready();

      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
      });

      videoRef.current.srcObject = stream;

      model = await handpose.load();

      setInterval(async () => {
        const predictions = await model.estimateHands(videoRef.current);

        if (predictions.length > 0) {
          const landmarks = predictions[0].landmarks;

          detectGesture(landmarks);
        } else {
          setText("Esperando mano...");
        }
      }, 250);
    }

    run();
  }, []);

  function detectGesture(p) {
    const thumbTip = p[4];
    const indexTip = p[8];
    const middleTip = p[12];
    const ringTip = p[16];
    const pinkyTip = p[20];

    const wrist = p[0];

    // Mano abierta
    if (
      indexTip[1] < wrist[1] &&
      middleTip[1] < wrist[1] &&
      ringTip[1] < wrist[1] &&
      pinkyTip[1] < wrist[1]
    ) {
      setText("Hola 👋");
      return;
    }

    // Pulgar arriba
    if (
      thumbTip[1] < wrist[1] &&
      indexTip[1] > thumbTip[1]
    ) {
      setText("Sí 👍");
      return;
    }

    // Puño cerrado
    if (
      indexTip[1] > wrist[1] &&
      middleTip[1] > wrist[1]
    ) {
      setText("No ✊");
      return;
    }

    setText("Mano detectada");
  }

  return (
    <div style={{
      background: "black",
      color: "white",
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      gap: "20px"
    }}>
      <h1 style={{fontSize:"48px"}}>Aura AI</h1>

      <video
        ref={videoRef}
        autoPlay
        playsInline
        muted
        width="700"
        style={{ borderRadius: "20px" }}
      />

      <h2 style={{fontSize:"40px", color:"#00ffff"}}>{text}</h2>
    </div>
  );
}