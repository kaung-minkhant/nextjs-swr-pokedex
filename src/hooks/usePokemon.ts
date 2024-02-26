import useSWR from "swr";
import * as PokemonApi from '@/network/pokemon-api'
import { AxiosError } from "axios";

export default function usePokemon(pokemonName: string) {
  const { data, isLoading, mutate } = useSWR(pokemonName, async () => {
    try {
      return await PokemonApi.getPokemon(pokemonName);
    } catch(err) {
      if (err instanceof AxiosError && err.response?.status === 404) {
        return null
      } else {
        throw err;
      }
    }
  },
    {
      revalidateOnFocus: true,
      revalidateOnReconnect: true,
    }
  );

  return {
    pokemon: data,
    pokemonLoading: isLoading,
    mutatePokemon: mutate
  }
}