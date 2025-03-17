// Promises example
const email = 'adrienalvarez15@gmail.com';

const writeFile = (path,content ) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      try {
        console.log('Write in file', path, content);
        resolve(content);
      } catch(e) {
        reject(e)
      }
    }, 1000);
  })
};
    
const sendMail = (email, content) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      try {
        console.log('Send mail', email, content);
        resolve(true);
      } catch(e) {
        reject(e)
      }
    }, 500);
  })
};

const notify = (status) => {
  alert("Envoyé " + status)
};

// Exécution asynchrone de façon synchrone: le code est exécuté dans l'ordre attendu grâce aux promises et au chainage
writeFile('/', 'Lorem ipsum dolor')
  .then((content) => sendMail(email, content))
  .then((isSuccess) => {
    notify(isSuccess)
  })
  .catch((e) => console.log(e))
  .finally(() => {
    console.log('Done');
  });