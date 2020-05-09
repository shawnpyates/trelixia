defmodule Trelixia.Account.User do
  use Ecto.Schema
  import Ecto.Changeset

  @all_fields ~w(username email provider token is_registered current_game_id current_score)a
  @required_fields ~w(username is_registered)a

  schema "users" do
    field :current_score, :integer
    field :email, :string
    field :is_registered, :boolean, default: false
    field :provider, :string
    field :token, :string
    field :username, :string

    belongs_to :game, Trelixia.Trivia.Game, foreign_key: :current_game_id

    has_many :games, Trelixia.Trivia.Game, foreign_key: :owner_id
    has_many :favorites, Trelixia.Trivia.Favorite

    timestamps()
  end

  @doc false
  def changeset(user, attrs) do
    user
    |> cast(attrs, @all_fields)
    |> validate_required(@required_fields)
    |> unique_constraint(:username)
  end
end
