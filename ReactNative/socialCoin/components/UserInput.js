import React, {useRef, useState} from "react";
import {ActivityIndicator, Alert, useColorScheme, View} from "react-native";
import auth from "@react-native-firebase/auth";
import {Btn, BtnText, TextInput} from "../styles/shared";
import colors from "../styles/colors";

const UserInput = ({isLogin}) => {
    const isDark = useColorScheme() === "dark";
    const passwordInput = useRef();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const onSubmitEditingEmail = () => passwordInput.current.focus();
    const onSubmitEditingPassword = async () => {
        if (loading)
            return;

        if (email === "" || password === null)
            return Alert.alert("Fill in the form");

        setLoading(true);

        try {
            if (isLogin) {
                await auth().signInWithEmailAndPassword(email, password);
            } else {
                await auth().createUserWithEmailAndPassword(email, password);
            }
        } catch (e) {
            console.log(e);
            switch (e.code) {
                case "auth/weak-password": {
                    Alert.alert("", "Write a stronger password!");
                }
            }
        } finally {
            setLoading(false);
        }
    }

    return (
        <View>
            <TextInput
                value={email}
                placeholder="Email"
                keyboardType={"email-address"}
                autoCapitalize={"none"}
                autoCorrect={false}
                onChangeText={(text) => setEmail(text)}
                returnKeyType="next"
                returnKeyLabel="next"
                onSubmitEditing={onSubmitEditingEmail}
                placeholderTextColor={isDark ? colors.darkHintColor : colors.lightTextColor}
            />
            <TextInput
                ref={passwordInput}
                value={password}
                placeholder="Password"
                onChangeText={(text) => setPassword(text)}
                returnKeyType="done"
                returnKeyLabel="done"
                onSubmitEditing={onSubmitEditingPassword}
                placeholderTextColor={isDark ? colors.darkHintColor : colors.lightTextColor}
                secureTextEntry
            />

            <Btn onPress={onSubmitEditingPassword}>
                {loading ?
                    <ActivityIndicator color={isDark ? "white" : "black"}/>
                    :
                    <BtnText>
                        {
                            isLogin ? "Sign In" : "Create Account"
                        }
                    </BtnText>
                }
            </Btn>
        </View>
    )
};

export default UserInput;