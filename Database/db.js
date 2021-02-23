import * as React from 'react';
import {View, Text, TouchableOpacity, TextInput, StyleSheet, Button, FlatList,ScrollView} from 'react-native';
import {useState, useEffect} from 'react';
export default function Register() {

    const [username, setUsername] = useState('');
    const [usernamevalidation, setUsernamevalidation] = useState('');
    const [phone, setPhone] = useState('');
    const [phonevalidation, setPhonevalidation] = useState('');
    const [email, setEmail] = useState('');
    const [emailvalidation, setemailvalidation] = useState('');
    const [password, setPassword] = useState('');
    const [passwordvalidation, setPasswordvalidation] = useState('');
    const [confirmpassword, setConfirmpassword] = useState('');
    const [confirmpasswordvalidation, setconfirmpasswordvalidation] = useState('');
    const [userinfo, setUserinfo] = useState([]);
    const [response, setResponse] = useState('');

    const insert_data = () => {
        let text = email;
        let regex = /^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/;
        if (username && phone && email && password && confirmpassword != '') {
            if (regex.test(text) == true) {
                if (password == confirmpassword) {
                    const URL = 'http://192.168.18.13:3000/test';
                    console.log("Request Send")
                    // let data = new FormData();
                    // data.append('username', username);
                    // data.append('phone', phone);
                    // data.append('emial', email);
                    // data.append('password', password);

                    fetch(URL, {
                        method: 'POST',
                        headers: {
                            Accept: 'application/json',
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            username: username,
                            phone: phone,
                            email: email,
                            password: password,
                            confirmpassword: confirmpassword,
                        }),
                    }).then(response  => {
                        //console.log("hello");
                        if(response.status==200)
                        {
                            return response.text();
                        }
                        else{
                            throw new Error("Something Goes Wrong");
                        }
                    }).then(resonseText=>{setResponse(resonseText)})
                        .catch(error=>{
                        console.error(error.message)
                    });
                    alert(response);
                    console.log(response)
                } else {
                    setconfirmpasswordvalidation('Password Not Match');
                    setPasswordvalidation('Password Not Match');
                }
            } else {
                setemailvalidation('Enter Correct Email');
            }
        } else {
            setUsernamevalidation('Required');
            setemailvalidation('Required*');
            setPhonevalidation('Required*');
            setconfirmpasswordvalidation('Required*');
            setPasswordvalidation('Required*');
        }

    };
     // Response from server
     // const noderesponse=()=>{
     //     const URL = 'http://192.168.18.13:3000/test';
     //
     //     fetch(URL)
     //         .then(response => response.json())
     //         .then((test) => {setResponse(test) })
     //     alert(response);
     //
     // }
    // To View all data from MySQL Data
    const view_data = () => {

        const URL = 'http://192.168.18.13:3000/View';

        fetch(URL, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
        })
            .then(response => response.json())
            .then((View) => { setUserinfo(View) })

             console.log("READ")

    };

    const phonevalidater = () => {
        if (phone == '') {
            setPhonevalidation('Required*');
        } else if (phone.length < 11) {

            setPhonevalidation('Your Phone must consist of 11 digits*');
        } else {
            setPhonevalidation('');
        }
    };
    const emailvalidater = () => {
        let text = email;
        let regex = /^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/;
        if (regex.test(text) == false) {
            setemailvalidation('Validation failed');
        } else {
            setemailvalidation('');
        }
    };
    const ListViewItemSeparator = () => {
        return (
            <View style={{height: 1, width: '100%', backgroundColor: 'black'}} />
        );
    };
    const usernamehandler = (text) => {
        setUsername(text);
    };
    return (
        <View>
            <TextInput style={styles.input} placeholder="Username"
                       onChangeText={usernamehandler}
            />
            <Text style={styles.validatiomessage}>
                {usernamevalidation}
            </Text>
            <TextInput style={styles.input} placeholder="Phone"
                       keyboardType='numeric'
                       onChangeText={(text) => setPhone(text)}
                       onBlur={phonevalidater}
                       minLength={11}
                       maxLength={11}
            />
            <Text style={styles.validatiomessage}>
                {phonevalidation}
            </Text>
            <TextInput style={styles.input}
                       placeholder="Email"
                       onChangeText={(text) => setEmail(text)}
                       onBlur={emailvalidater}
                       autoCapitalize="none"

            />
            <Text style={styles.validatiomessage}>
                {emailvalidation}
            </Text>
            <TextInput style={styles.input}
                       placeholder="Password"
                       secureTextEntry={true}
                       onChangeText={(text) => setPassword(text)}
            />
            <Text style={styles.validatiomessage}>
                {passwordvalidation}
            </Text>
            <TextInput style={styles.input}
                       placeholder="Confirm Password"
                       secureTextEntry={true}
                       onChangeText={(text) => setConfirmpassword(text)}
            />
            <Text style={styles.validatiomessage}>
                {confirmpasswordvalidation}
            </Text>
            <View style={styles.button}>
                <Button title="Sign Up" onPress={insert_data} color="red"> </Button>
            </View>
            <View style={styles.button}>
                <Button title="View All" onPress={view_data} color="orange"> </Button>
            </View>
                <FlatList
                    data={userinfo}
                    keyExtractor={(item, index) => index.toString()}
                    ItemSeparatorComponent={ListViewItemSeparator}
                    renderItem={({item}) => (
                        <ScrollView style={styles.information} >
                            <Text>Username: {item.username}</Text>
                            <Text>Phone: {item.phone}</Text>
                            <Text>Email: {item.email}</Text>
                            <Text>Password: {item.password}</Text>
                        </ScrollView>
                    )}
                />

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginLeft: '20%',
        marginTop: '20%',
    },
    input: {
        marginLeft:'12%',
        borderBottomWidth: 1,
        paddingBottom: 0,
        width: '70%',


    },
    button: {
        marginTop: 30,
        marginLeft: '30%',
        width: '40%',
        borderRadius: 30,

    },
    validatiomessage: {
        color: 'red',
        marginLeft:'12%',
        marginRight: 25,
    },
    information:{
        marginLeft:'4%',
        paddingTop:'2%',
        paddingBottom:'2%'
    }


});
