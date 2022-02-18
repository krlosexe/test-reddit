import React from 'react';
import { Text, StyleSheet, View, Image } from "react-native";
import { Icon } from 'react-native-eva-icons';
function Index(props) {
  
  return (
    <View style={styles.contentCard}>

       <Image style={styles.image} source={{
            uri: props.image,
        }}/>
        
        <View style={styles.descriptionContent}>
            <View style={styles.descriptionCount}>
                <Icon name={'chevron-up-outline'} width={30} height={30} fill='#777'/>
                <Text>{props.score}</Text>
                <Icon name={'chevron-down-outline'} width={30} height={30} fill='#777'/>
            </View>
            <View style={styles.descriptionTitle}>
                <Text style={styles.descriptionTitleText}>{props.title}</Text>
                <View style={styles.descriptionCountComment}>
                    <Icon name={'message-square-outline'} width={25} height={25} fill='#777'/>
                    <Text style={{marginLeft: 5}}>{props.num_comments}</Text>
                </View>
            </View>
        </View>
        
    </View>
 )
}

const styles = StyleSheet.create({

    contentCard : {
        width : "90%",
        marginTop: 30,
        marginBottom: 20,
        alignSelf : "center",
        borderRadius: 1,
    },
    image : {
       width : "100%",
       height : 200,
       borderTopLeftRadius : 10,
       borderTopRightRadius : 10
    },
    descriptionContent : {
        flexDirection : "row",
        padding : 10,
        borderWidth : 1,
        borderTopWidth : 0,
        borderColor : "#eee",
        borderBottomEndRadius : 10,
        borderBottomLeftRadius : 10
    },
    descriptionCount : {
        width : "10%",
        flexDirection : "column",
        alignItems : "center"
    },
    descriptionTitle : {
        width: "88%",
        marginLeft : 20,
        marginTop : 5
    },
    descriptionTitleText : {
        fontSize : 18,
        color : "#262628"
    },
    descriptionCountComment : {
        flexDirection : "row",
        alignItems : "center",
        marginTop : 20
    }
});
export default Index;