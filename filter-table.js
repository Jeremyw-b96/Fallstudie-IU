// Tabelle filtern mit Auswahlkriterien

function filterTable() { 
    // Die Funktion filterTable() wird aufgerufen, wenn der Benutzer eine Auswahl in den Dropdown-Menüs trifft.
    
    const selectedCompany = document.getElementById("dropdown-company").textContent.trim(); 
    // Ermittelt den aktuell ausgewählten Wert im Dropdown-Menü für Unternehmen.
    // textContent gibt den sichtbaren Text des Elements zurück.
    // trim() entfernt führende und nachfolgende Leerzeichen.

    const selectedCountry = document.getElementById("dropdown-country").textContent.trim(); 
    // Ermittelt den aktuell ausgewählten Wert im Dropdown-Menü für Länder.

    const rows = document.querySelectorAll("#co2-data tbody tr"); 
    // Alle Zeilen der Tabelle (außer der Kopfzeile) werden erfasst, um die Filterung darauf anzuwenden.

    const resetCompany = selectedCompany === "Alle Unternehmen" || selectedCompany === "Unternehmen auswählen"; 
    // Prüft, ob das Dropdown für Unternehmen zurückgesetzt ist.
    // Wenn „Alle Unternehmen“ oder „Unternehmen auswählen“ gewählt wurde, wird keine Filterung nach Unternehmen vorgenommen.

    const resetCountry = selectedCountry === "Alle Länder" || selectedCountry === "Land auswählen"; 
    // Prüft, ob das Dropdown für Länder zurückgesetzt ist.

    rows.forEach(row => { 
        // Durchläuft jede Zeile der Tabelle einzeln.

        if (resetCompany && resetCountry) { 
            // Falls beide Dropdowns auf „Alle“ oder „Auswählen“ gesetzt sind, wird die gesamte Tabelle wieder sichtbar.
            row.style.display = "";
        } else { 
            // Falls mindestens ein Filter aktiv ist, wird die Filterung durchgeführt.

            const company = row.cells[1].textContent.trim(); 
            // Holt den Textinhalt der zweiten Spalte (Unternehmen) der aktuellen Zeile.

            const country = row.cells[2].textContent.trim(); 
            // Holt den Textinhalt der dritten Spalte (Land) der aktuellen Zeile.

            const companyMatch = resetCompany || company === selectedCompany; 
            // Prüft, ob die Zeile zur ausgewählten Firma passt oder ob kein Firmenfilter aktiv ist.

            const countryMatch = resetCountry || country === selectedCountry; 
            // Prüft, ob die Zeile zum ausgewählten Land passt oder ob kein Länderefilter aktiv ist.

            row.style.display = companyMatch && countryMatch ? "" : "none"; 
            // Falls die Zeile mit beiden Filterkriterien übereinstimmt, bleibt sie sichtbar.
            // Falls nicht, wird sie ausgeblendet.
        }
    });

    if (selectedCompany === "Alle Unternehmen") { 
        // Falls „Alle Unternehmen“ ausgewählt wurde, wird der Dropdown-Text auf „Unternehmen auswählen“ zurückgesetzt.
        document.getElementById("dropdown-company").textContent = "Unternehmen auswählen";
    }

    if (selectedCountry === "Alle Länder") { 
        // Falls „Alle Länder“ ausgewählt wurde, wird der Dropdown-Text auf „Land auswählen“ zurückgesetzt.
        document.getElementById("dropdown-country").textContent = "Land auswählen";
    }
}

// Event Listener für Dropdown-Elemente (Unternehmen)
document.querySelectorAll("#company-filter .dropdown-item").forEach(item => { 
    // Erfasst alle Einträge im Unternehmen-Dropdown-Menü.

    item.addEventListener("click", (event) => { 
        // Fügt jedem Eintrag im Dropdown-Menü einen Event Listener hinzu, der auf Klicks reagiert.

        const dropdownToggle = event.target.closest(".dropdown").querySelector(".dropdown-toggle"); 
        // Findet das zugehörige Dropdown-Button-Element.

        dropdownToggle.textContent = event.target.textContent; 
        // Setzt den Text des Buttons auf den ausgewählten Wert.

        filterTable(); 
        // Ruft die Filterfunktion auf, um die Tabelle mit der neuen Auswahl zu aktualisieren.
    });
});

// Event Listener für Dropdown-Elemente (Länder)
document.querySelectorAll("#country-filter .dropdown-item").forEach(item => { 
    // Erfasst alle Einträge im Länder-Dropdown-Menü.

    item.addEventListener("click", (event) => { 
        // Fügt jedem Eintrag im Dropdown-Menü einen Event Listener hinzu, der auf Klicks reagiert.

        const dropdownToggle = event.target.closest(".dropdown").querySelector(".dropdown-toggle"); 
        // Findet das zugehörige Dropdown-Button-Element.

        dropdownToggle.textContent = event.target.textContent; 
        // Setzt den Text des Buttons auf den ausgewählten Wert.

        filterTable(); 
        // Ruft die Filterfunktion auf, um die Tabelle mit der neuen Auswahl zu aktualisieren.
    });
});








