import { setStatusBarHidden } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Button, Alert, Image ,BackHandler} from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
// import AntDesign from 'react-native-vector-iconsAntDesign';
import { RadioButton } from 'react-native-paper';
import * as SQLite from 'expo-sqlite';
//db creaion
const db = SQLite.openDatabase('db.bz') // returns Database object
//Import Library to make a cannon
import ConfettiCannon from 'react-native-confetti-cannon';


export default Matchtie = ({ route, navigation }) => {
  const [shoot, setShoot] = useState(false);

  useEffect(() => {
    //Time out to fire the cannon
    setTimeout(() => {
      setShoot(true);
    }, 1000);
    createTable5();
    insertData3();
    const backAction = () => {
      
      navigation.navigate('MainContainer');
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, []);

  const createTable5 = () => {
    db.transaction(tx => {
      tx.executeSql(
        'CREATE TABLE IF NOT EXISTS result (date TEXT,match_id INTEGER ,team1 TEXT,score1 TEXT,team1rr TEXT,' +
        'team2 TEXT,score2 TEXT,team2rr TEXT,results TEXT)')
    });
  }

  const insertData3 = () => {
    const m_id = route.params.match_id;
    console.log("match tie match_id : ", m_id);

    const score1 = route.params.team1score;
    console.log("team 1runs made : ", score1);

    const score2 = route.params.team2score;
    console.log("team2 runs made : ", score2);

    const bat = route.params.bat;
    console.log("batting : ", bat);

    const bowl = route.params.bowl;
    console.log("bowling : ", bowl);

    var text = "match tied"
    console.log(text);

    var d =  new Date().toLocaleString();
    console.log(d);

    const team1runrate = route.params.team1rr;
    console.log("team 1 runrate : ", team1runrate);

    const team2runrate = route.params.team2rr;
    console.log("team 2 runrate : ", team2runrate);

    db.transaction(tx => {
      tx.executeSql('INSERT INTO result (date,match_id,team1,score1,team1rr,' +
        'team2,score2,team2rr,results) values (?,?,?,?,?,?,?,?,?)', [d,m_id, bat, score1,team1runrate, bowl, score2,team2runrate, text],
        (tx, results) => {

          console.log('Results', results.rowsAffected);
          if (results.rowsAffected > 0) {
            console.log('inserted tied result  data ');


          }
        },
        (tx, error) => console.log('Error', error))
    });

  }


  return (
    <View style={styles.container}>
      {/*Card to show the Gift*/}
      <View style={styles.cardStyle}>
        <Text style={styles.headingStyle}>
          Congratulations !!
        </Text>
        <View style={styles.circlestyle}>
          <Image style={styles.imagestyle} source={require('./image/trp.jpeg')} />
        </View>
        <Text style={{ fontSize: 25, fontWeight: 'bold', marginTop: 10 }}></Text>
        <Text style={styles.paragraph}>
          Match is tie.
        </Text>


      </View>
      {/*Cannon which will fire whenever shoot is true*/}
      {shoot ?
        <ConfettiCannon
          count={200} origin={{ x: -10, y: 0 }} fadeOut="true"
        />
        : null
      }

    </View>
  );
};



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'red'
  },
  cardStyle: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
    backgroundColor: 'white',
  },
  textLargeStyle: {
    margin: 24,
    fontSize: 40,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'green',
  },
  simpleLineStyle: {
    backgroundColor: 'white',
    width: '100%',
    height: 1,
    marginTop: 15,
    marginBottom: 15,
  },
  circlestyle: {
    height: 200,
    width: 200,
    borderRadius: 200,
    backgroundColor: '#2bc310',

  },
  imagestyle: {
    flex: 1,
    width: null,
    height: null,
    borderRadius: 200,
    resizeMode: 'contain'
  },
  headingStyle: {
    margin: 24,
    fontSize: 25,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  paragraph: {
    marginTop: 15,
    fontSize: 18,
    textAlign: 'center',
  },


});