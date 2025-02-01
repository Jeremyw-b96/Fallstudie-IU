// Ausrichtung nach Sprachkultur

const rtlLanguages = ['ar', 'he', 'fa', 'ur'];

const lang = document.documentElement.lang; //Auswahl der language Eigenschaft des document objekts 

//Abfrage nach aufgeführten Sprachen die von rechts nach links gelesen werden und dementsprechende Ausrichtung
if (rtlLanguages.includes(lang)) {  
  document.documentElement.dir = 'rtl';
} else {
  document.documentElement.dir = 'ltr';
}
