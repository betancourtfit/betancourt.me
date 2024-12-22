import Image from "next/image";

export default function HeroSection() {
  return (
    <section style={{ textAlign: "center", padding: "20px" }}>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Image
          src="/foto_perfil.jpg"
          alt="Juan Betancourt"
          width={150}
          height={150}
          style={{
            borderRadius: "50%", // Esto hace que la imagen sea circular
            objectFit: "cover", // Asegura que la imagen se recorte correctamente
            objectPosition: "top", // Ajusta el enfoque hacia la parte superior de la imagen
            marginBottom: "20px",
          }}
          priority // Indica que esta imagen es una prioridad para la carga
        />
      </div>
      <h1>Hola, soy Juan Betancourt</h1>
      <p>Growth Marketer | Data Scientist | Automatizador con IA</p>
    </section>
  );
}