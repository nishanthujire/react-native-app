import * as React from 'react';
import { Text, View } from 'react-native';

import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import ScoreBoard from './screens/ScoreBoard';
import Overs from './screens/Overs';


// function ScoreBoard() {
//   return (
//     <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//       <Text>Home!</Text>
//     </View>
//   );
// }

// function Overs() {
//   return (
//     <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//       <Text>Settings!</Text>
//     </View>
//   );
// }

const Tab = createMaterialTopTabNavigator();

export default function App({ navigation, route }) {
  global.match_id2 = route.params.match_id;
  //console.log("details match_id : ", global.match_id2);

  global.team1 = route.params.team1;
  //console.log("team 1 : ", team1);
  global.team2 = route.params.team2;
  //console.log("team 2 : ", team2);
  global.score1 = route.params.score1;
  //console.log("score 1 : ", score1);
  global.score2 = route.params.score2;
  // console.log("score 2 : ", score2);
  global.result = route.params.result;
  //console.log("reslut is : ", result);
  global.team1rr = route.params.team1rr;
  global.team2rr = route.params.team2rr;



  return (

    <Tab.Navigator tabBarOptions={{
      activeTintColor: '#fff',
      inactiveTintColor: '#fff',
      style: { backgroundColor: 'green' },
      labelStyle: { textTransform: "none", fontSize: 15, },
      indicatorStyle: {
        backgroundColor: 'white',

      },

    }}
    >


      <Tab.Screen options={{ title: 'ScoreBoard' }} name="ScoreBoard" component={ScoreBoard} />
      <Tab.Screen options={{ title: 'Overs' }} name="Overs" component={Overs} />
    </Tab.Navigator>

  );
}
