// --- Callback example

const writeFile = (path, email, string, callback) => {
  setTimeout(() => {
    console.log('Write file');
    callback(email, string, notify)
  }, 1000);
};

const sendMail = (email, string, callback) => {
  setTimeout(() => {
    console.log('Sendmail');
    callback('true')
  }, 500)
};

const notify = (status) => {
  console.log(status);
};

// Exécution synchrone problématique: le code n'est pas exécuté dans l'ordre attendu à cause des délais d'attente

// writeFile('/', 'File content lorem ipsum...');
// sendMail('adrienalvarez15@gmail.com', 'File content lorem ipsum...');
// notify('True or false ?');

// Exécution asynchrone: le code est exécuté dans l'ordre attendu grâce aux callbacks
writeFile('/', 'email', 'test', sendMail)