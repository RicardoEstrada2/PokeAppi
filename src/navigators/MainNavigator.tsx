import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Home } from "../screens/Home";
import { Detail } from "../screens/Detail";
import { Search } from "../screens/Search";
import { TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import type { MainStackParamList } from './Types'
import { MainTabs } from "../screens/MainTabs";
import { Generations } from "../screens/Generations";
import { PokemonGenerationList } from "../components/PokemonGenerationList";

const Stack = createNativeStackNavigator<MainStackParamList>();

export function MainNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={MainTabs}
        options={({ navigation }) => ({
          headerTitleStyle: {
            fontSize: 30,
          },
          headerTitle: "PokeDex",
          headerRight: () => (
            <TouchableOpacity onPress={() => navigation.navigate("Search")}>
              <MaterialIcons name="search" color="black" size={32} />
            </TouchableOpacity>
          ),
        })}
      />
      <Stack.Screen name="Detail" component={Detail}
				options={{
					headerTitle: 'Pokemon',
					headerTransparent: true,
					headerTintColor: "white"
				}}
			/>
      <Stack.Group screenOptions={{ presentation: "modal",animation:"slide_from_bottom" }}>
        <Stack.Screen
          name="Search"
          component={Search}
          options={() => ({
            presentation: "modal",
          })}
        />
      </Stack.Group>
      <Stack.Screen name="MainTabs" component={MainTabs} />
      <Stack.Screen name="Generations" component={Generations} />
      <Stack.Screen name="PokemonGenerationList" component={PokemonGenerationList} 
        options={{
          headerTitle: 'Pokemon Generations'
        }}
      />
    </Stack.Navigator>
  );
}
