import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert,TouchableOpacity } from 'react-native';
import  { loginUser } from '../apis/apiService';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('admin@gmail.com');
  const [password, setPassword] = useState('123');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);
    try {
      const data = await loginUser(email, password);
      Alert.alert('Login Successful', `Welcome`);
      navigation.navigate('Home');
    } catch (error) {
      Alert.alert('Login Failed', error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={{ padding: 16 }}>
      <Text>Email:</Text>
      <TextInput
        value={email}
        onChangeText={setEmail}
        placeholder="Enter your email"
        style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 12 }}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <Text>Password:</Text>
      <TextInput
        value={password}
        onChangeText={setPassword}
        placeholder="Enter your password"
        style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 12 }}
        secureTextEntry
      />
      <Button title={loading ? "Logging in..." : "Login"} onPress={handleLogin} disabled={loading} />
      <TouchableOpacity onPress={() => navigation.navigate('Register')}>
        <Text>Don't have any account? sing up</Text>
      </TouchableOpacity>
    </View>
  );
};

export default LoginScreen;




