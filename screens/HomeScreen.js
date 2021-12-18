

import React, { Component } from 'react';
import { View, Text,StyleSheet, TouchableOpacity, LayoutAnimation, FlatList, Image } from 'react-native';
import Fire from '../Fire'
import { Ionicons } from '@expo/vector-icons';
import moment from 'moment'

const dummy_post = [
  {
    id: '1',
    name: 'Arik Intisar',
    text:
      'Hello friends. I am doing a course at programming hero on Web development. It is really good. You can also join here for only 5,500 taka. Really an amazing deal.',
    timestamp: 1569109273726,
    avatar: require('../assets/images/avatar.png'),
     image: require('../assets/images/tempImage1.png')
  },
  {
    id: '2',
    name: 'Jahid hasan Joy',
    text:
      'Today I got a job at Shonali bank limited as IT manager. Thanks to the almighty for my achievement.',
    timestamp: 1569109273726,
    avatar: require('../assets/images/avatar2.jpg'),
    image: require('../assets/images/tempImage2.jpg')
  },
  {
    id: '3',
    name: 'Hridoy Khan',
    text:
      'My new album is on its way. Get it on itunes and spotify guys.',
    timestamp: 1569109273726,
    avatar: require('../assets/images/avatar2.jpg'),
    image: require('../assets/images/tempImage3.jpg')
  },
  {
    id: '4',
    name: 'Asif Ahmed',
    text:
      'Just got an scholarship from university of texus for a full funded',
    timestamp: 1569109273726,
    avatar: require('../assets/images/avatar2.jpg'),
    image: require('../assets/images/texas.png')
  }
];
export default class HomeScreen extends Component {
                                                                                                                                                                                                                                                                                                                                                                                                                                            
constructor(props){
  super(props)
  this.ref =  Fire.shared.firestore.collection('posts')
  this.useref=
  this.state={
    dataSource : []
  }

}
componentDidMount(){
  this.unsubscribe = this.ref.onSnapshot(this.feedPosts);
}

feedPosts = (postSnapShot) =>{
  const post = [];
  postSnapShot.forEach((doc) => {
  const {uid,text,timestamp,image} = doc.data();
  let avatar="dwe"
  let name='ewfj'
  const data=Fire.shared.firestore
  .collection('users')
  .doc(uid)
  .get()
  .then(doc=>{
    post.push({
      avatar:doc.data().avatar
      ,name:doc.data().name,uid,
      
      text,
      timestamp,
      image
    })
    this.setState({
      dataSource : post,
    });
  })
 
  
 
  
  
  });

 
}
    

 

renderPost=post=>{
 
 
    
  
  return(
    <View style={styles.feedItem}>
      <Image source={post.avatar?{uri:post.avatar}:require('../assets/images/avatar.png')} style={styles.avatar}/>
      <View style={{flex:1}}>
      <View style={{flexDirection:'row',justifyContent:'space-between'
    ,alignItems:'center'}}>
      <View>
  <Text style={styles.name}>{post.name?post.name:'yo'}</Text>
  <Text style={styles.timestamp}>{moment(post.timestamp).fromNow()}</Text>
      </View>
      <Ionicons name='ios-more' size={24} color='#73788B'/>
      </View>
  <Text style={styles.post}>{post.text}</Text>
  <Image source={{uri:post.image}} style={styles.postImage} resizeMode='cover'/>
  <View style={{flexDirection:'row'}}>
    <Ionicons name='ios-heart-empty' size={24} color="#737888"
    style={{marginRight:16}}/>
    <Ionicons
    name='ios-chatboxes'
    size={24}
    color="#73788B"/>

  </View>
      </View>
    </View>
  )

}

  render() {
    LayoutAnimation.easeInEaseOut()
    return (
      <View style={styles.container}>
       <View style={styles.header}>
         <Text style={styles.headerTitle}>
            Feed
         </Text>

       </View>
       <FlatList style={styles.feed}
       data={this.state.dataSource}
       renderItem={({item})=>this.renderPost(item)}
       keyExtractor={item=>item.uid}
       showsVerticalScrollIndicator={false}
       />
      </View>
    );
  }
}

const styles=StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:'#EFECF4'
  },
  header:{
    paddingTop:48,
    paddingBottom:16,
    backgroundColor:'#FFF',
    alignItems:'center',
    borderBottomWidth:1,
    justifyContent:'center',
    borderBottomColor:'#EBECF4',
    shadowColor:'#454D65',
    shadowOffset:{height:5},
    shadowRadius:15,
    shadowOpacity:0.2,
    zIndex:10
  },
  headerTitle:{
    fontSize:20,
    fontWeight:'500'
  },
  feed:{
    marginHorizontal:16
  },
  feedItem:{
    backgroundColor:'#FFF',
    borderRadius:5,
    padding:8,
    flexDirection:'row',
    marginVertical:8
  },
  avatar:{
    width:36,
    height:36,
    borderRadius:18,
    marginRight:16
  },
  name:{
    fontSize:15,
    fontWeight:'500',
    color:'#454D65'
  },
  timestamp:{
    fontSize:11,
    color:'#C4C6CE',
    marginTop:4
  },
  post:{
    marginTop:16,
    fontSize:14,
    color:'#838899'
  },
  postImage:{
    width:undefined,
    height:150,
    borderRadius:5,
    marginVertical:16
  }

})
