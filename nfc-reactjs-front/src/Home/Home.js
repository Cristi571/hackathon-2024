import { Text, View, Image, Pressable } from "react-native"
import { styles } from "../Home/HomeStylesSheet"
import { Link } from '@react-navigation/native'

export const Home = () => {
    return (
        <View style={styles.homeContainer}>
            <Text style={styles.titre1}>Bienvenue</Text>
            <Text style={styles.titre2}>Sur</Text>
            <Image style={styles.logo} source={require("../../assets/octicode-logo.png")} />
            <Text style={styles.slogan}>Votre allié de confiance pour une sécurité numérique sur mesure et une ingénierie logicielle d'excellence.</Text>

            <Pressable style={styles.button}>
            <Link style={styles.buttonText} to={{ screen: 'Discover' }}>Découvrir</Link> 
          </Pressable>
        </View>
    )
}