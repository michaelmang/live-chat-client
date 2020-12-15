import React from "react";
import { Text, View, Button } from "react-native";
import { Redirect } from "react-router-native";
import tailwind from "tailwind-rn";

export default function Login({ onPress, request, user }) {
  if (user) {
    return <Redirect to="/" />;
  }

  return (
    <View
      style={tailwind(
        `flex flex-col justify-between h-full w-full items-center bg-black px-8 py-20`
      )}
    >
      <View style={tailwind(`flex flex-col items-center`)}>
        <Text style={tailwind(`justify-self-center text-white font-bold text-3xl`)}>
          Realtime messaging.
        </Text>
        <Text
          style={tailwind(`text-white text-center leading-6 font-light text-base mt-4`)}
        >
          Think fast! Any of your messages can be read as your type.
          Laugh at hilarious typos. Understand what the other person
          is really trying to say. Stop staring at those bubbles
          wondering.
        </Text>
      </View>
      <Button
        color="white"
        onPress={onPress}
        title="Sign In"
      />
    </View>
  );
}