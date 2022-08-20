import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { Col, Row, Grid } from 'react-native-easy-grid';
import * as SQLite from 'expo-sqlite';
//db creaion
const db = SQLite.openDatabase('db.bz') // returns Database object




function DisplayAnImage() {
  return (
    <View style={styles.container}>
      <Image
        style={styles.tinyLogo}
        source={require('../screens/image/profile.jpg')}
      />
    </View>
  );
}
function Batting({ navigation, route }) {
  
  const [b_match,setb_match] = useState(0);
  const [b_ings,setb_ings] = useState(0);
  const [b_runs,setb_runs] = useState(0);
  const [b_bestScore,setb_bestscore] = useState(0);
  const [b_fours,setb_fours] = useState(0);
  const [b_six,setb_six] = useState(0);
  const [b_avg,setb_avg] = useState(0);

  const [b_strikerate,setb_strikerate] = useState(0);

  
  useEffect(() => {
    fetchBatsmanData();
  });
  //selectiong player data about batting
  const fetchBatsmanData = () => {
    //player_id INTEGER PRIMARY KEY AUTOINCREMENT,player_name TEXT,team_id INTEGER)
   // var player_name = route.params.player;


   var player_name =global.player_name
    console.log("player_name: ", player_name);

   // var team = route.params.team;
   var team =global.team;
    console.log("team : ", team);

    
    db.transaction((tx) => {
      tx.executeSql(
        'SELECT count(batsman_name) as match,count(innings)as ing ,sum(run) as run,max(run) as highscore,sum(four) as four,sum(six) as six,avg(strikerate) as strikerate,avg(run) as avg FROM batting where teamname = ? and batsman_name = ?',
        [team,player_name],
        (tx, results) => {
          var len = results.rows.length;
          console.log('len', len);
          if (len > 0) {
            console.log("match ",results.rows.item(0).match);
            console.log("innings ",results.rows.item(0).ing);
            console.log("runs ",results.rows.item(0).run);
            console.log("high score ",results.rows.item(0).highscore);
            console.log("six ",results.rows.item(0).six);
            console.log("four ",results.rows.item(0).four);
            console.log("Strike rate ",results.rows.item(0).strikerate);
            console.log("avg ",results.rows.item(0).avg);

          




            setb_match(results.rows.item(0).match);
            setb_ings(results.rows.item(0).ing);
            if(results.rows.item(0).run){
            setb_runs(results.rows.item(0).run);
            }
            else {
              
              setb_runs(0);
            }
            if(results.rows.item(0).highscore){
            setb_bestscore(results.rows.item(0).highscore);
            }
            else {
              setb_bestscore(0);
            }
            if(results.rows.item(0).six){
            setb_six(results.rows.item(0).six);
            }
            else {
              setb_six(0);
            }
            if(results.rows.item(0).four){
            setb_fours(results.rows.item(0).four);
            }
            else {
              setb_fours(0);
            }
            if(results.rows.item(0).strikerate){
            setb_strikerate(results.rows.item(0).strikerate);
            }
            else {
              setb_strikerate(0);
            }
            if(results.rows.item(0).avg){
            var avg2 = Number(results.rows.item(0).avg).toFixed(2);
            setb_avg(avg2);
            }
            else {
              setb_avg(0);
            }









          } else {
            alert('No user found');
          }
        }
      );
    });

  };
  return (
    <View style={styles.container}>
      <Grid>
        <Col size={25}>
          <Row style={styles.cell}>
            <Text style={{ fontSize: 20, color: '#000' }}>Matches </Text>
            <Text style={{ fontSize: 20, color: '#000' }}>{b_match}</Text>

          </Row>
          <Row style={styles.cell}>
            <Text style={{ fontSize: 20, color: '#000' }}>Not Outs </Text>
            <Text style={{ fontSize: 20, color: '#000' }}>0</Text>
          </Row>
          <Row style={styles.cell}>
            <Text style={{ fontSize: 20, color: '#000' }}>Average </Text>
            <Text style={{ fontSize: 20, color: '#000' }}>{b_avg}</Text>
          </Row>
          <Row style={styles.cell}>
            <Text style={{ fontSize: 20, color: '#000' }}>Thirties </Text>
            <Text style={{ fontSize: 20, color: '#000' }}>0</Text>
          </Row>
          <Row style={styles.cell}>
            <Text style={{ fontSize: 20, color: '#000' }}>Ducks </Text>
            <Text style={{ fontSize: 20, color: '#000' }}>0</Text>
          </Row>
        </Col>
        <Col size={25}>
          <Row style={styles.cell}>
            <Text style={{ fontSize: 20, color: '#000' }}>Innings </Text>
            <Text style={{ fontSize: 20, color: '#000' }}>{b_ings}</Text>
          </Row>
          <Row style={styles.cell}>
            <Text style={{ fontSize: 20, color: '#000' }}>Best Score </Text>
            <Text style={{ fontSize: 20, color: '#000' }}>{b_bestScore}</Text>
          </Row>
          <Row style={styles.cell}>
            <Text style={{ fontSize: 20, color: '#000' }}>Fours </Text>
            <Text style={{ fontSize: 20, color: '#000' }}>{b_fours}</Text>
          </Row>
          <Row style={styles.cell}>
            <Text style={{ fontSize: 20, color: '#000' }}>Fifties </Text>
            <Text style={{ fontSize: 20, color: '#000' }}>0</Text>
          </Row>
        </Col>
        <Col size={25}>
          <Row style={styles.cell}>
            <Text style={{ fontSize: 20, color: '#000' }}>Runs </Text>
            <Text style={{ fontSize: 20, color: '#000' }}>{b_runs}</Text>
          </Row>
          <Row style={styles.cell}>
            <Text style={{ fontSize: 20, color: '#000' }}>Strike Rate </Text>
            <Text style={{ fontSize: 20, color: '#000' }}>{b_strikerate}</Text>
          </Row>
          <Row style={styles.cell}>
            <Text style={{ fontSize: 20, color: '#000' }}>Sixes </Text>
            <Text style={{ fontSize: 20, color: '#000' }}>{b_six}</Text>
          </Row>
          <Row style={styles.cell}>
            <Text style={{ fontSize: 20, color: '#000' }}>Hundreds </Text>
            <Text style={{ fontSize: 20, color: '#000' }}>0</Text>
          </Row>
        </Col>
      </Grid>

    </View>
  );
}

