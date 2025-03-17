const worker = new Worker('calculator.js');

worker.postMessage({
  operation: 'fibonacci',
  number: 42
});

const operation = document.getElementById('operation');

if (!operation) {
  throw new Error('Element not found');
}

worker.onmessage = function (e) {
  console.log('Message received from worker', e);

  operation.innerHTML = e.data;
};