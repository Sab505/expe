// --- CONFIGURATION ---
// Mettez ici les codes-barres valides pour votre animation
const CODES_VALIDES = [
    "FBLSE"
];

// Durée d'affichage de l'écran vert/rouge (en millisecondes)
const TEMPS_AFFICHAGE_RESULTAT = 2500;

// ---------------------

const resultScreen = document.getElementById('result-screen');
const resultText = document.getElementById('result-text');
const nextBtn = document.getElementById('next-btn');

let html5QrCodeScanner = null;

function onScanSuccess(decodedText, decodedResult) {
    console.log(`Code détecté : ${decodedText}`);

    // 1. Mettre en pause le scanner caméra immédiatement
    if (html5QrCodeScanner) {
        html5QrCodeScanner.pause(true); // true = gèle l'image de la dernière frame capturée
    }

    // 2. Vérification du code
    const estValide = CODES_VALIDES.includes(decodedText);

    // 3. Affichage du retour visuel plein écran
    if (estValide) {
        resultScreen.className = "bg-green";
        resultText.innerText = "GARDER ✓";
    } else {
        resultScreen.className = "bg-red";
        resultText.innerText = "NE PAS GARDER ✗";
    }

    resultScreen.classList.remove('hidden');
    
    // Afficher le bouton de réinitialisation
    nextBtn.classList.remove('hidden');
}

function onScanFailure(error) {
    // Erreurs ignorées (normales en continu)
}

// Initialisation de la caméra
document.addEventListener("DOMContentLoaded", () => {
    // On utilise la classe Html5Qrcode directement pour un meilleur contrôle du pause/resume
    html5QrCodeScanner = new Html5Qrcode("reader");
    
    const config = { fps: 10, qrbox: { width: 300, height: 300 }, aspectRatio: 1.0 };

    html5QrCodeScanner.start(
        { facingMode: "environment" }, 
        config, 
        onScanSuccess, 
        onScanFailure
    ).catch(err => {
        console.error("Erreur d'accès à la caméra : ", err);
    });

    // 4. Action au clic sur le bouton "Carte suivante"
    nextBtn.addEventListener('click', () => {
        // Cacher l'écran de résultat et le bouton
        resultScreen.classList.add('hidden');
        nextBtn.classList.add('hidden');

        // Reprendre le scan de la caméra
        if (html5QrCodeScanner) {
            html5QrCodeScanner.resume();
        }
    });
});