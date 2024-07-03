const kafka = require('kafka-node');
const mongoose = require('mongoose');
const { Client } = require('@elastic/elasticsearch');

// Connexion à MongoDB
mongoose.connect('mongodb+srv://jauresfassinou:9Ndg7ZvI1UaIPAsR@cluster-octicode.v0pbdsb.mongodb.net/test?retryWrites=true&w=majority').then(() => {
    console.log('Connected to MongoDB');
}).catch((error) => {
    console.error('Error connecting to MongoDB:', error);
});

// Connexion à Elasticsearch
const esClient = new Client({
    node: 'http://localhost:9200'
});

// Définir le schéma pour les événements utilisateur
const userEventSchema = new mongoose.Schema({
    nfc_id: String,
    event: String,
    timestamp: Date,
});

// Créer le modèle Mongoose pour les événements utilisateur
const UserEvent = mongoose.model('UserEvent', userEventSchema);

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

        // Indexer l'événement utilisateur dans Elasticsearch
        await esClient.index({
            index: 'user-connections',
            body: {
                nfc_id: userEvent.nfc_id,
                event: userEvent.event,
                timestamp: new Date(userEvent.timestamp),
            }
        });
        console.log('User event indexed in Elasticsearch');
    } catch (error) {
        console.error('Error saving user event to MongoDB or Elasticsearch:', error);
    }
});

consumer.on('error', (error) => {
    console.error('Error in Kafka Consumer', error);
});
