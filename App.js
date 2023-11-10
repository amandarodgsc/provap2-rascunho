// App.js

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import CadastroAluno from './src/screens/CadastroAluno';
import CadastroNutricional from './src/screens/CadastroNutricional';
import HorariosPreferencias from './src/screens/HorariosPreferencias';
import TrabalheConosco from './src/screens/TrabalheConosco';
import Contato from './src/screens/Contato';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const CadastroAlunoStack = () => (
  <Stack.Navigator initialRouteName="CadastroAluno">
    <Stack.Screen name="CadastroAluno" component={CadastroAluno} />
  </Stack.Navigator>
);

const CadastroNutricionalStack = () => (
  <Stack.Navigator initialRouteName="CadastroNutricional">
    <Stack.Screen name="CadastroNutricional" component={CadastroNutricional} />
  </Stack.Navigator>
);

const HorariosPreferenciasStack = () => (
  <Stack.Navigator initialRouteName="HorariosPreferencias">
    <Stack.Screen name="HorariosPreferencias" component={HorariosPreferencias} />
  </Stack.Navigator>
);

const TrabalheConoscoStack = () => (
  <Stack.Navigator initialRouteName="TrabalheConosco">
    <Stack.Screen name="TrabalheConosco" component={TrabalheConosco} />
  </Stack.Navigator>
);

const ContatoStack = () => (
  <Stack.Navigator initialRouteName="Contato">
    <Stack.Screen name="Contato" component={Contato} />
  </Stack.Navigator>
);

function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Home" component={CadastroAlunoStack} />
        <Tab.Screen name="Nutrição" component={CadastroNutricionalStack} />
        <Tab.Screen name="Horários e Preferências" component={HorariosPreferenciasStack} />
        <Tab.Screen name="Trabalhe Conosco" component={TrabalheConoscoStack} />
        <Tab.Screen name="Contato" component={ContatoStack} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default App;
