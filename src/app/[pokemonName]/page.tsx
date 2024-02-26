import { Metadata } from "next";
import Pokemon from "./Pokemon";

interface PageProps {
  params: {
    pokemonName: string;
  };
}

export function generateMetadata({
  params: { pokemonName },
}: PageProps): Metadata {
  return {
    title: `${pokemonName} - Next SWR PokeDex`,
  };
}

export default function Page({ params: { pokemonName } }: PageProps) {
  return <Pokemon pokemonName={pokemonName} />
}
