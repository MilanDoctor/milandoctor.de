const card = document.getElementById('card');

// Variablen zum Speichern der Positionsinformationen
let isDragging = false;
let startX, startY, initialX, initialY;
let hasMoved = false;  // Neue Variable zur Überprüfung, ob die Maus bewegt wurde

// Funktion, die beim Start des Dragging ausgelöst wird
card.addEventListener('mousedown', function(e) {
    isDragging = true;
    hasMoved = false;  // Zu Beginn des Draggings ist die Karte noch nicht bewegt
    startX = e.clientX;
    startY = e.clientY;
    initialX = card.offsetLeft;
    initialY = card.offsetTop;
    card.style.cursor = "grabbing";
});

// Funktion, die während des Dragging ausgelöst wird
document.addEventListener('mousemove', function(e) {
    if (isDragging) {
        const deltaX = e.clientX - startX;
        const deltaY = e.clientY - startY;
        if (Math.abs(deltaX) > 5 || Math.abs(deltaY) > 5) {
            hasMoved = true;  // Wenn die Maus bewegt wird, setzen wir hasMoved auf true
        }
        card.style.left = `${initialX + deltaX}px`;
        card.style.top = `${initialY + deltaY}px`;
    }
});

// Funktion, die beim Loslassen der Maustaste ausgelöst wird (Ende des Dragging)
document.addEventListener('mouseup', function(e) {
    isDragging = false;
    card.style.cursor = "grab";
});

// Event Listener für Links und Wörter
const words = document.querySelectorAll('.word');
const links = document.querySelectorAll('.link');  // Sammeln aller Links

// Gruppen von Bildern für jedes Wort
const images = {
    posters: [
        'url("images/posters1.jpg")',
        'url("images/posters2.jpg")',
        'url("images/posters3.jpg")',
        'url("images/posters4.jpg")',
        'url("images/posters5.jpg")',
        'url("images/posters6.jpg")',
        'url("images/posters7.jpg")',
        'url("images/posters8.jpg")',
        'url("images/posters9.jpg")'
    ],
    books: [
        'url("images/books1.jpg")',
        'url("images/books2.jpg")',
        'url("images/books3.jpg")',
        'url("images/books4.jpg")',
        'url("images/books5.jpg")',
        'url("images/books6.jpg")',
        'url("images/books7.jpg")',
        'url("images/books8.jpg")',
        'url("images/books9.jpg")'
    ],
    zines: [
        'url("images/zines1.jpg")',
        'url("images/zines2.jpg")',
        'url("images/zines3.jpg")',
        'url("images/zines4.jpg")',
        'url("images/zines5.jpg")',
        'url("images/zines6.jpg")',
        'url("images/zines7.jpg")',
        'url("images/zines8.jpg")',
        'url("images/zines9.jpg")'
    ],
    fonts: [
        'url("images/fonts1.jpg")',
        'url("images/fonts2.jpg")',
        'url("images/fonts3.jpg")',
        'url("images/fonts4.jpg")',
        'url("images/fonts5.jpg")',
        'url("images/fonts6.jpg")',
        'url("images/fonts7.jpg")',
        'url("images/fonts8.jpg")',
        'url("images/fonts9.jpg")'
    ],
    clothing: [
        'url("images/clothing1.jpg")',
        'url("images/clothing2.jpg")',
        'url("images/clothing3.jpg")',
        'url("images/clothing4.jpg")',
        'url("images/clothing5.jpg")'
        
    ],
    covers: [
        'url("images/covers1.jpg")',
        'url("images/covers2.jpg")',
        'url("images/covers3.jpg")',
        'url("images/covers4.jpg")',
        'url("images/covers5.jpg")',
        'url("images/covers6.jpg")',
        'url("images/covers7.jpg")',
        'url("images/covers8.jpg")',
        'url("images/covers9.jpg")'
    ]
};

// Index der Bilder für jedes Wort, um die Rotation zu steuern
const imageIndexes = {
    posters: 0,
    books: 0,
    zines: 0,
    fonts: 0,
    clothing: 0,
    covers: 0
};

// Funktion zum Ändern des Hintergrunds
function changeBackground(word) {
    // Hole die nächste Bild-Index für das entsprechende Wort
    const imageArray = images[word];
    const currentIndex = imageIndexes[word];

    // Setze das nächste Bild als Hintergrund
    document.body.style.backgroundImage = imageArray[currentIndex];

    // Erhöhe den Index, und rotiere, wenn das Ende erreicht ist
    imageIndexes[word] = (currentIndex + 1) % imageArray.length;
}

// Event Listener für jedes Wort
words.forEach(wordElement => {
    wordElement.addEventListener('click', (event) => {
        const word = wordElement.getAttribute('data-word');
        
        // Hintergrund ändern
        changeBackground(word);

        // Verhindere, dass die Kartenrotation beim Klick auf das Wort ausgelöst wird
        event.stopPropagation();
    });
});

// Event Listener für Links, um Rotation zu verhindern
links.forEach(link => {
    link.addEventListener('click', (event) => {
        // Verhindere, dass die Kartenrotation beim Klick auf Links ausgelöst wird
        event.stopPropagation();
    });
});

// Event Listener für die Karte zum Drehen
card.addEventListener('click', function(e) {
    // Überprüfen, ob die Karte gedragt wurde oder ein Link angeklickt wurde
    if (!hasMoved && !e.target.classList.contains('word') && !e.target.classList.contains('link')) {
        card.classList.toggle('flipped');
    }
});
