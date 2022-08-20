import * as React from 'react';
import { StatusBar } from "expo-status-bar";
import { View, Text, Image, Button, Modal, Dimensions, width, SafeAreaView } from 'react-native';
import { StyleSheet, FlatList, TouchableOpacity, Alert } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { useState, useEffect } from "react";
import { useNavigation } from '@react-navigation/native';
import * as SQLite from 'expo-sqlite';

//db creaion
const db = SQLite.openDatabase('db.bz') // returns Database object



export default function TeamsScreen() {
  let [flatListItems, setFlatListItems] = useState([]);

  useEffect(() => {
    let isMounted = true;

      if (isMounted) {
        db.transaction((tx) => {
          tx.executeSql(
            'SELECT * FROM teams',
            [],
            (tx, results) => {
              var temp = [];
              for (let i = 0; i < results.rows.length; ++i)
                temp.push(results.rows.item(i));
              setFlatListItems(temp);
            }
          );
        });

      }

    return () => {
      isMounted = false;
    };

  },[flatListItems]);
  

  
   
  const navigation = useNavigation();

  //funtion to delete team
  const DeleteTeam = (item) =>
    Alert.alert("Delete team ?", "Are you sure you want to delete this team?   All the associated matches and players stats of this team will not be deleted.",
      [
        { text: "Cancel", onPress: () => console.log("Cancel Pressed"), style: "cancel" },
        { text: "Yes", onPress: () => {deleteTeamsData(item)}},
      ]
    );

  const deleteTeamsData = (item)=> {
    db.transaction(tx => {
      tx.executeSql(
        'delete from teams  where team_id = ?',[item.team_id],
      )
    })

    db.transaction(tx => {
      tx.executeSql(
        'delete from players  where team_id = ?',[item.team_id],
      )
    })


  }
  //function to navigate to team_details
  const navigatePlayerDetails = (item) => {
    var team_id = item.team_id;
    var team = item.team_name;
    //navigating to Team_Details screen
    navigation.navigate('Team_Details', {
      teamid: team_id,team:team
    });

  };

  let listItemView = (item) => {
    //function to show the user flatlist item views

    //onPress={() => navigation.navigate('Team_Details') }

    return (
      <View style={[styles.listItem]}>

        <Image source={require('../screens/image/profile.jpg')} style={{ width: 50, height: 50, borderRadius: 30 }} />
        <TouchableOpacity style={{ marginLeft: 15, marginTop: 5, flex: 1 }}
          onPress={() => navigatePlayerDetails(item)} >
          <Text style={{ fontWeight: "bold" }}>{item.team_name}</Text>
          <View style={styles.row}>

            <Text style={{ marginTop: 5 }}>Matches: </Text>
            <Text style={{ marginTop: 6 }}>{item.total_matches}</Text>
            <Text style={{ marginTop: 5, marginLeft: 15, }}>won : </Text>
            <Text style={{ marginTop: 6 }}>{item.won}</Text>
            <Text style={{ marginTop: 5, marginLeft: 15, }}>Lost : </Text>
            <Text style={{ marginTop: 6 }}>{item.lost}</Text>
          </View>
        </TouchableOpacity>


        <View style={styles.icon}>
          <TouchableOpacity onPress={() => navigation.navigate('UpdateTeam',{team_id:item.team_id,team_name:item.team_name}) }  >
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
            data={flatListItems}
            //ItemSeparatorComponent={listViewItemSeparator}
            keyExtractor={(item) => item.team_id}
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
    padding: 2,
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
    marginTop: 15,
    marginRight: 10,
    height: 50,
    width: 50,
    justifyContent: "center",
    alignItems: "center"
  },
  icn: {
    marginRight: 10,
  }
  
});




