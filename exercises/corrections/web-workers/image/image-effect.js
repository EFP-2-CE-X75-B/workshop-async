const worker = new Worker('web-worker.js');

const originalCanvas = document.getElementById('original-canvas');
const processedCanvas = document.getElementById('processed-canvas');
const originalCtx = originalCanvas.getContext('2d');
const processedCtx = processedCanvas.getContext('2d');
const imageInput = document.getElementById('image-input');
const pixelSizeInput = document.getElementById('pixel-size');
const iterationCountInput = document.getElementById('iteration-count');
const blurRadiusInput = document.getElementById('blur-radius');
const pixelSizeValue = document.getElementById('pixel-size-value');
const iterationCountValue = document.getElementById('iteration-count-value');
const blurRadiusValue = document.getElementById('blur-radius-value');
const processBtn = document.getElementById('process-btn');
const processingTime = document.getElementById('processing-time');

let currentImage = null;

// Update displayed values for all range inputs
[pixelSizeInput, iterationCountInput, blurRadiusInput].forEach(input => {
  input.addEventListener('input', (e) => {
    document.getElementById(e.target.id + '-value').textContent = e.target.value;
  });
});

imageInput.addEventListener('change', (e) => {
  const file = e.target.files[0];

  if (file) {
    const reader = new FileReader();

    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        currentImage = img;
        originalCanvas.width = processedCanvas.width = img.width;
        originalCanvas.height = processedCanvas.height = img.height;
        originalCtx.drawImage(img, 0, 0);
      };
      img.src = event.target.result;
    };
    
    reader.readAsDataURL(file);
  }
});

processBtn.addEventListener('click', () => {
  console.log('Processing image...');

  if (!currentImage) return;
  
  const imageData = originalCtx.getImageData(0, 0, originalCanvas.width, originalCanvas.height);
  
  processBtn.disabled = true;
  processedCanvas.classList.add('processing-overlay');
  
  console.log('Sending image data to worker...');

  worker.postMessage({
    imageData: imageData,
    pixelSize: parseInt(pixelSizeInput.value),
    iterations: parseInt(iterationCountInput.value),
    blurRadius: parseInt(blurRadiusInput.value)
  });
});

worker.onmessage = (e) => {
  const { processedImageData, processingDuration } = e.data;
  processedCtx.putImageData(processedImageData, 0, 0);
  processBtn.disabled = false;
  processedCanvas.classList.remove('processing-overlay');
  processingTime.textContent = `Processing time: ${processingDuration.toFixed(2)}ms`;
};