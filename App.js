import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
} from "@apollo/client";
import React from "react";
import { NativeRouter, Route } from "react-router-native";

import Chats from './pages/Chats.js';
import Room from "./pages/Room.js";

const client = new ApolloClient({
  uri: "https://live-chat.hasura.app/v1/graphql",
  cache: new InMemoryCache(),
});

const user_id = "2c2e5dc4-7947-4bb7-a5d2-52dad9008f43";

export default function App() {
  return (
    <ApolloProvider client={client}>
      <NativeRouter>
        <Route exact path="/" render={(routerProps) => (
          <Chats {...routerProps} user_id={user_id} />
        )} />
        <Route exact path="/rooms/:room_id" render={(routerProps) => (
          <Room {...routerProps} user_id={user_id} />
        )} />
      </NativeRouter>
    </ApolloProvider>
  );
}
