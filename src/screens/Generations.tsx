import {
  Box,
  Center,
  FlatList,
  HStack,
  Heading,
  Text,
  VStack,
} from "native-base";
import { generations } from "../../assets/pokemon-list";
import { PokemonGenerationsCards } from "../components/PokemonGenerationsCards";

export function Generations() {
  // console.log(generations)

  return (
    <Center flex={1}>
        <Heading
            mt="5"
            fontWeight="bold"
            fontSize="35"
        >Generaciones Pokemon</Heading>
      <FlatList
        data={generations}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        contentInsetAdjustmentBehavior="automatic"
        renderItem={({ item }) => <PokemonGenerationsCards name={item.name} id={item.id} />}
        
      />
    </Center>
  );
}
