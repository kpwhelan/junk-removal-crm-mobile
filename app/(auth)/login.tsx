import { api } from '@/src/api/client';
import { useAuth } from '@/src/hooks/useAuth';
import { authStyles } from '@/src/styles/authStyles';
import { router } from 'expo-router';
import { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  Alert,
} from 'react-native';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { login } = useAuth();

  async function handleLogin() {
    if (!email || !password) {
      Alert.alert('Missing info', 'Please fill out all fields.')
    }
    
    try {
      const { data } = await api.post('/auth/login', {
        email,
        password,
      })

      await login(
        data.accessToken,
        data.refreshToken,
        data.user
      )

      router.replace('/(app)')
    } catch(error) {
      console.log('Login failed', error);
      
      Alert.alert(
        'Login failed',
        'Please try again.'
      )
    }

    
  }

  return (
    <View style={authStyles.formContainer}>
      <Text style={styles.title}>Login</Text>

      <TextInput
        style={styles.input}
        placeholder="Email"
        autoCapitalize="none"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <Pressable style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </Pressable>

      <View style={authStyles.footer}>
        <Text>Don't have an account?</Text>

        <Pressable onPress={() => router.push('/register')}>
          <Text style={authStyles.loginLink}> Sign Up</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 24,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 14,
    fontSize: 16,
    marginBottom: 14,
  },
  button: {
    backgroundColor: '#111',
    padding: 16,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 8,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
});
