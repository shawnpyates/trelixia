import gql from 'graphql-tag';

export const GET_GAME = gql`
  query Game($id: ID!) {
    game(id: $id) {
      id
      name
      category
      maxPlayers
    }
  }
`;

export const GET_ALL_GAMES = gql`
  query Games {
    games {
      id
      name
      category
      maxPlayers
    }
  }
`;

export const GET_GAMES_BY_CATEGORY = gql`
  query GamesByCategory($category: String!) {
    gamesByCategory(category: $category) {
      id
      category
      maxPlayers
    }
  }
`;

export const GET_GAMES_BY_USER_FAVORITE = gql`
  query GamesByUserFavorite($userId: ID!) {
    gamesByUserFavorite(userId: $userId) {
      id
      category
      maxPlayers
    }
  }
`;
