/*Screen to register the user*/
import React from 'react';
import {
  View,
  ScrollView,
  KeyboardAvoidingView,
  Alert,
  Text,
  Animated,
  HelperText,
} from 'react-native';
import Mytextinput from './components/Mytextinput';
import Mybutton from './components/Mybutton';
import Realm from 'realm';
import base64 from 'react-native-base64';
import {TextInput} from 'react-native-gesture-handler';
import {color} from 'react-native-reanimated';
let realm;

export default class RegisterUser extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user_name: '',
      user_contact: '',
      user_address: '',
      errorName: '',
      errorContact: '',
      errorEmail: true,
      errorEmailMsg: '',
      validonsubmit: false,
      user_password: '',
      errorPassword: '',
      user_ConfirmPassword: '',
      error_ConfirmPassword: '',
    };
    realm = new Realm({path: 'UserDatabase.realm3'});
  }

  /*

 validate = (text) => {
    console.log(text);

		let reg = /^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/;
		if (reg.test(text) === false) {
      console.log("Email is Not Correct");
      this.setState({validonsubmit: false});
      this.setState({ emailCorrect: "Email is not Correct"})

		//	this.setState({ email: text })
			return false;
		}
		else {
      this.setState({validonsubmit: true});
			//this.setState({ email: text })
			this.setState({ emailCorrect: "Email is Correct"})
		console.log("Email is Correct");
		}
  }
*/

  submit = () => {
    let text = this.state.user_address;
    let pass = this.state.user_password;
    let conf = this.state.user_ConfirmPassword;
    console.log(text);
    let reg = /^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/;

    if (reg.test(text) === false) {
      console.log('Validation Failed');
      this.setState({errorEmail: 'Email is not Correct'});
    } else if (pass != conf) {
      console.log('Password is not Matching ');
      this.setState({error_ConfirmPassword: 'Password is not matching'});
    } else {
      console.log(base64.encode(pass));
      console.log('Validation Successfull');
      this.register_user();
    }

    if (this.state.user_contact == '') {
      this.setState({errorContact: 'Required*'});
    } else {
    }
    if (this.state.user_name == '') {
      this.setState({errorName: 'Required*'});
    } else {
    }
    if (this.state.user_address == '') {
      this.setState({errorEmail: 'Required*'});
    } else {
    }
    if (this.state.user_password == '') {
      this.setState({errorPassword: 'Required*'});
    } else {
    }
  };

  namevalidate = () => {
    if (this.state.user_name == '') {
      this.setState({errorName: 'Required*'});
    } else {
      this.setState({errorName: ''});
    }
  };

  passwordvalidate = () => {
    if (this.state.user_password == '') {
      this.setState({errorPassword: 'Required*'});
    } else {
      this.setState({errorPassword: ''});
    }
  };

  passworconfirmdvalidate = () => {
    if (this.state.user_ConfirmPassword == '') {
      this.setState({error_ConfirmPassword: 'Required*'});
    } else {
      this.setState({error_ConfirmPassword: ''});
    }
  };

  contactvalidate = () => {
    if (this.state.user_contact == '') {
      this.setState({errorContact: 'Required*'});
    } else if (this.state.user_contact.length < 11) {
      this.setState({errorContact: 'Phone Number should be 10 digit'});
    } else {
      this.setState({errorContact: ''});
    }
  };

  emailvalidate = () => {
    if (this.state.user_address == '') {
      this.setState({errorEmail: 'Required*'});
    } else {
      this.setState({errorEmail: ''});
    }
  };

  register_user = () => {
    var that = this;
    const {user_name} = this.state;
    const {user_contact} = this.state;
    const {user_address} = this.state;
    const {user_password} = this.state;
    const {user_ConfirmPassword} = this.state;
    if (user_name) {
      if (user_contact) {
        if (user_address) {
          if (user_password) {
            if (user_ConfirmPassword) {
              realm.write(() => {
                var ID =
                  realm.objects('user_details').sorted('user_id', true).length >
                  0
                    ? realm.objects('user_details').sorted('user_id', true)[0]
                        .user_id + 1
                    : 1;
                realm.create('user_details', {
                  user_id: ID,
                  user_name: that.state.user_name,
                  user_contact: that.state.user_contact,
                  user_address: that.state.user_address,
                  user_password: base64.encode(that.state.user_password),
                  user_ConfirmPassword: base64.encode(
                    that.state.user_ConfirmPassword,
                  ),
                });
                Alert.alert(
                  'Success',
                  'You are registered successfully',
                  [
                    {
                      text: 'Ok',
                      onPress: () =>
                        that.props.navigation.navigate('HomeScreen'),
                    },
                  ],
                  {cancelable: false},
                );
              });
            } else {
              this.setState({error_ConfirmPassword: 'Required*'});
            }
          } else {
            this.setState({errorPassword: 'Required*'});
          }
        } else {
          // alert('Please fill Address');
          this.setState({errorEmail: 'Required*'});
        }
      } else {
        this.setState({errorContact: 'Required*'});
        //alert('Please fill Contact Number');
      }
    } else {
      this.setState({errorName: 'Required*'});
      //  alert('Please fill Name');
    }
  };

  render() {
    return (
      <View style={{backgroundColor: 'white', flex: 1}}>
        <ScrollView keyboardShouldPersistTaps="handled">
          <KeyboardAvoidingView
            behavior="padding"
            style={{flex: 1, justifyContent: 'space-between'}}>
            <Mytextinput
              placeholder="Enter Name"
              onChangeText={(user_name) => this.setState({user_name})}
              onBlur={(text) => this.namevalidate(this.state.user_name)}
            />
            <Text style={{color: 'red', marginLeft: 35}}>
              {this.state.errorName}
            </Text>

            <Mytextinput
              placeholder="Enter Contact No"
              onChangeText={(user_contact) => this.setState({user_contact})}
              onBlur={(text) => this.contactvalidate(this.state.user_contact)}
              maxLength={11}
              minLength={11}
              keyboardType="numeric"
            />
            <Text style={{color: 'red', marginLeft: 35}}>
              {this.state.errorContact}
            </Text>

            <Mytextinput
              placeholder="Email"
              autoCapitalize="none"
              onChangeText={(user_address) => this.setState({user_address})}
              onBlur={(text) => this.emailvalidate(this.state.user_address)}
              value={this.state.user_address}
            />
            <Text style={{color: 'red', marginLeft: 35}}>
              {this.state.errorEmail}
            </Text>

            <Mytextinput
              secureTextEntry={true}
              placeholder="Password"
              onChangeText={(user_password) => this.setState({user_password})}
              onBlur={(text) => this.passwordvalidate(this.state.user_password)}
              value={this.state.user_password}
            />

            <Text style={{color: 'red', marginLeft: 35}}>
              {this.state.errorPassword}
            </Text>

            <Mytextinput
              secureTextEntry={true}
              placeholder="Confirm Password"
              onChangeText={(user_ConfirmPassword) =>
                this.setState({user_ConfirmPassword})
              }
              onBlur={(text) =>
                this.passworconfirmdvalidate(this.state.user_ConfirmPassword)
              }
              value={this.state.user_ConfirmPassword}
            />
            <Text style={{color: 'red', marginLeft: 35}}>
              {this.state.error_ConfirmPassword}
            </Text>
            <Mybutton
              title="Submit"
              //customClick={(text) => this.validate(this.state.user_address)}
              //customClick={this.register_user.bind(this)}
              // onPress={this.submit}

              customClick={this.submit}

              //(text) => this.validate(this.state.user_address)}
            />
          </KeyboardAvoidingView>
        </ScrollView>
      </View>
    );
  }
}
