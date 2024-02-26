"use client";

import usePokemon from "@/hooks/usePokemon";
import Link from "next/link";
import styles from "./PokemonEntry.module.css";
import { Spinner } from "react-bootstrap";
import Image from "next/image";

interface Props {
  name: string;
}
export default function PokemonEntry({ name }: Props) {
  const { pokemon, pokemonLoading } = usePokemon(name);
  return (
    <Link href={"/" + name}>
      <div className={styles.entry}>
        {pokemonLoading && <Spinner animation="grow" />}
        {pokemon && (
          <div className={styles.card}>
            <h1 className="text-center text-capitalize">{pokemon.name}</h1>
            <Image
              src={pokemon.sprites.other["official-artwork"].front_default}
              width={200}
              height={200}
              alt={pokemon.name}
            />
          </div>
        )}
      </div>
    </Link>
  );
}
