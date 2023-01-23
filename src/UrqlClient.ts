import fetch from "cross-fetch";
import { createClient } from "urql";

const urqlClient = createClient({
  url: import.meta.env.VITE_RICK_Graphql_ENDPOINT!,
  fetch: fetch,
});

export default urqlClient;
