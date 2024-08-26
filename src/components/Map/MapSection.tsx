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

    const img = new Image();
    img.src = mapSrc.src;
    img.onload = () => {
      setImage(img);

      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0, img.width, img.height);

      setClickableAreas([
        { x: 50, y: 50, width: 100, height: 100, action: () => console.log('here1') },
        { x: 200, y: 150, width: 150, height: 100, action: () => console.log('here2') }
      ]);
    };
  }, []);

  const handleClick = (e: { clientX: number; clientY: number; }) => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    clickableAreas.forEach(area => {
      if (
        x >= area.x &&
        x <= area.x + area.width &&
        y >= area.y &&
        y <= area.y + area.height
      ) {
        area.action();
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
          style={{ cursor: "grabbing", display: "block" }}
          className="overflow-hidden w-[1000px]"
        />
      </motion.div>
    </section>
  );
}
