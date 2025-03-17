// Fonction de calcul de Fibonacci
function fibonacci(n) {
	if (n <= 1) return n;
	return fibonacci(n - 1) + fibonacci(n - 2);
}

// Écoute des messages
self.onmessage = function(e) {
  console.log('Message received from main script', e.data);
	
	const { operation, number } = e.data;
	
	if (operation === 'fibonacci') {
		const result = fibonacci(number);
		self.postMessage(result);
	}
};