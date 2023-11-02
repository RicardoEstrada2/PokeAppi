import { Center, Heading, Pressable, Text } from "native-base";
import { generations } from "../../assets/pokemon-list";
import { PokemonGenerations } from "../utils/api";
import { getTypeColor } from "../utils/helper";
import { useNavigation } from "@react-navigation/native";
import { MainStackScreenProps } from "../navigators/Types";

export function PokemonGenerationsCards({ id, name }: PokemonGenerations) {

  const navigation =
  useNavigation<MainStackScreenProps<"Home">["navigation"]>();

  // console.log(name)

  return (
    <Pressable
        p="10"
        m="5"
        mt="10"
      backgroundColor={getTypeColor("shadow") + ".400"}
      borderRadius={10}
      onPress={() => navigation.navigate("PokemonGenerationList", {id: id, name: name})}
    >
      <Heading width="100%" size="sm">
        <Text p="10" color="white">
          {name}
        </Text>
      </Heading>
    </Pressable>
  );
}
