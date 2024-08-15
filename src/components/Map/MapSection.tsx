// @ts-nocheck
"use client";
import { useEffect, useRef, useState } from "react";
import { motion, useAnimation } from "framer-motion";
import mapSrc from "@/../public/map.png";

export default function MapSection() {
  const canvasRef = useRef(null);
  const controls = useAnimation();
  const [image, setImage] = useState(null);
  const [clickableAreas, setClickableAreas] = useState([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    // Carrega a imagem
    const img = new Image();
    img.src = mapSrc.src;
    img.onload = () => {
      setImage(img);

      // Aumenta a largura do canvas, mas mantém a altura da imagem
      canvas.width = img.width; // Aumenta a largura do canvas
      canvas.height = img.height; // Mantém a altura da imagem

      // Desenha a imagem no canvas
      ctx.drawImage(img, 0, 0, img.width, img.height);

      setClickableAreas([
        { x: 50, y: 50, width: 100, height: 100, action: () => alert('Área 1 clicada!') },
        { x: 200, y: 150, width: 150, height: 100, action: () => alert('Área 2 clicada!') }
      ]);
    };
  }, []);

  const handleClick = (e: { clientX: number; clientY: number; }) => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Verifica se o clique está dentro de uma área clicável
    clickableAreas.forEach(area => {
      if (
        x >= area.x &&
        x <= area.x + area.width &&
        y >= area.y &&
        y <= area.y + area.height
      ) {
        area.action(); // Executa a ação associada à área
      }
    });
  }

  const handleDragEnd = () => {
    controls.start({
      x: 0,
      y: 0,
      transition: { type: "spring", stiffness: 500, damping: 30 }
    });
  };

  return (
    <section
      className="flex justify-center items-center overflow-hidden"
    >
      <motion.div
        drag
        dragConstraints={{ left: -200, right: 200, top: 0, bottom: 0 }}
        onDragEnd={handleDragEnd}
        animate={controls}
        style={{ cursor: "grab" }}
      >
        <canvas
          ref={canvasRef}
          onClick={handleClick}
          style={{ cursor: "grabbing", display: "block" }} // Remove espaços em branco extras
          className="overflow-hidden w-[1000px]"
        />
      </motion.div>
    </section>
  );
}
