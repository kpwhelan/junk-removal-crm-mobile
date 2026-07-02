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

export default function RegisterScreen() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { login } = useAuth();

  async function handleRegister() {
    if (!firstName || !email || !password) {
      Alert.alert('Missing info', 'Please fill out all fields.');
      return;
    }

    try {
      const { data } = await api.post('/auth/register', {
        firstName,
        lastName,
        email,
        password,
      })

      await login(
        data.accessToken,
        data.refreshToken,
        data.user
      )

      router.replace('/(app)')
    } catch (error) {
      console.log('Registration failed', error)

      Alert.alert(
        'Registration failed',
        'Please try again'
      )
    }
    
  }

  return (
    <View style={authStyles.formContainer}>
      <Text style={styles.title}>Create Your Account</Text>

      <TextInput
        style={styles.input}
        placeholder="First Name"
        autoCapitalize="words"
        value={firstName}
        onChangeText={setFirstName}
      />

      <TextInput
        style={styles.input}
        placeholder="Last Name"
        autoCapitalize="words"
        value={lastName}
        onChangeText={setLastName}
      />

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

      <Pressable style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>Register</Text>
      </Pressable>

      <View style={authStyles.footer}>
        <Text>Already have an account? </Text>

        <Pressable onPress={() => router.push('/login')}>
          <Text style={authStyles.loginLink}> Login</Text>
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
