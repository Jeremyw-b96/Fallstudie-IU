//Tabelle durchsuchen//

var input = document.getElementById('search');

input.addEventListener('input', function(e) { 
    const searchValue = e.target.value.toLowerCase().replace(/[<>"/'`]/g, ''); // Bereinigung potenziell gefährlicher Zeichen
    // Auslöser für Ereignis mit Eingabewert, Groß- und Kleinschreibung ignoriert
    const rows = document.querySelectorAll("#co2-data tbody tr"); // Alle Zeilen der Tabelle werden als Ziel definiert

    rows.forEach(row => { 
        const cells = row.querySelectorAll('td');
        const matches = Array.from(cells).some(cell => 
            cell.textContent.toLowerCase().includes(searchValue)
        ); 
        // Ein neues Array wird aus den Zellen erstellt, some prüft, ob mindestens eine Zelle den Suchbegriff enthält
        row.style.display = matches ? '' : 'none'; 
        // Falls ein Treffer gefunden wurde (matches = true), bleibt die Zeile sichtbar umgekehrt wird die Zeile ausgeblendet
    });
});

//Tabelle sortieren//

const tBody = document.querySelector("tbody"); // Das tbody-Element ausgewählt

// Die einzelnen Spalten werden anhand ihrer Position in der Tabelle ausgewählt und in Arrays gespeichert
const colTwo = Array.from(tBody.querySelectorAll("tr td:nth-child(2)")); 
const colThree = Array.from(tBody.querySelectorAll("tr td:nth-child(3)")); 
const colFour = Array.from(tBody.querySelectorAll("tr td:nth-child(4)")); 

let ascending = true; // Variable mit boolscher Wert zur Steuerung der Sortierrichtung

function sortTable(col) {
    const tBody = col[0].parentElement.parentElement; // Das übergeordnete <tbody>-Element wird aus der ersten Tabellenzelle abgeleitet
    const rows = Array.from(col).map(td => td.parentElement);  // Alle <tr>-Elemente werden ermittelt, indem aus jeder Zelle die übergeordnete Zeile extrahiert wird

    let values = col.map(td => td.textContent.trim()); // Der Textinhalt jeder Zelle wird erfasst und vorherige sowie nachfolgende Leerzeichen entfernt

    let numericValues = values.map(value => 
        (!isNaN(value) && value.trim() !== "") ? parseFloat(value) : value
    );
    // Alle Werte werden geprüft: Falls der Wert eine Zahl ist, wird er in eine Float-Zahl konvertiert, wenn es sich um Text handelt, bleibt er unverändert

    let sortedRows = rows.map((row, index) => ({
        row: row,
        value: numericValues[index]
    }));
    // Die Tabellenzeilen werden mit ihren jeweiligen Werten kombiniert, um sie gemeinsam zu sortieren

    sortedRows.sort((a, b) => {
        if (typeof a.value === "number" && typeof b.value === "number") { // Wenn beide Werte Zahlen sind, erfolgt eine numerische Sortierung
            return ascending ? a.value - b.value : b.value - a.value;
        } else { // Falls einer oder beide Werte Text sind, erfolgt eine alphanumerische Sortierung
            return ascending 
                ? String(a.value).localeCompare(String(b.value), "de", { numeric: true }) // de für 
                : String(b.value).localeCompare(String(a.value), "de", { numeric: true });
        }
    });

    sortedRows.forEach(item => tBody.appendChild(item.row)); // Die sortierten Zeilen werden in der neuen Reihenfolge wieder ins <tbody> eingefügt

    ascending = !ascending;
}

// Event-Listener für die Tabellenüberschriften
document.getElementById("company").addEventListener('click', () => sortTable(colTwo));
document.getElementById("country").addEventListener('click', () => sortTable(colThree));
document.getElementById("emissions").addEventListener('click', () => sortTable(colFour));

