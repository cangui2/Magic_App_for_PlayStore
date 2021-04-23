/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useEffect, useState} from 'react';
import type {Node} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Image,
  ImageBackground,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import Database from './Database/Database';
import {Container, Header, Content, Card, CardItem, Body} from 'native-base';
import CardButton from '@paraboly/react-native-card-button';
import CardList from './Page/CardList';
import async from 'async';
import CardDetailPage from './Page/CardDetailPage';
import SetCorePage from './Page/setCorePage';
function HomeScreen({navigation}) {
  return (
    <ScrollView>
      <View
        style={{
          flex: 1,
          backgroundColor: 'black',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Text>Home Screen</Text>
        <Image source={require('./Assets/images/1.jpg')} />
      </View>

      <View
        style={{
          flex: 1,
          alignItems: 'center',
          flexDirection: 'row',
          justifyContent: 'center',
        }}>
        <View
          style={{
            flex: 2,
            backgroundColor: 'black',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <CardButton
            onPress={() => navigation.navigate('Card List')}
            text="Liste de card"
            iconSize={34}
            iconColor="white"
            textColor="white"
            iconType="favorite"
            rippleColor="white"
            end={{x: 1, y: 1}}
            start={{x: 0, y: 0}}
            gradientColors={['#BA5370', '#F4E2D8']}
          />
        </View>
        <View
          style={{
            flex: 2,
            backgroundColor: 'black',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <CardButton
            onPress={() => navigation.navigate('setCore')}
            text="Set core"
            iconSize={34}
            iconColor="white"
            textColor="white"
            iconType="favorite"
            rippleColor="white"
            end={{x: 1, y: 1}}
            start={{x: 0, y: 0}}
            gradientColors={['#BA5370', '#F4E2D8']}
          />
        </View>
      </View>
    </ScrollView>
  );
}

const Stack = createStackNavigator();

const App: () => Node = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const db = new Database();
  const [dbTest, setDbTest] = useState();
  console.log(db.initDB());
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Card List" component={CardList} />
        <Stack.Screen name="CardDetail" component={CardDetailPage} />
        <Stack.Screen name="setCore" component={SetCorePage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
