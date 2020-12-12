import React from "react";
import { Text, View } from "react-native";
import tailwind from "tailwind-rn";
import * as timeago from 'timeago.js';

import Avatar from './Avatar.js';

export default function Message({ room }) {
  const { messages, name, room_image } = room;
  const { msg_text, msg_timestamp, user } = messages[0];
  
  return (
    <View style={tailwind(`flex flex-row mt-4 pr-2`)}>
      <View style={tailwind(`flex flex-col justify-center items-center w-1/4`)}>
        <Avatar style="-ml-4 -mt-1" image={room_image || user.avatar} />
      </View>
      <View style={tailwind(`flex flex-col w-3/4`)}>
        <View style={tailwind(`flex flex-row justify-between`)}>
          <Text style={tailwind(`text-lg text-black font-bold mb-1`)}>
            {name}
          </Text>
          <Text style={tailwind(`text-base text-green-500 font-bold mb-1`)}>
            {timeago.format(msg_timestamp)}
          </Text>
        </View>
        <View style={tailwind(`flex flex-row`)}>
          <Text
            style={tailwind(
              `text-black text-justify text-base leading-6 w-full`
            )}
          >
            {msg_text}
          </Text>
        </View>
      </View>
    </View>
  );
}