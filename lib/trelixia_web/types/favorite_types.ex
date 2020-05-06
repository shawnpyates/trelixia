defmodule TrelixiaWeb.Types.FavoriteTypes do
  use Absinthe.Schema.Notation

  @desc "Favorite (relationship between user and game) fields that can be queried"
  object :favorite do
    @desc "The id of the favorite"
    field :id, :id
    @desc "The user_id of the favorite"
    field :user_id, :id
    @desc "The game_id of the favorite"
    field :game_id, :id
  end
end
