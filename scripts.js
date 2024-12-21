async function fetchContent() {
    try {
        const response = await fetch('data.json');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching content:', error);
        return [];
    }
}

async function renderSections() {
    const data = await fetchContent();

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

document.addEventListener('DOMContentLoaded', () => {
    renderSections();
});
