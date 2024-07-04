import React, { useState, useEffect } from 'react';
import { Text, View, Image, Pressable } from "react-native";
import { Link } from '@react-navigation/native';
import { styles } from "./LoginStyleSheet";
import NfcManager, { Ndef, NfcTech } from 'react-native-nfc-manager';
import PropTypes from 'prop-types';

export const Login = ({ navigation }) => {
    const [tagData, setTagData] = useState(null);
    const [isReading, setIsReading] = useState(false);

    useEffect(() => {
        return () => {
            NfcManager.cancelTechnologyRequest().catch(() => {});
        };
    }, []);

    const startReading = async () => {
        try {
            await NfcManager.start();
            await NfcManager.requestTechnology(NfcTech.Ndef);
            setIsReading(true);

            const tag = await NfcManager.getTag();
            if (tag) {
                const ndefMessage = tag.ndefMessage[0];
                if (Ndef.isType(ndefMessage, Ndef.TNF_WELL_KNOWN, Ndef.RTD_TEXT)) {
                    const payload = ndefMessage.payload;
                    const text = Ndef.text.decodePayload(payload);
                    setTagData(text);
                } else {
                    // Handle other types of records (e.g., URI) here
                }
            }
        } catch (ex) {
            console.warn('NFC read error:', ex);
        } finally {
            NfcManager.cancelTechnologyRequest().catch(() => {});
            setIsReading(false);
        }
    };

    return (
        <View style={styles.container}>
            <Image style={styles.logo} source={require("../assets/octicode-logo.png")} />
            {/* Display tag data below the image */}
            {tagData && (
                <View style={styles.tagDataContainer}>
                    <Text style={styles.tagDataLabel}>Tag Data:</Text>
                    <Text style={styles.tagDataText}>{tagData}</Text>
                </View>
            )}
            <Text style={styles.titre}>Connexion</Text>
            <Pressable style={styles.loginBtn} onPress={startReading} disabled={isReading}>
                <Text style={styles.loginText}>{isReading ? 'Scanning...' : 'Scan NFC Card'}</Text>
            </Pressable>
            <View style={styles.linkZone}>
                <Text>Un incident ?</Text>
                <Text style={styles.link}>Récupérer votre compte</Text>
            </View>
        </View>
    );
};

Login.propTypes = {
    navigation: PropTypes.object,
};