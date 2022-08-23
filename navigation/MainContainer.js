import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Screens
import HomeScreen from './screens/CricketMatchScreen';
import DetailsScreen from './screens/TeamsScreen';
import SettingsScreen from './screens/HistoryScreen';
import Team_Details from './screens/Team_Details';
import AdvancedSettings from './screens/AdvancedSettings';
import StartMatchScreen from './screens/StartMatchScreen';
import ScoreBoardScreen from './ScoreBoardContainer';
import PlayerDetails from './screens/PlayerDetails';
import FirstInningsScreen from './screens/FirstInningsScreen';
import UpdateTeam from './screens/UpdateTeam';
import UpdatePlayer from './screens/UpdatePlayer';
import FallOfWicket from './screens/FallOfWicket';
import PlayerRetired from './screens/PlayerRetired';
import SelectNewBowler from './screens/SelectNewBowler';
import SecondInnings from './screens/SecondInnings';
import PlayerRetired2 from './screens/PlayerRetired2';
import SelectNewBowler2 from './screens/SelectNewBowler2';
import FallOfWicket2 from './screens/FallOfWicket2';
import Matchtie from './screens/Matchtie';
import WinByWickets from './screens/WinByWickets';
import WinByRuns from './screens/WinByRuns';
import Details from './screens/Details';
import StartMatchScreen2 from './screens/StartMatchScreen2';
//Screen names
const homeName = "New Match";
const detailsName = "Teams";
const settingsName = "History";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();


function MainContainer() {
  
  return (
      <Tab.Navigator
        initialRouteName={HomeScreen}
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            let rn = route.name;

            if (rn === homeName) {
              iconName = focused ? 'walk' : 'walk-outline';

            } else if (rn === detailsName) {
              iconName = focused ? 'people' : 'people-outline';

            } else if (rn === settingsName) {
              iconName = focused ? 'reader' : 'reader-outline';
            }

            // You can return any component that you like here!
            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}
        tabBarOptions={{
          activeTintColor: 'green',
          inactiveTintColor: 'grey',
          labelStyle: { paddingBottom: 10, fontSize: 10 },
          style: { padding: 10, height: 70}
        }}>

        <Tab.Screen options={{headerShown:false}} name={homeName} component={HomeScreen} />
        <Tab.Screen options={{headerShown:false}} name={detailsName} component={DetailsScreen} />
        <Tab.Screen options={{headerShown:false}}  name={settingsName} component={SettingsScreen} />
     


      </Tab.Navigator>
  );
}
function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
      <Stack.Screen 
       
       options={{
         title: 'Cricket scorer',
         headerStyle: {
           backgroundColor: 'green',
         },
         headerTintColor: '#fff',
         headerTitleStyle: {
           fontWeight: 'bold',
         },
       }}  name="MainContainer" component={MainContainer} />
        <Stack.Screen name="CricketMatchScreen" component={HomeScreen}/>
        <Stack.Screen options={{title:'Match Settings', headerStyle: {backgroundColor: 'green',},headerTintColor: '#fff',} } name="AdvancedSettings" component={AdvancedSettings} />
        <Stack.Screen options={{title:'Select Opening Players',headerStyle: {backgroundColor: 'green',},headerTintColor: '#fff',headerBackVisible:false}} name="StartMatchScreen" component={StartMatchScreen} />
        <Stack.Screen options={{title:'Details',headerStyle: {backgroundColor: 'green',},headerTintColor: '#fff'}} name="ScoreBoardScreen" component={ScoreBoardScreen} />

        <Stack.Screen options={{title:'Team Details', headerStyle: {backgroundColor: 'green',},headerTintColor: '#fff',}} name="Team_Details" component={Team_Details} />
        <Stack.Screen options={{title:'Player Profile', headerStyle: {backgroundColor: 'green', },headerTintColor: '#fff',}}name="PlayerDetails" component={PlayerDetails}/>
        <Stack.Screen options={{title:'First Innings ', headerStyle: {backgroundColor: 'green', },headerTintColor: '#fff',headerBackVisible:false}}name="FirstInningsScreen" component={FirstInningsScreen}/>
        <Stack.Screen options={{title:'UpdateTeam  ', headerStyle: {backgroundColor: 'green', },headerTintColor: '#fff',}}name="UpdateTeam" component={UpdateTeam}/>
        <Stack.Screen options={{title:'UpdatePlayer ', headerStyle: {backgroundColor: 'green', },headerTintColor: '#fff',}}name="UpdatePlayer" component={UpdatePlayer}/>
        <Stack.Screen options={{title:'Fall of Wicket ', headerStyle: {backgroundColor: 'green', },headerTintColor: '#fff',}}name="FallOfWicket" component={FallOfWicket}/>
        <Stack.Screen options={{title:'Player Retired ', headerStyle: {backgroundColor: 'green', },headerTintColor: '#fff',}}name="PlayerRetired" component={PlayerRetired}/>
        <Stack.Screen options={{title:'Select new Bowler ', headerStyle: {backgroundColor: 'green', },headerTintColor: '#fff',}}name="SelectNewBowler" component={SelectNewBowler}/>
        <Stack.Screen options={{title:'Fall of Wicket ', headerStyle: {backgroundColor: 'green', },headerTintColor: '#fff',}}name="FallOfWicket2" component={FallOfWicket2}/>
        <Stack.Screen options={{title:'Player Retired ', headerStyle: {backgroundColor: 'green', },headerTintColor: '#fff',}}name="PlayerRetired2" component={PlayerRetired2}/>
        <Stack.Screen options={{title:'Select new Bowler ', headerStyle: {backgroundColor: 'green', },headerTintColor: '#fff',}}name="SelectNewBowler2" component={SelectNewBowler2}/>
        <Stack.Screen options={{title:'Second Innings', headerStyle: {backgroundColor: 'green', },headerTintColor: '#fff',headerBackVisible:false}}name="SecondInnings" component={SecondInnings}/>

        
        <Stack.Screen options={{title:'Result', headerStyle: {backgroundColor: 'green', },headerTintColor: '#fff',headerBackVisible:false}}name="Matchtie" component={Matchtie}/>
        <Stack.Screen options={{title:'Result', headerStyle: {backgroundColor: 'green', },headerTintColor: '#fff',headerBackVisible:false}} name="WinByWickets" component={WinByWickets}/>
        <Stack.Screen options={{title:'Result', headerStyle: {backgroundColor: 'green', },headerTintColor: '#fff',headerBackVisible:false}}name="WinByRuns" component={WinByRuns}/>
        <Stack.Screen options={{title:'Details', headerStyle: {backgroundColor: 'green', },headerTintColor: '#fff',}}name="Details" component={Details}/>
        <Stack.Screen options={{title:'Select Opening Players', headerStyle: {backgroundColor: 'green', },headerTintColor: '#fff',headerBackVisible:false}}name="StartMatchScreen2" component={StartMatchScreen2}/>



        





      </Stack.Navigator>
    </NavigationContainer>
  );
}
export default App;
