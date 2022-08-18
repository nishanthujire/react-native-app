import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';

export default function Overs() {
  return (
    <View style={styles.container}>
       <View style={styles.container2}>
         <Text>Ov 1</Text>
         <Text style={{marginLeft:40}}>Raza to Dhwanan</Text>
       </View>
      <View style={styles.container2}>
      <Text style={{marginTop:5,marginRight:10}}>15 Runs</Text>

        <View style={styles.circle} >
          <Text style={styles.text}>1</Text></View>

        <View style={styles.circle} >
          <Text style={styles.text}>1</Text>
        </View>
        <View style={styles.circle} >
          <Text style={styles.text}>1</Text>
        </View>
        <View style={styles.circle3} >
          <Text style={styles.text}>6</Text>
        </View>
        <View style={styles.circle3} >
          <Text style={styles.text}>6</Text>
        </View>
        <View style={styles.circle2} >
          <Text style={styles.text}>W</Text>
        </View>
      </View>


      <View
  style={{
    marginTop:5,
    borderBottomColor: 'black',
    borderBottomWidth: 0.5,
  }}
/>
    {/* second over */}
    <View style={styles.container2}>
         <Text>Ov 2</Text>
         <Text style={{marginLeft:40}}>Afridi to Rohit</Text>
       </View>
      <View style={styles.container2}>
      <Text style={{marginTop:5,marginRight:10}}>12 Runs</Text>

        <View style={styles.circle} >
          <Text style={styles.text}>1</Text></View>

        <View style={styles.circle} >
          <Text style={styles.text}>1</Text>
        </View>
        <View style={styles.circle3} >
          <Text style={styles.text}>4</Text>
        </View>
        <View style={styles.circle3} >
          <Text style={styles.text}>6</Text>
        </View>
        <View style={styles.circle2} >
          <Text style={styles.text}>W</Text>
        </View>
        <View style={styles.circle2} >
          <Text style={styles.text}>W</Text>
        </View>
      </View>


      <View
  style={{
    marginTop:5,
    borderBottomColor: 'black',
    borderBottomWidth: 0.5,
  }}
/>
    </View>
    
    // <View style={styles.container}>
    //   <View style={styles.container2}>
    //     <Text>OV 1</Text>
    //     <Text style={{marginLeft:20}}>Raza to Dhwanan</Text>

    //   </View>
    //   <View style={styles.container2}>
    //     <Text>5 Runs</Text>
    //     <Text style={{marginLeft:15,}}>1</Text>
    //     <Text style={{marginLeft:15}}>0</Text>
    //     <Text style={{marginLeft:15}}>W</Text>
    //     <Text style={{marginLeft:15}}>1</Text>
    //     <Text style={{marginLeft:15}}>2</Text>
    //     <Text style={{marginLeft:15}}>1</Text>






    //   </View>
    //   <View style={styles.container2}>
    //     <Text>OV 2</Text>
    //     <Text style={{marginLeft:20}}>Afridi to Rohit</Text>

    //   </View>
    //   <View style={styles.container2}>
    //     <Text>10 Runs</Text>
    //     <Text style={{marginLeft:15,}}>1</Text>
    //     <Text style={{marginLeft:15}}>0</Text>
    //     <Text style={{marginLeft:15}}>W</Text>
    //     <Text style={{marginLeft:15}}>1</Text>
    //     <Text style={{marginLeft:15}}>2</Text>
    //     <Text style={{marginLeft:15}}>6</Text>






    //   </View>


    // </View>


  );
}
const styles = StyleSheet.create({
  container: { flex: 1, margin: 5, backgroundColor: '#ececec' },
  container2: {
    marginBottom: 2,
    flexDirection: 'row',
    padding:5
    

  },
  circle: {
    marginLeft:5,
    width: 30,
    height: 30,
    borderRadius: 30 / 2,
    backgroundColor: "#fff",
  },
  circle2: {
    marginLeft:5,
    width: 30,
    height: 30,
    borderRadius: 30 / 2,
    backgroundColor: "red",
  },
  circle3: {
    marginLeft:5,
    width: 30,
    height: 30,
    borderRadius: 30 / 2,
    backgroundColor: "green",
  },
  text: {
    padding: 4,
    marginLeft: 6

  }
});