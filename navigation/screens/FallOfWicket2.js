import { setStatusBarHidden } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Button, Alert } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
// import AntDesign from 'react-native-vector-iconsAntDesign';
import * as SQLite from 'expo-sqlite';
//db creaion
const db = SQLite.openDatabase('db.bz') // returns Database object

const data = [
    { label: 'Bowled', value: 'bowled' },
    { label: 'Catch out', value: 'catch out' },
    { label: 'Run out striker', value: 'run out striker' },
    { label: 'Run out non-striker', value: 'run out non-striker' },
    { label: 'Stumping', value: 'stumping' },
    { label: 'LBW', value: 'lbw' },
    { label: 'Hit wicket', value: 'hit wicket' },

];

export default FallOfWicket = ({ navigation, route }) => {
    const [value, setValue] = useState(null);
    const [isFocus, setIsFocus] = useState(false);

    const [shouldShow, setshouldShow] = useState(false);
    const [newbatsman, setNewbatsman] = useState('');
    const [outt, setOutt] = useState('striker');
    const [outtype, setouttype] = useState('');
    const [support, setSupport] = useState('');
    const [Batting, setBatting] = useState('');

    var val;
    var out = "striker";
    const hide = () => {
        //console.log('inside hide');

        if (val == "catch out" || val == "run out striker" || val == "run out non-striker" || val == "stumping") {
            setshouldShow(true);

            if (val == "run out non-striker") {
                out = "nonstriker";
                setOutt(out);


            }
        }
        //hiding new batsman page
        else if (val == "bowled" || val == "lbw" || val == "hit wicket" || val == "stumping") {
            setshouldShow(false);
        }


    }

    useEffect(() => {
        setSupport
    }, [support])

    useEffect(() => {
        //getting batting & bowling teams data
        const battingteam = route.params.batting;
        console.log("batting : ", battingteam);
        setBatting(battingteam);

    },[]);

    var batting_team_id, bowling_team_id;

    return (
        <View style={styles.container}>
            <Text style={styles.titleText}>
                How wicket fall?
            </Text>
            <Dropdown
                style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                inputSearchStyle={styles.inputSearchStyle}
                iconStyle={styles.iconStyle}
                data={data}

                search
                maxHeight={300}
                labelField="label"
                valueField="value"
                placeholder={!isFocus ? 'Select item' : '...'}
                searchPlaceholder="Search..."
                value={value}
                onFocus={() => setIsFocus(true)}
                onBlur={() => setIsFocus(false)}
                onChange={item => {
                    setValue(item.value);
                    val = item.value;
                    setouttype(val);
                    hide();
                    console.log('val :', val);
                    setIsFocus(false);
                }}
            // renderLeftIcon={() => (
            //   // <AntDesign
            //   //   style={styles.icon}
            //   //   color={isFocus ? 'blue' : 'black'}
            //   //   name="Safety"
            //   //   size={20}
            //   // />
            // )}
            />
            <View>
                {
                    shouldShow ? (
                        <View>
                            <Text style={styles.sectitleText}>
                                Who helped?

                            </Text>
                            <TextInput
                                onChangeText={(value) => setSupport(value)}
                                style={styles.input}
                                placeholder=""
                                keyboardType="text"
                            />
                        </View>
                    ) : null
                }
            </View>
            <Text style={styles.sectitleText}>
                New batsman
            </Text>
            <TextInput
                style={styles.input}
                placeholder=""
                keyboardType="text"
                onChangeText={(value) => setNewbatsman(value)}
            />
            <TouchableOpacity style={styles.button} onPress={() => {
                //data insertion
                if (!newbatsman) {
                    alert('Please fill players details.');
                    return;
                }

                //fething batting teams team_id

                db.transaction((tx) => {
                    tx.executeSql(
                        "SELECT team_id FROM teams where team_name = ?",
                        [Batting],
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
                        "SELECT * FROM players where player_name = ? and team_id = ?", [newbatsman, batting_team_id],
                        (tx, results) => {
                            var len = results.rows.length;
                            //console.log('len is ', len)

                            if (len > 0) {
                                console.log('batsman data already exist 2')


                            }
                            else {

                                //inserting striker data into players table
                                db.transaction(tx => {

                                    tx.executeSql('INSERT INTO players (player_name,team_id) VALUES (?,?)', [newbatsman, batting_team_id],
                                        (tx, results) => {
                                            console.log('Results', results.rowsAffected);
                                            if (results.rowsAffected > 0) {
                                                console.log('inserted batsman data 2');

                                            }
                                        },
                                        (tx, error) => console.log('Error', error))
                                });
                            }
                        }
                    )
                });
                if (support) {
                    console.log("inside support");
                    // Passing data into previous screen
                    //sending support player
                    var s = support;
                    console.log("p is ", s)



                    navigation.navigate({
                        name: 'SecondInnings',
                        params: { newbatsman: newbatsman, out: outt, outtype: outtype, support: s },
                        merge: true,

                    });


                }
                else {
                    //sending suppor null vaue
                    var k = '';
                    // Passing data into previous screen
                    navigation.navigate({

                        name: 'SecondInnings',
                        params: { newbatsman: newbatsman, out: outt, outtype: outtype, support: k },
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
        marginBottom: 20

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
});