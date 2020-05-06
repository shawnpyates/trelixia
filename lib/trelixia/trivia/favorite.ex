defmodule Trelixia.Trivia.Favorite do
  use Ecto.Schema
  import Ecto.Changeset

  @all_fields ~w(user_id game_id)a

  schema "favorites" do
    belongs_to :user, Trelixia.Account.User
    belongs_to :game, Trelixia.Trivia.Game

    timestamps()
  end

  @doc false
  def changeset(favorite, attrs) do
    favorite
    |> cast(attrs, @all_fields)
    |> validate_required(@all_fields)
  end
end
