defmodule Trelixia.Trivia.Question do
  use Ecto.Schema
  import Ecto.Changeset

  schema "questions" do
    field :answer, :string
    field :compare_threshold, :float
    field :question_text, :string
    field :time_allotment, :integer
    field :topic, :string
    field :type, :string
    field :game_id, :id

    timestamps()
  end

  @doc false
  def changeset(question, attrs) do
    question
    |> cast(attrs, [:question_text, :answer, :topic, :type, :time_allotment, :compare_threshold])
    |> validate_required([:question_text, :answer, :topic, :type, :time_allotment, :compare_threshold])
  end
end
