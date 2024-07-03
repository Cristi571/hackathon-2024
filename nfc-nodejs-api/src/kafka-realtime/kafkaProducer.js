const kafka = require('kafka-node');
const { MongoClient } = require('mongodb');

// Kafka configuration
const Producer = kafka.Producer;
const client = new kafka.KafkaClient({ kafkaHost: 'localhost:9092' });
const producer = new Producer(client);

producer.on('ready', () => {
    console.log('Kafka Producer is connected and ready.');
});

producer.on('error', (err) => {
    console.error('Error in Kafka Producer', err);
});

// MongoDB configuration
const mongoUri = 'mongodb+srv://jauresfassinou:9Ndg7ZvI1UaIPAsR@cluster-octicode.v0pbdsb.mongodb.net/test?retryWrites=true&w=majority';
const dbName = 'test'; // Replace with your actual database name
const collectionName = 'userconnections';

MongoClient.connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(client => {
        console.log('Connected to MongoDB');
        const db = client.db(dbName);
        const collection = db.collection(collectionName);

        // Watch for changes in the collection
        const changeStream = collection.watch();

        changeStream.on('change', (change) => {
            if (change.operationType === 'insert') {
                const userEvent = change.fullDocument;
                handleNFCConnection(userEvent.nfc_id);
            }
        });
    })
    .catch(error => {
        console.error('Error connecting to MongoDB', error);
    });

// Function to handle NFC connection
const handleNFCConnection = (nfc_id) => {
    const message = JSON.stringify({
        nfc_id: nfc_id,
        event: 'login',
        timestamp: new Date().toISOString(),
    });

    const payloads = [
        {
            topic: 'user-events',
            messages: message,
            partition: 0,
        },
    ];

    producer.send(payloads, (err, data) => {
        if (err) {
            console.error('Error sending message to Kafka', err);
        } else {
            console.log('Message sent to Kafka', data);
        }
    });
};
