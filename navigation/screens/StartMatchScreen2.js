import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, Button, Alert,BackHandler } from 'react-native';
import HomeScreen from './CricketMatchScreen';
import * as SQLite from 'expo-sqlite';
//db creaion
const db = SQLite.openDatabase('db.bz') // returns Database object




export default function StartMatchScreen2({ route, navigation }) {
    //getting toss wining team data from cricketMatchScreen
    //const { toss } = route.toss;
    //hooks
    const [striker, setStriker] = useState('');
    const [nonstriker, setNonstriker] = useState('');
    const [bowler, setBowler] = useState('');


    const [battingteam, setbattingteam] = useState(0);
    const [bowlingteam, setbowlingteam] = useState(0);
    const [tscore, settscore] = useState(0);
    const [tover, settover] = useState(0);
    const [trequiredrr, settrequiredrr] = useState(0);
    const [team1score,setteam1score] = useState(0);
    const [match_id,setmatch_id] = useState(0);
    const [team1rr,setTeam1rr] = useState(0);






    // params: { batting: batting,bowling:bowling,targetscore: matchscore, targetover: overs, requiredrr: matchrr },


    const fetchData2 = () => {

        //getting batting & bowling teams data
        var batting = route.params.battingteam;
        console.log("batting : ", batting);
        var bowling = route.params.bowlingteam;
        console.log("bowling :", bowling);

        var targetscore = route.params.targetscore;
        console.log("target score :", targetscore);
        var targetover = route.params.targetover;
        console.log("overs :", targetover);
        var requiredrr = route.params.requiredrr;
        console.log("required rr :", requiredrr);

        var score = route.params.team1score;
        console.log("score ",score);

        var m_id = route.params.match_id;
        console.log("start match screen 2 match_id ",m_id);

        var runrate= route.params.team1rr;
        console.log("team 1 runrate ",runrate);

        setmatch_id(m_id);




        



        //initialsation of hooks
        setbattingteam(bowling);
        setbowlingteam(batting);
        settscore(targetscore);
        settover(targetover);
        settrequiredrr(requiredrr);
        setteam1score(score);
        setTeam1rr(runrate);

    }



    useEffect(() => {
        createTable2();
        fetchData2()
        const backAction = () => {
            Alert.alert("Hold on!", "Are you sure to exit the Match", [
              {
                text: "Cancel",
                onPress: () => null,
                style: "cancel"
              },
              { text: "YES", onPress: () => navigation.navigate('MainContainer') }
            ]);
            return true;
          };
      
          const backHandler = BackHandler.addEventListener(
            "hardwareBackPress",
            backAction
          );
      
          return () => backHandler.remove();
       
    
    }, []);

    //creating players table
    const createTable2 = () => {

        db.transaction(tx => {
            tx.executeSql(
                'CREATE TABLE IF NOT EXISTS players (player_id INTEGER PRIMARY KEY AUTOINCREMENT,player_name TEXT,team_id INTEGER)'
            )
        })



    }
    //inserting player data into player table

    const insertPlayerData = () => {
        //data validation
        if (!striker || !nonstriker || !bowler) {
            alert('Please fill players details.');
            return;
        }
        //checking two openers are same
        if (striker === nonstriker) {
            alert('Openers cannot be the same.');
            return;
        }

        //fething batting teams team_id

        db.transaction((tx) => {
            tx.executeSql(
                "SELECT team_id FROM teams where team_name = ?",
                [battingteam],
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
        //fething bowling teams team_id
        db.transaction((tx) => {
            tx.executeSql(
                "SELECT team_id FROM teams where team_name = ?",
                [bowlingteam],
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
        //checking striker  data exist or not in table
        db.transaction((tx) => {
            tx.executeSql(
                "SELECT * FROM players where player_name = ? and team_id = ?", [striker, batting_team_id],
                (tx, results) => {
                    var len = results.rows.length;
                    //console.log('len is ', len)

                    if (len > 0) {
                        console.log('striker data already exist 2')


                    }
                    else {

                        //inserting striker data into players table
                        db.transaction(tx => {

                            tx.executeSql('INSERT INTO players (player_name,team_id) VALUES (?,?)', [striker, batting_team_id],
                                (tx, results) => {
                                    console.log('Results', results.rowsAffected);
                                    if (results.rowsAffected > 0) {
                                        console.log('inserted striker');

                                    }
                                },
                                (tx, error) => console.log('Error', error))
                        });
                    }
                }
            )
        });


        //checking non-striker  data exist or not in table
        db.transaction((tx) => {
            tx.executeSql(
                "SELECT * FROM players where player_name = ? and team_id = ?", [nonstriker, batting_team_id],
                (tx, results) => {
                    var len = results.rows.length;
                    //console.log('len is ', len)

                    if (len > 0) {
                        console.log('non-striker data already exist 2')


                    }
                    else {

                        //inserting non-stiker data into players table
                        db.transaction(tx => {

                            tx.executeSql('INSERT INTO players (player_name,team_id) VALUES (?,?)', [nonstriker, batting_team_id],
                                (tx, results) => {
                                    console.log('Results', results.rowsAffected);
                                    if (results.rowsAffected > 0) {
                                        console.log('inserted non-striker');

                                    }
                                },
                                (tx, error) => console.log('Error', error))
                        });
                    }
                }
            )
        });



        //checking bowler  data exist or not in table
        db.transaction((tx) => {
            tx.executeSql(
                "SELECT * FROM players where player_name = ? and team_id = ?", [bowler, bowling_team_id],
                (tx, results) => {
                    var len = results.rows.length;
                    //console.log('len is ', len)

                    if (len > 0) {
                        console.log('bowler data already exist 2')


                    }
                    else {

                        //inserting bowler data into players table
                        db.transaction(tx => {

                            tx.executeSql('INSERT INTO players (player_name,team_id) VALUES (?,?)', [bowler, bowling_team_id],
                                (tx, results) => {
                                    console.log('Results', results.rowsAffected);
                                    if (results.rowsAffected > 0) {
                                        console.log('inserted bowler');

                                    }
                                },
                                (tx, error) => console.log('Error', error))
                        });
                    }
                }
            )
        });


        //navigating to startmatch screen
        navigation.navigate('SecondInnings', {
            battingteam: battingteam, bowlingteam: bowlingteam, target: tscore, targetovers: tover, targetrr: trequiredrr,
            strikername: striker, nonstrikername: nonstriker, bowlername: bowler,team1score:team1score,match_id:match_id,team1runate:team1rr
        });


    }
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Striker</Text>

            <TextInput
                style={styles.input}
                placeholder="Player Name"
                onChangeText={(value) => setStriker(value)}
            />
            <Text style={styles.text}>Non Striker</Text>

            <TextInput
                style={styles.input}
                placeholder="Player Name"
                onChangeText={(value) => setNonstriker(value)}


            />
            <Text style={styles.text}>Opening Bowler</Text>

            <TextInput
                style={styles.input}
                placeholder="Player Name"
                onChangeText={(value) => setBowler(value)}

            />
            <View style={{ marginTop: 10, padding: 5 }}>
                <Button
                    onPress={insertPlayerData}
                    color="green"
                    title="Start match"

                />
            </View>



        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,

    },
    text: {
        fontSize: 15,
        fontWeight: "bold",
        color: 'green',
        marginLeft: 10,
        marginTop: 10
    },
    input: {
        height: 40,
        margin: 8,
        borderBottomWidth: 1,
        padding: 10,
    },
});  
