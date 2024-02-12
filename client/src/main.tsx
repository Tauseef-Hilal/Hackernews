import React from "react";
import ReactDOM from "react-dom/client";
import { ApolloProvider } from "@apollo/client";

import App from "./components/App.tsx";
import apolloClient from "./lib/graphql/client.ts";
import "./styles/index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ApolloProvider client={apolloClient}>
      <App />
    </ApolloProvider>
  </React.StrictMode>
);
