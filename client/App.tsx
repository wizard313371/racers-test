import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import store, { persistor } from './src/redux/store';
import DriversList from './src/components/DriverList';
import EditDriverProfile from './src/components/EditDriverProfile';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="DriversList">
            <Stack.Screen name="DriversList" component={DriversList} options={{ title: 'Drivers List' }} />
            <Stack.Screen name="EditDriverProfile" component={EditDriverProfile} options={{ title: 'Driver Profile' }} />
          </Stack.Navigator>
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
};

export default App;
