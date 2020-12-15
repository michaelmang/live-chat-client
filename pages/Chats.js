import { useQuery } from "@apollo/client";
import React from "react";
import { Text, ScrollView, View } from "react-native";
import tailwind from "tailwind-rn";

import { CHATS } from '../gql.js';
import Loading from "../components/Loading.js";
import Message from '../components/Message.js';

export default function Chats({ user }) {
  const { loading, data } = useQuery(CHATS, {
    variables: { user_id: user.id },
  });

  if (loading) {
    return (
      <Loading />
    );
  }

  return (
    <View style={tailwind(`h-full w-full flex flex-col bg-white max-w-screen-sm pt-10`)}>
      <View
        style={tailwind(
          `w-full flex flex-row items-center justify-start py-6 px-8`
        )}
      >
        <Text style={tailwind(`text-2xl text-black font-black`)}>💬 Chats</Text>
      </View>
      <ScrollView
        style={tailwind(`h-full w-full p-4 flex flex-col bg-white`)}
      >
        <Text style={tailwind(`text-lg text-black font-bold my-2`)}>
          📥 Messages
        </Text>
        {data?.users[0]?.user_rooms?.map((props, idx) => {
          return <Message key={`${props.id}_${idx}`} {...props} />;
        })}
      </ScrollView>
    </View>
  );
}