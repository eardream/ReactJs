import {StatusBar} from 'expo-status-bar';
import React, {useEffect, useState} from 'react';
import {Alert, Platform, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View} from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import {Fontisto, Ionicons} from '@expo/vector-icons';
import {theme} from "./colors";

const STORAGE_KEY = "@toDos";
const STORAGE_MODE = "@mode";

export default function App() {
    const [loading, setLoading] = useState(true);
    const [working, setWorking] = useState(true);
    const travel = async () => {
        setWorking(false);
        await setModeInStorage("travel");
    };
    const work = async () => {
        setWorking(true);
        await setModeInStorage("work");
    };

    // 모드 저장하기
    const setModeInStorage = async (mode) => {
        try {
            await AsyncStorage.setItem(STORAGE_MODE, mode);
        } catch (e) {
            console.log(e);
        }
    }

    // 모드 가져오기
    const getModeInStorage = async () => {
        const mode = await AsyncStorage.getItem(STORAGE_MODE);
        return mode != null ? setWorking(mode === "working") : null;
    }

    const [text, setText] = useState("");
    const [toDos, setToDos] = useState({});
    const [editText, setEditText] = useState("");
    const onChangeText = (payload) => setText(payload);
    const onChangeEditText = (editText) => setEditText(editText);

    const addTodo = async () => {
        if (text === "")
            return;

        // save to do
        // list 합치기
        // const newTodos = Object.assign({}, toDos, {[Date.now()]: {text, work: working}});
        const newTodos = {...toDos, [Date.now()]: {text, working, "done": false, "edit": false}}

        await setAndSave(newTodos);
        setText("");
    };

    // 내부 저장소에 저장
    const saveToDos = async (toSave) => {
        try {
            await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(toSave));
        } catch (e) {
            console.log(e);
        }
    };

    // 내부 저장소에서 가져오기
    const loadToDos = async () => {
        try {
            const jsonString = await AsyncStorage.getItem(STORAGE_KEY);
            return jsonString != null ? setToDos(JSON.parse(jsonString)) : null;
        } catch (e) {
            console.log(e);
        }
    };

    // 아이템 삭제
    const deleteTodo = async (key) => {
        if (Platform.OS === "web") {
            const ok = confirm("Do you want to delete this To do?");
            if (ok) {
                const newToDos = {...toDos};
                delete newToDos[key]

                await setAndSave(newToDos);
            }
        } else {
            Alert.alert(
                "Delete To Do",
                "Are you sure?",
                [
                    {
                        text: "Cancel",
                    },
                    {
                        text: "Delete",
                        style: "destructive",
                        onPress: async () => {
                            const newToDos = {...toDos};
                            delete newToDos[key]

                            await setAndSave(newToDos);
                        },
                    },
                ]);
        }
    };

    // 완료 표시 on / off
    const doneTodo = async (key, doneStatus) => {
        const newTodos = {...toDos};
        newTodos[key].done = !doneStatus

        await setAndSave(newTodos);
    };

    // 수정 시작 / 취소
    const editStartToDo = async (key) => {
        const newTodos = {...toDos};
        newTodos[key].edit = !newTodos[key].edit;

        setEditText(newTodos[key].text);

        await setAndSave(newTodos);
    }

    // 수정 완료
    const editToDo = async (key) => {
        const newTodos = {...toDos};
        newTodos[key].text = editText;
        newTodos[key].edit = false;

        await setAndSave(newTodos);
    };

    const setAndSave = async (newTodos) => {
        setToDos(newTodos);
        await saveToDos(newTodos);
    };

    useEffect(async () => {
        await getModeInStorage();
        await loadToDos();
        setLoading(false);
    }, []);

    return (
        <View style={styles.container}>
            <StatusBar style="auto"/>
            <View style={styles.header}>
                <TouchableOpacity onPress={work}>
                    <Text style={{
                        fontSize: 38,
                        fontWeight: "600",
                        color: working ? theme.white : theme.gray
                    }}>Work</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={travel}>
                    <Text style={{
                        fontSize: 38,
                        fontWeight: "600", color: !working ? theme.white : theme.gray
                    }}>Travel</Text>
                </TouchableOpacity>
            </View>
            <View>
                <TextInput
                    onSubmitEditing={addTodo}
                    onChangeText={onChangeText}
                    returnKeyType="done"
                    style={styles.input}
                    value={text}
                    placeholder={working ? "Add a To Do" : "Where do you wanna go?"}/>
                {
                    <ScrollView>
                        {
                            Object.keys(toDos).map(key =>
                                (
                                    toDos[key].working === working ?
                                        (<View style={styles.toDo} key={key}>
                                            {
                                                toDos[key].done === true ?
                                                    (<Text style={styles.toDoDoneText}>{toDos[key].text}</Text>)
                                                    :
                                                    (
                                                        (toDos[key].edit === true) ?
                                                            <TextInput
                                                                style={styles.input}
                                                                placeholder={toDos[key].text}
                                                                value={editText}
                                                                onChangeText={onChangeEditText}
                                                                returnKeyType="done"
                                                                onSubmitEditing={() => editToDo(key)}/>
                                                            :
                                                            <Text style={styles.toDoText}>{toDos[key].text}</Text>
                                                    )
                                            }
                                            <View style={styles.iconBox}>
                                                <TouchableOpacity onPress={() => doneTodo(key, toDos[key].done)}>
                                                    <Ionicons style={styles.touch} name="ios-cloud-done" size={24}
                                                              color={theme.gray}/>
                                                </TouchableOpacity>
                                                {
                                                    toDos[key].done === true ?
                                                        null
                                                        :
                                                        <TouchableOpacity onPress={() => editStartToDo(key)}>
                                                            <Ionicons style={styles.touch} name="pencil" size={24}
                                                                      color={theme.gray}/>
                                                        </TouchableOpacity>
                                                }
                                                <TouchableOpacity onPress={() => deleteTodo(key)}>
                                                    <Fontisto style={styles.touch} name="trash" size={24}
                                                              color={theme.gray}/>
                                                </TouchableOpacity>
                                            </View>
                                        </View>)
                                        :
                                        null
                                )
                            )
                        }
                    </ScrollView>
                }
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.bg,
        paddingHorizontal: 20,
    },
    header: {
        justifyContent: "space-between",
        flexDirection: "row",
        marginTop: 100,
    },
    btnText: {},
    input: {
        backgroundColor: theme.white,
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderRadius: 15,
        marginVertical: 20,
        fontSize: 18,
    },
    toDo: {
        width: "100%",
        backgroundColor: theme.toDoBg,
        marginBottom: 10,
        paddingVertical: 20,
        paddingHorizontal: 20,
        borderRadius: 15,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    iconBox: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    touch: {
        marginHorizontal: 5,
    },
    toDoText: {
        color: theme.white,
        fontSize: 16,
        fontWeight: "500",
    },
    toDoDoneText: {
        color: theme.doneText,
        fontSize: 16,
        fontWeight: "500",
        textDecorationLine: "line-through",
    },
    emptyBox: {
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "row",
    }
});
