import { useState, useEffect } from "react";
import { Stack, Input, Spinner, Text, Icon, Center, Box, FlatList, Pressable, HStack } from "native-base";
import { MaterialIcons } from '@expo/vector-icons';
import { useQuery } from '@tanstack/react-query';
import { Pokemon, PokemonListName, fetchPokemon } from "../utils/api";
import { MainStackScreenProps } from "../navigators/Types";
import { allPokemonList } from '../../assets/pokemon-list';
import { formatNumber } from "../utils/helper";


export function Search({ navigation } : MainStackScreenProps<'Search'>){
    const [text, setText] = useState<string>('');
    const [filteredPokemon, setFilteredPokemon] = useState<PokemonListName[]>([]);
    const {data, fetchStatus, error} = useQuery<Pokemon>({
        queryKey: ['pokemon', text],
        queryFn: () => fetchPokemon(text.toLowerCase()),
        enabled: !!text
    });

    useEffect(() => {
      if(data){
        navigation.replace('Detail', { name:data.name });
      }

			if (text) {
				const filtered: PokemonListName[] = allPokemonList.filter((name) =>
						name.identifier.toLowerCase().includes(text.toLowerCase())
						);
				setFilteredPokemon(filtered);
			} else {
					setFilteredPokemon([]);
			}
    }, [data, text])
    

		const handlePokemonSelection = (name: string) => {
			setText(name);
			setFilteredPokemon([]);
		};

		const handleChangeText = (text:string) => setText(text);

    return(
        <Stack flex={1} p="4">
            <Input
             placeholder="Search Pokemon by name or number" 
             backgroundColor="white"
             rounded="xl"
             py="3"
             px="1"
             fontSize="14"
             returnKeyType="search"
             onSubmitEditing={({ nativeEvent }) => setText(nativeEvent.text)}
						 onChangeText={handleChangeText}
             InputLeftElement={
                <Icon
                m="2"
                ml="3"
                size="6"
                color="gray.400"
                as={<MaterialIcons name="search" />}
                />
             }
						 style={{
							position: 'relative'
						 }}
             />
             <Center flex={1}>
                {!!error && (
                    <Text fontSize="xl" color="gray.500">
                        No results found for {text}
                    </Text>
                )}
                {fetchStatus === 'fetching' && (
                    <Spinner size="lg" />
                )}
             </Center>
						{text.length > 0 && (
						 	<Box
								position="absolute"
								top="70px"
								left="4"
								width="100%"
								p="5"
								backgroundColor="white"
							>
                    <FlatList
                        data={filteredPokemon}
                        keyExtractor={(item) => item.id}
                        renderItem={({ item }) => (
                            <Pressable onPress={() => handlePokemonSelection(item.identifier)}>
                                <HStack
																	justifyContent="space-between"
																	py="1.5"
																>
																	<Text>{item.identifier}</Text>
																	<Text>#{formatNumber(Number.parseInt(item.id))}</Text>
																</HStack>
                            </Pressable>
                        )}
                    />
            	</Box>
						)}
        </Stack>
    )
}