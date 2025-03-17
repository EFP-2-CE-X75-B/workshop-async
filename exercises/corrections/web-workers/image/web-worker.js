self.onmessage = function(e) {
  console.log('Worker started with params:', e.data);

  const startTime = performance.now();
  const { imageData, pixelSize, iterations, blurRadius } = e.data;
  
  let processed = imageData;
  
  for (let i = 0; i < iterations; i++) {
    console.log(`Iteration ${i + 1}/${iterations}`);
    processed = pixelateImage(processed, pixelSize);
    console.log('Pixelation done');
    processed = applyGaussianBlur(processed, blurRadius);
    console.log('Blur done');
    processed = applySharpen(processed);
    console.log('Sharpen done');
  }
  
  console.log('Processing complete');
  const processingDuration = performance.now() - startTime;
  
  self.postMessage({
    processedImageData: processed,
    processingDuration: processingDuration
  });
};

function pixelateImage(imageData, pixelSize) {
  const { width, height, data } = imageData;
  const output = new ImageData(new Uint8ClampedArray(data), width, height);
  
  // Process image in pixel-sized blocks
  for (let y = 0; y < height; y += pixelSize) {
    for (let x = 0; x < width; x += pixelSize) {
      let r = 0, g = 0, b = 0, a = 0;
      let count = 0;
      
      // Calculate average color for the current block
      for (let py = 0; py < pixelSize && y + py < height; py++) {
        for (let px = 0; px < pixelSize && x + px < width; px++) {
          const idx = ((y + py) * width + (x + px)) * 4;
          r += data[idx];
          g += data[idx + 1];
          b += data[idx + 2];
          a += data[idx + 3];
          count++;
        }
      }
        
      // Calculate average values
      r = Math.round(r / count);
      g = Math.round(g / count);
      b = Math.round(b / count);
      a = Math.round(a / count);
      
      // Apply average color to the entire block
      for (let py = 0; py < pixelSize && y + py < height; py++) {
        for (let px = 0; px < pixelSize && x + px < width; px++) {
          const idx = ((y + py) * width + (x + px)) * 4;
          output.data[idx] = r;
          output.data[idx + 1] = g;
          output.data[idx + 2] = b;
          output.data[idx + 3] = a;
        }
      }
    }
  }
  
  return output;
}

function applyGaussianBlur(imageData, radius) {
  const { width, height, data } = imageData;
  const output = new ImageData(new Uint8ClampedArray(data), width, height);
  
  // Create Gaussian kernel
  const kernel = createGaussianKernel(radius);
  const kernelSize = kernel.length;
  const kernelRadius = Math.floor(kernelSize / 2);
  
  // Apply blur effect
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      let r = 0, g = 0, b = 0, a = 0;
      let weightSum = 0;
      
      // Apply kernel to current pixel
      for (let ky = -kernelRadius; ky <= kernelRadius; ky++) {
        for (let kx = -kernelRadius; kx <= kernelRadius; kx++) {
          const px = Math.min(Math.max(x + kx, 0), width - 1);
          const py = Math.min(Math.max(y + ky, 0), height - 1);
          
          const weight = kernel[ky + kernelRadius][kx + kernelRadius];
          const idx = (py * width + px) * 4;
          
          r += data[idx] * weight;
          g += data[idx + 1] * weight;
          b += data[idx + 2] * weight;
          a += data[idx + 3] * weight;
          weightSum += weight;
        }
      }
      
      // Write blurred pixel
      const outIdx = (y * width + x) * 4;
      output.data[outIdx] = Math.round(r / weightSum);
      output.data[outIdx + 1] = Math.round(g / weightSum);
      output.data[outIdx + 2] = Math.round(b / weightSum);
      output.data[outIdx + 3] = Math.round(a / weightSum);
    }
  }
  
  return output;
}

function createGaussianKernel(radius) {
  const size = radius * 2 + 1;
  const kernel = Array(size).fill().map(() => Array(size).fill(0));
  const sigma = radius / 3;
  let sum = 0;
  
  // Calculate Gaussian values
  for (let y = -radius; y <= radius; y++) {
    for (let x = -radius; x <= radius; x++) {
      const exponent = -(x * x + y * y) / (2 * sigma * sigma);
      const value = Math.exp(exponent) / (2 * Math.PI * sigma * sigma);
      kernel[y + radius][x + radius] = value;
      sum += value;
    }
  }
    
  // Normalize kernel
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      kernel[y][x] /= sum;
    }
  }
  
  return kernel;
}

function applySharpen(imageData) {
  const { width, height, data } = imageData;
  const output = new ImageData(new Uint8ClampedArray(data), width, height);
  
  // Sharpening convolution matrix
  const kernel = [
      [0, -1, 0],
      [-1, 5, -1],
      [0, -1, 0]
  ];
  
  // Apply sharpening effect
  for (let y = 1; y < height - 1; y++) {
    for (let x = 1; x < width - 1; x++) {
      let r = 0, g = 0, b = 0;
      
      // Apply kernel to current pixel
      for (let ky = -1; ky <= 1; ky++) {
        for (let kx = -1; kx <= 1; kx++) {
          const idx = ((y + ky) * width + (x + kx)) * 4;
          const weight = kernel[ky + 1][kx + 1];
          
          r += data[idx] * weight;
          g += data[idx + 1] * weight;
          b += data[idx + 2] * weight;
        }
      }
      
      // Write sharpened pixel
      const outIdx = (y * width + x) * 4;
      output.data[outIdx] = Math.min(255, Math.max(0, r));
      output.data[outIdx + 1] = Math.min(255, Math.max(0, g));
      output.data[outIdx + 2] = Math.min(255, Math.max(0, b));
      output.data[outIdx + 3] = data[(y * width + x) * 4 + 3];
    }
  }
  
  return output;
};