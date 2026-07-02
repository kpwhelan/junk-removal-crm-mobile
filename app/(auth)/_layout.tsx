import { ActivityIndicator, Image, Text, View } from "react-native";
import { baseStyles } from "../../src/styles/styles";
import { authStyles } from "@/src/styles/authStyles";
import { SafeAreaView } from "react-native-safe-area-context";
import { Redirect, Stack } from "expo-router";
import { useAuth } from "@/src/hooks/useAuth";

export default function AuthLayout() {
    const { isAuthenticated, isLoading } = useAuth();
    if (isLoading) {
        return (
        <View>
            <ActivityIndicator />
        </View>
        );
    }

    if (isAuthenticated) {
        return <Redirect href="/(app)" />;
    }
    
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