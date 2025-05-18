// This is a Node.js script to generate OG images using HTML Canvas
// To run this script, you would need to install:
// npm install canvas fs path mkdirp

const fs = require('fs');
const path = require('path');
const { createCanvas, loadImage, registerFont } = require('canvas');
const mkdirp = require('mkdirp');

// Create directory if it doesn't exist
const imagesDir = path.join(__dirname, '../public/images');
if (!fs.existsSync(imagesDir)) {
  mkdirp.sync(imagesDir);
}

// Configure the canvas for OG image (1200x630)
async function generateOGImage() {
  const width = 1200;
  const height = 630;
  const canvas = createCanvas(width, height);
  const ctx = canvas.getContext('2d');

  // Background gradient
  const gradient = ctx.createLinearGradient(0, 0, width, height);
  gradient.addColorStop(0, '#1a1a2e');
  gradient.addColorStop(1, '#0f3460');
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, width, height);

  // Draw pattern
  ctx.fillStyle = 'rgba(255, 255, 255, 0.03)';
  for (let i = 0; i < width; i += 40) {
    for (let j = 0; j < height; j += 40) {
      ctx.fillRect(i, j, 20, 20);
    }
  }

  // Draw border
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
  ctx.lineWidth = 20;
  ctx.strokeRect(10, 10, width - 20, height - 20);

  // Load and draw profile image
  try {
    const profileImage = await loadImage(path.join(imagesDir, 'profile.jpg'));
    // Draw circular profile image
    ctx.save();
    ctx.beginPath();
    ctx.arc(150, 315, 100, 0, Math.PI * 2, true);
    ctx.closePath();
    ctx.clip();
    ctx.drawImage(profileImage, 50, 215, 200, 200);
    ctx.restore();
  } catch (err) {
    console.error('Error loading profile image:', err);
  }

  // Text styling
  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 64px Arial';
  ctx.fillText('Johan Beker', 300, 330);
  
  ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
  ctx.font = '32px Arial';
  ctx.fillText('Full-Stack Developer & Designer', 300, 380);

  // Logo/Watermark
  ctx.font = 'bold 24px Arial';
  ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
  ctx.fillText('johanbeker.dev', width - 180, height - 30);

  // Save the image
  const buffer = canvas.toBuffer('image/jpeg');
  fs.writeFileSync(path.join(imagesDir, 'og-image.jpg'), buffer);
  console.log('OG image generated successfully!');
}

// Configure the canvas for Twitter image (a square version for better display)
async function generateTwitterImage() {
  const size = 800;
  const canvas = createCanvas(size, size);
  const ctx = canvas.getContext('2d');

  // Background gradient
  const gradient = ctx.createRadialGradient(size/2, size/2, 10, size/2, size/2, size);
  gradient.addColorStop(0, '#0f3460');
  gradient.addColorStop(1, '#1a1a2e');
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, size, size);

  // Draw pattern
  ctx.fillStyle = 'rgba(255, 255, 255, 0.03)';
  for (let i = 0; i < size; i += 30) {
    for (let j = 0; j < size; j += 30) {
      ctx.fillRect(i, j, 15, 15);
    }
  }

  // Border
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
  ctx.lineWidth = 16;
  ctx.strokeRect(10, 10, size - 20, size - 20);

  // Load and draw profile image
  try {
    const profileImage = await loadImage(path.join(imagesDir, 'profile.jpg'));
    // Draw circular profile image
    ctx.save();
    ctx.beginPath();
    ctx.arc(size/2, size/2 - 80, 120, 0, Math.PI * 2, true);
    ctx.closePath();
    ctx.clip();
    ctx.drawImage(profileImage, size/2 - 120, size/2 - 200, 240, 240);
    ctx.restore();
  } catch (err) {
    console.error('Error loading profile image:', err);
  }

  // Text styling
  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 64px Arial';
  ctx.textAlign = 'center';
  ctx.fillText('Johan Beker', size/2, size/2 + 100);
  
  ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
  ctx.font = '32px Arial';
  ctx.fillText('Full-Stack Developer & Designer', size/2, size/2 + 150);

  // Save the image
  const buffer = canvas.toBuffer('image/jpeg');
  fs.writeFileSync(path.join(imagesDir, 'twitter-image.jpg'), buffer);
  console.log('Twitter image generated successfully!');
}

// Generate both images
async function generateImages() {
  try {
    await generateOGImage();
    await generateTwitterImage();
  } catch (err) {
    console.error('Error generating images:', err);
  }
}

generateImages();

// Usage instructions:
// 1. Make sure Node.js is installed
// 2. Install dependencies: npm install canvas fs path mkdirp
// 3. Run: node scripts/generate-og-images.js
// This will create og-image.jpg and twitter-image.jpg in the public/images folder 