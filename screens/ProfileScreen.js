import React, { Component } from 'react';
import { View, Text,StyleSheet, Button,Image,TouchableOpacity } from 'react-native';
import Fire from '../Fire'

export default class ProfileScreen extends Component {

  state={
    user:{}
  }
   unsubscribe=null

   componentDidMount(){
      const user=this.props.uid || Fire.shared.uid
      this.unsubscribe=Fire.shared.firestore.collection('users').doc(user).onSnapshot(doc=>{
        this.setState({user:doc.data()})
      })


   }

   componentWillUnmount(){
     this.unsubscribe()
   }


    
  


  render() {
    return (
      <View style={styles.container}>
       
       <TouchableOpacity style={styles.button} onPress={()=>Fire.shared.signOut()}>
         <Text style={{color:'#FFF',fontWeight:'500'}}>Log out</Text>
      </TouchableOpacity>     
       </View>
    );
  }
}

const styles=StyleSheet.create({
    container:{
        flex:1
      },
      avatarContainer:{
        shadowColor:'#151734',
        shadowRadius:15,
        shadowOpacity:0.4
      }
})
