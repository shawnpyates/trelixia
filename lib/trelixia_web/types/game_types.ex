defmodule TrelixiaWeb.Types.GameTypes do
  use Absinthe.Schema.Notation
  import_types(Absinthe.Type.Custom)

  @desc "Game fields that can be queried"
  object :game do
    @desc "The id of the game"
    field :id, :id
    @desc "The name of the game"
    field :name, :string
    @desc "The category of the game"
    field :category, :string
    @desc "When the timer on the current question expires"
    field :current_question_expiry, :datetime
    @desc "The id of the question currently being asked"
    field :current_question_id, :id
    @desc "Specifies whether automated matching is used to identify the winner of the question"
    field :is_automated, :boolean
    @desc "The default compare threshold for questions in the game (see question_types)"
    field :default_compare_threshold, :float
    @desc "The maximum number of players allowed in the game"
    field :max_players, :integer
    @desc "When the game is scheduled to begin"
    field :scheduled_for, :datetime
    @desc "The user id of the game owner"
    field :owner_id, :id
    @desc "The owner of the game"
    field :user, :user
    @desc "The list of users who are participating in the game"
    field :users, list_of(:user)
    @desc "The list questions in the game"
    field :questions, list_of(:question)
  end
end
