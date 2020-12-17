import React from 'react';
import {View,Text,Image, AsyncStorage,BackHandler} from "react-native";
import { TouchableOpacity, TouchableWithoutFeedback } from 'react-native-gesture-handler';
//import { TextInput,Button } from 'react-native-paper';



class Chat extends React.Component{


  state={
    users:[]
  }



  componentDidMount(){
   this.userfetch();
  //  BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);

 
  }

  // componentWillUnmount() {
  //   BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
  // }
  

  // handleBackButton() {
  //   BackHandler.exitApp();
  //   return true;
  // }


 

  render(){
    const {users}=this.state;

     this.userfetch=async()=>{
      fetch("http://192.168.1.6:5000/users",{
        method:"get",
        headers:{
          "Authorization":"Bearer "+ await AsyncStorage.getItem("jwt")
        }
      
      }).then(res=>res.json()).catch(err=>console.log(err))
      .then(userdata=>{
       
        if(userdata.error){
          console.log(userdata.error)
        }
        else{
          
          this.setState({users:userdata.user})
        }
       
      }).catch(err=>console.log(err))
    }


   

    



    return (
 <View style={{padding:7}} >
     {users.map((data,index)=>{
                   
                return <TouchableWithoutFeedback key={index} onPress={()=>this.props.navigation.navigate("sample",{datas:data.email})}>
                
                <View   style={{width:"100%",height:80,backgroundColor:"lightgrey",flexDirection:"row",display:"flex",justifyContent:"space-around",top:0,elevation:10,marginTop:8}}>
           <Image  style={{width:70,height:70,borderRadius:70,top:7,left:10,position:"absolute"}}
            source={{uri:"https://cdn1.vectorstock.com/i/1000x1000/66/60/avatar-business-man-graphic-vector-9646660.jpg"}}/>
           <Text  style={{top:24,fontSize:22,right:45,letterSpacing:2,left:10}}>{data.name}</Text> 
            </View>
            </TouchableWithoutFeedback>
           
          })}
         </View>
            
    )
};
};
export default Chat;


