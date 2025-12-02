import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLinkedin, faInstagram, faGithub, faXTwitter } from "@fortawesome/free-brands-svg-icons";
import styles from './HeroSection.module.css';

export default function HeroSection() {
  return (
    <section className={styles.heroSection}>
      {/* Imagen de perfil */}
      <div className={styles.imageContainer}>
        <Image
          src="/foto_perfil.jpg"
          alt="Juan Betancourt"
          width={150}
          height={150}
          className={styles.profileImage}
          priority // Indica que esta imagen es una prioridad para la carga
        />
      </div>

      {/* Texto de presentación */}
      <h1>Hola, soy Juan Betancourt</h1>
      <p>Growth Marketer | Data Scientist | AI-Powered Automation</p>

      {/* Iconos sociales */}
      <div className={styles.socialContainer}>
        {/* LinkedIn */}
        <a href="https://linkedin.com/in/betancourtfit" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
          <FontAwesomeIcon
            icon={faLinkedin}
            className={`${styles.socialIcon} ${styles.socialIconLinkedin}`}
          />
        </a>
        {/* Twitter */}
        <a href="https://twitter.com/betan_eth" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
          <FontAwesomeIcon
            icon={faXTwitter}
            className={`${styles.socialIcon} ${styles.socialIconTwitter}`}
          />
        </a>
        {/* Instagram */}
        <a href="https://instagram.com/betancourt.eth" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
          <FontAwesomeIcon
            icon={faInstagram}
            className={`${styles.socialIcon} ${styles.socialIconInstagram}`}
          />
        </a>
        {/* GitHub */}
        <a href="https://github.com/betancourtfit" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
          <FontAwesomeIcon
            icon={faGithub}
            className={`${styles.socialIcon} ${styles.socialIconGithub}`}
          />
        </a>
      </div>
    </section>
  );
}
