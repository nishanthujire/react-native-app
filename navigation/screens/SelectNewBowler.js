import { setStatusBarHidden } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Button, Alert } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
// import AntDesign from 'react-native-vector-iconsAntDesign';
import { RadioButton } from 'react-native-paper';
import * as SQLite from 'expo-sqlite';
//db creaion
const db = SQLite.openDatabase('db.bz') // returns Database object



export default SelectNewBowler = ({ route, navigation }) => {
  const [bowler, setbowler] = useState(null);
  const [bowling, setbowling] = useState('');

  useEffect(() => {
    //getting batting & bowling teams data
    const bowlingteam = route.params.bowling;
    console.log("bowling : ", bowlingteam);
    setbowling(bowlingteam);

  }, []);
  var batting_team_id, bowling_team_id;


  return (
    <View style={styles.container}>
      <Text style={styles.titleText}>
        Select a new bowler
      </Text>
      <TextInput
        style={styles.input}
        placeholder="Name"
        onChangeText={(value) => setbowler(value)}


      />
      <TouchableOpacity style={styles.button} onPress={() => {
        if (!bowler) {
          alert("Please type Bowler name")
        }
        else {

          //fething bowling teams team_id
          db.transaction((tx) => {
            tx.executeSql(
              "SELECT team_id FROM teams where team_name = ?",
              [bowling],
              (tx, results) => {
                var len = results.rows.length;
                console.log('len is ', len);

                if (len > 0) {
                  var teams_id2 = results.rows.item(0).team_id;
                  bowling_team_id = teams_id2;

                  console.log("bowling id is", bowling_team_id);



                }
              }
            )
          })
          //checking new bowler  data exist or not in table
          db.transaction((tx) => {
            tx.executeSql(
              "SELECT * FROM players where player_name = ? and team_id = ?", [bowler, bowling_team_id],
              (tx, results) => {
                var len = results.rows.length;
                //console.log('len is ', len)

                if (len > 0) {
                  console.log('new bowler data already exist')


                }
                else {

                  //inserting bowler data into players table
                  db.transaction(tx => {

                    tx.executeSql('INSERT INTO players (player_name,team_id) VALUES (?,?)', [bowler, bowling_team_id],
                      (tx, results) => {
                        console.log('Results', results.rowsAffected);
                        if (results.rowsAffected > 0) {
                          console.log('inserted new bowler data');

                        }
                      },
                      (tx, error) => console.log('Error', error))
                  });
                }
              }
            )
          });
          //sending retired player data into fitst inning screen
          navigation.navigate({
            name: 'FirstInningsScreen',
            params: { bowler: bowler },
            merge: true,
          });
        }
      }}>
        <Text style={styles.buttonText} >Done</Text>
      </TouchableOpacity>
    </View>
  );
};



const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 16,
    //marginTop: 30,
  },
  input: {
    height: 40,
    borderWidth: 1, padding: 10,
    marginBottom: 20,
    borderRadius: 10,
    borderColor: 'green',
  },
  button: {
    backgroundColor: "green",
    padding: 12,
    borderRadius: 10,
    alignItems: 'center',

  },
  buttonText: {
    color: "white",
    fontSize: 20,
    alignItems: 'center'
  },
  titleText: {
    fontSize: 15,
    fontWeight: "bold",
    color: 'green',
    marginBottom: 5

  },
  sectitleText: {
    fontSize: 15,
    fontWeight: "bold",
    color: 'green',
    marginBottom: 20
  },
  dropdown: {
    marginBottom: 20,
    height: 50,
    borderColor: 'gray',
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: 'absolute',
    backgroundColor: 'white',
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
  radiobutton: {
    flexDirection: 'row',
  },

});