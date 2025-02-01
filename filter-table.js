// Tabelle filtern mit Auswahlkriterien

function filterTable() { 
    const selectedCompany = document.getElementById("dropdown-company").textContent.trim(); 
    // textContent gibt den sichtbaren Text des Elements zurück und trim() entfernt führende und nachfolgende Leerzeichen

    const selectedCountry = document.getElementById("dropdown-country").textContent.trim(); 
    // Ermittelt den aktuell ausgewählten Wert im Dropdown-Menü für Länder

    const rows = document.querySelectorAll("#co2-data tbody tr"); 
    // Alle Zeilen der Tabelle (außer der Kopfzeile) werden erfasst, um die Filterung darauf anzuwenden

    // Wenn einer von beiden gewählt wurde, wird keine Filterung nach Unternehmen vorgenommen
    const resetCompany = selectedCompany === "Alle Unternehmen" || selectedCompany === "Unternehmen auswählen"; 
    const resetCountry = selectedCountry === "Alle Länder" || selectedCountry === "Land auswählen"; 


    rows.forEach(row => { 
        // Durchläuft jede Zeile der Tabelle einzeln

        if (resetCompany && resetCountry) { 
            // Falls beide Dropdowns auf „Alle“ oder „Auswählen“ gesetzt sind, wird die gesamte Tabelle wieder sichtbar
            row.style.display = "";
        } else { 
            // Falls mindestens ein Filter aktiv ist, wird die Filterung durchgeführt

            // Holt den Textinhalt der Spalte der aktuellen Zeile
            const company = row.cells[1].textContent.trim(); 
            const country = row.cells[2].textContent.trim(); 

            //Prüfung ob bestimmte Filter aktiv sind 
            const companyMatch = resetCompany || company === selectedCompany; 
            const countryMatch = resetCountry || country === selectedCountry; 

            //Anzeige der tabelle verändert sich je nachdem welche Filter aktiv sind
            row.style.display = companyMatch && countryMatch ? "" : "none"; 
        
        }
    });

}

// Event Listener für Unternehmen-Elemente
document.querySelectorAll("#company-filter .dropdown-item").forEach(item => { // Erfasst alle Einträge im Unternehmen-Dropdown-Menü

    item.addEventListener("click", (event) => { 
        const dropdownToggle = event.target.closest(".dropdown").querySelector(".dropdown-toggle"); 
        // Findet das zugehörige Dropdown-Button-Element

        dropdownToggle.textContent = event.target.textContent; // Setzt den Text des Buttons auf den ausgewählten Wert

        filterTable(); 
    });
});

// Event Listener für Länder-Elemente
document.querySelectorAll("#country-filter .dropdown-item").forEach(item => { 

    item.addEventListener("click", (event) => { 
        // Fügt jedem Eintrag im Dropdown-Menü einen Event Listener hinzu, der auf Klicks reagiert

        const dropdownToggle = event.target.closest(".dropdown").querySelector(".dropdown-toggle"); 
        // Auffinden des zugehörigen Dropdown-Button-Element

        dropdownToggle.textContent = event.target.textContent; // Setzt den Text des Buttons auf den ausgewählten Wert

        filterTable(); 
    });
});








