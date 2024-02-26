"use client";

import usePokemon from "@/hooks/usePokemon";
import Image from "next/image";
import Link from "next/link";
import { FormEvent } from "react";
import { Button, Form, Spinner } from "react-bootstrap";
import * as PokemonApi from "@/network/pokemon-api";

interface Props {
  pokemonName: string;
}
export default function Pokemon({ pokemonName }: Props) {
  const { pokemon, pokemonLoading, mutatePokemon } = usePokemon(pokemonName);
  async function handleSubmitNickname(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const nickname = formData.get("nickname")?.toString().trim();
    if (!pokemon || !nickname) {
      return;
    }
    const update = await PokemonApi.setNickname(pokemon, nickname);
    mutatePokemon(update, { revalidate: false });
  }
  return (
    <div className="d-flex flex-column align-items-center">
      <p>
        <Link href="/" className="link-light">
          ⬅️ PokeDex
        </Link>
      </p>
      {pokemonLoading && <Spinner animation="grow" />}
      {pokemon === null && <p>Pokemon not found.</p>}
      {pokemon && (
        <>
          <h1 className="text-center text-capitalize">{pokemon.name}</h1>
          <Image
            src={pokemon.sprites.other["official-artwork"].front_default}
            width={400}
            height={400}
            alt={pokemon.name}
          />
          <div className=" mt-2">
            <div>
              <strong>Types: </strong>
              {pokemon.types.map((type) => type.type.name).join(", ")}
            </div>
            <div>
              <strong>Height: </strong>
              {pokemon.height * 10} cm
            </div>
            <div>
              <strong>Weight: </strong>
              {pokemon.weight / 10} kg
            </div>
          </div>
          <Form className="mt-4" onSubmit={handleSubmitNickname}>
            <Form.Group controlId="pokemon-input-input" className="mb-3">
              <Form.Label>Give this pokemon a nickname</Form.Label>
              <Form.Control
                name="nickname"
                type="text"
                placeholder="E.g. BoBooo"
              />
            </Form.Group>
            <Button type="submit">Set Nickname</Button>
          </Form>
        </>
      )}
    </div>
  );
}
