/**
 * Exercice 3
 * ----------
 * 
 * Level 1 - Implémenter une fonction qui log un message dans la console toutes les secondes.
 * Level 2 - Implémenter une fonction qui log un message dans la console toutes les secondes, 3x.
 */

// Level 1
/**setInterval(() => {
  console.log('Hello World');
}, 1000);**/

// Level 2
let counter = 0;
const interval = setInterval(() => {
  console.log('Hello World');
  counter++;
  if (counter === 3) {
    clearInterval(interval);
  }
}, 1000);
