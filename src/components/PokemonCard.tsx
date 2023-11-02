import React, {memo} from 'react';
import { useQuery } from '@tanstack/react-query';
import { Pokemon, PokemonCardProps, fetchFn, fetchPokemon } from "../utils/api";
import { useNavigation } from "@react-navigation/native";
import { MainStackScreenProps } from "../navigators/Types";
import {
  Box,
  Heading,
  Image,
  Text,
  HStack,
  Stack,
  Skeleton,
  Pressable,
  Center,
  AspectRatio,
} from "native-base";
import { formatNumber, getTypeColor } from "../utils/helper";

function PokemonCardComponent({ name }: PokemonCardProps) {
  const { isLoading, error, data } = useQuery<Pokemon, Error, Pokemon>({
    queryKey: ["pokemon", name],
    queryFn: () => fetchPokemon(name),
  });

  const navigation =
    useNavigation<MainStackScreenProps<"Home">["navigation"]>();

  if (isLoading) return(
    <Stack
      flex={1}
      m="1.5"
      p="4"
      borderRadius="10"
    >
      <Skeleton h="32" />
      <Skeleton.Text px="4" />
    </Stack>
  );
  if (!data || error) return null;
  return (
    <Pressable
      flex={1}
      alignItems="center"
      justifyContent="center"
      m="1.5"
      p="4"
      width="100%"
      backgroundColor={getTypeColor(data.types[0].type.name) + ".500"}
      borderRadius="10"
      onPress={() => navigation.navigate("Detail", { name })}
    >
      <HStack>
        <AspectRatio ratio={1} width="30%" mr="2">
          <Image
            source={{
              uri: data.sprites.other["official-artwork"].front_default,
            }}
            alt="image"
          />
        </AspectRatio>
        <HStack flex={1} alignItems="center" mb="2">
          <HStack flex={1} alignItems="center">
            <Heading textTransform="capitalize" color="white" size="sm">
              <Text color="white" fontSize="lg">{data.name}</Text>
            </Heading>
            <Text color="white" fontSize="lg">#{formatNumber(data.id)}</Text>
          </HStack>
          {data.types.map((type) => (
            <Box
            
              key={type.type.name}
              px="2"
              py="0.5"
              mr="1"
              backgroundColor={getTypeColor(type.type.name) + ".400"}
              borderRadius={10}
              _text={{
                color: "white",
                fontSize: "lg"
              }}
            >
              {type.type.name}
            </Box>
          ))}
        </HStack>
        
      </HStack>
    </Pressable>
  );
}

export const PokemonCard = memo(PokemonCardComponent);