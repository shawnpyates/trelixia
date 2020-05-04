defmodule TrelixiaWeb.Types.UserTypes do
  use Absinthe.Schema.Notation

  @desc "User fields that can be queried"
  object :user do
    @desc "The user id"
    field :id, :id
    @desc "The username of the user"
    field :username, :string
    @desc "Specifies whether the user has an account"
    field :is_registered, :boolean
    @desc "The email of the user"
    field :email, :string
    @desc "The provider of the user"
    field :provider, :string
    @desc "The token of the user"
    field :token, :string
    @desc "The game the user is currently participating in"
    field :current_game_id, :id
    @desc "The score of the user in their current game"
    field :current_score, :integer
  end
end
