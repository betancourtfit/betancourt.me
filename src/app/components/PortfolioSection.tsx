"use client";

import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import db from "../firebase";

// Define el tipo al inicio del archivo
type PortfolioItem = {
  title: string;
  url: string;
  category: string;
  image?: string; // Parámetro opcional para la imagen
};

export default function PortfolioSection() {
  const [content, setContent] = useState<PortfolioItem[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "PORTFOLIO"));
        const data = querySnapshot.docs.map((doc) => doc.data() as PortfolioItem);
        console.log("Data:", data);
        setContent(data);
      } catch (error) {
        console.error("Error al recuperar datos:", error);
      }
    };
    fetchData();
  }, []);

  // Agrupa los elementos por categoría
  const groupedContent = content.reduce((acc: Record<string, PortfolioItem[]>, item) => {
    if (item.image) { // Filtrar items sin imagen
      if (!acc[item.category]) {
        acc[item.category] = [];
      }
      acc[item.category].push(item);
    }
    return acc;
  }, {});

  return (
    <div>
      {Object.entries(groupedContent).map(([category, items]) => (
        <section key={category} id={category.toLowerCase().replace(/\s+/g, "-")}>
          <h2>{category}</h2>
          <div className="grid">
            {items.map((item, index) => (
              <div key={index} className="card">
                <div className="image-container">
                  <img src={item.image} alt={item.title} />
                </div>
                <div className="card-content">
                  <h3>{item.title}</h3>
                  <a href={item.url} target="_blank" rel="noopener noreferrer">
                    Leer más
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}