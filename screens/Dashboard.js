import React, {useEffect, useState} from 'react';
import { StyleSheet, View, ActivityIndicator, StatusBar, 
        RefreshControl, FlatList, Keyboard, TextInput, 
        TouchableOpacity, Image, Text, ScrollView} from 'react-native';

import {ApiReddit} from '../services'

import CardPost  from '../components/CardPost'
import { Icon } from 'react-native-eva-icons';

function Index(props) {  

  const [Posts, setPost]          = useState([])
  const [Search, setSearch]       = useState("")
  const [Limit, setLimit]         = useState(100)
  const [NotResult, setNotResult] = useState(false)

  useEffect(()=>{
    const Option = "new/.json"
    GetPosts(Option, Limit)
  },[])


  useEffect(()=>{
    const SearchText = `&q=${Search}`
    if(Search.length > 0){
      const Option = "search.json"
      GetPosts(Option, Limit, SearchText)
    }
  },[Search])


  const GetPosts = (option, limit, search = "")=>{
    setPost([])
    setNotResult(false)
    const Data = ApiReddit.GetData(option, limit, search)

    Data.then((response)=>{

      if(response){
        const FillterData = []
        response.data.data.children.map((item, key)=>{
          if(item.data.link_flair_text == "Shitposting" && item.data.post_hint == "image"){
            FillterData.push(item.data)
          }
        })

        if(FillterData.length == 0){
          setNotResult(true)
        }
        setPost(FillterData)
      }else{
        setNotResult(true)
      }
      
    })
  }

  const renderItem = ({ item }) => (
    <CardPost 
        image        = {item.url}
        title        = {item.title}
        score        = {item.score}
        num_comments = {item.num_comments}
      />
  );
  

  return (
   
    <View style={styles.container}>
        <StatusBar  backgroundColor="transparent" barStyle="dark-content" />

        <TouchableOpacity style={{width: "50%"}} onPress={()=>props.navigation.navigate("CarrouselPermisions")} >
          <Icon name={'settings-2-outline'} width={30} height={30} fill='#262628' 
                    style={{marginLeft : 15, marginBottom : 10, marginTop : "6%"}}
          />
        </TouchableOpacity>
        
        <View style={styles.inputView} >
          <View style={{flexDirection : "row", alignItems : "center", width : "100%"}}>

              <Icon name={'search-outline'} width={30} height={30} fill='#BEBEBE' 
                  style={{marginTop : "2.6%"}}
              />
              <TextInput  
                style={styles.inputText}
                placeholder="Search" 
                placeholderTextColor="#777"
                onChangeText={setSearch}/>
          </View>
        </View>
     
        {
          Posts.length == 0 && !NotResult &&
            <ActivityIndicator size="large" color="#0B4E6B" />
        }

        {
          !NotResult &&

            <FlatList
              data={Posts}
              renderItem={renderItem}
              keyExtractor={item => item.id}
              onScrollEndDrag={() => Keyboard.dismiss() }
              onScrollBeginDrag={() => Keyboard.dismiss() }
              refreshControl = {
                <RefreshControl 
                    tintColor = {'red'}
                    onRefresh = {() => GetPosts("new/.json", Limit)}
                    refreshing = {false}
                    
                />
              }
            />
        }


        {
          NotResult &&
            <ScrollView 
              contentContainerStyle={styles.scrollView}
              refreshControl={
                <RefreshControl 
                  tintColor = {'red'}
                  onRefresh = {() => GetPosts("new/.json", Limit)}
                  refreshing = {false}
              />
              }>
              <Image style={styles.image}
              source={require('../src/images/not_result.png')} />

              <View style={styles.description}>
                <Text style={{...styles.descriptionText, fontSize : 30}}>No Results</Text>
                <Text style={styles.descriptionText}>Sorry, there are no results for this search. Please try another phrase</Text>
              </View>
            </ScrollView>
        }
        
        
    </View>
  );

}

export default Index;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },

  inputView:{
    width:"90%",
    height:50,
    marginBottom:5,
    justifyContent:"center",
    alignSelf : "center",
    textAlign: "center",
    borderRadius: 7,
    backgroundColor : "#EDEDED",
    paddingLeft : 10
  },

  inputText:{
    width : "100%",
    height:50,
    color:"#BEBEBE"
  },
  image: {
    width: 200,
    height: 200,
    alignSelf : "center"
  },
  description : {
    width : "80%",
    marginBottom : 20
  },
  descriptionText : {
    textAlign : "center",
    color : "black",
    fontSize : 16,
    marginBottom: 10,
    color : "#262628"
  },

  scrollView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

});