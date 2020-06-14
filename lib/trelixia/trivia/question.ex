defmodule Trelixia.Trivia.Question do
  use Ecto.Schema
  import Ecto.Changeset

  @optional_fields ~w(topic type compare_threshold was_asked)a
  @required_fields ~w(question_text answer time_allotment point_value game_id)a

  schema "questions" do
    field :answer, :string
    field :compare_threshold, :float
    field :question_text, :string
    field :time_allotment, :integer
    field :topic, :string
    field :type, :string
    field :point_value, :integer
    field :was_asked, :boolean, default: false

    belongs_to :game, Trelixia.Trivia.Game

    timestamps()
  end

  @doc false
  def changeset(question, attrs) do
    question
    |> cast(attrs, @optional_fields ++ @required_fields)
    |> validate_required(@required_fields)
  end
end
