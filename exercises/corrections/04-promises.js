/**
 * Exercice 4
 * ----------
 * 
 * Level 1 - Implémenter une fonction qui resolve une promise après une seconde. Afficher le message dans la console à la résolution de la promise.
 * Level 2 - Implémenter une fonction qui reject une promise après une seconde. Afficher le message dans la console au rejet de la promise.
 * Level 3 - Implémenter une fonction qui resolve trois promises après une seconde. Afficher le message dans la console à la résolution de l'ensemble des promises. Observez le délai de résolution.
 */

// Level 1
const promise = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve('Hello World');
  }, 1000);
});

promise
  .then((message) => {
    console.log(message);
  });

// Level 2
const promise2 = new Promise((resolve, reject) => {
  setTimeout(() => {
    reject('Goodbye World');
  }, 2000);
});

promise2
  .then((message) => {
    console.log(message);
  })
  .catch((message) => {
    console.log(`Error: ${message}`);
  });

// Level 3
const promise3 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve('I am alive');
  }
  , 3000);
});

const promise4 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve('I am still alive');
  }
  , 4000);
});

const promise5 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve('Yeah yeah I am alive!');
  }
  , 5000);
});

Promise.all([promise3, promise4, promise5])
  .then((messages) => {
    messages.forEach((message) => {
      console.log(message);
    });
  });
