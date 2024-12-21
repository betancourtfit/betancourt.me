"use client";

import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import db from "../firebase";

export default function PortfolioSection() {
  const [content, setContent] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "PORTFOLIO"));
        const data = querySnapshot.docs.map(doc => doc.data());
        console.log("Data:", data);
        setContent(data);
      } catch (error) {
        console.error("Error al recuperar datos:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <section id="portfolio">
      <h2>Portafolio</h2>
      <div className="grid">
        {content.length > 0 ? (
          content.map((item, index) => (
            <div key={index} className="card">
              <h3>{item.title}</h3>
              <p>{item.description}</p>
              <a href={item.url} target="_blank" rel="noopener noreferrer">
                Leer más
              </a>
            </div>
          ))
        ) : (
          <p>Cargando contenido...</p>
        )}
      </div>
    </section>
  );
}
