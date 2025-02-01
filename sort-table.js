//Tabelle durchsuchen 

var input = document.getElementById('search');

input.addEventListener('input', function(e) { 
    // e repräsentiert das Ereignis (Event), 'input' ist das Verhalten, auf das reagiert wird
    const searchValue = e.target.value.toLowerCase(); 
    // target ist das Element, das das Ereignis ausgelöst hat
    // value ist der Eingabewert des Benutzers
    // toLowerCase() sorgt dafür, dass Groß- und Kleinschreibung ignoriert wird

    const rows = document.querySelectorAll("#co2-data tbody tr"); 
    // Alle Zeilen der Tabelle werden als Ziel für die Suchfunktion definiert

    rows.forEach(row => { 
        // Jede Zeile der Tabelle wird einzeln durchlaufen
        
        const cells = row.querySelectorAll('td'); 
        // Alle Zellen (td-Elemente) der jeweiligen Zeile werden erfasst
        
        const matches = Array.from(cells).some(cell => 
            cell.textContent.toLowerCase().includes(searchValue)
        ); 
        // Ein neues Array wird aus den Zellen erstellt
        // Die Methode 'some()' prüft, ob mindestens eine Zelle den Suchbegriff enthält
        // Verglichen wird der Textinhalt der Zellen mit dem Suchwert

        row.style.display = matches ? '' : 'none'; 
        // Falls ein Treffer gefunden wurde (matches = true), bleibt die Zeile sichtbar
        // Falls kein Treffer gefunden wurde (matches = false), wird die Zeile ausgeblendet
    });
});

//Tabelle sortieren


// Das tbody-Element wird ausgewählt, da hier die zu sortierenden Tabellenzeilen enthalten sind
const tBody = document.querySelector("tbody");

// Die einzelnen Spalten werden anhand ihrer Position in der Tabelle ausgewählt und in Arrays gespeichert
const colTwo = Array.from(tBody.querySelectorAll("tr td:nth-child(2)")); // Zweite Spalte
const colThree = Array.from(tBody.querySelectorAll("tr td:nth-child(3)")); // Dritte Spalte
const colFour = Array.from(tBody.querySelectorAll("tr td:nth-child(4)")); // Vierte Spalte

// Variable zur Steuerung der Sortierrichtung (aufsteigend oder absteigend)
let ascending = true;

//Funktion zur Sortierung einer Spalte innerhalb der Tabelle

function sortTable(col) {
    const tBody = col[0].parentElement.parentElement; 
    // Das übergeordnete <tbody>-Element wird aus der ersten Tabellenzelle abgeleitet

    const rows = Array.from(col).map(td => td.parentElement); 
    // Alle <tr>-Elemente werden ermittelt, indem aus jeder Zelle die übergeordnete Zeile extrahiert wird

    let values = col.map(td => td.textContent.trim()); 
    // Der Textinhalt jeder Zelle wird erfasst und führende sowie nachfolgende Leerzeichen entfernt

    let numericValues = values.map(value => 
        (!isNaN(value) && value.trim() !== "") ? parseFloat(value) : value
    );
    // Alle Werte werden geprüft:
    // - Falls der Wert eine Zahl ist, wird er in eine Float-Zahl konvertiert
    // - Falls es sich um Text handelt, bleibt er unverändert

    let sortedRows = rows.map((row, index) => ({
        row: row,
        value: numericValues[index]
    }));
    // Die Tabellenzeilen werden mit ihren jeweiligen Werten kombiniert, um sie gemeinsam zu sortieren

    sortedRows.sort((a, b) => {
        if (typeof a.value === "number" && typeof b.value === "number") {
            // Wenn beide Werte Zahlen sind, erfolgt eine numerische Sortierung
            return ascending ? a.value - b.value : b.value - a.value;
        } else {
            // Falls einer oder beide Werte Text sind, erfolgt eine alphanumerische Sortierung
            return ascending 
                ? String(a.value).localeCompare(String(b.value), "de", { numeric: true }) 
                : String(b.value).localeCompare(String(a.value), "de", { numeric: true });
        }
    });

    sortedRows.forEach(item => tBody.appendChild(item.row));
    // Die sortierten Zeilen werden in der neuen Reihenfolge wieder ins <tbody> eingefügt

    ascending = !ascending;
    // Nach jeder Sortierung wird die Richtung umgekehrt (abwechselnd aufsteigend/absteigend)
}

// Event-Listener für die Tabellenüberschriften
// Bei Klick auf eine Spaltenüberschrift wird die jeweilige Spalte sortiert
document.getElementById("company").addEventListener('click', () => sortTable(colTwo));
document.getElementById("country").addEventListener('click', () => sortTable(colThree));
document.getElementById("emissions").addEventListener('click', () => sortTable(colFour));

