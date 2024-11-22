import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

const SignIns = ({ route, navigation }) => {
    const { onGoBack } = route.params || {}; // Get the callback function passed as parameter
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [signedInName, setSignedInName] = useState(''); // State to store signed-in name

    const handleSignIn = () => {
        console.log("Sign In with:", { name, email, password });
        setSignedInName(name); // Set the signed-in name to be displayed after submit
        if (onGoBack) {
            // Call the passed function to send back the name to the previous screen
            onGoBack(name);
        }
        navigation.goBack(); // Go back to the previous screen after sign in
    };

    return (
        <View style={styles.signInForm}>
            {signedInName ? (
                // Show the signed-in name if the user is signed in
                <Text style={styles.signedInText}>Signed in as: {signedInName}</Text>
            ) : (
                <>
                    <TextInput
                        placeholder="Name"
                        value={name}
                        onChangeText={setName}
                        style={styles.input}
                        placeholderTextColor="white"
                    />
                    <TextInput
                        placeholder="Email"
                        value={email}
                        onChangeText={setEmail}
                        style={styles.input}
                        keyboardType="email-address"
                        placeholderTextColor="white"
                    />
                    <TextInput
                        placeholder="Password"
                        value={password}
                        onChangeText={setPassword}
                        style={styles.input}
                        secureTextEntry
                        placeholderTextColor="white"
                    />
                    <TouchableOpacity onPress={handleSignIn} style={styles.signInButton}>
                        <Text style={styles.signInButtonText}>Submit</Text>
                    </TouchableOpacity>
                </>
            )}
        </View>
    );
};

export default SignIns;

const styles = StyleSheet.create({
  signInForm: {
    paddingHorizontal: 20,
    marginVertical: 45,
  },
  input: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 15,
    borderRadius: 8,
    backgroundColor: '#2D2D2D',
    color: 'white',
  },
  signInButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  signInButtonText: {
    color: 'white',
    fontSize: 16,
  },
  signedInText: {
    color: 'green',
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
  },
});
