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

export default function App() {
  return (

      <Tab.Navigator   tabBarOptions={{
        activeTintColor: '#fff',
        inactiveTintColor: '#fff',
        style: {backgroundColor: 'green'},
        labelStyle: { textTransform: "none", fontSize: 15,},
        indicatorStyle: {
          backgroundColor: 'white',
        
      },
        
}}
      >
      
      
        <Tab.Screen options={{title:'ScoreBoard'}} name="ScoreBoard" component={ScoreBoard} />
        <Tab.Screen options={{title:'Overs'}}name="Overs" component={Overs} />
      </Tab.Navigator>
    
  );
}
