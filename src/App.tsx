import React, {useEffect} from 'react';
import type {PropsWithChildren} from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  useColorScheme,
  View,
} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';
import Home from './screens/Home';
import Details from './screens/Details';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {HomeStackParams} from './interfaces/interfaces';
import {NavigationContainer} from '@react-navigation/native';
import AddItem from './screens/AddItem';
import {ApolloProvider} from '@apollo/client';
import apolloClient from './services/apollo-client';
import {DarkTheme, LightTheme} from './themes/Theme';
import Dashboard from './screens/Dashboard';
import Settings from './screens/Settings';
import useTheme from './hooks/useTheme';
import {Provider, useSelector} from 'react-redux';
import {persistor, RootState, Store} from './redux/Store';
import {PersistGate} from 'redux-persist/integration/react';
import Header from './components/Header';
import DashboardSkeleton from './components/skeleton/DashboardSkeleton';
import HomeSkeleton from './components/skeleton/HomeSkeleton';
import DetailsSkeleton from './components/skeleton/DetailsSkeleton';
import Filter from './screens/Filter';
import SignUp from './screens/SignUp';
import SignIn from './screens/SignIn';
import {MyColors} from './constants/MyColors';
import SplashScreen from 'react-native-splash-screen';

function App(): React.JSX.Element {
  const Stack = createNativeStackNavigator<HomeStackParams>();

  const HomeStack = () => (
    <Stack.Navigator
      screenOptions={{
        headerShown: true,
        header: ({options: {title}}) => <Header title={title!} />,
      }}>
      <Stack.Screen
        name="Dashboard"
        component={Dashboard}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Home"
        component={Home}
        options={{title: 'Inventory Items'}}
      />
      <Stack.Screen name="Settings" component={Settings} />
      <Stack.Screen
        name="Details"
        component={Details}
        options={{title: 'Details'}}
      />
      <Stack.Screen name="AddItem" component={AddItem} />
      <Stack.Screen
        name="Filter"
        component={Filter}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );

  const LoginStack = () => (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="SignIn" component={SignIn} />
      <Stack.Screen name="SignUp" component={SignUp} />
    </Stack.Navigator>
  );

  const Nav = () => {
    const {themeMode} = useSelector((state: RootState) => state.themeSlice);
    const {user} = useSelector((state: RootState) => state.authSlice);
    const isDarkMode = themeMode === 'dark';

    return (
      <>
        <StatusBar
          barStyle={isDarkMode ? 'dark-content' : 'light-content'}
          backgroundColor={
            isDarkMode ? MyColors.secondaryColor : MyColors.primaryColor
          }
        />
        <NavigationContainer theme={isDarkMode ? DarkTheme : LightTheme}>
          {user ? <HomeStack /> : <LoginStack />}
        </NavigationContainer>
      </>
    );
  };

  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <Provider store={Store}>
      <PersistGate persistor={persistor}>
        <ApolloProvider client={apolloClient}>
          <SafeAreaView style={[styles.container]}>
            <Nav />
          </SafeAreaView>
        </ApolloProvider>
      </PersistGate>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
