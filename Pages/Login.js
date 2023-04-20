import { Button, StyleSheet, Text, TextInput, View, Alert } from 'react-native'
import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { useLogin } from '../Hooks/UseLogin'


const Login = () => {
    // Provides logging for every input
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const { login, isLoading, error } = useLogin();

    const navigation = useNavigation()

    // This is an arrow function. e is the event
    const submitHandler = async (e) => {
        e.preventDefault()
        await login(email,password)
        navigation.navigate('Home Screen')
    }


    return (
        <View>
            <Text>Please Login Here:</Text>
            <Text>Username/Email:</Text>
            <TextInput
                placeholder='Email/Username here'
                style={styles.input}
                onChangeText={(email) => setEmail(email)}
            />
            <Text>Password:</Text>
            <TextInput
                placeholder='Password here'
                style={styles.input}
                onChangeText={(password) => setPassword(password)}
            />
            <Button
                title='Submit'
                onPress={submitHandler}
            />
            <Button
                title="Don't have an account? Sing up"
                onPress={() => navigation.navigate('Sign up')}
            />
            <View>
                <Text>{error && <Text >{error}</Text>}</Text>
            </View>
        </View>
    )
}

export default Login

// CSS code here to make it look presentable
const styles = StyleSheet.create({
    input: {
        //Can use colour code to get any colour
        backgroundColor: 'yellow',
        height: 40,
        borderColor: 'gray',
        borderWidth: 1
    }
})