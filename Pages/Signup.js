import { Button, StyleSheet, Text, TextInput, View, Alert } from 'react-native'
import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { useSignup } from '../Hooks/UseSignup'

const Signup = () => {
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [passwordConfirm, setPasswordConfirm] = useState('')
    const navigation = useNavigation()
    const { signup, isLoading, error } = useSignup();

    const submitHandler = async (e) => {
        e.preventDefault()
        if (password === passwordConfirm) {
            await signup(firstName, lastName, email, username, password)
            navigation.navigate('Home Screen')
        } else {
            Alert.alert('Passwords are not the same')
        }
        
    }
    const loginPageHandler = (e) => {
        e.preventDefault()
        navigation.navigate('Log in')
    }


    return (
        <View>
            <Text style={styles.headline}>Please Signup Below</Text>

            <Text>First Name:</Text>
            <TextInput
                placeholder='First Name here'
                style={styles.input}
                onChangeText={(firstName) => setFirstName(firstName)}
            />

            <Text>Last Name:</Text>
            <TextInput
                placeholder='Last Name here'
                style={styles.input}
                onChangeText={(lastName) => setLastName(lastName)}
            />

            <Text>Username:</Text>
            <TextInput
                placeholder='Username here'
                style={styles.input}
                onChangeText={(username) => setUsername(username)}
            />

            <Text>Email:</Text>
            <TextInput
                placeholder='Email here'
                style={styles.input}
                onChangeText={(email) => setEmail(email)}
            />

            <Text>Password:</Text>
            <TextInput
                placeholder='Password here'
                style={styles.input}
                onChangeText={(password) => setPassword(password)}
            />

            <Text>Password Confirmation:</Text>
            <TextInput
                placeholder='Please Re-enter Password'
                style={styles.input}
                onChangeText={(passwordConfirm) => setPasswordConfirm(passwordConfirm)}
            />

            <Button
                title='Submit'
                onPress={submitHandler}
            />
            <View>
                <Text>{error && <Text >{error}</Text>}</Text>
            </View>

            <Button
                title='Already have an account? Login'
                onPress={loginPageHandler}
            />

        </View>
    )
}


export default Signup

const styles = StyleSheet.create({
    headline: {
        textAlign: 'center'
    },
    input: {
        backgroundColor: 'yellow'
    }
})