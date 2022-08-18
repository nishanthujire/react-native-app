import * as React from 'react';
import { View, Text, StyleSheet,TouchableOpacity,Alert} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
export default function SettingsScreen({ navigation }) {
    return (
        <View style={styles.container} >
            <View style={styles.contentBody}>
                <Text style={{ marginBottom: 5 }}>02/06/2022 - 8:52 AM</Text>
                <View style={styles.card}>
                    <Text style={styles.text}>Pakistan</Text>
                    <Text style={styles.text}>12/0  (1.0)</Text>


                </View>
                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between', marginTop: 5
                }}>
                    <Text style={styles.text}>India</Text>
                    <Text style={styles.text} >13/0  (1.0)</Text>

                </View>
                <Text style={{ marginTop: 5 }}>India won by 10 Wickets.</Text>

        <View style={{marginTop:10,flex:1}}>
            <View style={styles.row}>
                <TouchableOpacity  onPress={() => navigation.navigate('ScoreBoardScreen')}>
                <Text style={{marginTop:5,marginLeft:60,width:200}}>Scoreboard</Text>
                </TouchableOpacity>

                <TouchableOpacity 
             onPress={()=>Achive()}>
                    <Ionicons  name="archive-sharp" size={23} color="black"></Ionicons>
            </TouchableOpacity>
            <TouchableOpacity 
                onPress={()=>Delete()}>               
                <Ionicons name='trash-sharp' size={23} color="black" />
            </TouchableOpacity>
            </View>
        </View>



            </View>

        </View >
    );
}
const Achive = () =>
      Alert.alert("Archive this match?","you can find this match in archive section.",
        [
          {text: "Cancel", onPress: () => console.log("Cancel Pressed"),style: "cancel"},
          {text: "Archive", onPress: () => console.log("OK Pressed") }
        ]
      );
      const Delete = () =>
      Alert.alert("Delete this match?","Are you sure you want to delete this match?  All the player statistics associated with this match will also be deleted.",
        [
          {text: "Cancel", onPress: () => console.log("Cancel Pressed"),style: "cancel"},
          {text: "yes", onPress: () => console.log("OK Pressed") }
        ]
      );
const styles = StyleSheet.create({
    container: {
        flex: 1

    },
    contentBody: {
        height: 150,
        margin: 10,
        padding: 10,
        backgroundColor: 'white',
        borderRadius: 2
    },
    card: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    text: {

        fontWeight: 'bold',
        fontSize: 15
    },
    row:{
        flexDirection: 'row',
        // alignItems: 'center',
        // alignItems:'stretch',
        // marginTop:5,
        flex:1,
        justifyContent:'space-between'
        
    }

});