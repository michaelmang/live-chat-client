import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import * as AuthSession from "expo-auth-session";
import { StatusBar } from "expo-status-bar";
import jwtDecode from "jwt-decode";
import React, { useEffect, useState } from "react";
import { Alert, Platform } from "react-native";
import { NativeRouter, Route } from "react-router-native";
import getUUID from "uuid-by-string";
import Login from "./components/Login.js";

import PrivateRoute from "./components/PrivateRoute.js";
import Chats from "./pages/Chats.js";
import Room from "./pages/Room.js";

const client = new ApolloClient({
  uri: process.env.REACT_NATIVE_APOLLO_CLIENT_URI,
  cache: new InMemoryCache(),
});

const auth0ClientId = process.env.REACT_NATIVE_AUTH0_CLIENT_ID;
const authorizationEndpoint = `https://${process.env.REACT_NATIVE_AUTH0_DOMAIN}/authorize`;

const useProxy = Platform.select({ web: false, default: true });
const redirectUri = AuthSession.makeRedirectUri({ useProxy });

function shapeDecodedToken(decodedToken) {
  const { aud, ...rest } = decodedToken;

  return {
    id: getUUID(aud),
    ...rest,
  };
}

export default function App() {
  const [user, setUser] = useState(null);

  const [request, result, promptAsync] = AuthSession.useAuthRequest(
    {
      redirectUri,
      clientId: auth0ClientId,
      // id_token will return a JWT token
      responseType: "id_token",
      // retrieve the user's profile
      scopes: ["openid", "profile", "email"],
      extraParams: {
        // ideally, this will be a random value
        nonce: "nonce",
      },
    },
    { authorizationEndpoint }
  );

  function handlePress() {
    promptAsync({ useProxy });
  }

  useEffect(() => {
    if (result) {
      if (result.error) {
        Alert.alert(
          "Authentication error",
          result.params.error_description || "something went wrong"
        );
        return;
      }

      if (result.type === "success") {
        // Retrieve the JWT token and decode it
        const jwtToken = result.params.id_token;
        const decoded = shapeDecodedToken(jwtDecode(jwtToken));

        setUser(decoded);
      }
    }
  }, [result]);

  return (
    <ApolloProvider client={client}>
      <StatusBar style="light" />
      <NativeRouter>
        <PrivateRoute
          isAuthenticated={!!user}
          exact
          path="/"
          render={(routerProps) => <Chats {...routerProps} user={user} />}
        />
        <PrivateRoute
          isAuthenticated={!!user}
          exact
          path="/rooms/:room_id"
          render={(routerProps) => <Room {...routerProps} user={user} />}
        />
        <Route
          exact
          path="/login"
          render={(routerProps) => (
            <Login {...routerProps} onPress={handlePress} request={request} user={user} />
          )}
        />
      </NativeRouter>
    </ApolloProvider>
  );
}
