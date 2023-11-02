import type{ NativeStackScreenProps } from '@react-navigation/native-stack'

export type MainStackParamList = {
    Home: undefined;
    Search: undefined;
    Detail: { name:string }
    Generations: undefined;
    MainTabs: undefined;
    PokemonGenerationList: { name:string, id:number };
}

export type MainStackScreenProps<T extends keyof MainStackParamList> = NativeStackScreenProps<MainStackParamList, T>