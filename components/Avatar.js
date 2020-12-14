import React from "react";
import { View, Image } from "react-native";
import tailwind from "tailwind-rn";

export default function Avatar({ style = "", image, imageStyle = "" }) {
  return (
    <View style={tailwind(`flex flex-col items-center ${style}`)}>
      <Image
        style={tailwind(
          `rounded-full border-solid border-2 border-green-500 h-16 w-16 ${imageStyle}`
        )}
        source={{
          uri: image,
        }}
      />
    </View>
  );
}