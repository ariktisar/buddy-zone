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
       <View style={{marginTop:63,alignItems:'center'}}>
         <View style={styles.avatarContainer}>
           <Image style={styles.avatar}
           source={this.state.user.avatar?{uri:this.state.user.avatar}:null}/>

         </View>
    <Text style={styles.name}>{this.state.user.name}</Text>
      <View style={styles.statsContainer}>
        <View style={styles.stat}>
          <Text style={styles.statAmount}>21</Text>
          <Text style={styles.statTitle}>Posts</Text>
        </View>
        <View style={styles.stat}>
          <Text style={styles.statAmount}>981</Text>
          <Text style={styles.statTitle}>Followers</Text>
        </View>
        <View style={styles.stat}>
          <Text style={styles.statAmount}>63</Text>
          <Text style={styles.statTitle}>Following</Text>
        </View>


      </View>
       </View>
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
