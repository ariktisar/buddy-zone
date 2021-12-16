import React, { Component } from 'react';
import { View, Text,StyleSheet,ImageBackground,StatusBar ,TextInput, TouchableOpacity, LayoutAnimation, Image} from 'react-native';
import Fire from '../Fire'
import {Ionicons} from '@expo/vector-icons'
import UserPermissions from '../utilities/UserPermissions';
import * as ImagePicker from 'expo-image-picker'

export default class RegisterScreen extends Component {

    static navigationOptions={
        headerShown:false
    }

    state = {
        user: {
          name: '',
          email: '',
          password: '',
          avatar: null
        },
        errorMessage: null
      };
    

    handleSignup=()=>{
       Fire.shared.createUSer(this.state.user)

    }

    handlePickAvatar=async()=>{
       // UserPermissions.getPhotoPermissions()
        let result=await ImagePicker.launchImageLibraryAsync({
            mediaTypes:ImagePicker.MediaTypeOptions.Images,
            allowsEditing:true,
            aspect:[4,3]
        })
        if(!result.cancelled){
            console.log(result.uri)
            this.setState({ user: { ...this.state.user, avatar: result.uri } });
        }
    }

                                                                                                                                                                                                                                                                                                                                                                                                                                            

  render() {
    LayoutAnimation.easeInEaseOut()

    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content"></StatusBar>
        <ImageBackground
          source={require('../assets/images/background.jpg')}
          style={{flex: 1,
            width: null,
            height: null,
            justifyContent:'center'}}>
        
        <TouchableOpacity style={styles.back} onPress={()=>this.props.navigation.navigate('Login')}>
            <Ionicons name='ios-arrow-round-back' size={32} color="#FFF"></Ionicons>
        </TouchableOpacity>
        <View>
        <View style={{position:'absolute',alignItems:'center',width:'100%'}}>
        <Text style={styles.greeting}> {`Hello! \n Sign up to get started.`} </Text>
            <TouchableOpacity style={styles.avatarPlaceholder}onPress={this.handlePickAvatar}>
                <Image source={{uri:this.state.user.avatar}} style={styles.avatar}/>
                <Ionicons name="ios-add" size={32} color="#FFF" style={{marginTop:6,marginLeft:2}}>

                </Ionicons>
            </TouchableOpacity>
            {this.state.errorMessage && <Text style={styles.error}>{this.state.errorMessage}</Text>}

        </View>

       
     
    
      <TouchableOpacity style={styles.button} onPress={this.handleSignup}>
          <Text style={{color:'#FFF',fontWeight:'500'}}>Sign up</Text>
      </TouchableOpacity>
      
      </View>
      </ImageBackground>
      </View>
      
    );
  }
}

const styles=StyleSheet.create({
  container:{
    flex:1,
   
  },
  greeting:{
      marginTop:12,
      fontSize:16,
      fontWeight:'400',
      textAlign:'center',
      color:'#FFF'
  },
  input:{
      borderBottomColor:'#8A8F9E',
      borderBottomWidth:StyleSheet.hairlineWidth,
      height:40,
      fontSize:15,
      color:"#FFF"
  },
  back:{
      position: 'absolute',
      top:16,
      left:16,
      width:32,
      height:32,
      borderRadius:16,
      backgroundColor:'rgba(21,22,48,0.1)',
      alignItems:'center',
      justifyContent:'center'
  },
  avatar: {
    position: 'absolute',
    width: 100,
    height: 100,
    borderRadius: 50
  }

})
