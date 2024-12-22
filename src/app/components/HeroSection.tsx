export default function HeroSection() {
  return (
    <section style={{ textAlign: "center", padding: "20px" }}>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <img
          src="/foto_perfil.jpg"
          alt="Juan Betancourt"
          style={{
            width: "150px",
            height: "150px",
            borderRadius: "50%", // Esto hace que la imagen sea circular
            objectFit: "cover", // Asegura que la imagen se recorte correctamente
            objectPosition: "top", // Ajusta el enfoque hacia la parte superior de la imagen
            marginBottom: "20px",
          }}
        />
      </div>
      <h1>Hola, soy Juan Betancourt</h1>
      <p>Growth Marketer | Data Scientist | Innovador en IA</p>
    </section>
  );
}