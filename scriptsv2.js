document.addEventListener('DOMContentLoaded', () => {
    // Configuración de Firebase
    const firebaseConfig = {
        apiKey: "AIzaSyBGh8tETEf5SFUXMDpY46QXGm76t0lw6Tk",
        authDomain: "betancourtme-143ba.firebaseapp.com",
        databaseURL: "https://betancourtme-143ba-default-rtdb.firebaseio.com",
        projectId: "betancourtme-143ba",
        storageBucket: "betancourtme.appspot.com",
        messagingSenderId: "327307214931",
        appId: "1:327307214931:web:6ed70349932c1575bec6a6",
        measurementId: "G-Z8CPSTK641"
    };

    // Inicializar Firebase
    firebase.initializeApp(firebaseConfig);
    const database = firebase.database();

    // Obtener contenido desde Firebase
    async function fetchContent() {
        try {
            const snapshot = await database.ref('contenido').once('value');
            const data = snapshot.val();
            return data || [];
        } catch (error) {
            console.error('Error fetching content from Firebase:', error);
            return [];
        }
    }

    // Renderizar secciones dinámicamente
    async function renderSections() {
        const data = await fetchContent();

        // Verifica si los datos existen
        if (!data || data.length === 0) {
            console.error('No se encontraron datos para renderizar.');
            return;
        }

        // Obtener todas las categorías únicas
        const categories = [...new Set(data.map(item => item.categoria))];

        const mainContainer = document.querySelector('main');

        categories.forEach(category => {
            // Crear sección dinámica
            const section = document.createElement('section');
            section.className = 'carousel-section';
            section.id = `carousel-${category.toLowerCase().replace(/ /g, '-')}`;
            section.innerHTML = `
                <h2>${category}</h2>
                <div class="carousel" id="carousel-${category.toLowerCase().replace(/ /g, '-')}-content">
                    <!-- Tarjetas generadas dinámicamente -->
                </div>
            `;
            mainContainer.appendChild(section);

            // Renderizar el carrusel correspondiente
            renderCarousel(category, `carousel-${category.toLowerCase().replace(/ /g, '-')}-content`, data);
        });
    }

    function renderCarousel(category, containerId, data) {
        const container = document.getElementById(containerId);
        const items = data.filter(item => item.categoria === category);

        items.forEach(item => {
            const card = document.createElement('div');
            card.className = 'card';
            card.innerHTML = `
                <img src="${item.imagen}" alt="${item.titulo}" class="card-image" />
                <h3>${item.titulo}</h3>
                <a href="${item.link}" target="_blank" class="cta">VER</a>
            `;
            container.appendChild(card);
        });
    }

    // Ejecutar al cargar el DOM
    renderSections();
});
