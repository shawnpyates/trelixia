defmodule Trelixia.Account.User do
  use Ecto.Schema
  import Ecto.Changeset

  schema "users" do
    field :current_game_id, :id
    field :current_score, :integer
    field :email, :string
    field :is_registered, :boolean, default: false
    field :provider, :string
    field :token, :string
    field :username, :string

    timestamps()
  end

  @doc false
  def changeset(user, attrs) do
    user
    |> cast(attrs, [:username, :email, :provider, :token, :is_registered, :current_game_id, :current_score])
    |> validate_required([:username, :email, :provider, :token, :is_registered, :current_game_id, :current_score])
    |> unique_constraint(:username)
  end
end
