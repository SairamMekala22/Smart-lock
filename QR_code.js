const QRCode = require('qrcode');

// Get current timestamp
const timestamp = new Date().toISOString();

// Generate unique data using the current timestamp
const uniqueData = `UniqueData-${timestamp}`;

// Generate QR code and save to file
const fileName = `unique_qr_${new Date().toISOString().replace(/[-:\.]/g, '')}.png`;

// QR Code options
const opts = {
  errorCorrectionLevel: 'H',
  type: 'image/png',
  quality: 0.92,
  margin: 4,
  color: {
    dark: '#000000',
    light: '#ffffff'
  }
};

// Generate and save QR code
QRCode.toFile(fileName, uniqueData, opts, function (err) {
  if (err) throw err;
  console.log(`QR Code generated and saved as ${fileName}.`);
});
