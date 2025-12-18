// Precios base de referencia (DonDominio aprox. 2025)
const basePrices = {
    ".com": 15.95,
    ".es": 14.95,
    ".net": 14.95,
    ".org": 12.95,
    ".info": 22.95,
    ".cl": 15.95
};

const MARGIN = 1.30; // 30% de aumento

function searchDomain() {
    const input = document.getElementById('domainInput').value.trim();
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = ""; // Limpiar resultados anteriores

    if (input === "") {
        alert("Por favor, escribe un nombre de dominio.");
        return;
    }

    // Generar tarjetas para cada extensión
    for (let ext in basePrices) {
        const finalPrice = (basePrices[ext] * MARGIN).toFixed(2);
        
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `
            <h3>${input}${ext}</h3>
            <p class="price">${finalPrice}€ <small>/año</small></p>
            <p>IVA incluido</p>
            <button onclick="alert('Redirigiendo a registro...')">Registrar</button>
        `;
        resultsDiv.appendChild(card);
    }
}