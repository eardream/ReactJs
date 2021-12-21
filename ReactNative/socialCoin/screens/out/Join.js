import React, {useRef, useState} from "react";
import {Btn, BtnText, Container, TextInput} from "../../styles/shared";
import {Alert, useColorScheme, ActivityIndicator} from "react-native";
import colors from "../../styles/colors";
import auth from "@react-native-firebase/auth";
import UserInput from "../../components/UserInput";

const Join = () => {
    const isDark = useColorScheme() === "dark";
    const passwordInput = useRef();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const onSubmitEditingEmail = () => passwordInput.current.focus();
    const onSubmitEditingPassword = async () => {
        if(loading)
            return;

        if (email === "" || password === null)
            return Alert.alert("Fill in the form");

        setLoading(true);

        try {
            await auth().createUserWithEmailAndPassword(email, password);
        } catch (e) {
            console.log(e.message);
            switch (e.code) {
                case "auth/weak-password": {
                    Alert.alert("","Write a stronger password!");
                }
            }
        } finally {
            setLoading(false);
        }
    }

    return (
        <Container>
            <UserInput isLogin={false}/>
        </Container>
    );
};

export default Join;