//Tabellen Suche

document.getElementById('search').addEventListener('input', function (e) {
    const searchValue = e.target.value.toLowerCase();
    const rows = document.querySelectorAll('#co2-data tbody tr');
  
    rows.forEach(row => {
      const cells = row.querySelectorAll('td');
      const matches = Array.from(cells).some(cell =>
        cell.textContent.toLowerCase().includes(searchValue)
      );
  
      row.style.display = matches ? '' : 'none';
    });
  });


//Tabellen Sortierung

function sortTableByColumn(table, column, asc = true) {
  const dirModifier = asc ? 1 : -1;
  const tBody = table.tBodies[0];
  const rows = Array.from(tBody.querySelectorAll("tr"));

  const sortedRows = rows.sort((a, b) => {
    const aColText = a.cells[column].textContent.trim();
    const bColText = b.cells[column].textContent.trim();

    if (column === 3) {
      const aEmissions = parseFloat(aColText.replace(/,/g, ""));
      const bEmissions = parseFloat(bColText.replace(/,/g, ""));

      return (aEmissions - bEmissions) * dirModifier; 
    }

    return aColText > bColText ? (1 * dirModifier) : (-1 * dirModifier);
  });

  while (tBody.firstChild) {
    tBody.removeChild(tBody.firstChild);
  }

  tBody.append(...sortedRows);

  table.querySelectorAll("th").forEach(th => th.classList.remove("th-sort-asc", "th-sort-desc"));
  table.querySelectorAll("th")[column].classList.toggle("th-sort-asc", asc);
  table.querySelectorAll("th")[column].classList.toggle("th-sort-desc", !asc);
}

document.querySelectorAll(".table-sortable th").forEach((headerCell, index) => {
  headerCell.addEventListener("click", () => {
    const tableElement = headerCell.closest('table');
    const currentIsAscending = headerCell.classList.contains("th-sort-asc");

    sortTableByColumn(tableElement, index, !currentIsAscending);
  });
});

//Tabelle filtern

document.addEventListener("DOMContentLoaded", function() {
  // Holen der Referenzen zu den Dropdown-Elementen und der Tabelle
  const companyFilter = document.getElementById("company-filter");
  const countryFilter = document.getElementById("country-filter");
  const rows = Array.from(document.querySelectorAll("#co2-data tbody tr"));
  
  // Extrahieren der einzigartigen Unternehmen und Länder
  const companies = [...new Set(rows.map(row => row.cells[1].textContent.trim()))];
  const countries = [...new Set(rows.map(row => row.cells[2].textContent.trim()))];

  // Dropdowns mit Unternehmen und Ländern füllen
  companies.forEach(company => {
    const listItem = document.createElement("li");
    listItem.innerHTML = `<a class="dropdown-item" data-value="${company}">${company}</a>`;
    companyFilter.appendChild(listItem);
  });

  countries.forEach(country => {
    const listItem = document.createElement("li");
    listItem.innerHTML = `<a class="dropdown-item" data-value="${country}">${country}</a>`;
    countryFilter.appendChild(listItem);
  });

  // Filterfunktion
  function filterTable() {
    const selectedCompany = document.getElementById("dropdown-company").textContent.trim();
    const selectedCountry = document.getElementById("dropdown-country").textContent.trim();

    rows.forEach(row => {
      const company = row.cells[1].textContent.trim();
      const country = row.cells[2].textContent.trim();

      const companyMatch = selectedCompany === "Unternehmen auswählen" || company === selectedCompany;
      const countryMatch = selectedCountry === "Land auswählen" || country === selectedCountry;

      // Zeile anzeigen oder ausblenden, basierend auf den Filtern
      if (companyMatch && countryMatch) {
        row.style.display = "";
      } else {
        row.style.display = "none";
      }
    });
  }

  // Event Listener für Dropdown-Elemente
  document.querySelectorAll(".dropdown-menu .dropdown-item").forEach(item => {
    item.addEventListener("click", (event) => {
      const dropdownToggle = event.target.closest(".dropdown").querySelector(".dropdown-toggle");
      dropdownToggle.textContent = event.target.textContent;

      // Filter anwenden nach Auswahl
      filterTable();
    });
  });

  // Funktion, um die Dropdowns zurückzusetzen
  function resetFilters() {
    document.getElementById("dropdown-company").textContent = "Unternehmen auswählen";
    document.getElementById("dropdown-country").textContent = "Land auswählen";

    // Alle Zeilen anzeigen, wenn beide Dropdowns zurückgesetzt wurden
    rows.forEach(row => {
      row.style.display = "";
    });
  }

  // Event Listener für das Zurücksetzen der Filter
  document.querySelectorAll(".dropdown-toggle").forEach(dropdownToggle => {
    dropdownToggle.addEventListener("click", function(event) {
      // Wenn auf den Dropdown-Knopf geklickt wird, reset den Filter
      if (event.target.id === "dropdown-company" || event.target.id === "dropdown-country") {
        resetFilters();
      }
    });
  });

  // Initiale Filteranwendung, falls die Dropdown-Werte geändert wurden
  filterTable();
});





  
  