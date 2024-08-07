import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import axios from 'axios';
import { useRoute } from '@react-navigation/native';

const EditScreen = ({ navigation }) => {
    const [user, setUser] = useState(null);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [id, setID] = useState('');
    const [mobile, setMobile] = useState('');
    const [password, setPassword] = useState('');
    const route = useRoute();
    const { userId } = route.params;

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await axios.get(`http://192.168.43.8:3000/client-api/edit-users/${userId}`);
                const userData = response.data.info;
                setUser(userData);
                setFirstName(userData.firstName);
                setID(userData._id);
                setLastName(userData.lastName);
                setEmail(userData.email);
                setMobile(userData.mobile);
            } catch (err) {
                Alert.alert('Error', err.message);
            }
        };

        fetchUser();
    }, [userId]);

    const handleSave = async () => {
        try {
            await axios.put('http://192.168.43.8:3000/client-api/update-users', {
                _id:id,
                firstName,
                lastName,
                email,
                mobile,
                password,
            });
            navigation.goBack();
        } catch (err) {
            Alert.alert('Error', err.message);
        }
    };

    if (!user) {
        return <Text>Loading...</Text>;
    }

    return (
        <View style={styles.container}>
            <TextInput style={{display:"none"}}
                value={id}
                onChangeText={setID}
            />
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
            />
            <Text>Mobile:</Text>
            <TextInput
                style={styles.input}
                value={mobile}
                onChangeText={setMobile}
            />
            <Text>Password:</Text>
            <TextInput
                style={styles.input}
                secureTextEntry
                value={password}
                onChangeText={setPassword}
            />
            <Button title="save" onPress={handleSave} />
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

export default EditScreen;
