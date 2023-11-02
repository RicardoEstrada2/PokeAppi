import { MainStackScreenProps } from "../navigators/Types";
import { useQuery } from "@tanstack/react-query";
import { Pokedex, Pokemon, Species, fetchDetailPokedex, fetchFn, fetchPokemon } from "../utils/api";
import {
  AspectRatio,
  Image,
  Text,
  Heading,
  Stack,
  HStack,
  Center,
	Skeleton,
  FlatList
} from "native-base";
import { formatNumber, getTypeColor, removeEscapeCharacters } from "../utils/helper";

export function Detail({ route }: MainStackScreenProps<"Detail">) {
  const { name } = route.params;
  const pokemon = useQuery<Pokemon>({
    queryKey: ["pokemon", name],
    queryFn: () => fetchPokemon(name),
  });
  const pokeData = pokemon.data;
	const { isLoading: isSpeciesLoading, data: species } = useQuery<Species>({
    queryKey: ["species", name],
    queryFn: () => fetchFn(pokeData?.species.url || ''),
		enabled: !!pokeData
  });
  const pokedex = useQuery<Pokedex>({
    queryKey: ["pokedex", name],
    queryFn: () => fetchDetailPokedex(name),
  });

  const pokedexData = pokedex.data;

  // console.log(pokedexData?.flavor_text_entries);

  if (!pokeData) return null;
  if (!pokedexData) return null;
  if (!species) return null;

  return (
    <Stack>
      <Center
        safeArea
        backgroundColor={getTypeColor(pokeData.types[0].type.name) + ".500"}
				pb="5"
      >
        <AspectRatio ratio={1} width="80%">
          <Image
            source={{
              uri: pokeData.sprites.other["official-artwork"].front_default,
            }}
            alt="image"
          />
        </AspectRatio>
        <HStack
          justifyContent="space-between"
          width="100%"
          p="3"
          alignItems="center"
          position="absolute"
          bottom={0}
          left={0}
          right={0}
        >
          <Heading color="white" textTransform="capitalize" size="2xl">
            {name}
          </Heading>
          <Heading color="white">#{formatNumber(pokeData.id)}</Heading>
        </HStack>
      </Center>
			<Stack p="3">
				<HStack justifyContent="center">
					{pokeData.types.map((type) => (
						<Center key={type.type.name}
							backgroundColor={getTypeColor(type.type.name) + '.500'}
							rounded="full"
							p="1"
							minW="32"
							_text={{
								color: "white",
								fontSize: 'lg',
								fontWeight: 'bold',
								textTransform: 'capitalize'
							}}
							mx="2"
						>{type.type.name}</Center>
					))}
				</HStack>
				<Center>
        {pokedex.isLoading && <Skeleton.Text />}
        {!!pokedexData && pokedexData.stats && pokedexData.stats.map((stat) =>  (
          <Center>
            <HStack>
                <Center key={stat.stat.name}>
                  <Text>{stat.stat.name}: {stat.base_stat}</Text>
                </Center>
            </HStack>
            
          </Center>
        ))}
        <Text>{removeEscapeCharacters(species.flavor_text_entries[0].flavor_text)}</Text>
      </Center>
			</Stack>
    </Stack>
  );
}

// function DetailPokedex(pokedexTemp: Pokedex, isPokedexLoadingTemp: boolean){
//   return(
//     <Center>
//       {isPokedexLoadingTemp && <Skeleton.Text />}
//       {!!pokedexTemp && (
//         <Text fontSize='xl' mt='4'>{removeEscapeCharacters(pokedexTemp.flavor_text_entries[0].flavor_text)}</Text>
//       )}
//     </Center>
//   )
// }