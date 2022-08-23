import { setStatusBarHidden } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import {
  StyleSheet, Text, View, TextInput, TouchableOpacity, Button, Alert,
  Image, SafeAreaView,BackHandler
} from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
// import AntDesign from 'react-native-vector-iconsAntDesign';
import { RadioButton } from 'react-native-paper';
import * as SQLite from 'expo-sqlite';
//db creaion
const db = SQLite.openDatabase('db.bz') // returns Database object

//Import Library to make a cannon
import ConfettiCannon from 'react-native-confetti-cannon';



export default WinByRuns = ({ route, navigation }) => {
  const [shoot, setShoot] = useState(false);
  const [teams, setteams] = useState('');
  const [winnsrun, setwinnrun] = useState('')
  var winrun, team;


  useEffect(() => {
    createTable5();
    //Time out to fire the cannon
    setTimeout(() => {
      setShoot(true);
    }, 1000);
    insertData();

    const backAction = () => {
      navigation.clea
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
  const insertData = () => {
    //getting batting & bowling teams data


    
    const m_id = route.params.match_id;
    console.log("win by run match_id : ", m_id);
    const target = route.params.targetrun;
    console.log("target : ", target);

    const lost = route.params.lost;
    console.log("runs made : ", lost);



    var targerun = target - 1;
    winrun = targerun - lost;

    team = route.params.team;
    setteams(team);
    setwinnrun(winrun);
    console.log("team : ", team);



    var text = team + " won by " + winrun + " runs.";
    console.log(text);

    const score1 = route.params.team1score;
    console.log("team 1runs made : ", score1);

    const score2 = route.params.team2score;
    console.log("team2 runs made : ", score2);

    const bat = route.params.bat;
    console.log("batting : ", bat);

    const bowl = route.params.bowl;
    console.log("bowling : ", bowl);

    const team1runrate = route.params.team1rr;
    console.log("team 1 runrate : ", team1runrate);

    const team2runrate = route.params.team2rr;
    console.log("team 2 runrate : ", team2runrate);


  
    var d =  new Date().toLocaleString();
    console.log(d);


    db.transaction(tx => {
      tx.executeSql('INSERT INTO result (date,match_id,team1,score1,team1rr,' +
        'team2,score2,team2rr,results) values (?,?,?,?,?,?,?,?,?)', [d,m_id, bat, score1,team1runrate, bowl, score2,team2runrate, text],
        (tx, results) => {

          console.log('Results', results.rowsAffected);
          if (results.rowsAffected > 0) {
            console.log('inserted run result  data ');



          }
        },
        (tx, error) => console.log('Error', error))
    });
    //increment win cout of batting team
    db.transaction((tx) => {
      tx.executeSql(
        'SELECT total_matches,won,lost from teams where team_name = ?',
        [bat],
        (tx, results) => {
          var len = results.rows.length;
          console.log('len', len);
          if (len > 0) {
            
            
            var match = results.rows.item(0).total_matches;
            console.log("match ",match)
            var wincount = results.rows.item(0).won;
            console.log("wins ",wincount);

            if(match>=0){
              match = Number(match+1);
            }

            if(wincount>=0){
              wincount = Number(wincount+1);
            }

            db.transaction((tx) => {
              tx.executeSql(
                'UPDATE teams set total_matches=?,won=? where team_name = ?',
                [match,wincount,bat],
                (tx, results) => {
                  console.log('Results', results.rowsAffected);
                  if (results.rowsAffected > 0) {
                    console.log("matches",match);
                    console.log("win count updated",wincount);
                  } else Alert.alert('Error');
                }
              );
            });
            
           
          }

          

           
          }
        
      );
    });

    //incrementing lost count of bowling team
    db.transaction((tx) => {
      tx.executeSql(
        'SELECT total_matches,won,lost from teams where team_name = ?',
        [bowl],
        (tx, results) => {
          var len = results.rows.length;
          console.log('len', len);
          if (len > 0) {
            
            
            var match = results.rows.item(0).total_matches;
            console.log("match ",match)
            var lostcount = results.rows.item(0).lost;
            console.log("lost ",lostcount);

            if(match>=0){
              match = Number(match+1);
            }

            if(lostcount>=0){
              lostcount = Number(lostcount+1);
            }

            db.transaction((tx) => {
              tx.executeSql(
                'UPDATE teams set total_matches=?,lost=? where team_name = ?',
                [match,lostcount,bowl],
                (tx, results) => {
                  console.log('Results', results.rowsAffected);
                  if (results.rowsAffected > 0) {
                    console.log("matches",match);
                    console.log("lost count updated",lostcount);
                  } else Alert.alert('Error');
                }
              );
            });
            
           
          }

          

           
          }
        
      );
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
        <Text style={{ fontSize: 25, fontWeight: 'bold', marginTop: 10 }}>{teams}</Text>
        <Text style={styles.paragraph}>
          {teams} won by {winnsrun} runs.
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