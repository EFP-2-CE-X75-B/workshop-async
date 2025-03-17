/**
 * Exercice 2
 * ----------
 * 
 * Level 1 - Implémenter une fonction qui log un message dans la console après 2 secondes.
 * Level 2 - Implémenter une fonction qui log un message dans la console après un délai donné. Le délai par défaut est de 1000ms.
 * Level 3 - Implémenter une fonction qui log un message dans la console après un délai et un message donnés. Le délai par défaut est de 1000ms.
 */

// Level 1
setTimeout(() => {
  console.log('Hello World, again');
}, 2000);

// Level 2
const logStaticMessageWithDelay = (delay) => {
  setTimeout(() => {
    console.log('Hello World, finally');
  }, delay);
};

logStaticMessageWithDelay(3000);

// Level 3
const logDynamicMessageWithDelay = (message, delay = 1000) => {
  setTimeout(() => {
    console.log(message);
  }, delay);
};

logDynamicMessageWithDelay('Hello World', 500);