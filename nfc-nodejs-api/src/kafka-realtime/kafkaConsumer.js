const kafka = require('kafka-node');
const mongoose = require('mongoose');

// Définir le schéma pour les événements utilisateur
const userEventSchema = new mongoose.Schema({
    nfc_id: String,
    event: String,
    timestamp: Date,
});

// Créer le modèle Mongoose pour les événements utilisateur
const UserEvent = mongoose.model('UserEvent', userEventSchema);

// Fonction pour se connecter à MongoDB
const connectToMongoDB = async () => {
    try {
        await mongoose.connect('mongodb+srv://jauresfassinou:9Ndg7ZvI1UaIPAsR@cluster-octicode.v0pbdsb.mongodb.net/test?retryWrites=true&w=majority');
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        setTimeout(connectToMongoDB, 5000); // Essayer de se reconnecter après 5 secondes
    }
};

// Initialiser la connexion à MongoDB
connectToMongoDB();

const Consumer = kafka.Consumer;
const client = new kafka.KafkaClient({ kafkaHost: 'localhost:9092' });
const consumer = new Consumer(
    client,
    [{ topic: 'user-events', partition: 0 }],
    { autoCommit: true }
);

consumer.on('message', async (message) => {
    console.log('Received message:', message);

    // Parse the message value to JSON
    const userEvent = JSON.parse(message.value);

    // Afficher plus de détails sur l'événement utilisateur
    console.log(`User ${userEvent.nfc_id} performed event: ${userEvent.event} at ${userEvent.timestamp}`);

    // Enregistrer l'événement utilisateur dans MongoDB
    try {
        const newUserEvent = new UserEvent({
            nfc_id: userEvent.nfc_id,
            event: userEvent.event,
            timestamp: new Date(userEvent.timestamp),
        });
        await newUserEvent.save();
        console.log('User event saved to MongoDB');
    } catch (error) {
        console.error('Error saving user event to MongoDB:', error);

        // Reconnect to MongoDB if the connection was lost
        if (error.message.includes('EPIPE')) {
            console.error('Lost connection to MongoDB, reconnecting...');
            connectToMongoDB();
        }
    }
});

consumer.on('error', (error) => {
    console.error('Error in Kafka Consumer', error);
});
