defmodule Trelixia.Trivia.Game do
  use Ecto.Schema
  import Ecto.Changeset

  alias Trelixia.Trivia.{Question, Favorite}
  alias Trelixia.Account.User

  @all_fields ~w(name category max_players scheduled_for is_automated current_question_id current_question_expiry owner_id default_compare_threshold)a
  @required_fields ~w(name category is_automated)a

  schema "games" do
    field :name, :string
    field :category, :string
    field :current_question_expiry, :utc_datetime
    field :current_question_id, :id
    field :is_automated, :boolean, default: false
    field :max_players, :integer
    field :scheduled_for, :utc_datetime
    field :default_compare_threshold, :float

    belongs_to :user, User, foreign_key: :owner_id

    has_many :users, User, foreign_key: :current_game_id
    has_many :questions, Question
    has_many :favorites, Favorite

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
