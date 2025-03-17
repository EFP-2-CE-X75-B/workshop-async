// async / await example in node.js, with Promise.all

import { writeFile } from 'fs/promises'; 

const email = 'adrienalvarez15@gmail.com';

const notify = (status) => {
  console.log(status);
};

const writeFileFn = async (path, content) => {
  try {
    await writeFile(path, content, { encoding: 'utf-8' });
    console.log('Write in file', path, content);
  } catch(e) {
    console.log(e);
    return e;
  }
};

const sendMail = async (email, content) => {
  try {
    console.log('Send mail', email, content);
    return true;
  } catch(e) {
    console.log(e);
    return false;
  }
}

console.time('without-promise-all');
await writeFileFn('./test.txt', 'Lorem ipsum dolor');
const status = await sendMail(email, 'Envoyé le boss');
notify(status)
console.timeEnd('without-promise-all');

console.time('with-promise-all');
const [promise1, promise2, promise3] = await Promise.all([
  writeFileFn('./test.txt', 'Lorem ipsum dolor'),
  sendMail(email, 'Envoyé le boss'),
  Promise.resolve('Done')
]);
console.log(promise1, promise2, promise3);
console.timeEnd('with-promise-all');