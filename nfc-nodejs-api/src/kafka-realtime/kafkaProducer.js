const kafka = require('kafka-node');
const Producer = kafka.Producer;
const client = new kafka.KafkaClient({ kafkaHost: 'localhost:9092' });
const producer = new Producer(client);

producer.on('ready', () => {
    console.log('Kafka Producer is connected and ready.');

    // Exemple de simulation de connexions NFC
    const simulateNFCConnections = () => {
        const nfc_ids = ['1234567890', '0987654321', '1122334455'];
        nfc_ids.forEach(id => handleNFCConnection(id));
    };

    // Appeler la simulation (dans un vrai scénario, cette fonction serait appelée à chaque connexion NFC)
    simulateNFCConnections();
});

producer.on('error', (err) => {
    console.error('Error in Kafka Producer', err);
});

// Fonction pour gérer les connexions NFC
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