function Bowling({ navigation, route }) {
  const [bwl_match,setbwl_match] = useState(0);
  const [bwl_ing,setbwl_ing] = useState(0);
  const [bwl_ovrs,setbwl_ovrs] = useState(0);
  const [bwl_maidens,setbwl_maidens] = useState(0);
  const [bwl_wkt,setbwl_wkt] = useState(0);
  const [bwl_runs,setbwl_runs] = useState(0);
  const [bwl_eco,setbwl_eco] = useState(0);


  useEffect(() => {
    fetchBowlerData();
  });
  //selectiong player data about batting
  const fetchBowlerData = () => {
   

   var player_name =global.player_name
    console.log("player_name: ", player_name);

   // var team = route.params.team;
   var team =global.team;
    console.log("team : ", team);

    
    db.transaction((tx) => {
      tx.executeSql(
        'SELECT count(bowler_name) as match,count(innings)as ing ,sum(over) as overs,sum(maiden) as maiden,sum(wickets) as wickets,sum(bowler_run) as bowler_run,avg(economy) as eco  FROM bowling where teamname = ? and bowler_name = ?',
        [team,player_name],
        (tx, results) => {
          var len = results.rows.length;
          console.log('len', len);
          if (len > 0) {
            console.log("********************************")
            console.log("b match ",results.rows.item(0).match);
            console.log("b innings ",results.rows.item(0).ing);
            console.log("b overs ",results.rows.item(0).overs);
            console.log("b maiden ",results.rows.item(0).maiden);
            console.log("b wickets ",results.rows.item(0).wickets);
            console.log(" bowler run ",results.rows.item(0).bowler_run);
            console.log("eco ",results.rows.item(0).eco);

            setbwl_match(results.rows.item(0).match);
            setbwl_ing(results.rows.item(0).ing);
            if(results.rows.item(0).overs){
            setbwl_ovrs(results.rows.item(0).overs);
            }
            else {
              setbwl_ovrs(0);
            }
            if(results.rows.item(0).maiden){
            setbwl_maidens(results.rows.item(0).maiden);
            }
            else {
              setbwl_maidens(0);
            }
            if(results.rows.item(0).wickets){
            setbwl_wkt(results.rows.item(0).wickets);
            }
            else {
              setbwl_wkt(0);
            }
            if(results.rows.item(0).bowler_run){
            setbwl_runs(results.rows.item(0).bowler_run);
            }
            else {
              setbwl_runs(0);
            }
            if(results.rows.item(0).eco){
            setbwl_eco(results.rows.item(0).eco);
            }
            else {
              setbwl_eco(0);
            }

            
        
          } else {
            alert('No user found');
          }
        }
      );
    });

  };
  return (
    <View style={styles.container}>
      <Grid>
        <Col size={25}>
          <Row style={styles.cell}>
            <Text style={{ fontSize: 20, color: '#000' }}>Matches </Text>
            <Text style={{ fontSize: 20, color: '#000' }}>{bwl_match}</Text>

          </Row>
          <Row style={styles.cell}>
            <Text style={{ fontSize: 20, color: '#000' }}>Maidens </Text>
            <Text style={{ fontSize: 20, color: '#000' }}>{bwl_maidens}</Text>
          </Row>
          <Row style={styles.cell}>
            <Text style={{ fontSize: 20, color: '#000' }}>B.Bowling </Text>
            <Text style={{ fontSize: 20, color: '#000' }}>-</Text>
          </Row>
          <Row style={styles.cell}>
            <Text style={{ fontSize: 20, color: '#000' }}>Average </Text>
            <Text style={{ fontSize: 20, color: '#000' }}>0.00</Text>
          </Row>
          <Row style={styles.cell}>
            <Text style={{ fontSize: 20, color: '#000' }}>Dots Balls </Text>
            <Text style={{ fontSize: 20, color: '#000' }}>0</Text>
          </Row>
        </Col>
        <Col size={25}>
          <Row style={styles.cell}>
            <Text style={{ fontSize: 20, color: '#000' }}>Innings </Text>
            <Text style={{ fontSize: 20, color: '#000' }}>{bwl_ing}</Text>
          </Row>
          <Row style={styles.cell}>
            <Text style={{ fontSize: 20, color: '#000' }}>Wickets </Text>
            <Text style={{ fontSize: 20, color: '#000' }}>{bwl_wkt}</Text>
          </Row>
          <Row style={styles.cell}>
            <Text style={{ fontSize: 20, color: '#000' }}>Eco.Rate </Text>
            <Text style={{ fontSize: 20, color: '#000' }}>{bwl_eco}</Text>
          </Row>
          <Row style={styles.cell}>
            <Text style={{ fontSize: 20, color: '#000' }}>Wides </Text>
            <Text style={{ fontSize: 20, color: '#000' }}>0</Text>
          </Row>
          <Row style={styles.cell}>
            <Text style={{ fontSize: 20, color: '#000' }}>4Wickets </Text>
            <Text style={{ fontSize: 20, color: '#000' }}>0</Text>
          </Row>
        </Col>
        <Col size={25}>
          <Row style={styles.cell}>
            <Text style={{ fontSize: 20, color: '#000' }}>Overs </Text>
            <Text style={{ fontSize: 20, color: '#000' }}>{bwl_ovrs}</Text>
          </Row>
          <Row style={styles.cell}>
            <Text style={{ fontSize: 20, color: '#000' }}>Runs </Text>
            <Text style={{ fontSize: 20, color: '#000' }}>{bwl_runs}</Text>
          </Row>
          <Row style={styles.cell}>
            <Text style={{ fontSize: 20, color: '#000' }}>Strike Rate </Text>
            <Text style={{ fontSize: 20, color: '#000' }}>0.00</Text>
          </Row>
          <Row style={styles.cell}>
            <Text style={{ fontSize: 20, color: '#000' }}>No Balls </Text>
            <Text style={{ fontSize: 20, color: '#000' }}>0</Text>
          </Row>
          <Row style={styles.cell}>
            <Text style={{ fontSize: 20, color: '#000' }}>5Wickets </Text>
            <Text style={{ fontSize: 20, color: '#000' }}>0</Text>
          </Row>
        </Col>
      </Grid>

    </View>
  );
}
function Fielding() {
  const [f_match,setf_match] = useState(0);
  const [f_catch,set_f_catch] = useState(0);
  const [f_runout,setf_runout] = useState(0);
  const [f_stump,setf_stump] = useState(0);


  useEffect(() => {
    fetchFieldingData();
  });
 
  const fetchFieldingData = () => {
    //player_id INTEGER PRIMARY KEY AUTOINCREMENT,player_name TEXT,team_id INTEGER)
   // var player_name = route.params.player;

  console.log("FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF");
   var player_name =global.player_name
    console.log("player_name: ", player_name);

   // var team = route.params.team;
   var team =global.team;
    console.log("team : ", team);
    setf_match(1);
    
    db.transaction((tx) => {
      tx.executeSql(
        'SELECT count(support) as catch  from batting where support = ? and out_type = ?',
        [player_name,"catch out"],
        (tx, results) => {
          var len = results.rows.length;
          console.log('len', len);
          if (len > 0) {
          
            console.log("catch ",results.rows.item(0).catch);
            var k = results.rows.item(0).catch;
            if(k>0){
              set_f_catch(results.rows.item(0).catch);
            }
            else {
              set_f_catch(0);
            }
           
          }

          

           
          }
        
      );
    });

    db.transaction((tx) => {
      tx.executeSql(
        'SELECT count(support)as stumping  from batting where support = ? and out_type = ?',
        [player_name,"stumping"],
        (tx, results) => {
          var len = results.rows.length;
          console.log('len', len);
          if (len > 0) {
            
            console.log("stumping ",results.rows.item(0).stumping);
            var k = results.rows.item(0).stumping;
            if(k>0){
              setf_stump(results.rows.item(0).stumping);
            }
            else {
              setf_stump(0);
            }
           
          }

          

           
          }
        
      );
    });


    db.transaction((tx) => {
      tx.executeSql(
        'SELECT count(support)as runout  from batting where  support = ? and out_type = ?',
        [player_name,"run out striker"],
        (tx, results) => {
          var len = results.rows.length;
          console.log('len', len);
          if (len > 0) {
            
          
            console.log("run out ",results.rows.item(0).runout);

            var k = results.rows.item(0).runout;
            if(k>0){
              setf_runout(results.rows.item(0).runout);
            }
            else {
              setf_runout(0);
            }

            
          }

          

           
          }
        
      );
    });





  };
  return (
    <View style={styles.container}>
      <Grid>
        <Col size={25}>
          <Row style={styles.cell}>
            <Text style={{ fontSize: 20, color: '#000' }}>Matches </Text>
            <Text style={{ fontSize: 20, color: '#000' }}>{f_match}</Text>
          </Row>
          <Row style={styles.cell}>
            <Text style={{ fontSize: 20, color: '#000' }}>Run Outs </Text>
            <Text style={{ fontSize: 20, color: '#000' }}>{f_runout}</Text>
          </Row>
        </Col>
        <Col size={25}>
          <Row style={styles.cell}>
            <Text style={{ fontSize: 20, color: '#000' }}>Catches </Text>
            <Text style={{ fontSize: 20, color: '#000' }}>{f_catch}</Text>
          </Row>
        </Col>
        <Col size={25}>
          <Row style={styles.cell}>
            <Text style={{ fontSize: 20, color: '#000' }}>Stumpings </Text>
            <Text style={{ fontSize: 20, color: '#000' }}>{f_stump}</Text>
          </Row>
        </Col>
      </Grid>

    </View>
  );
}

