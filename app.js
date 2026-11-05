const CODES_VALIDES = [
    "FBLSE"
];

const TEMPS_AFFICHAGE_RESULTAT = 2500;

const resultScreen = document.getElementById('result-screen');
const resultText = document.getElementById('result-text');
const nextBtn = document.getElementById('next-btn');

let html5QrCodeScanner = null;

function onScanSuccess(decodedText, decodedResult) {
    console.log(`Code détecté : ${decodedText}`);

    if (html5QrCodeScanner) {
        html5QrCodeScanner.pause(true);
    }

    const estValide = CODES_VALIDES.includes(decodedText);

    if (estValide) {
        resultScreen.className = "bg-green";
        resultText.innerText = "GARDER ✓";
    } else {
        resultScreen.className = "bg-red";
        resultText.innerText = "NE PAS GARDER ✗";
    }

    resultScreen.classList.remove('hidden');
    nextBtn.classList.remove('hidden');
}

function onScanFailure(error) {
    // Erreurs ignorées (normales en continu)
}

document.addEventListener("DOMContentLoaded", () => {
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

    nextBtn.addEventListener('click', () => {
        resultScreen.classList.add('hidden');
        nextBtn.classList.add('hidden');

        if (html5QrCodeScanner) {
            html5QrCodeScanner.resume();
        }
    });
});
