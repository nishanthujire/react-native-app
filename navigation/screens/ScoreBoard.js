import * as React from 'react';
import { StatusBar } from "expo-status-bar";
import { View, Text, Image, Button, Modal, Dimensions, width, SafeAreaView } from 'react-native';
import { FlatList, TouchableOpacity, Alert, ScrollView } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { useState, useEffect } from "react";
import { StyleSheet } from 'react-native';
import { DataTable } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import * as SQLite from 'expo-sqlite';

//db creaion
const db = SQLite.openDatabase('db.bz') // returns Database object

const ScoreBoard = ({ navigation, route }) => {
  let [flatListItems, setFlatListItems] = useState([]);
  let [flatListItems2, setFlatListItems2] = useState([]);
  let [flatListItems3, setFlatListItems3] = useState([]);
  let [flatListItems4, setFlatListItems4] = useState([]);





  useEffect(() => {
    var match_id = global.match_id2;
    console.log("details match_id : ", match_id);


    fetchBatData();
    fetchBatData2();

    fetchBowlData();
    fetchBowlData2();


  }, []);

  const fetch = () => {

  }

  //fetching batting data
  const fetchBatData = () => {
    var match_id = global.match_id2;
    console.log("details match_id : ", match_id);
    db.transaction((tx) => {
      tx.executeSql(
        'SELECT * FROM batting where match_id = ? and innings = ?',
        [match_id, 1],
        (tx, results) => {
          var temp = [];
          for (let i = 0; i < results.rows.length; ++i)
            temp.push(results.rows.item(i));
          setFlatListItems(temp);
        }
      );
    });

  }

  //fetching batting data
  const fetchBatData2 = () => {
    var match_id = global.match_id2;
    console.log("details match_id : ", match_id);
    db.transaction((tx) => {
      tx.executeSql(
        'SELECT * FROM batting where match_id = ? and innings = ?',
        [match_id, 2],
        (tx, results) => {
          var temp = [];
          for (let i = 0; i < results.rows.length; ++i)
            temp.push(results.rows.item(i));
          setFlatListItems3(temp);
        }
      );
    });

  }



  //fetching bowling data
  const fetchBowlData = () => {
    var match_id = global.match_id2;
    console.log("details match_id : ", match_id);

    db.transaction((tx) => {
      tx.executeSql(
        'SELECT bowler_name as name,over as over,maiden as maiden,bowler_run as run,wickets as wicket,economy as eco FROM bowling where match_id = ? and innings = ?',
        [match_id, 1],
        (tx, results) => {
          var temp = [];
          for (let i = 0; i < results.rows.length; ++i)
            temp.push(results.rows.item(i));
          setFlatListItems2(temp);
        }
      );
    });

  }

  //fetching bowling data
  const fetchBowlData2 = () => {
    var match_id = global.match_id2;
    console.log("details match_id : ", match_id);

    db.transaction((tx) => {
      tx.executeSql(
        'SELECT bowler_name as name,over as over,maiden as maiden,bowler_run as run,wickets as wicket,economy as eco FROM bowling where match_id = ? and innings = ?',
        [match_id, 2],
        (tx, results) => {
          var temp = [];
          for (let i = 0; i < results.rows.length; ++i)
            temp.push(results.rows.item(i));
          setFlatListItems4(temp);
        }
      );
    });

  }



  let listItemView = (item) => {

    //seting precison to one float
    var sr = Number(item.strikerate);
    sr = sr.toFixed(1);
    sr = Number(sr);

    var out = item.out_type
    var supports = item.support;
    var type;
    var bowler = item.bowler;
    //describing out put type in short form
    switch (out) {
      case "bowled": {
        type = 'b ' + bowler;
        supports = "";
        break;
      }
      case "catch out": {
        type = 'c ' + supports;
        supports = 'b ' + bowler;
        break;
      }
      case "run out striker": {
        type = 'Run out ' + "(" + supports + ")";
        supports = "";
        break;
      }
      case "run out non-striker": {
        type = 'Run out ' + "(" + supports + ")";
        supports = ""
        break;
      }
      case "stumping": {
        type = 'st ' + supports;
        supports = 'b ' + bowler;
        break;
      }
      case "lbw": {
        type = 'lbw b ' + bowler;
        supports = "";
        break;

      }
      case "hit wicket": {
        type = 'Hit wicket';
        supports = "";
        break;
      }
      
      case "Retired": {
        type = 'Retired - Not out';
        supports = "";
        break;
      }

      default: {
        type = 'not out';
        supports = "";
      }
        break;
    }

    return (


      <DataTable.Row>
        <DataTable.Cell style={{ flex: 3 }}><View style={{ flexDirection: 'column' }}>
          <Text >{item.batsman_name} </Text>
          <Text style={{ fontSize: 13 }}>{type} {supports}</Text>
        </View></DataTable.Cell>
        <DataTable.Cell style={{ flex: 1 }}>{item.run}</DataTable.Cell>
        <DataTable.Cell style={{ flex: 1 }}>{item.ball}</DataTable.Cell>
        <DataTable.Cell style={{ flex: 1 }}>{item.six}</DataTable.Cell>
        <DataTable.Cell style={{ flex: 1 }}>{item.four}</DataTable.Cell>
        <DataTable.Cell style={{ flex: 1 }}>{sr}</DataTable.Cell>



      </DataTable.Row>
    );
  };

  let listItemView2 = (item) => {
    return (


      <DataTable.Row>
        <DataTable.Cell style={{ flex: 3 }}>{item.name}</DataTable.Cell>
        <DataTable.Cell style={{ flex: 1 }}>{item.over}</DataTable.Cell>
        <DataTable.Cell style={{ flex: 1 }}>{item.maiden}</DataTable.Cell>
        <DataTable.Cell style={{ flex: 1 }}>{item.run}</DataTable.Cell>
        <DataTable.Cell style={{ flex: 1 }}>{item.wicket}</DataTable.Cell>
        <DataTable.Cell style={{ flex: 1 }}>{item.eco}</DataTable.Cell>



      </DataTable.Row>
    );
  };

  let listItemView3 = (item) => {

    //seting precison to one float
    var sr = Number(item.strikerate);
    sr = sr.toFixed(1);
    var out = item.out_type
    var supports = item.support;
    var type;
    var bowler = item.bowler;
    //describing out put type in short form
    switch (out) {
      case "bowled": {
        type = 'b ' + bowler;
        supports = "";
        break;
      }
      case "catch out": {
        type = 'c ' + supports;
        supports = 'b ' + bowler;
        break;
      }
      case "run out striker": {
        type = 'Run out ' + "(" + supports + ")";
        supports = "";
        break;
      }
      case "run out non-striker": {
        type = 'Run out ' + "(" + supports + ")";
        supports = ""
        break;
      }
      case "stumping": {
        type = 'st ' + supports;
        supports = 'b ' + bowler;
        break;
      }
      case "lbw": {
        type = 'lbw b ' + bowler;
        supports = "";
        break;

      }
      case "hit wicket": {
        type = 'Hit wicket';
        supports = "";
        break;
      }

      case "Retired": {
        type = 'Retired - Not out';
        supports = "";
        break;
      }

      default: {
        type = 'not out';
        supports = "";
      }
        break;
    }




    return (


      <DataTable.Row>
        <DataTable.Cell style={{ flex: 3 }}><View style={{ flexDirection: 'column' }}>
          <Text >{item.batsman_name} </Text>
          <Text style={{ fontSize: 13 }}>{type} {supports}</Text>
        </View></DataTable.Cell>
        <DataTable.Cell style={{ flex: 1 }}>{item.run}</DataTable.Cell>
        <DataTable.Cell style={{ flex: 1 }}>{item.ball}</DataTable.Cell>
        <DataTable.Cell style={{ flex: 1 }}>{item.six}</DataTable.Cell>
        <DataTable.Cell style={{ flex: 1 }}>{item.four}</DataTable.Cell>
        <DataTable.Cell style={{ flex: 1 }}>{sr}</DataTable.Cell>



      </DataTable.Row>
    );
  };

  let listItemView4 = (item) => {
    return (


      <DataTable.Row>
        <DataTable.Cell style={{ flex: 3 }}>{item.name}</DataTable.Cell>
        <DataTable.Cell style={{ flex: 1 }}>{item.over}</DataTable.Cell>
        <DataTable.Cell style={{ flex: 1 }}>{item.maiden}</DataTable.Cell>
        <DataTable.Cell style={{ flex: 1 }}>{item.run}</DataTable.Cell>
        <DataTable.Cell style={{ flex: 1 }}>{item.wicket}</DataTable.Cell>
        <DataTable.Cell style={{ flex: 1 }}>{item.eco}</DataTable.Cell>



      </DataTable.Row>
    );
  };
   //global variables defined in Scoreboard container
  var team1 = global.team1;
  //console.log("team 1 : ", team1);
  var team2 = global.team2;
  //console.log("team 2 : ", team2);
  var score1 = global.score1;
  //console.log("score 1 : ", score1);
  var score2 = global.score2;
 // console.log("score 2 : ", score2);
  var result = global.result;
  //console.log("reslut is : ", result);

  var team1rr = global.team1rr;
  var team2rr = global.team2rr;


  





  return (
    <ScrollView>
      <View style={{ flex: 1, backgroundColor: 'white' }}>

        <View style={styles.titlecontainer}>
          <Text>{result}</Text>



        </View>
        <View style={styles.namecontainer}>
          <Text style={{ color: '#fff', fontSize: 15 }}>{team1}</Text>
          <Text style={{ color: '#fff', fontSize: 15 }}>{score1}</Text>


        </View>
        <DataTable style={styles.container}>

          <DataTable.Header style={styles.tableHeader}>
            <DataTable.Title style={{ flex: 3 }}>Batsman</DataTable.Title>
            <DataTable.Title>R</DataTable.Title>
            <DataTable.Title>B</DataTable.Title>
            <DataTable.Title>6s</DataTable.Title>
            <DataTable.Title>4s</DataTable.Title>
            <DataTable.Title>SR</DataTable.Title>





          </DataTable.Header>
          <FlatList
            data={flatListItems}
            // ItemSeparatorComponent={listViewItemSeparator}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => listItemView(item)}
          />
        </DataTable>
        <View style={styles.namecontainer2}>
          <Text >Extras</Text>
          <Text >0,0 B,0 NB,0 LB,0 WD 0 P</Text>


        </View>
        <View style={styles.namecontainer2}>
          <Text>Total</Text>
          <Text>{score1} {team1rr}</Text>


        </View>
        <DataTable style={styles.container}>
          <DataTable.Header style={styles.tableHeader}>
            <DataTable.Title style={{ flex: 3 }}>Bowler</DataTable.Title>
            <DataTable.Title>O</DataTable.Title>
            <DataTable.Title>M</DataTable.Title>
            <DataTable.Title>R</DataTable.Title>
            <DataTable.Title>W</DataTable.Title>
            <DataTable.Title>ER</DataTable.Title>





          </DataTable.Header>
          <FlatList
            data={flatListItems2}
            // ItemSeparatorComponent={listViewItemSeparator}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => listItemView2(item)}
          />
        </DataTable>

        {/* __________________________________________ */}

        <View style={styles.namecontainer}>
          <Text style={{ color: '#fff', fontSize: 15 }}>{team2}</Text>
          <Text style={{ color: '#fff', fontSize: 15 }}>{score2}</Text>


        </View>
        <DataTable style={styles.container}>

          <DataTable.Header style={styles.tableHeader}>
            <DataTable.Title style={{ flex: 3 }}>Batsman</DataTable.Title>
            <DataTable.Title>R</DataTable.Title>
            <DataTable.Title>B</DataTable.Title>
            <DataTable.Title>6s</DataTable.Title>
            <DataTable.Title>4s</DataTable.Title>
            <DataTable.Title>SR</DataTable.Title>





          </DataTable.Header>
          <FlatList
            data={flatListItems3}
            // ItemSeparatorComponent={listViewItemSeparator}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => listItemView3(item)}
          />
        </DataTable>
        <View style={styles.namecontainer2}>
          <Text >Extras</Text>
          <Text >0,0 B,0 NB,0 LB,0 WD 0 P</Text>


        </View>
        <View style={styles.namecontainer2}>
          <Text>Total</Text>
          <Text>{score2} {team2rr}</Text>


        </View>
        <DataTable style={styles.container}>
          <DataTable.Header style={styles.tableHeader}>
            <DataTable.Title style={{ flex: 3 }}>Bowler</DataTable.Title>
            <DataTable.Title>O</DataTable.Title>
            <DataTable.Title>M</DataTable.Title>
            <DataTable.Title>R</DataTable.Title>
            <DataTable.Title>W</DataTable.Title>
            <DataTable.Title>ER</DataTable.Title>





          </DataTable.Header>
          <FlatList
            data={flatListItems4}
            // ItemSeparatorComponent={listViewItemSeparator}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => listItemView4(item)}
          />
        </DataTable>

      </View>
    </ScrollView>

  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  tableHeader: {
    backgroundColor: 'rgb(193,212,193)',
  },
  namecontainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    backgroundColor: 'green',
    marginLeft: 5,






  },
  titlecontainer: {
    padding: 15,
    marginLeft: 5,

  },
  namecontainer2: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 5,
    margin: 5,




  }
});

export default ScoreBoard;

