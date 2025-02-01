// Ausrichtung nach Sprachkultur

const rtlLanguages = ['ar', 'he', 'fa', 'ur'];

const lang = document.documentElement.lang;

if (rtlLanguages.includes(lang)) {
  document.documentElement.dir = 'rtl';
} else {
  document.documentElement.dir = 'ltr';
}
