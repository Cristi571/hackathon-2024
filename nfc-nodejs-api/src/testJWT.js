const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });


console.log('Environment Variables:', process.env);

const jwt = require('jsonwebtoken');


const generateTimestamps = () => {
  const iat = Math.floor(Date.now() / 1000);
  const exp = iat + (60 * 60 * 24); // 24 heures
  return { iat, exp };
};

// Générer les timestamps
const { iat, exp } = generateTimestamps();

const payload = {
  sub: '1122334450', // Nouveau NFC ID
  name: 'Jaurès Fassinou',
  email: 'jaures.fass@estiam.com',
  iat, 
  exp, 
  role: 'employee'

};

const secret = process.env.JWT_SECRET;

if (!secret) {
  console.error('JWT_SECRET is not defined');

  process.exit(1); // Quitter le script si JWT_SECRET n'est pas défini

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


// Enregistrer les informations utilisateur pour l'ajouter à la base de données
const userPayload = {
  nfc_id: payload.sub,
  payload: JSON.stringify(payload) // Convertir le payload en chaîne JSON pour une visu
};

console.log('User Payload:', userPayload);

