import 'react-native-gesture-handler';
import React, { useState, useEffect} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import ScheduleScreen from './screens/ScheduleScreen';
import CourseDetailScreen from './screens/CourseDetailScreen';
import CourseEditScreen from './screens/CourseEditScreen';
import SignInScreen from './screens/SignInScreen';
import UserContext from './UserContext';
import { Button } from 'react-native';
import { firebase } from './firebase';

const Stack = createStackNavigator();

const App = () => {
    const [auth, setAuth] = useState();
    const [user, setUser] = useState(null);

    useEffect(() => {
    firebase.auth().onAuthStateChanged((auth) => {
      setAuth(auth);
    });
  }, []);
    useEffect(() => {
    if (auth && auth.uid) {
      const db = firebase.database().ref('users').child(auth.uid);
      const handleData = snap => {
        setUser((uid: auth.uid), ...snap.val());
      }
      db.on('value', handleData, error => alert(error));
      return () => { db.off('value', handleData); };
    } else {
      setUser(null);
    }
  }, [auth]);
  const SignInButton = ({ navigation, user }) => (
    user && user.uid
    ? <Button title="Logout" color="#448aff"
        onPress={() => firebase.auth().signOut()}
      />
    : <Button title="Sign In" color="#448aff"
        onPress={() => navigation.navigate('SignInScreen')}
      />
  );
  return (
    <UserContext.Provider value={user}>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name="ScheduleScreen"
              component={ScheduleScreen}
              options={({navigation}) => ({
                  title: "Schedule",
                  headerRight: () => (
                      <SignInButton navigation={navigation} user={user} />
                  ),
              })
          }
             />
            <Stack.Screen name="CourseDetailScreen"
              component={CourseDetailScreen}
              options={{ title: 'Course detail'}}
            />
            <Stack.Screen name="CourseEditScreen"
                component={CourseEditScreen}
                options={{ title: 'Course Editor'}}
              />
            <Stack.Screen name="SignInScreen" component={SignInScreen}
            options={({navigation}) => ({
                title: "Sign In",
                headerRight: () => (
                    <SignInButton navigation={navigation}/>
                ),
            })
        }
            />
          </Stack.Navigator>
        </NavigationContainer>
    </UserContext.Provider>
  );
};

export default App;
