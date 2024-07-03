import { Text, View, Image, TextInput, Pressable,} from "react-native"
import { Link } from '@react-navigation/native'
import { styles } from "./LoginStyleSheet"


export const Login = ({ navigation }) => {

    return (
        <View style={styles.container}>
          <Image style={styles.logo} source={require("../../assets/octicode-logo.png")} />
          <Text style={styles.titre}>Connexion</Text>
    
          <Pressable style={styles.loginBtn}>
            <Text style={styles.loginText}>Scanner votre badge</Text> 
          </Pressable>
    
          <View style={styles.linkZone}>
              <Text>Un incident ?</Text>
              <Text style={styles.link}>Récupérer votre compte</Text>
          </View>
        </View> 
    );
}
    

