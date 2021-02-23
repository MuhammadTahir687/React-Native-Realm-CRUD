import * as React from 'react';
import firebase from '@react-native-firebase/app';
import analytics from '@react-native-firebase/analytics';
import database from '@react-native-firebase/database';
import {Text, View, TextInput, StyleSheet, TouchableOpacity, Button, Image} from 'react-native';
import {firebaseConfig} from './config.js';
import { SocialIcon } from 'react-native-elements'


if(!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

firebase.analytics();

export default function app (){

    // database().ref('users').set({name:'Tahir'}).then(()=>console.log("Data Sets"));
    // database().ref('users').on('value',snapshot=> {console.log("Users Data:",snapshot.val())});
    return(
        <View style={styles.container}>
               <Image
                   style={styles.Image}
                   source={require('../Images/Bartal.png')}/>

            <TextInput style={styles.input}
                placeholder="Email ID"/>
            <TextInput style={styles.input}
                       placeholder="Password"
                       secureTextEntry={true}
            />

            <View style={{flexDirection: 'row', marginTop: 20,justifyContent: 'center', alignItems: 'center' }}>
                <Text>No Existing Account ? </Text>
                <TouchableOpacity>
                    <Text style={{color: 'red'}}>Sign Up </Text>
                </TouchableOpacity>

            </View>

                <View>
                    {/*<Button title="Log In" color="orangered" borderRadius='50'> </Button>*/}
                    <TouchableOpacity style={styles.button}>
                        <Text style={{color:"white",fontSize:18}}>Log In</Text>
                    </TouchableOpacity>
                </View>



             <View style={{flexDirection: 'row', marginTop: 20,justifyContent: 'center', alignItems: 'center'}}>
                 
                 <SocialIcon
                     button
                     type='twitter'
                     style={styles.icon}
                 />
                 <SocialIcon
                     button
                     type='facebook'
                     style={styles.icon}
                 />
                 <SocialIcon
                     button
                     type='google'
                     style={styles.icon}
                 />
             </View>


        </View>








    );
}
const styles = StyleSheet.create({
    input:{
        borderWidth:1,
        borderRadius:50,
        marginLeft:"10%",
        marginRight:"10%",
        marginTop: 10,
        backgroundColor:'white',
        borderColor:"orangered",
        paddingLeft:"5%"

    },
    container:{
        marginTop:20,

        marginBottom:0
    },
    button: {

        marginLeft: '32%',
        marginRight: '32%',
        marginTop:"5%",
        borderRadius: 50,
        borderWidth: 1,
        paddingLeft:'10%',
        padding:'3%',
        textAlign:'center',
        backgroundColor: "orangered",
        borderColor: 'transparent',
    },
    text:{
        color:'red'
    },
    Image:{
        width:'30%',
        height:'30%',
        alignItems:'center',
        marginLeft:"35%",
        borderRadius:50,
        backgroundColor:'transparent'

    },
    icon:{
        width:50,
        backgroundColor:"orangered"
    }


})
