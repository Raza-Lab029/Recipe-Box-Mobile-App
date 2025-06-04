import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Dimensions,
  TouchableOpacity,
  Alert,
  TextInput,
} from 'react-native';
import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';
import Icon from 'react-native-vector-icons/FontAwesome';

WebBrowser.maybeCompleteAuthSession();

const backgroundImage = {
  uri: 'https://images.unsplash.com/photo-1551218808-94e220e084d2?auto=format&fit=crop&w=1050&q=80',
};

type SignInProps = {
  onLoginSuccess: () => void;
};

const SignIn: React.FC<SignInProps> = ({ onLoginSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [request, response, promptAsync] = Google.useAuthRequest({
    clientId: 'YOUR_WEB_CLIENT_ID.apps.googleusercontent.com', 
  });

  useEffect(() => {
    if (response?.type === 'success' && response.authentication) {
      const { accessToken } = response.authentication;
      getUserInfo(accessToken);
    }
  }, [response]);

  const getUserInfo = async (token: string) => {
    try {
      const res = await fetch('https://www.googleapis.com/userinfo/v2/me', {
        headers: { Authorization: `Bearer ${token}` },
      });

      const user = await res.json();
      Alert.alert('Welcome', `Hello, ${user.name}!`);
      onLoginSuccess();
    } catch (error) {
      console.error('Failed to fetch user info', error);
      Alert.alert('Error', 'Failed to fetch user information.');
    }
  };

  const handleEmailLogin = () => {
    if (email.trim() === '' || password.trim() === '') {
      Alert.alert('Missing Fields', 'Please enter email and password.');
      return;
    }

    
    if (email === 'test@example.com' && password === 'password123') {
      Alert.alert('Success', 'Logged in successfully!');
      onLoginSuccess();
    } else {
      Alert.alert('Invalid Credentials', 'Incorrect email or password.');
    }
  };

  return (
    <ImageBackground source={backgroundImage} style={styles.background}>
      <View style={styles.overlay}>
        <View style={styles.box}>
          <Text style={styles.title}>Hello Welcome</Text>
          <Text style={styles.title}>To</Text>
          <Text style={styles.title}>Simple Dine In</Text>
          <Text style={styles.moto}>Delicious meals, one tap away.</Text>

          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor="#555"
            onChangeText={setEmail}
            value={email}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            placeholderTextColor="#555"
            onChangeText={setPassword}
            value={password}
            secureTextEntry
          />

          <TouchableOpacity onPress={() => Alert.alert('Forgot Password?', 'You can add password reset logic here.')}>
            <Text style={styles.forgot}>Forgot Password?</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.loginButton} onPress={handleEmailLogin}>
            <Text style={styles.loginText}>Login</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={styles.googleButton}
          onPress={() => promptAsync()}
        >
          <View style={styles.googleLogoContainer}>
            <Icon name="google" size={24} color="#db4437" />
          </View>
          <Text style={styles.googleText}>Sign in with Google</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width,
    height,
    resizeMode: 'cover',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    paddingHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  box: {
    backgroundColor: 'rgba(116, 189, 231, 0.95)',
    padding: 30,
    borderRadius: 15,
    alignItems: 'center',
    marginBottom: 30,
    width: '100%',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#222',
    marginBottom: 5,
  },
  moto: {
    fontSize: 16,
    fontStyle: 'italic',
    color: '#333',
    textAlign: 'center',
    marginBottom: 15,
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 10,
    fontSize: 16,
    width: '100%',
    marginVertical: 8,
    color: '#000',
  },
  forgot: {
    alignSelf: 'flex-end',
    marginTop: 5,
    color: '#003366',
    fontSize: 14,
    marginBottom: 15,
  },
  loginButton: {
    backgroundColor: '#005b96',
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 30,
    marginTop: 5,
  },
  loginText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  googleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5,
  },
  googleLogoContainer: {
    backgroundColor: '#fff',
    borderRadius: 50,
    padding: 5,
    marginRight: 10,
  },
  googleText: {
    color: '#000',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default SignIn;



