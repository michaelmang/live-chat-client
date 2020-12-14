import React from "react";
import { Text, View } from "react-native";
import { Link } from 'react-router-native';
import tailwind from "tailwind-rn";
import * as timeago from 'timeago.js';

import Avatar from './Avatar.js';

export default function Message({ room }) {
  const { id, messages, name, room_image } = room;
  const { msg_text, msg_timestamp, user } = messages[0];
  
  return (
    <Link underlayColor="#fafafa" style={tailwind(`py-2`)} to={`/rooms/${id}`}>
      <View style={tailwind(`flex flex-row justify-between pl-4 w-full`)}>
        <View style={tailwind(`flex flex-row`)}>
          <View style={tailwind(`flex flex-col justify-start items-center mr-2`)}>
            <Avatar style="-ml-4 -mt-1" image={room_image || user.avatar} />
          </View>
          <View style={tailwind(`flex flex-col`)}>
            <Text style={tailwind(`text-lg text-black font-bold mb-1`)}>
              {name}
            </Text>
            <Text
              style={tailwind(
                `text-black text-justify text-base leading-6 w-full`
              )}
            >
              {msg_text}
            </Text>
          </View>
        </View>
        <View style={tailwind(`flex flex-col`)}>
          <Text style={tailwind(`text-base text-green-500 font-bold mb-1`)}>
            {timeago.format(msg_timestamp)}
          </Text>
        </View>
      </View>
    </Link>
  );
}