import React from "react";
import { Text, View } from "react-native";
import tailwind from "tailwind-rn";

export default function Loading() {
  return (
    <View style={tailwind(`h-full w-full p-4 flex flex-col justify-center items-center`)}>
      <Text style={tailwind(`text-3xl text-black`)}>Loading...</Text>
    </View>
  );
}