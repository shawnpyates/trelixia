const gameCategories = [
  'general',
  'history',
  'sports',
  'geography',
  'science',
  'music',
  'film',
  'literature',
];

const getCategoryMenuItems = () => (
  gameCategories.map((category) => ({
    text: category.toUpperCase(),
    link: `/games?category=${category}`,
  }))
);

export const menuItems = [
  {
    text: 'See Upcoming Games',
    link: '/games',
  },
  {
    text: 'Create New Game',
    link: '/createGame',
  },
  {
    text: 'Games I\'m Hosting',
    link: '/games?hosting=true',
  },
  {
    text: 'My Bookmarked Games',
    link: '/games?bookmarked=true',
  },
  ...getCategoryMenuItems(),
];

export const createUsernameForm = {
  title: 'You must create a username before proceeding.',
  initialValues: {
    username: '',
  },
  fields: [
    {
      type: 'text',
      label: 'Username',
      name: 'username',
    },
    {
      type: 'submitButton',
      buttonText: 'Create Username',
    },
  ],
};

export const createUserForm = {
  title: 'Register',
  initialValues: {
    username: '',
    email: '',
    firstPasswordEntry: '',
    secondPasswordEntry: '',
  },
  fields: [
    {
      type: 'text',
      label: 'Create a Username',
      name: 'username',
    },
    {
      type: 'text',
      label: 'Email',
      name: 'email',
    },
    {
      type: 'password',
      label: 'Create a Password',
      name: 'firstPasswordEntry',
    },
    {
      type: 'password',
      label: 'Type Your Password Again',
      name: 'secondPasswordEntry',
    },
    {
      type: 'submitButton',
      buttonText: 'Register',
    },
  ],
};

export const loginForm = {
  title: 'Login',
  initialValues: {
    username: '',
    password: '',
  },
  fields: [
    {
      type: 'text',
      label: 'Username',
      name: 'username',
    },
    {
      type: 'password',
      label: 'Password',
      name: 'password',
    },
    {
      type: 'submitButton',
      buttonText: 'Login',
    },
  ],
};

export const createGameForm = {
  title: 'Create a New Game',
  initialValues: {
    name: '',
    category: '',
    defaultCompareThreshold: 0.90,
    shouldSetMaxPlayers: false,
    maxPlayers: 50,
    shouldScheduleTime: false,
    scheduledFor: null,
    ownerId: 11,
  },
  fields: [
    {
      type: 'text',
      label: 'Name',
      name: 'name',
    },
    {
      type: 'select',
      label: 'Choose a Category',
      name: 'category',
      options: gameCategories,
    },
    {
      type: 'slider',
      toggle: {
        name: 'isAutomated',
        label: 'Run the game in Automated Mode',
      },
      slider: {
        id: 'required-score-slider',
        name: 'defaultCompareThreshold',
        label: 'Default Required Match Score',
        step: 0.01,
        min: 0.50,
        max: 1.0,
        decimalPlaces: 2,
        defaultValue: 0.90,
      },
    },
    {
      type: 'slider',
      toggle: {
        name: 'shouldSetMaxPlayers',
        label: 'Set a maximum number of players allowed to participate',
      },
      slider: {
        id: 'max-players-slider',
        name: 'maxPlayers',
        label: 'Maximum Number of Players',
        step: 1,
        min: 1,
        max: 100,
        defaultValue: 50,
      },
    },
    {
      type: 'dateTimePicker',
      toggle: {
        name: 'shouldScheduleTime',
        label: 'Schedule a time for your game to start',
      },
      picker: {
        name: 'scheduledFor',
        label: 'Set Time',
      },
    },
    {
      type: 'submitButton',
      buttonText: 'Submit',
    },
  ],
};

export const gameListTableContent = [
  {
    header: 'Name',
    key: 'name',
  },
  {
    header: 'Category',
    key: 'category',
  },
  {
    header: 'Scheduled For',
    key: 'scheduledFor',
    isTimestamp: true,
  },
];
