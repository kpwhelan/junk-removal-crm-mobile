import { StyleSheet } from "react-native";

export const authStyles = StyleSheet.create({
    authHeroImage: {
        width: '100%',
        height: 140,
        marginTop: 24,
        marginBottom: 24,
    },
    formContainer: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        borderTopLeftRadius: 32,
        borderTopRightRadius: 32,
        padding: 24,
    },
    loginLink: {
        color: '#071B33',
        fontWeight: '600',
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 24,
    },
})