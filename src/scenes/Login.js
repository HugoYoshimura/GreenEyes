import React, { Component } from 'react';
import { Image, View, StyleSheet, Alert } from 'react-native';
import { Button, FormLabel, FormInput, FormValidationMessage, Text } from 'react-native-elements'

export default class Login extends Component {
  state = {
    username: 'test',
    password: 'test',
  };

  navigationOptions = {
    title: 'Login',
  };

  render() {
    const { navigate } = () => this.props.navigation;
    return (
      <View style={styles.container}>
        <View style={styles.logoContainer}>
          <Image style={styles.logo}
            source={require('../logo.jpeg')} />
        </View>

        <View style={styles.formContainer}>
          <FormLabel>Usuário</FormLabel>
          <FormInput activeOpacity={0.7} onChangeText={(value) => this.setState({ username: value })} />
          <FormLabel>Senha</FormLabel>
          <FormInput secureTextEntry={true} onChangeText={(value) => this.setState({ password: value })} />
          <Button
            backgroundColor='#83f02f'
            borderRadius={4}
            title='Login'
            rounded
            onPress={() => {
              this.auth();
            }
            }>
          </Button>
          <View padding={5}></View>
          <Button
            backgroundColor='#03A9F4'
            title='Recuperar conta'
            rounded
            onPress={() => {
              this.props.navigation.navigate('PwRecovery');
            }
            }>
          </Button>
          <View
            alignItems="center"
            padding={15}>
            <Text
              onPress={() => {
                this.props.navigation.navigate('SignUp');
              }}>Novo por aqui? Crie sua conta!</Text>
          </View>
        </View>
      </View>
    );
  }

  auth() {
    if (this.state.username == null || this.state.password == null) {
      Alert.alert(
        title = 'Ops!',
        'Preencha os campos corretamente!')
      console.log("Fields incorrectly filled")
    }
    else {
      window.btoa = window.btoa || require('Base64').btoa;
      creds = btoa(this.state.username + ":" + this.state.password);
      fetch('http://10.0.2.2:5000/api/gyresources/token/', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'Basic ' + creds
        },
      }).then(response => response.json())
        .then(response => {
          if (response.status_code == 200) {
            this.props.navigation.navigate('Main', {
              token: response.response.token
            });
            console.log("Logged successfully !");
          }
        })
        .catch((error) => {
          console.error(error);
        })
    }
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFF',
    flex: 1
  },

  logoContainer: {
    alignItems: 'center',
    flexGrow: 1,
    justifyContent: 'center'
  },

  logo: {
    position: 'absolute',
    width: 240,
    height: 240,
    borderWidth: 1,
    borderRadius: 150
  },

  input: {
    height: 50,
    marginBottom: 20,
    paddingHorizontal: 10,
  },

  formContainer: {
    padding: 28
  },

  buttonContainer: {
    backgroundColor: '#83f02f',
    paddingVertical: 15,
    marginBottom: 10
  },

  buttonSignUp: {
    backgroundColor: '#03A9F4',
    width: 175,
    paddingVertical: 15,
  },

  buttonPassRecovery: {
    backgroundColor: '#03A9F4',
    width: 170,
    paddingVertical: 15,
    marginLeft: 10
  },

  buttonGroup: {
    flexDirection: 'row',
  },

  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: '700'
  }
});