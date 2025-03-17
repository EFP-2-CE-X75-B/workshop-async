/**
 * Exercice 6
 * ----------
 * 
 * Level 1 - Implémenter un pattern observer avec une classe Subject et deux classes Observer. La classe Subject doit permettre de s'abonner et de se désabonner à des observers, et de notifier ces derniers avec une donnée. Chaque abonné doit afficher un message différent dans la console.
 */

class Subject {
  constructor() {
    this.observers = [];
  }

  subscribe(observer) {
    this.observers.push(observer);
  }

  unsubscribe(observer) {
    const index = this.observers.indexOf(observer);
    if (index !== -1) {
      this.observers.splice(index, 1);
    }
  }

  notify(data) {
    this.observers.forEach(observer => observer.update(data));
  }
}

class Observer {
  update(data) {
    console.log('Nouvelle donnée reçue, je vais écrire dans un fichier:', data);
  }
}

class OtherObserver {
  update(data) {
    console.log('Nouvelle donnée reçue, je vais envoyer un mail:', data);
  }
}

// Utilisation
const subject = new Subject();
const observer1 = new Observer();
const observer2 = new OtherObserver();

subject.subscribe(observer1);
subject.subscribe(observer2);

subject.notify('Hello, world!');