import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import CadastroAluno from './src/screens/CadastroAluno';
import CadastroNutricional from './src/screens/CadastroNutricional';
import HorariosPreferencias from './src/screens/HorariosPreferencias';
import TrabalheConosco from './src/screens/TrabalheConosco';
import Contato from './src/screens/Contato';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const CadastroAlunoStack = () => (
  <Stack.Navigator initialRouteName="CadastroAluno">
    <Stack.Screen
      name="CadastroAluno"
      component={CadastroAluno}
      options={{ headerShown: false }}
    />
  </Stack.Navigator>
);

const CadastroNutricionalStack = () => (
  <Stack.Navigator initialRouteName="CadastroNutricional">
    <Stack.Screen
      name="CadastroNutricional"
      component={CadastroNutricional}
      options={{ headerShown: false }}
    />
  </Stack.Navigator>
);

const HorariosPreferenciasStack = () => (
  <Stack.Navigator initialRouteName="HorariosPreferencias">
    <Stack.Screen
      name="HorariosPreferencias"
      component={HorariosPreferencias}
      options={{ headerShown: false }}
    />
  </Stack.Navigator>
);

const TrabalheConoscoStack = () => (
  <Stack.Navigator initialRouteName="TrabalheConosco">
    <Stack.Screen
      name="TrabalheConosco"
      component={TrabalheConosco}
      options={{ headerShown: false }}
    />
  </Stack.Navigator>
);

const ContatoStack = () => (
  <Stack.Navigator initialRouteName="Contato">
    <Stack.Screen
      name="Contato"
      component={Contato}
      options={{ headerShown: false }}
    />
  </Stack.Navigator>
);

const App = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color, size }) => {
            let iconName;

            if (route.name === 'Home') {
              iconName = 'home';
            } else if (route.name === 'Nutrição') {
              iconName = 'nutrition';
            } else if (route.name === 'Horários e Preferências') {
              iconName = 'clock';
            } else if (route.name === 'Trabalhe Conosco') {
              iconName = 'briefcase';
            } else if (route.name === 'Contato') {
              iconName = 'phone';
            }

            return <MaterialCommunityIcons name={iconName} size={size} color={color} />;
          },
        })}
        tabBarOptions={{
          activeTintColor: 'blue',
          inactiveTintColor: 'gray',
        }}
      >
        <Tab.Screen name="Home" component={CadastroAlunoStack} />
        <Tab.Screen name="Nutrição" component={CadastroNutricionalStack} />
        <Tab.Screen name="Horários e Preferências" component={HorariosPreferenciasStack} />
        <Tab.Screen name="Trabalhe Conosco" component={TrabalheConoscoStack} />
        <Tab.Screen name="Contato" component={ContatoStack} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default App;
