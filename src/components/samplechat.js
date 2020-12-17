import React from 'react';
import {View,Text, AsyncStorage,Image} from "react-native";

class SampleChat extends React.Component {

    state={
        userme:[],
        hashedUsers:[]
    }
   
    async componentDidMount(){
      await  this.userasync();
      await   this.hashedUsers();
      
    }
    render(){
        const {datas}=this.props.route.params;
        // console.log("datas===>>>",datas)
        const {userme}=this.state;
       
       
        this.userasync=async()=>{
            const users= await AsyncStorage.getItem("user");
            const userss=JSON.parse(users)
            // console.log("type",typeof userss)
            // console.log("ddfdfd",userss)
            this.setState({userme:userss})
            // console.log("salih",this.state.userme.email)
           
          
        }

       
       

        this.hashedUsers=()=>{
           return  fetch("http://192.168.1.6:5000/hashTwoUser",{
            method:"post",
            headers:{
                "Content-Type":"application/json"
              },
              body:JSON.stringify({
                  currentEmail:userme.email,
                  othersEmail:datas
                })
        }).then(res=>res.json()).catch(err=>console.log(err))
        .then(hashedData=>{
           
        //    console.log("hashed",hashedData);
           this.setState({hashedUsers:JSON.stringify(hashedData)})
        }).catch(err=>console.log(err))
        }
      
    return (
        <View style={{flex:1}}>
           
            <View style={{top:"5%"}}>
               
           <View style={{width:"100%",justifyContent:"center",alignItems:"center",flexDirection:"row",top:"15%",left:5}}>

               <View style={{width:180,height:170,backgroundColor:"white",right:10,borderRadius:15,elevation:7,overflow:"hidden"}}>
                <View style={{width:"100%",height:"70%",backgroundColor:"lightgrey",borderBottomRightRadius:30}}>
                    <Image  style={{width:"68%",height:"80%",left:23,top:10,opacity:.75}}
            source={{uri:"https://cdn0.iconfinder.com/data/icons/typicons-2/24/contacts-512.png"}}/>
                    <View style={{top:"105%",position:"absolute",left:35}}>
                    <Text style={{textAlign:"center",fontSize:24,letterSpacing:2}}>contacts</Text>
                    </View>
                </View>
               </View>
               <View style={{width:180,height:170,backgroundColor:"white",borderRadius:15,elevation:7,overflow:"hidden"}}>
               <View style={{width:"100%",height:"70%",backgroundColor:"lightgrey",borderBottomRightRadius:30}}>
               <Image  style={{width:"65%",height:"80%",left:30,top:10,opacity:.8}}
            source={{uri:"https://www.pinclipart.com/picdir/middle/460-4608361_album-svg-png-icon-free-download-album-foto.png"}}/>
               <View style={{top:"105%",position:"absolute",left:40}}>
                    <Text style={{textAlign:"center",fontSize:24,letterSpacing:2}}>photos</Text>
                    </View>
                </View>
               </View>

           </View>
           
           
           <View style={{width:"100%",justifyContent:"center",alignItems:"center",
           flexDirection:"row",top:"30%",left:5}}>

               <View style={{width:180,height:170,backgroundColor:"white",right:10,borderRadius:15,elevation:7,overflow:"hidden"}}>
               <View style={{width:"100%",height:"70%",backgroundColor:"lightgrey",borderBottomRightRadius:30}}>
               <Image  style={{width:"60%",height:"80%",left:30,top:10,opacity:.75}}
            source={{uri:"https://img.pngio.com/message-icon-png-transparent-png-download-for-free-159661-trzcacak-message-icon-png-920_879.png"}}/>
               <View style={{top:"105%",position:"absolute",left:35}}>
                    <Text style={{textAlign:"center",fontSize:24,letterSpacing:2}}>messages</Text>
                    </View>
                </View>
               </View>
               <View style={{width:180,height:170,backgroundColor:"white",borderRadius:15,elevation:7,overflow:"hidden"}}>
               <View style={{width:"100%",height:"70%",backgroundColor:"lightgrey",borderBottomRightRadius:30}}>
               <Image  style={{width:"65%",height:"80%",left:30,top:10,opacity:.75}}
            source={{uri:"https://www.pngfind.com/pngs/m/56-568764_message-png-message-icon-png-white-transparent-png.png"}}/>
               <View style={{top:"105%",position:"absolute",left:53}}>
                    <Text style={{textAlign:"center",fontSize:24,letterSpacing:2}}>email</Text>
                    </View>
                </View>
               </View>

           </View>
         
           <View style={{width:350,height:160,backgroundColor:"white",elevation:7,top:"30%",left:"5%"
           ,borderRadius:12}}>
                <Text style={{fontSize:24,textAlign:"center",top:"40%",letterSpacing:3}}>Videos</Text>
               </View>
          
           </View>
          
   
           </View>
    )
};
};


export default SampleChat;
