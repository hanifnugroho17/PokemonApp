import messaging from '@react-native-firebase/messaging';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react';
import {
  DashboardPokemonScreen,
  ForgotPasswordScreen, LoginScreen, PokebagScreen, PokemonDetailScreen,
  RegisterScreen, SplashScreen,
} from '../pages';
import { navigate, navigationRef } from './RootNavigation';

const Stack = createNativeStackNavigator();

function Router() {
  const [initialRoute, setInitialRoute] = useState('SplashScreen');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    messaging().onNotificationOpenedApp((remoteMessage) => {
      navigate(remoteMessage.data.type);
    });

    messaging()
      .getInitialNotification()
      .then((remoteMessage) => {
        if (remoteMessage) {
          setInitialRoute(remoteMessage.data.type);
        }
        setLoading(false);
      });
  }, []);

  return loading ? (null) : (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator initialRouteName={initialRoute}>
        <Stack.Screen
          name="SplashScreen"
          component={SplashScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="DashboardPokemonScreen"
          component={DashboardPokemonScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="PokebagScreen"
          component={PokebagScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="PokemonDetailScreen"
          component={PokemonDetailScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ForgotPasswordScreen"
          component={ForgotPasswordScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="LoginScreen"
          component={LoginScreen}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="RegisterScreen"
          component={RegisterScreen}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>

  );
}

export default Router;
