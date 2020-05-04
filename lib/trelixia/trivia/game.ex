defmodule Trelixia.Trivia.Game do
  use Ecto.Schema
  import Ecto.Changeset

  schema "games" do
    field :name, :string
    field :category, :string
    field :current_question_expiry, :utc_datetime
    field :current_question_id, :id
    field :is_automated, :boolean, default: false
    field :max_players, :integer
    field :scheduled_for, :utc_datetime
    field :owner_id, :id

    timestamps()
  end

  @doc false
  def changeset(game, attrs) do
    game
    |> cast(attrs, [:category, :max_players, :scheduled_for, :is_automated, :current_question_id, :current_question_expiry])
    |> validate_required([:category, :max_players, :scheduled_for, :is_automated, :current_question_id, :current_question_expiry])
    |> unique_constraint(:name)
  end
end
