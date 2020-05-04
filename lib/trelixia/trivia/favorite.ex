defmodule Trelixia.Trivia.Favorite do
  use Ecto.Schema
  import Ecto.Changeset

  schema "favorites" do
    field :user_id, :id
    field :game_id, :id

    timestamps()
  end

  @doc false
  def changeset(favorite, attrs) do
    favorite
    |> cast(attrs, [])
    |> validate_required([])
  end
end
