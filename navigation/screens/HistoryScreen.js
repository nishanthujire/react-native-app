import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, SafeAreaView, FlatList } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import * as SQLite from 'expo-sqlite';
//db creaion
const db = SQLite.openDatabase('db.bz') // returns Database object

export default function SettingsScreen({ navigation }) {
  let [flatListItemsH, setFlatListItemsH] = useState([]);

  useEffect(() => {
    db.transaction((tx) => {
      tx.executeSql(
        'SELECT * FROM result',
        [],
        (tx, results) => {
          var temp = [];
          for (let i = 0; i < results.rows.length; ++i)
            temp.push(results.rows.item(i));
          setFlatListItemsH(temp);
        }
      );
    });

  });


  let listItemView = (item) => {
    //var m_id = item.match_id;
    return (
      //   match_id,team1,score1,' +
      // 'team2,score2,results

      <View style={styles.contentBody}>
        <Text style={{ marginBottom: 5 }}>{item.date}</Text>
        <View style={styles.card}>
          <Text style={styles.text}>{item.team1}</Text>
          <Text style={styles.text}>{item.score1}</Text>


        </View>
        <View style={{
          flexDirection: 'row',
          justifyContent: 'space-between', marginTop: 5
        }}>
          <Text style={styles.text}>{item.team2}</Text>
          <Text style={styles.text} >{item.score2}</Text>

        </View>
        <Text style={{ marginTop: 5 }}>{item.results}</Text>

        <View style={{ marginTop: 10, flex: 1 }}>
          <View style={styles.row}>
            <TouchableOpacity onPress={() => navigation.navigate('ScoreBoardScreen', {
              match_id: item.match_id, team1: item.team1, team2: item.team2, score1: item.score1, score2: item.score2, result: item.results,team1rr:item.team1rr,team2rr:item.team2rr
            })}>
              <Text style={{ marginTop: 5, marginLeft: 60, width: 200 }}>Scoreboard</Text>
            </TouchableOpacity>


            {/* <TouchableOpacity
              onPress={() => Achive()}>
              <Ionicons name="archive-sharp" size={23} color="black"></Ionicons>
            </TouchableOpacity> */}
            <TouchableOpacity
              onPress={() => Delete(item)}>
              <Ionicons name='trash-sharp' size={23} color="black" />
            </TouchableOpacity>
          </View>
        </View>



      </View>



    );
  };
  const Achive = () =>
    Alert.alert("Archive this match?", "you can find this match in archive section.",
      [
        { text: "Cancel", onPress: () => console.log("Cancel Pressed"), style: "cancel" },
        { text: "Archive", onPress: () => console.log("OK Pressed") }
      ]
    );
  const Delete = (item) =>
    Alert.alert("Delete this match?", "Are you sure you want to delete this match?  All the player statistics associated with this match will also be deleted.",
      [
        { text: "Cancel", onPress: () => console.log("Cancel Pressed"), style: "cancel" },
        { text: "yes", onPress: () => { deleteMatchData(item) } }
      ]
    );

  const deleteMatchData = (item) => {
    db.transaction(tx => {
      tx.executeSql(
        'delete from result  where match_id = ? ', [item.match_id],
      )
    })


  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1, backgroundColor: 'white' }}>
        <View style={{ flex: 1 }}>
          <FlatList
            data={flatListItemsH}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => listItemView(item)}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1

  },
  contentBody: {
    margin: 5,
    padding: 10,
    backgroundColor: 'white',
    borderRadius: 10,
    elevation: 3,
    marginLeft: 15,
    marginRight: 15,
    shadowColor: '#171717',



  },
  card: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  text: {

    fontWeight: 'bold',
    fontSize: 15
  },
  row: {
    flexDirection: 'row',
    // alignItems: 'center',
    // alignItems:'stretch',
    // marginTop:5,
    flex: 1,
    justifyContent: 'space-between',




  }

});