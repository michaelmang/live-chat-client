import { gql } from '@apollo/client';

export const CHATS = gql`
  query ($user_id: uuid = "") {
    users(where: {id: {_eq: $user_id}}) {
      user_rooms {
        room {
          messages {
            id
            msg_text
            msg_timestamp
            user {
              username
              avatar
            }
          }
          id
          name
          room_type
          room_image
        }
      }
    }
  }
`;