import { Image, Text, View } from "react-native";
import { baseStyles } from "../../src/styles/styles";
import { authStyles } from "@/src/styles/authStyles";
import { SafeAreaView } from "react-native-safe-area-context";
import { Stack } from "expo-router";

export default function AuthLayout() {
    return (
        <SafeAreaView style={baseStyles.container}>
            <Image 
            source={require('@/assets/images/auth/auth-illustration.png')}
            style={authStyles.authHeroImage}
             />

            <Stack screenOptions={{ headerShown: false }} />
        </SafeAreaView>
    )
}