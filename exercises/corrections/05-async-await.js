/**
 * Exercice 5
 * ----------
 * 
 * Level 1 - Implémenter une fonction async qui retourne une promise resolvant 42 après une seconde. Afficher le résultat dans la console.
 * Level 2 - Implémenter une fonction async qui retourne 42 après une seconde. Afficher le résultat dans la console.
 */

// Level 1
async function getNumberWithPromise() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(1);
    }, 1000);
  });
}

getNumberWithPromise()
  .then((number) => {
    console.log(number);
  });

// Observons que await ne fonctionne pas à la racine du module (top-level) et doit être utilisé dans une fonction async
// console.log(await getNumberWithPromise());

// Utilisation de la fonction async immédiatement invoquée (IIEF)
(async () => {
  console.log(await getNumberWithPromise(), 'IIFE');
})();

// Level 2
// Impossible de délayer d'une seconde sans implémenter une promise explicite (scope de la fonction async)
async function getNumberWithoutPromise() {
  return 2;
}

// Cela dit, observons que la fonction retourne immédiatement et implicitement une promise (non résolue) parce qu'elle est déclarée avec le mot-clé async
console.log(getNumberWithoutPromise()); // Promise { 2 }

// Et que donc, on peut l'utiliser avec await, ou then si l'on n'est pas dans une fonction async
getNumberWithoutPromise()
  .then((number) => {
    console.log(number);
  });

// Observons à présent ce qu'il se passe en terme d'ordre d'exécution quand on utilise await

// On déclare une fonction async qui retourne une valeur après une seconde
async function getAnotherNumber() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(7);
    }, 1000);
  });
}

// On déclare une fonction async qui utilise la fonction précédente
async function main() {
  console.log('Before');
  console.log(await getAnotherNumber());
  console.log(getAnotherNumber()); // Promise { <pending> }
  console.log('After');
}

main();