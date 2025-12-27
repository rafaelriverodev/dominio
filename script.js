// 1. CONFIGURACIÓN
const API_KEY = 'AYyQUU9jKlW7c4phtgRkMA==BpuxzRJD1H4T4xbt'; // <--- PEGA TU CLAVE DE API-NINJAS AQUÍ
const MARGIN = 1.50; 

const domainData = {
    ".com": 15.95,
    ".es": 14.95,
    ".cl": 14.95,
    ".net": 14.95
};

async function searchDomain() {
    const query = document.getElementById('domainInput').value.trim();
    const resultsDiv = document.getElementById('results');
    
    if (!query) return alert("Escribe un nombre de dominio");

    resultsDiv.innerHTML = "<div class='loading'>Buscando en tiempo real...</div>";

    // Recorremos las extensiones para consultar la API por cada una
    for (let ext in domainData) {
        const fullDomain = query + ext;
        const url = `https://api.api-ninjas.com/v1/domain?domain=${fullDomain}`;

        try {
            const response = await fetch(url, {
                headers: { 'X-Api-Key': API_KEY }
            });
            const data = await response.json();
            
            // API-Ninjas devuelve data.available (true/false)
            renderCard(fullDomain, data.available, domainData[ext]);

        } catch (error) {
            console.error("Error en la API:", error);
        }
    }
    // Quitamos el mensaje de carga una vez termine el primer loop
    document.querySelector('.loading')?.remove();
}

function renderCard(domain, isAvailable, basePrice) {
    const resultsDiv = document.getElementById('results');
    const finalPrice = (basePrice * MARGIN).toFixed(2);
    
    const card = document.createElement('div');
    card.className = `card ${!isAvailable ? 'unavailable' : ''}`;
    
    card.innerHTML = `
        <h3>${domain}</h3>
        <p class="status">${isAvailable ? '✅ Disponible' : '❌ Ocupado'}</p>
        <p class="price">${isAvailable ? finalPrice + '€' : '--'}</p>
        <button ${!isAvailable ? 'disabled' : ''} class="btn-reg">
            ${isAvailable ? 'Comprar ahora' : 'No disponible'}
        </button>
    `;
    resultsDiv.appendChild(card);
}