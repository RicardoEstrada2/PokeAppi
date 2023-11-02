import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { Generations } from './Generations';
import { Home } from './Home';

const Tab = createMaterialTopTabNavigator();

export function MainTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Generations" component={Generations} />
      <Tab.Screen name="Pokemons" component={Home} />
    </Tab.Navigator>
  );
}