import gql from 'graphql-tag';

export const CREATE_USER = gql`
  mutation CreateUser(
    $username: String!,
    $isRegistered: Boolean!,
    $email: String!,
    $password: String!
  ) {
    createUser(
      username: $username,
      isRegistered: $isRegistered,
      email: $email,
      password: $password,
    ) {
      id
    }
  }
`;

export const LOGIN_USER = gql`
  mutation LoginUser(
    $username: String!,
    $password: String!
  ) {
    loginUser(
      username: $username,
      password: $password,
    ) {
      id
    }
  }
`;

export const CREATE_GAME = gql`
  mutation CreateGame(
    $name: String!,
    $category: String!,
    $currentQuestionId: ID,
    $currentQuestionExpiry: String,
    $isAutomated: Boolean!,
    $maxPlayers: Int,
    $scheduledFor: String,
    $defaultCompareThreshold: Float,
    $defaultTimeAllotment: Int!,
    $defaultQuestionType: String!,
    $ownerId: ID!
  ) {
    createGame(
      name: $name,
      category: $category,
      currentQuestionId: $currentQuestionId,
      currentQuestionExpiry: $currentQuestionExpiry,
      isAutomated: $isAutomated,
      maxPlayers: $maxPlayers,
      scheduledFor: $scheduledFor,
      defaultCompareThreshold: $defaultCompareThreshold,
      defaultTimeAllotment: $defaultTimeAllotment,
      defaultQuestionType: $defaultQuestionType,
      ownerId: $ownerId
    ) {
      id
    }
  }
`;

export const CREATE_QUESTION = gql`
  mutation CreateQuestion(
    $questionText: String!,
    $answer: String!,
    $compareThreshold: Float,
    $timeAllotment: Int!,
    $topic: String,
    $type: String,
    $pointValue: Int,
    $gameId: ID!
  ) {
    createQuestion(
      questionText: $questionText,
      answer: $answer,
      compareThreshold: $compareThreshold,
      timeAllotment: $timeAllotment,
      topic: $topic,
      type: $type,
      pointValue: $pointValue,
      gameId: $gameId
    ) {
      id
    }
  }
`;

export const CREATE_FAVORITE = gql`
  mutation CreateFavorite(
    $userId: ID!,
    $gameId: ID!,
  ) {
    createFavorite(
      userId: $userId,
      gameId: $gameId,
    ) {
      id
    }
  }
`;

export const EDIT_USER = gql`
  mutation EditUser(
    $id: ID!,
    $username: String,
    $isRegistered: Boolean
    $email: String,
    $provider: String,
    $token: String,
    $currentGameId: ID,
    $currentScore: Int
) {
    editUser(
      id: $id,
      username: $username,
      isRegistered: $isRegistered,
      email: $email,
      provider: $provider,
      token: $token,
      currentGameId: $currentGameId,
      currentScore: $currentScore
    ) {
      id
    }
  }
`;

export const EDIT_GAME = gql`
  mutation EditGame(
    $id: ID!,
    $name: String,
    $category: String,
    $currentQuestionId: ID,
    $currentQuestionExpiry: String,
    $isAutomated: Boolean,
    $maxPlayers: Int,
    $defaultCompareThreshold: Float,
  ) {
    editGame(
      id: $id,
      name: $name,
      category: $category,
      currentQuestionId: $currentQuestionId,
      currentQuestionExpiry: $currentQuestionExpiry,
      isAutomated: $isAutomated,
      maxPlayers: $maxPlayers,
      defaultCompareThreshold: $defaultCompareThreshold,
      ownerId: $ownerId
    ) {
      id
    }
  }
`;

export const EDIT_QUESTION = gql`
  mutation EditQuestion(
    $id: ID!,
    $questionText: String,
    $answer: String,
    $compareThreshold: Float,
    $timeAllotment: Int,
    $topic: String,
    $type: String,
    $pointValue: Int,
  ) {
    editQuestion(
      id: $id,
      questionText: $questionText,
      answer: $answer,
      compareThreshold: $compareThreshold,
      timeAllotment: $timeAllotment,
      topic: $topic,
      type: $type,
      pointValue: $pointValue,
    ) {
      id
    }
  }
`;

export const DELETE_QUESTION = gql`
  mutation DeleteQuestion($id: ID!) {
    deleteQuestion(id: $id) {
      id
    }
  }
`;

export const DELETE_FAVORITE = gql`
  mutation DeleteFavorite($id: ID!) {
    deleteFavorite(id: $id) {
      id
    }
  }
`;
