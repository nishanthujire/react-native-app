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

export default function Overs() {
  let [flatListItemsOv, setFlatListItemsOv] = useState([]);

  useEffect(() => {
    db.transaction((tx) => {
      tx.executeSql(
        'SELECT * FROM overs where match_id=?',
        [global.match_id2],
        (tx, results) => {
          var temp = [];
          for (let i = 0; i < results.rows.length; ++i)
            temp.push(results.rows.item(i));
          setFlatListItemsOv(temp);
        }
      );
    });
  });

  let listViewItemSeparator = () => {
    return (
      <View
        style={{
          height: 0.2,
          width: '100%',
          backgroundColor: '#808080'
        }}
      />
    );
  };


  let listItemView = (item) => {
    var eachovrrun = [];
    eachovrrun = JSON.parse(item.balls);

    return (
      <View>
        <View style={styles.container2}>
          <Text>Ov {item.overno + 1}</Text>
          <Text style={{ marginLeft: 40 }}>{item.bowler} to {item.striker} & {item.nonstriker}</Text>
        </View>
        <View style={styles.container2}>
          <Text style={{ marginTop: 5, marginRight: 10 }}>{item.overun} Runs</Text>

          {eachovrrun.map(run => <View style={styles.circle} >
              <Text style={styles.text} key={run.toString()}>{run}</Text></View>
          )}



        </View>



        <View
          style={{
            marginTop: 5,
            borderBottomColor: 'black',
            borderBottomWidth: 0.5,
          }}

        />
      </View>


    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={flatListItemsOv}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => listItemView(item)}
      />
    </View>




  );
}
const styles = StyleSheet.create({
  container: { flex: 1, margin: 5, backgroundColor: '#ececec' },
  container2: {
    marginBottom: 2,
    flexDirection: 'row',
    padding: 5


  },
  circle: {
    marginLeft: 5,
    width: 30,
    height: 30,
    borderRadius: 30 / 2,
    backgroundColor: "#fff",
  },
  circle2: {
    marginLeft: 5,
    width: 30,
    height: 30,
    borderRadius: 30 / 2,
    backgroundColor: "red",
  },
  circle3: {
    marginLeft: 5,
    width: 30,
    height: 30,
    borderRadius: 30 / 2,
    backgroundColor: "green",
  },
  text: {
    padding: 4,
    marginLeft: 6

  }
});