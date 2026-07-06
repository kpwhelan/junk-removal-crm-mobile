import { Redirect, Stack } from 'expo-router';
import { ActivityIndicator, View } from 'react-native';
import { baseStyles } from '@/src/styles/styles';
import AppHeader from '../components/AppHeader';
import { useAuth } from '@/src/hooks/useAuth';

export default function AppLayout() {
    const { isAuthenticated, isLoading } = useAuth();

    if (isLoading) {
        return (
        <View>
            <ActivityIndicator />
        </View>
        );
    }

    if (!isAuthenticated) {
        return <Redirect href="/(auth)/login" />;
    }
    
    return (
        <View style={baseStyles.container}>
            <AppHeader />

            <View style={{ flex: 1}}>
              <Stack screenOptions={{ headerShown: false}} />
            </View>
        </View>
    )
}
