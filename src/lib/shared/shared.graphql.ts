export const userFields = `
id
createdAt
updatedAt
lastSeen
disabled
email
emailVerified`;

export const userSettingsFields = `
userId
isUpgraded`;

export const savedChatsFields = `
id
userId
chats
createdAt
updatedAt`;

/**
 * //////////////////////////////////////////////////////////
 * QUERIES ==================================================
 * //////////////////////////////////////////////////////////
 */
export const userDataQuery = `
  query FetchUserSettings (
    $userId: uuid!
  ) {
    user(id: $userId) {
      ${userFields}
    }

    userSettingsByPk(userId: $userId) {
      ${userSettingsFields}
    }

    savedChats(where: {
      userId: {_eq: $userId}
    }) {
      ${savedChatsFields}
    }
  }
`;

export const fetchSavedChats = `
  query FetchUserChats (
    $userId: uuid!
  ) {
    savedChats(
      where: {
        userId: {_eq: $userId}
      }
    ) {
      ${savedChatsFields}
    }
  }`;

/**
 * //////////////////////////////////////////////////////////
 * MUTATIONS ================================================
 * //////////////////////////////////////////////////////////
 */
export const createUserSettingsQuery = `
  mutation CreateUserSettings (
    $userId: uuid!
  ) {
    insertUserSettingsOne(
      object: {userId: $userId},
      on_conflict: {
        constraint: user_settings_pkey,
        update_columns: []
      }
    ) {
      ${userSettingsFields}
    }
  }
`;

export const saveUserSavedChats = `
  mutation SaveChats (
    $userId: uuid!,
    $chats: jsonb!
  ) {
    insertSavedChatsOne(
      object: {
        userId: $userId,
        chats: $chats
      }
    ) {
      ${savedChatsFields}
    }
  }`;

export const updateUserSavedChats = `
mutation UpdateUserSavedChats (
  $savedChatId: uuid!,
  $chats: jsonb!
) {
  updateSavedChatsByPk(
    pk_columns: {id: $savedChatId},
    _set: {chats: $chats}
  ) {
    ${savedChatsFields}
  }
}`;
