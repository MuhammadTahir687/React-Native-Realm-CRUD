import React from 'react';
import{View,Text, Button}from "react-native";

export default class Server extends React.Component{
    constructor(props){
        super(props)
            this.state={
            response:"Click to connect to server"
        }
    }
    connect=()=>{
        const URL="http://192.168.18.13:3000/welcome";
        fetch(URL)
            .then(response  => {
                console.log("hello");
            if(response.status==200)
            {
                return response.text();
            }
            else{
                throw new Error("Something Goes Wrong");
            }
        }).then(resonseText=>{
            this.setState({response: resonseText});
        }).catch(error=>{
            console.error(error.message)
        });
    }
    render(){
        return(

            <View>
                <Text>{this.state.response}</Text>
                <Button title="connect" onPress={this.connect} />
            </View>
        );
    }
}
