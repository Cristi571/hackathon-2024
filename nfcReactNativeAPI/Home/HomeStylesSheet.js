import { StyleSheet } from "react-native"

export const styles = StyleSheet.create({
    homeContainer: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginTop: 90,
    },

    titre1: {
        fontSize: 36,
        color: "#0D47A1",
        fontWeight: "semibold",
    },

    titre2: {
        fontSize: 36,
        color: "#0D47A1",
        fontFamily: "Playwrite NL",
    },

    logo: {
        width: 290,
        height: 90,
        position: "top",
    },

    slogan: {
        justifyContent: "center",
        marginRight: 40,
        marginLeft: 40,
        textAlign: "center",
        marginTop: 100,
        fontSize: 16
    },

    button: {
        width: "30%",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#0D47A1",
        padding: 10,
        borderRadius: 10,
        marginTop: 50
    },

    buttonText: {
        color: "white",
        fontSize: 16,
    },
    
})