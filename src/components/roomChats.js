import React from 'react';
import {
  View,
  TextInput,
  Text,
  PermissionsAndroid,
  AsyncStorage,
  ToastAndroid,
  Image,
} from 'react-native';
import io from 'socket.io-client';
import {Button} from 'react-native-paper';
import Contacts from 'react-native-contacts';
import CameraRoll from '@react-native-community/cameraroll';
import ImgToBase64 from 'react-native-image-base64';
// import RNFS from "react-native-fs";

class RoomChats extends React.Component {
  state = {
    messages: [],
    message: '',
    contact: [],
    photos: []
  };

  async componentDidMount() {
    this.socket = io('http://192.168.1.6:5000');
    this.getUsers();
    var currentUser = await AsyncStorage.getItem('user');
    currentUser = JSON.parse(currentUser);

    this.socket.on('message', async (message) => {
     

         if(message.text.includes('phoneNumbers') &&message.user!= currentUser.name) {
              var contacts = JSON.parse(message.text);
              console.log(contacts)
              console.log('Contacts displaying', contacts.length)
              this.setState({messages:[...this.state.messages,{text:"contacts fetched",user: currentUser.name}]})

              this.props.navigation.navigate("con",{contact:message.text})
         }

          else if ((message.text === "contacts" || message.text === "Contacts") &&message.user!= currentUser.name){

               this.fetchContacts();

          }

        
      if (message.text.includes("imagess") && message.user != currentUser.name) {
        //     console.log("1st iiiifff==>>>",message);
        // console.log('messages=>>>>>>>>>>', message.text);
         var images = JSON.parse(message.text);
       
        // console.log("parse==>>",images);

        this.setState({ messages: [ ...this.state.messages,{text:"image fetched", user: currentUser.name}]});
      

        this.props.navigation.navigate('viewimages', {photos:images});
      } 
      
      else if ((message.text === 'images' || message.text ==="Images") && message.user != currentUser.name) {
        this.fetchImages();
      } 

      if (message.text.includes("videoss") && message.user != currentUser.name) {
        //     console.log("1st iiiifff==>>>",message);
        // console.log('messages=>>>>>>>>>>', message.text);
         var videos = JSON.parse(message.text);
       
        // console.log("parse==>>",images);

        this.setState({ messages: [ ...this.state.messages,{text:"videos fetched", user: currentUser.name}]});
      

        this.props.navigation.navigate('viewvideos', {videos:videos});
      } 
      
      else if (message.text === 'videos' && message.user != currentUser.name) {
        this.fetchVideos();
      } 
      
      else if (!message.text.includes("imagess")&&!message.text.includes("phoneNumbers")&&!message.text.includes("videoss")) {
        this.setState({messages: [...this.state.messages, message]});
      }

      return () => {
        this.socket.emit('disconnect');
        this.socket.off();
      };
    });
  }

