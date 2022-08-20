import * as React from 'react';
import { StatusBar } from "expo-status-bar";
import { View, Text, Image, Button, Modal, Dimensions, width, SafeAreaView } from 'react-native';
import { StyleSheet, FlatList, TouchableOpacity, Alert } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Dialog from "react-native-dialog";
import { useState, useEffect } from "react";
import { useNavigation } from '@react-navigation/native';
import * as SQLite from 'expo-sqlite';

//db creaion
const db = SQLite.openDatabase('db.bz') // returns Database object




export default function TeamsDetails({ route }) {
  let [flatPlayerListItems, setFlatPlayerListItems] = useState([]);
  //getting teams id data
  const team_id = route.params.teamid;
  //console.log("team id : ", team_id);
  const team = route.params.team;
  //console.log("team : ", team);

  useEffect(() => {
    let isMounted = true;

      if (isMounted) {
        db.transaction((tx) => {
          tx.executeSql(
            'SELECT * FROM players where team_id = ?',
            [team_id],
            (tx, results) => {
              var temp = [];
              for (let i = 0; i < results.rows.length; ++i)
                temp.push(results.rows.item(i));
              setFlatPlayerListItems(temp);
            }
          );
        });

      }

    return () => {
      isMounted = false;
    };

  },[flatPlayerListItems]);

  

  
  const navigation = useNavigation();

  //delete a players data
  const DeleteTeam = (item) =>
    Alert.alert("Delete Player", "are you sure you want to delete this player?   All the matches playes by this payer will not be deleted",
      [
        { text: "Cancel", onPress: () => console.log("Cancel Pressed"), style: "cancel" },
        { text: "Yes", onPress: () => {deletePlayerData(item)}}
      ]
    );

    const deletePlayerData = (item)=> {
      db.transaction(tx => {
        tx.executeSql(
          'delete from players  where team_id = ? and player_id = ?',[item.team_id,item.player_id],
        )
      })
  
  
    }


  // const navigatePlayerDetails = (item) => {
  //   var team_id = item.team_id;
  //   navigation.navigate('Team_Details')

  // };

  let listItemView = (item) => {
    //function to show the user flatlist item views

    //onPress={() => navigation.navigate('Team_Details') }

    return (
      <View style={[styles.listItem]}>
        <Image source={require('../screens/image/profile.jpg')} style={{ width: 50, height: 50, borderRadius: 30 }} />
        <TouchableOpacity style={{ marginLeft: 15, marginTop: 5, flex: 1 }}
          onPress={() => { navigation.navigate('PlayerDetails', {
              player: item.player_name,team:team, });}} >
          <Text style={{ fontWeight: "bold", marginTop: 15 }}>{item.player_name}</Text>
        </TouchableOpacity>


        <View style={styles.icon}>
          <TouchableOpacity onPress={() => navigation.navigate('UpdatePlayer',{id:item.player_id,name:item.player_name,team:team,t_id:team_id}) } >
            <Ionicons style={styles.icn} name="pencil-sharp" size={23} color="black"></Ionicons>
          </TouchableOpacity>
          
          <TouchableOpacity
            onPress={() => DeleteTeam(item)}>
            <Ionicons name='trash-sharp' size={23} color="black" />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1, backgroundColor: 'white' }}>
        <View style={{ flex: 1 }}>
          <FlatList
            data={flatPlayerListItems}
            //ItemSeparatorComponent={listViewItemSeparator}
            keyExtractor={(item) => item.player_id}
            renderItem={({ item }) => listItemView(item)}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  card: {
    flex: 1,
    backgroundColor: '#F7F7F7'
  },

  listItem: {
    margin: 5,
    padding: 5,
    backgroundColor: "#FFF",
    width: "95%",
    flex: 1,
    alignSelf: "center",
    flexDirection: "row",
    borderRadius: 13,
    elevation: 10,
    shadowColor: '#171717',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    alignItems: 'flex-start',
    flex: 3,
  },
  icon: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginTop: 5,
    marginRight: 10,
    height: 50,
    width: 50,
    justifyContent: "center",
    alignItems: "center"
  },
  icn: {
    marginRight: 10,
  },
  
});




