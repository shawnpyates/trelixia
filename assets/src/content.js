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
    requiresCurrentUser: true,
  },
  {
    text: 'Games I\'m Hosting',
    link: '/games?hosting=true',
    requiresCurrentUser: true,
  },
  {
    text: 'My Bookmarked Games',
    link: '/games?bookmarked=true',
    requiresCurrentUser: true,
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
    isAutomated: false,
    defaultTimeAllotment: 30,
    defaultQuestionType: 'FIRST_ANSWER_WINS',
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
      name: 'defaultTimeAllotment',
      slider: {
        id: 'default-time-allotment-slider',
        label: 'Default Time Allowed for Each Question (in seconds)',
        step: 1,
        min: 5,
        max: 300,
        defaultValue: 30,
      },
    },
    {
      type: 'radioGroup',
      label: 'Select a Default Question Type',
      name: 'defaultQuestionType',
      options: [
        {
          value: 'FIRST_ANSWER_WINS',
          label: 'First Answer Wins',
          description: 'The question round ends as soon as a correct answer is submitted, and only a single user wins the point(s).',
        },
        {
          value: 'TIMED',
          label: 'Timed',
          description: 'The question round lasts the full duration of the specified time allowance, and every user who submits a correct answer in time wins the point(s).',
        },
      ],
    },
    {
      type: 'slider',
      name: 'defaultCompareThreshold',
      toggle: {
        name: 'isAutomated',
        label: 'Run the game in Automated Mode',
      },
      slider: {
        id: 'required-score-slider',
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
      name: 'maxPlayers',
      toggle: {
        name: 'shouldSetMaxPlayers',
        label: 'Set a maximum number of players allowed to participate',
      },
      slider: {
        id: 'max-players-slider',
        label: 'Maximum Number of Players',
        step: 1,
        min: 1,
        max: 100,
        defaultValue: 50,
      },
    },
    {
      type: 'dateTimePicker',
      name: 'scheduledFor',
      toggle: {
        name: 'shouldScheduleTime',
        label: 'Schedule a time for your game to start',
      },
      picker: {
        label: 'Set Time',
      },
    },
    {
      type: 'submitButton',
      buttonText: 'Submit',
    },
  ],
};

export const questionOptionsForm = {
  title: 'Modify Question Options',
  fields: [
    {
      type: 'slider',
      name: 'compareThreshold',
      slider: {
        id: 'required-score-slider',
        label: 'Required Match Score',
        step: 0.01,
        min: 0.50,
        max: 1.0,
        decimalPlaces: 2,
      },
    },
    {
      type: 'slider',
      name: 'timeAllotment',
      slider: {
        id: 'time-allotment-slider',
        label: 'Time Allowed for the Question (in seconds)',
        step: 1,
        min: 5,
        max: 300,
        defaultValue: 30,
      },
    },
    {
      type: 'radioGroup',
      label: 'Question Type',
      name: 'type',
      options: [
        {
          value: 'FIRST_ANSWER_WINS',
          label: 'First Answer Wins',
          description: 'The question round ends as soon as a correct answer is submitted, and only a single user wins the point(s).',
        },
        {
          value: 'TIMED',
          label: 'Timed',
          description: 'The question round lasts the full duration of the specified time allowance, and every user who submits a correct answer in time wins the point(s).',
        },
      ],
    },
    {
      type: 'text',
      headerLabel: 'Point Value (Minimum 1, Maximum 10000)',
      name: 'pointValue',
      defaultValue: 1,
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

export const questionTableHeaders = ['Question', 'Answer', 'Topic (Optional)'];

export const questionTooltipLabels = {
  compareThreshold: 'Required match score: ',
  timeAllotment: 'Time Allowed (s): ',
  type: 'Type: ',
  pointValue: 'Point Value: ',
};

export const questionSetModes = {
  VIEW: 'view',
  ADD: 'add',
  EDIT: 'edit',
};

export const questionTypes = {
  FIRST_ANSWER_WINS: {
    value: 'FIRST_ANSWER_WINS',
    label: 'First Answer Wins',
  },
  TIMED: {
    value: 'TIMED',
    label: 'Timed',
  },
};

export const toastMessages = {
  createQuestion: 'Successfully created question.',
  editQuestion: 'Successfully edited question.',
  deleteQuestion: 'Successfully deleted question.',
  createFavorite: 'Successfully created favorite.',
  deleteFavorite: 'Successfully created favorite.',
};
