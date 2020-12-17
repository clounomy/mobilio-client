import React from 'react';
import {View,Text} from "react-native";
import MusicFiles from "react-native-get-music-files"

class Musics extends React.Component {
// componentDidMount(){
//    this.getAll()
// }
    render(){


        // this.getAll = () => {
        //     MusicFiles.getAll({
        //       cover:true,
        //       batchSize: 0,
        //       batchNumber: 0,
        //       sortBy: Constants.SortBy.Title,
        //       sortOrder: Constants.SortOrder.Ascending,
        //     }).then(f => {
        //         // this.setState({...this.state, search: f});
        //         console.log(f)
        //       }).catch(err=>console.log("---error---",err))
              
        //   };

    return (
       <View>
           <Text>music screen</Text>
       </View>
    )
};
};

export default Musics;