const Tab = createMaterialTopTabNavigator();

export default function App({navigation,route}) {
 
  
  useEffect ( ()=> {
    
    //player_id INTEGER PRIMARY KEY AUTOINCREMENT,player_name TEXT,team_id INTEGER)
    global.player_name = route.params.player;
    console.log("player_name: ", player_name);

    global.team = route.params.team;
    console.log("team : ", team);

    
  });
 
  return (

    <Tab.Navigator
      tabBarOptions={{
        activeTintColor: '#fff',
        inactiveTintColor: '#fff',
        labelStyle: { textTransform: "none", fontSize: 18, },
        style: {
          backgroundColor: 'green',

        },
        indicatorStyle: {
          backgroundColor: 'white',
        },
      }}
    >

      <Tab.Screen style={styles.tabnav} name="Batting" component={Batting} />
      <Tab.Screen style={styles.tabnav} name="Bowling" component={Bowling} />
      <Tab.Screen style={styles.tabnav} name="Fielding" component={Fielding} />
    </Tab.Navigator>

  );
}
const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    padding: 16,
    backgroundColor: '#e6e6e6',
  },
  tabnav: {
    color: '#fff',
  },
  cell: {
    backgroundColor: '#fff',
    margin: 6,
    padding: 5,
    flex: 1,
    flexDirection: 'column',
    maxHeight: 80,
    maxWidth: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  },
});