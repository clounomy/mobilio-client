import React from 'react';
import {View,TextInput,Button} from "react-native";





class RoomChat extends React.Component {
    state={
       
        room:""
      }
   
    render(){
        
       
   const {username,room}=this.state;


        const btnHandle=()=>{
         
             if( room===""){
                alert("pls enter room name")
            }else{
            this.props.navigation.navigate("schats",{uname:username,roomname:room},this.setState({username:"",room:""}))
        }
    }
      
    return (
      <View style={{flex:1}}>
        <View style={{backgroundColor:"skyblue",width:"100%",height:"100%",justifyContent:"center",alignItems:"center"}}>
            <View style={{width:350,height:360,backgroundColor:"grey",bottom:30,borderRadius:5,elevation:10
        ,padding:23}}>
            <View style={{top:60}}>
           

                
            <TextInput placeholder="enter room name" style={{width:300,height:40,backgroundColor:"white",marginTop:30,textAlign:"center",fontSize:20,elevation:5}}
                     value={room}
                     onChangeText={(room)=>this.setState({room})}/>
               <View style={{top:20}}>
               <Button title="submit" color="skyblue" onPress={btnHandle}/>
               </View>
   
               </View>
               
            </View>
           

        </View>
          </View>
    )
};
};

export default RoomChat;
