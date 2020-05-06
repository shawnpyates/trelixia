defmodule Trelixia.Trivia.Game do
  use Ecto.Schema
  import Ecto.Changeset

  @all_fields ~w(name category max_players scheduled_for is_automated current_question_id current_question_expiry owner_id)a
  @required_fields ~w(name category is_automated)a

  schema "games" do
    field :name, :string
    field :category, :string
    field :current_question_expiry, :utc_datetime
    field :current_question_id, :id
    field :is_automated, :boolean, default: false
    field :max_players, :integer
    field :scheduled_for, :utc_datetime

    belongs_to :user, Trelixia.Account.User, foreign_key: :owner_id
    has_many :questions, Trelixia.Trivia.Game
    has_many :favorites, Trelixia.Trivia.Favorite

    timestamps()
  end

  @doc false
  def changeset(game, attrs) do
    game
    |> cast(attrs, @all_fields)
    |> validate_required(@required_fields)
    |> unique_constraint(:name)
  end
end
