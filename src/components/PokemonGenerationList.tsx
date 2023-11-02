import { Box, Center, Text, Heading, Spinner, FlatList } from "native-base";
import { AllPokemon, fetchOneGenerationPokemon } from "../utils/api";
import { MainStackScreenProps } from "../navigators/Types";
import { useQuery } from "@tanstack/react-query";
import { PokemonCard } from "./PokemonCard";
import { useMemo } from "react";

const generationData = {
	1: {offset:0, limit:151},
	2: {offset:151, limit:100},
	3: {offset:251, limit:135},
	4: {offset:387, limit:107},
	5: {offset:494, limit:156},
	6: {offset:650, limit:72},
	7: {offset:722, limit:88},
	8: {offset:810, limit:89},
	9: {offset:898, limit:102}
}

export function PokemonGenerationList({
  route,
}: MainStackScreenProps<"PokemonGenerationList">) {
  const { id, name } = route.params;
	const { offset, limit } = useMemo(() => generationData[id], [id])


  const { data, isLoading, status, error } = useQuery<AllPokemon>({
    queryKey: ["generations", { offset, limit}],
    queryFn: () => fetchOneGenerationPokemon(offset, limit),
		refetchOnMount: true
  });

  if (isLoading)
    return (
      <Center flex={1}>
        <Spinner size="lg" color="black" />
      </Center>
    );

  if (status === 'error') return <p>Error: {error.message}</p>;

  // console.log(data.results);

  return (
    <Box>
      <Center>
        <Heading>{name}</Heading>
      </Center>
      <FlatList
        data={data.results}
        keyExtractor={(item) => item.name}
        renderItem={({ item }) => <PokemonCard name={item.name} />}
        numColumns={1}
        contentInsetAdjustmentBehavior="automatic"
        _contentContainerStyle={{ p: 2, bg: "white" }}
				initialNumToRender={5}
				maxToRenderPerBatch={10}
				windowSize={21}
      />
    </Box>
  );
}
