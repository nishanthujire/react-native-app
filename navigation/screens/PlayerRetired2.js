import { setStatusBarHidden } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Button } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
// import AntDesign from 'react-native-vector-iconsAntDesign';
import { RadioButton } from 'react-native-paper';
import * as SQLite from 'expo-sqlite';
//db creaion
const db = SQLite.openDatabase('db.bz') // returns Database object



export default PlayerRetired = ({ route, navigation }) => {
  const [name, setName] = useState(null);
  const [choice, setChoice] = useState("a");
  const [bat, setbat] = useState('');
  var val;

  //getting batting & bowling teams data
  const strikername = route.params.striker;
  console.log("striker : ", strikername);
  const nonstrikername = route.params.nonstriker;
  console.log("non striker :", nonstrikername);


  var batting_team_id;
  useEffect(() => {
    const batting = route.params.batting;
    console.log(" batting:", batting);
    setbat(batting);
  });



  return (
    <View style={styles.container}>
      <Text style={styles.titleText}>
        Select player to retire
      </Text>

      <RadioButton.Group onValueChange={newValue => setChoice(newValue)} value={choice} >
        <View style={styles.radiobutton}>

          <RadioButton color='green' value={strikername} />
          <Text style={{ marginTop: 7 }}>{strikername}</Text>
        </View>
        <View style={{ flexDirection: 'row', }}>

          <RadioButton color='green' value={nonstrikername} />
          <Text style={{ marginTop: 7 }}>{nonstrikername}</Text>
        </View>
      </RadioButton.Group>

      <Text style={styles.sectitleText}>
        Replaced by?
      </Text>
      <TextInput
        style={styles.input}
        placeholder="Enter Player name"
        onChangeText={(value) => setName(value)}


      />
      <TouchableOpacity style={styles.button} onPress={() => {
        //data insertion
        if (!name) {
          alert('Please fill player details.');
          return;
        }

        //fething batting teams team_id

        db.transaction((tx) => {
          tx.executeSql(
            "SELECT team_id FROM teams where team_name = ?",
            [bat],
            (tx, results) => {
              var len = results.rows.length;
              console.log('len is ', len);

              if (len > 0) {
                var teams_id = results.rows.item(0).team_id;
                batting_team_id = teams_id;

                console.log("batting id is", batting_team_id);



              }
            }
          )
        })

        //checking batsman  data exist or not in table
        db.transaction((tx) => {
          tx.executeSql(
            "SELECT * FROM players where player_name = ? and team_id = ?", [name, batting_team_id],
            (tx, results) => {
              var len = results.rows.length;
              //console.log('len is ', len)

              if (len > 0) {
                console.log('replaced batsman data already exist 2')


              }
              else {

                //inserting striker data into players table
                db.transaction(tx => {

                  tx.executeSql('INSERT INTO players (player_name,team_id) VALUES (?,?)', [name, batting_team_id],
                    (tx, results) => {
                      console.log('Results', results.rowsAffected);
                      if (results.rowsAffected > 0) {
                        console.log('inserted replaced batsman data 2');

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
          name: 'SecondInnings',
          params: { retired: choice, replaced: name },
          merge: true,
        });
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