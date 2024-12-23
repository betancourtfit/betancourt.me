import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLinkedin, faInstagram, faGithub, faXTwitter } from "@fortawesome/free-brands-svg-icons";

export default function HeroSection() {
  return (
    <section style={{ textAlign: "center", padding: "20px" }}>
      {/* Imagen de perfil */}
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Image
          src="/foto_perfil.jpg"
          alt="Juan Betancourt"
          width={150}
          height={150}
          style={{
            borderRadius: "50%", // Imagen circular
            objectFit: "cover",
            objectPosition: "top",
            marginBottom: "20px",
          }}
          priority // Indica que esta imagen es una prioridad para la carga
        />
      </div>

      {/* Texto de presentación */}
      <h1>Hola, soy Juan Betancourt</h1>
      <p>Growth Marketer | Data Scientist | AI-Powered Automation</p>

      {/* Iconos sociales */}
      <div style={{ display: "flex", justifyContent: "center", gap: "15px", marginTop: "20px" }}>
        {/* LinkedIn */}
        <a href="https://linkedin.com/in/betancourtfit" target="_blank" rel="noopener noreferrer">
          <FontAwesomeIcon icon={faLinkedin} style={{ fontSize: "30px", color: "#0e76a8" }} />
        </a>
        {/* Twitter */}
        <a href="https://twitter.com/betan_eth" target="_blank" rel="noopener noreferrer">
          <FontAwesomeIcon icon={faXTwitter} style={{ fontSize: "30px", color: "#1DA1F2" }} />
        </a>
        {/* Instagram */}
        <a href="https://instagram.com/betancourt.eth" target="_blank" rel="noopener noreferrer">
          <FontAwesomeIcon icon={faInstagram} style={{ fontSize: "30px", color: "#E1306C" }} />
        </a>
        {/* GitHub */}
        <a href="https://github.com/betancourtfit" target="_blank" rel="noopener noreferrer">
          <FontAwesomeIcon icon={faGithub} style={{ fontSize: "30px", color: "#333" }} />
        </a>
      </div>
    </section>
  );
}