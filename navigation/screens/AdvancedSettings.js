import React, { useState } from "react";
import { View, Text, StyleSheet, TextInput, Switch, Button } from 'react-native';



export default function AdvancedSettings() {
    const [isEnabled, setIsEnabled] = useState(true);
    const [isEnabled2, setIsEnabled2] = useState(true);
    const [isEnabled3, setIsEnabled3] = useState(true);
    const [isEnabled4, setIsEnabled4] = useState(true);


    const toggleSwitch = () => {setIsEnabled(previousState => !previousState);
    }
    const toggleSwitch2 = () => setIsEnabled2(previousState => !previousState);
    const toggleSwitch3 = () => setIsEnabled3(previousState => !previousState);
    const toggleSwitch4 = () => setIsEnabled4(previousState => !previousState);

    return (
        <View style={styles.container}>
            <Text style={styles.text}>Players Per Team ?</Text>
            <TextInput
                style={styles.input}
                placeholder="11"
                keyboardType="numeric"
            />

            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', paddingRight: 5 }}>

                <Text style={styles.text2}>No Ball</Text>
                <Switch onValueChange={toggleSwitch}
                    value={isEnabled} trackColor='green'
                    thumbColor='green'
                />

            </View>
            <View style={styles.smallcontainer}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' }}>

                    <Text style={styles.text3}>Re-Ball</Text>
                    <Switch onValueChange={toggleSwitch2}
                        value={isEnabled2} trackColor='green'
                        thumbColor='green' />

                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' }}>

                    <Text style={styles.text4}>No Ball Run</Text>

                    <TextInput
                        style={styles.input2}
                        placeholder="1"
                        keyboardType="numeric"

                    />


                </View>


            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', paddingRight: 5 }}>

                <Text style={styles.text2}>Wide Ball</Text>
                <Switch onValueChange={toggleSwitch3}
                    value={isEnabled3} trackColor='green'
                    thumbColor='green'
                />

            </View>
            <View style={styles.smallcontainer}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' }}>

                    <Text style={styles.text3}>Re-Ball</Text>
                    <Switch onValueChange={toggleSwitch4}
                        value={isEnabled4} trackColor='green'
                        thumbColor='green' />

                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' }}>

                    <Text style={styles.text4}>Wide Ball Run</Text>

                    <TextInput
                        style={styles.input2}
                        placeholder="1"
                        keyboardType="numeric"

                    />


                </View>



            </View>
            <View style={{flex: 1,justifyContent: 'flex-end',padding:10,}}>
                <Button
                    color="green"
                    title="Save settings"
                    
                />
            </View>

        </View>

    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 5,
        padding: 10,
    },
    text: {
        fontSize: 15,
        fontWeight: "bold",
        color: 'green',
        marginLeft: 10
    },
    text2: {
        fontSize: 15,
        fontWeight: "bold",
        color: 'green',
        marginLeft: 10,
        marginTop: 10,
    },
    text3: {
        fontSize: 15,
        color: 'black',
        marginLeft: 10,
        marginTop: 10,
    },
    text4: {
        fontSize: 15,
        color: 'black',
        marginLeft: 10
    },
    input: {
        height: 40,
        margin: 8,
        borderWidth: 1,
        borderColor: 'grey',
        padding: 10,
    },
    smallcontainer: {
        height: 85,
        backgroundColor: 'white',
        padding: 2,
        borderRadius: 10,
        margin: 5



    },


    input2: {

        width: 50,
        height: 25,
       
        borderBottomWidth:1.5,
        borderColor:'green'


    },
});