import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button ,TextInput,Alert} from 'react-native';
import React, { useState } from 'react';
import * as SQLite from 'expo-sqlite';
//db creaion
const db = SQLite.openDatabase('db.bz') // returns Database object


export default function UpdateTeam({navigation,route}) {
      //getting batting & bowling teams data
      var team_id = route.params.team_id;
      console.log("id : ", team_id);

      var team_name= route.params.team_name;
      console.log("name : ", team_name);
     

      

      const [name,setName] = useState('');

      const saveTeam = ()=>{
        if(!name){
            alert("Please Enter Team Name.")
            return;
        }
       //updating team
       db.transaction((tx) => {
           tx.executeSql(
             'UPDATE teams set team_name=? where team_id=?',
             [name,team_id],
             (tx, results) => {
               console.log('Results', results.rowsAffected);
               if (results.rowsAffected > 0) {
                //go back to previous screen
                navigation.goBack();
               } else Alert.alert('Error');
             }
           );
         });
       
        
         


      }

    return (
 
        <View style={styles.container}>
            <Text style={styles.text}>Team Name</Text>

            <TextInput
                style={styles.input}
                placeholder={team_name}
                onChangeText={ (value) => setName(value) }
           
            />
            <Button onPress={saveTeam} color='green' title='Update Team' />

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
