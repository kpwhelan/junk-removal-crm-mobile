import { Stack } from 'expo-router';
import { View } from 'react-native';
import { baseStyles } from '@/src/styles/styles';
import AppHeader from '../components/AppHeader';

export default function AppLayout() {
    return (
        <View style={baseStyles.container}>
            <AppHeader />

            <Stack screenOptions={{ headerShown: false }} />
        </View>
    )
}