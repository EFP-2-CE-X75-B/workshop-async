/**
 * Exercice 1
 * ----------
 * 
 * Implémenter une fonction qui prend en paramètre une fonction de callback.
 * Appeler cette fonction avec une fonction de callback qui affiche un message dans la console.
 * 
 */

/**
 * La méthode randomQuote génère une citation aléatoire et exécute ensuite le callback en passant cette citation en paramètre.
 * 
 * @param {*} callback 
 */
const randomQuote = (callback) => {
  const quotes = [
    'Hello World',
    'Goodbye World',
    'I am alive',
    'I am dead'
  ];
  
  // Génère un nombre aléatoire entre 0 et la taille du tableau quotes.
  const quote = quotes[Math.floor(Math.random() * quotes.length)];

  // Appelle la fonction callback avec la citation aléatoire, après la tâche "qui prend beaucoup de temps et dont on ne sait pas quand elle sera terminée".
  callback(quote);
};

/**
 * La méthode log affiche simplement le message dans la console.
 * 
 * @param {*} message 
 */
const log = (message) => {
  console.log(message);
};

// V1 - Appelle la méthode randomQuote avec la méthode log en paramètre.
randomQuote(log);

// V2 - Appelle la méthode randomQuote avec une fonction anonyme en paramètre.
randomQuote((message) => {
  console.log('Random quote:', message);
});
