import React, { useState, useEffect } from 'react'; // Add state and useEffect
import { Text, View, Image, Pressable } from "react-native";
import { Link } from '@react-navigation/native';
import { styles } from "./LoginStyleSheet";
import NfcManager, { Ndef, NfcTech } from 'react-native-nfc-manager'; // Import NFC Manager
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
                const payload = tag.ndefMessage[0].payload;
                const uint8Payload = Uint8Array.from(payload);
                const parsed = Ndef.text.decodePayload(uint8Payload);
                setTagData(Ndef.text.decodePayload(uint8Payload));

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
          <Text style={styles.titre}>Connexion</Text>

            <Pressable style={styles.loginBtn} onPress={startReading} disabled={isReading}>
                <Text style={styles.loginText}>{isReading ? 'Scanning...' : 'Scan NFC Card'}</Text>
            </Pressable>

            {/* Conditionally render tag data */}
            {tagData ? (
                <Text style={styles.tagDataText}>Tag Data: {tagData}</Text>
            ) : null}
    
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
    

