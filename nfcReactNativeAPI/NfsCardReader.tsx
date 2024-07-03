// NfcCardReader.tsx

import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import NfcManager, { Ndef, NfcTech } from 'react-native-nfc-manager';

const NfcCardReader: React.FC = () => {
    const [tagData, setTagData] = useState<string | null>(null);
    const [isReading, setIsReading] = useState(false);

    useEffect(() => {
        return () => {
            NfcManager.cancelTechnologyRequest().catch(() => {});
        };
    }, []);

    const startReading = async () => {
        try {
            await NfcManager.start(); // Start the NFC manager
            await NfcManager.requestTechnology(NfcTech.Ndef); // Request NDEF tech
            setIsReading(true);

            const tag = await NfcManager.getTag(); // Get tag info
            if (tag) {
                const payload = tag.ndefMessage[0].payload;
                const uint8Payload = Uint8Array.from(payload); // Convert to Uint8Array
                const parsed = Ndef.text.decodePayload(uint8Payload); // Pass the Uint8Array
                setTagData(parsed);
            }
        } catch (ex) {
            console.warn('NFC read error:', ex);
            // Handle errors (e.g., display an error message to the user)
        } finally {
            NfcManager.cancelTechnologyRequest().catch(() => {}); // Cleanup
            setIsReading(false);
        }
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.button} onPress={startReading} disabled={isReading}>
                <Text style={styles.buttonText}>{isReading ? 'Reading...' : 'Scan NFC Card'}</Text>
            </TouchableOpacity>
            {tagData && (
                <View style={styles.tagDataContainer}>
                    <Text style={styles.tagDataLabel}>Tag Data:</Text>
                    <Text style={styles.tagDataText}>{tagData}</Text>
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },
    button: {
        backgroundColor: 'blue',
        padding: 15,
        borderRadius: 5,
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
    },
    tagDataContainer: {
        marginTop: 20,
        alignItems: 'center',
    },
    tagDataLabel: {
        fontSize: 16,
        marginBottom: 5,
    },
    tagDataText: {
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default NfcCardReader;
