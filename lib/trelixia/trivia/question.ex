defmodule Trelixia.Trivia.Question do
  use Ecto.Schema
  import Ecto.Changeset

  @all_fields ~w(question_text answer topic type time_allotment compare_threshold game_id)a
  @required_fields ~w(question_text answer time_allotment)a

  schema "questions" do
    field :answer, :string
    field :compare_threshold, :float
    field :question_text, :string
    field :time_allotment, :integer
    field :topic, :string
    field :type, :string

    belongs_to :game, Trelixia.Trivia.Game

    timestamps()
  end

  @doc false
  def changeset(question, attrs) do
    question
    |> cast(attrs, @all_fields)
    |> validate_required(@required_fields)
  end
end
