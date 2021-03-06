import gql from 'graphql-tag';

export const GET_CURRENT_USER = gql`
  query User {
    user {
      id
      username
      email
      isRegistered
    }
  }
`;

export const GET_GAME = gql`
  query Game($id: ID!) {
    game(id: $id) {
      id
      name
      category
      maxPlayers
      scheduledFor
      ownerId
      isAutomated
      defaultCompareThreshold
      defaultTimeAllotment
      defaultQuestionType
      user {
        username
      }
      questions {
        id
        questionText
        answer
        timeAllotment
        compareThreshold
        topic
        pointValue
        type
      }
    }
  }
`;

export const GET_ALL_GAMES = gql`
  query Games {
    games {
      id
      name
      category
      scheduledFor
      users {
        id
      }
    }
  }
`;

export const GET_GAMES_BY_CATEGORY = gql`
  query GamesByCategory($category: String!) {
    gamesByCategory(category: $category) {
      id
      name
      scheduledFor
      category
      maxPlayers
    }
  }
`;

export const GET_GAMES_BY_USER_FAVORITE = gql`
  query GamesByUserFavorite($userId: ID!) {
    gamesByUserFavorite(userId: $userId) {
      id
      name
      scheduledFor
      category
      maxPlayers
    }
  }
`;

export const GET_GAMES_BY_HOST = gql`
  query GamesByHost($userId: ID!) {
    gamesByHost(userId: $userId) {
      id
      name
      scheduledFor
      category
      maxPlayers
    }
  }
`;

export const GET_FAVORITE = gql`
  query Favorite($userId: ID!, $gameId: ID!) {
    favorite(userId: $userId, gameId: $gameId) {
      id
    }
  }
`;
