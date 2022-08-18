
import React, { Component } from 'react';
import { Text, StyleSheet, View } from 'react-native';
import { Table, Row, Rows } from 'react-native-table-component-2';
import { Colors } from 'react-native/Libraries/NewAppScreen';

export default class ScoreBoard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tableHead: ['Batsman','R', 'B', '4s', '6s', 'SR'],
      tableData: [
       
        ['Rohit\nb Nsha','6', 'b', '1', '2', '45'],
        ['Kohli\nnot out','4', '2', '1', '4', '156'],
        ['Dhoni\nnot out ','10', 'b', '1', '0', '67']
      ]
    };
  }

  render() {
    const state = this.state;
    return (
      <View style={styles.container}>
        <View style={styles.namecontainer}>
          <Text style={{color:'#fff',fontSize:15}}>India</Text>
          <Text style={{color:'#fff',fontSize:15}}>20-0(1.0)</Text>


        </View>


        <Table  style={{padding:8}}>
          <Row data={state.tableHead} style={styles.head} textStyle={styles.text} />
          <Rows data={state.tableData} textStyle={{padding:8}} />
        </Table>
        <View style={styles.namecontainer2}>
          <Text style={{fontSize:15}}>Extras</Text>
          <Text style={{fontSize:15}}>0,0 B,2 NB,1 LB,0 WD 0 P</Text>


        </View>
        <View style={styles.namecontainer2}>
          <Text style={{fontSize:15}}>Total</Text>
          <Text style={{fontSize:15}}>20-0(1.0) 5.00</Text>


        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', },
  head: { height: 40, backgroundColor: '#f1f8ff',padding:8 },

  namecontainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding:10,
    backgroundColor:'green',
    marginLeft:5
    

    
    

  },
  namecontainer2: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding:5,
    margin:5
    
    

  }
});