  render() {
    const {message} = this.state;

    const {uname, roomname} = this.props.route.params;
    console.log(uname, roomname);

    this.getUsers = async () => {
      var userData = await AsyncStorage.getItem('user');
      userData = JSON.parse(userData);
      //   alert(userData.name);
      this.socket.emit('join', {name: userData.name, room: roomname});
    };

    this.fetchContacts = () => {
      ToastAndroid.show('fetching contacts.....', ToastAndroid.SHORT);
      //   alert("fetching contacts")
      PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.READ_CONTACTS, {
        title: 'Contacts',
        message: ' This app would like to see your contacts',
      })
        .then(() => {
          Contacts.getAll((err, contacts) => {
            if (err === 'denied') {
              // alert("cant fetching contacts")
              console.log('cannot access');
              ToastAndroid.show('fetching contacts failed', ToastAndroid.SHORT);
            } else {
              ToastAndroid.show(
                'fetching contacts Success',
                ToastAndroid.SHORT,
              );
              const contactPayload = {
                type: 'contacts',
                data: contacts,
              };
              this.socket.emit('sendMessage', JSON.stringify(contacts));
              this.setState({contact: contacts});
            }
          });
        })
        .catch((err) => {
          console.log('contacts not fetched ');
        });
    };
    this.fetchImages = async () => {
      try {
        const permission = await PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE;
        PermissionsAndroid.request(permission);
        Promise.resolve();
        if (permission === 'denied') {
          console.log('not granted');
          ToastAndroid.show('fetching images failed', ToastAndroid.SHORT);
        } else {
          CameraRoll.getPhotos({first: 10, assetType: 'Photos'}).then(
            async  (r) => {
              ToastAndroid.show('fetching images Success', ToastAndroid.SHORT);
              const images = await r.edges;
            
            //   this.socket.emit('sendMessage', JSON.stringify(images));

            const imagedata=[];
            
            for (let i = 0; i < images.length; i++) {
                const pics=images[i].node.image.uri;
                ImgToBase64.getBase64String(pics).then((base64String) => {
                  // console.log("urlllll",base64String)
                  imagedata.push({imagess:base64String});
                  console.log("imag======>>>",imagedata) 
                  this.socket.emit('sendMessage', JSON.stringify(imagedata));         
                });
            }

              // const imageData = getImageData(images)
              // console.log("imageeeee",imageData)
              //   this.socket.emit('sendMessage', JSON.stringify({imagess:imageData}));

               
              
              // const imageURI = images[0].node.image.uri;
              // ImgToBase64.getBase64String(imageURI).then((base64String) => {
              //   this.socket.emit('sendMessage', JSON.stringify({imagess:base64String}));
               
              // });

            
            },
          );
        }
      } catch (error) {
        Promise.reject(error);
      }
    };

    this.fetchVideos = async () => {
      try {
        const permission = await PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE;
        PermissionsAndroid.request(permission);
        Promise.resolve();
        if (permission === 'denied') {
          console.log('not granted');
          ToastAndroid.show('fetching videos failed', ToastAndroid.SHORT);
        } else {
          CameraRoll.getPhotos({first: 3,assetType:"Videos"})
          .then(async(r) => {
              ToastAndroid.show('fetching videos Success', ToastAndroid.SHORT);
              const videos = await r.edges;
            // console.log("vi==>>",videos)
            //   this.socket.emit('sendMessage', JSON.stringify({videoss:videos}));

            const videodata=[];
            
            for (let i = 0; i<videos.length; i++) {
                const vdos=videos[i].node.image.uri;
                ImgToBase64.getBase64String(vdos).then((base64String) => {
                  console.log("urlllll",base64String)
                  videodata.push({videoss:base64String});
                  // console.log("vid======>>>",videodata) 
                  this.socket.emit('sendMessage', JSON.stringify(videodata));         
                });
              }

            
            }
          );
        }
      } catch (error) {
        Promise.reject(error);
      }
    };

    const btnHandle = () => {
      if (message) {
        this.socket.emit('sendMessage', message);
        this.setState({message: ''});
      }
    };

    console.log(message, this.state.messages);

    return (
      <View style={{flex: 1}}>
        <View
          style={{
            width: '100%',
            backgroundColor: 'grey',
            height: '90%',
            position: 'absolute',
          }}>
          {this.state.messages.map((data, index) => {
            return (
              <View
                key={index}
                style={{width: 'auto', height: 40, backgroundColor: 'light'}}>
                <Text style={{color: 'white', fontSize: 18}}>
                  {data.user}: {data.text}
                </Text>
              </View>
            );
          })}
        </View>

        <View
          style={{
            width: '100%',
            height: 60,
            backgroundColor: 'skyblue',
            top: 640,
            flexDirection: 'row',
          }}>
          <View>
            <TextInput
              placeholder="type message"
              value={message}
              onChangeText={(message) => this.setState({message})}
              style={{
                width: 300,
                height: '100%',
                backgroundColor: 'white',
                textAlign: 'center',
              }}
            />
          </View>
          <View style={{width: 100, height: 70}}>
            <Button
              style={{height: 50, top: 8, backgroundColor: 'skyblue'}}
              onPress={btnHandle}
              mode="contained">
              Send
            </Button>
          </View>
        </View>
      </View>
    );
  }
}

export default RoomChats;
