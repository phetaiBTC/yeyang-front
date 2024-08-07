import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import { Register } from '../apis/apiService';



const RegisterScreen = ({ navigation }) => {
    const [firstName, setFirstName] = useState('a');
    const [lastName, setLastName] = useState('a');
    const [email, setEmail] = useState('admin@gmail.com');
    const [password, setPassword] = useState('123');
    const [role, setRole] = useState('Admin');
    const [mobile, setMobile] = useState('1');
    const [loading, setLoading] = useState(false);

    const handleRegister = async () => {
        setLoading(true);
        try {
            const data = await Register(firstName,lastName,email,password,role,mobile)
            Alert.alert('Registration Successful', `${data.email}`);
            navigation.navigate('Login');
        } catch (error) {
            Alert.alert('Login Failed', error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            <Text>First Name:</Text>
            <TextInput
                style={styles.input}
                value={firstName}
                onChangeText={setFirstName}
            />
            <Text>Last Name:</Text>
            <TextInput
                style={styles.input}
                value={lastName}
                onChangeText={setLastName}
            />
            <Text>Email:</Text>
            <TextInput
                style={styles.input}
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
            />
            <Text>Password:</Text>
            <TextInput
                style={styles.input}
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />
            <TextInput
                style={{display:"none"}}
                value={role}
                onChangeText={setRole}
            />
            <Text>Mobile:</Text>
            <TextInput
                style={styles.input}
                value={mobile}
                onChangeText={setMobile}
                keyboardType="phone-pad"
            />
            <Button
                title={loading ? 'Registering...' : 'Register'}
                onPress={handleRegister}
                disabled={loading}
            />
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                <Text>I have already account</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 8,
        marginBottom: 16,
    },
});

export default RegisterScreen;
