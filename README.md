# L'asynchronisme

Le caractère de plusieures opérations qui ne se déroulent pas au même moment.

# Comment gérer l'asynchronisme en JS/Node.js ?

-   Les 'callbacks functions'
-   setTimeout/setInterval
-   Les Promises
-   async/await

### Techniques plus avancées / moins courantes pour gérer l'asynchronisme

-   Les pattern observers
-   Les observables

## L'event loop

L'event loop est le 'moteur' derrière l'asynchronisme en JavaScript.
L'event loop reçoit des instructions qui vont être mises dans une file.
Chaque instruction contient une fonction principale, et une fonction callback.

Chaque instruction sera assignée à un thread, et lorsque le thread aura fini d'éxecuter la fonction principale, il va executer la callback function, avec la valeur de retour de la fonction principale.

## Les 'callback functions'

Une fonction passée en paramètre d'une autre fonction (ex: `addEventListener('click', ())`), et qui sera appellée lorsque la première aura fini d'être éxecutée.

## setTimeout/setInterval

Des fonctions natives JavaScript, `setTimeout()`permet d'éxécuter une fonction callback après un délai défini, et `setInterval()` permet d'éxécuter une fonction callback, à un intervalle régulier.

## Les Promises

La première réponse aux problèmes des callbacks. C'est une API qui permet de gérer l'asynchrone de manière plus lisible.

## Async / await

La seconde réponse aux problèmes des callbacks. L'API async await pousse les promesses un peu plus loin en permettant d'écrire et d'exécuter du code asynchrone comme s'il était synchrone.
