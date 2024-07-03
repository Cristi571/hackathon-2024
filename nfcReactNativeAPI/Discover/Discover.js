import { Text, View, Image, Pressable } from "react-native"
import { styles } from "./DiscoverStyleSheet"

export const Discover = () => {
    return (
        <View style={styles.discoverContainer}>
            <Text style={styles.titre}>Découvrir plus sur</Text>
            <Image style={styles.image} source={require("../assets/octicode-logo.png")} />

            <Pressable style={styles.button}>
            <Text style={styles.buttonText}>En savoir +</Text> 
          </Pressable>
        </View>
    )
}