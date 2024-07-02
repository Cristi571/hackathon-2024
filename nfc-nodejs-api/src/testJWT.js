const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

console.log('Environment Variables:', process.env);  // Ajoutez ceci pour vérifier toutes les variables d'environnement

const jwt = require('jsonwebtoken');

const payload = {
  sub: '1234567890',
  name: 'John Doe',
  email: 'john.doe@estiam.com',
  iat: Math.floor(Date.now() / 1000),
  exp: Math.floor(Date.now() / 1000) + (60 * 60 * 24), // 24 hours from now
  role: 'employee'
};

const secret = process.env.JWT_SECRET;

if (!secret) {
  console.error('JWT_SECRET is not defined');
  process.exit(1); // Exit the script if JWT_SECRET is not defined
}

console.log('JWT_SECRET:', secret);

const token = jwt.sign(payload, secret);
console.log('Generated Token:', token);

try {
  const decoded = jwt.verify(token, secret);
  console.log('Decoded JWT:', decoded);
} catch (error) {
  console.error('Error verifying JWT:', error);
}
