import { StyleSheet } from "react-native"

export const styles = StyleSheet.create({
    linkZone: {
        marginTop: 20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },

    link: {
        marginStart: 5,
        color: "#0D47A1",
    },
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },
    logo: {
        width: 290,
        height: 90,
        marginTop: -60,
    },
    titre: {
        flex: 0.2,
        fontSize: 20
    },
   
    loginBtn: {
        width: "50%",
        borderRadius: 90,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        marginTop: -20,
        marginBottom: 10,
        backgroundColor: "#0D47A1",
    },
    loginText: {
        color: "white",
        fontSize: 18
    },
    label: {
        textAlign: "left",
    },
    tagDataContainer: {
        marginTop: 10, // Add some margin to separate it from the image
        padding: 10,
        backgroundColor: 'lightgray', // Optional background color for visibility
        borderRadius: 5,
    },
    tagDataLabel: {
        fontWeight: 'bold',
        marginBottom: 5,
    },
    tagDataText: {
        fontSize: 16,
    },
})