import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button,TextInput } from 'react-native';
import React, { useState } from 'react';
import * as SQLite from 'expo-sqlite';
//db creaion
const db = SQLite.openDatabase('db.bz') // returns Database object


export default function UpdatePlayer({navigation,route}) {
       //getting batting & bowling teams data
       var Player_name = route.params.name;
       console.log("name : ", Player_name);
       var Player_id = route.params.id;
       console.log("id :", Player_id);
       var id = route.params.t_id;
       var team = route.params.team;

       

       const [name,setName] = useState('');

       const save = ()=>{
        if(!name){
            alert("Please Enter Player Name.")
            return;
        }

        db.transaction((tx) => {
            tx.executeSql(
              'UPDATE players set player_name=? where player_id=?',
              [name,Player_id],
              (tx, results) => {
                console.log('Results', results.rowsAffected);
                if (results.rowsAffected > 0) {
                  //Alert.alert('Record Updated Successfully...')
                  navigation.navigate('Team_Details',{teamid:id,team:team});
                } else Alert.alert('Error');
              }
            );
          });
        
         
          


       }

    return (
        <View style={styles.container}>
        <Text style={styles.text}>Player Name</Text>

        <TextInput
            style={styles.input}
            placeholder={Player_name}
            onChangeText={ (value) => setName(value) }
        />
        <Button onPress={save} color='green'title='Update Player'/>
        
        </View>
        
 

    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding:5

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
        marginBottom:10
    },
    
});
