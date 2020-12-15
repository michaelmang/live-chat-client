import { useQuery } from "@apollo/client";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import React from "react";
import { Text, View } from "react-native";
import { Link } from "react-router-native";
import { GiftedChat } from 'react-native-gifted-chat';
import tailwind from "tailwind-rn";

import { ROOM } from '../gql.js';
import Avatar from "../components/Avatar.js";
import Loading from "../components/Loading.js";

const defaultRoomImage = "https://images.pexels.com/photos/33041/antelope-canyon-lower-canyon-arizona.jpg?auto=compress&cs=tinysrgb&h=750&w=1260";

const shapeToGiftedChatMessage = (message) => {
  return {
    _id: message.id,
    text: message.msg_text,
    createdAt: message.msg_timestamp,
    user: {
      _id: message.user.id,
      name: message.user.username,
      avatar: message.user.avatar,
    },
  };
};

export default function Room({ match, user }) {
  const { room_id } = match.params;
  
  const { loading, data, refetch } = useQuery(ROOM, {
    variables: { room_id },
  });

  if (loading) {
    return (
      <Loading />
    );
  }

  const { rooms } = data;
  const { messages, name, room_image } = rooms[0];

  return (
    <View style={tailwind(`h-full w-full flex flex-col bg-white pt-10`)}>
      <View
        style={tailwind(
          `w-full flex flex-row items-center justify-start py-6 px-8`
        )}
      >
        <Link underlayColor="#fafafa" to="/">
          <FontAwesomeIcon style={tailwind(`mr-3`)} icon={faChevronLeft} />
        </Link>
        <Avatar imageStyle="h-10 w-10" image={room_image || defaultRoomImage} />
        <Text style={tailwind(`text-2xl text-black font-black ml-2`)}>{name}</Text>
      </View>
      <GiftedChat
        messages={messages.map(shapeToGiftedChatMessage)}
        user={{ _id: user.id }}
      />
    </View>
  );
}