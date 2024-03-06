## To run
- `npm run dev` for running in dev mode
- `npm run build && npm run start` for production mode

## Description
Simple Pokedex to learn more about SWR with NextJS.
This uses NextJS. It also uses SWR for fetching and caching the data.
For UI, it uses bootstrap and react-bootstrap.

## SWR
SWR uses fetcher function to fetch and cache the data using the provided key. It can also be used for Optimistic UI pattern, using the cache. It also supports prefetching and api call states, such as loading, or error.

Documentation of SWR: https://swr.vercel.app/docs/getting-started