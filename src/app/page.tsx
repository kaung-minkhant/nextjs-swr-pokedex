"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import useSWR from "swr";
import * as PokemonApi from "@/network/pokemon-api";
import { Button, Col, Row, Spinner } from "react-bootstrap";
import PokemonEntry from "@/components/PokemonEntry";

export default function Home() {
  const router = useRouter()
  const pathName = usePathname()
  const searchParams = useSearchParams();
  const page = parseInt(searchParams.get("page") || "1");
  const { data, isLoading } = useSWR(`getPokemonPage-${page}`, () =>
    PokemonApi.getPokemonPage(page)
  );
  if (isLoading) {
    return <Spinner className="d-block m-auto" />;
  }
  return (
    <div>
      <h1 className="text-center mb-4">Gotta cache..!</h1>
      <Row xs={1} sm={2} lg={3} xl={4} className="g-4">
        {data?.results.map((result) => {
          return (
            <Col>
              <PokemonEntry name={result.name} key={'pokemon-'+result.name} />
            </Col>
          );
        })}
      </Row>
      <div className="d-flex justify-content-center mt-4">
        {
          data?.previous && <Button onClick={() => router.push(`${pathName}?page=${page-1}`)} className="me-4">Previous Page</Button>
        }
        {
          data?.next && <Button onClick={() => router.push(`${pathName}?page=${page+1}`)}>Next Page</Button>
        }
      </div>
    </div>
  );
}
