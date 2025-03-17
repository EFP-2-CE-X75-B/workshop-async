/**
 * Exercice 7
 * ----------
 * 
 * Level 1 - Implémenter un pattern observer avec des observables. Créez un observable qui émet une donnée toutes les secondes, et deux observers qui affichent cette donnée dans la console.
 */

const { Observable } = require('rxjs');

const observable = new Observable(subscriber => {
  let count = 0;
  const interval = setInterval(() => {
    if(count === 5) {
      subscriber.complete();
    }
    subscriber.next(count++);
  }, 1000);

  return () => clearInterval(interval);
});

const observer1 = {
  next: data => console.log('Observer 1:', data),
  error: error => console.error('Observer 1:', error),
  complete: () => console.log('Observer 1: Terminé')
};

const observer2 = {
  next: data => console.log('Observer 2:', data),
  error: error => console.error('Observer 2:', error),
  complete: () => console.log('Observer 2: Terminé')
};

const subscription1 = observable.subscribe(observer1);
const subscription2 = observable.subscribe(observer2);

setTimeout(() => {
  subscription1.unsubscribe();
  subscription2.unsubscribe();
}, 10000);