import { Pokemon, PokemonPage } from "@/models/Pokemon";
import api from "./axiosinstance";

export async function getPokemon(name: string) {
  const delay = Math.random() * 2000;
  await new Promise((resolve) => setTimeout(resolve, delay));
  const response = await api.get<Pokemon>(`/pokemon/${name}`);
  return response?.data;
}

export async function getPokemonPage(pageNumber: number) {
  const pageSize = 12;
  const response = await api.get<PokemonPage>(
    `/pokemon?limit=${pageSize}&offset=${(pageNumber - 1) * pageSize}`
  );

  return response?.data;
}

export async function setNickname(
  pokemon: Pokemon,
  nickname: string
): Promise<Pokemon> {
  return {
    ...pokemon,
    name: nickname,
  };
}
