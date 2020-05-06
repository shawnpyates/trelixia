defmodule TrelixiaWeb.Types.QuestionTypes do
  use Absinthe.Schema.Notation

  @desc "Question fields that can be queried"
  object :question do
    @desc "The id of the question"
    field :id, :id
    @desc "The question text"
    field :question_text, :string
    @desc "The question's answer"
    field :answer, :string
    @desc "The match score required for guess to be considered correct (when in automation mode)"
    field :compare_threshold, :float
    @desc "The amount of time on the timer for the question"
    field :time_allotment, :integer
    @desc "Topic of the question"
    field :topic, :string
    @desc "The type of question (first-answer-wins or all-play)"
    field :type, :string
    @desc "The point value of the question"
    field :point_value, :integer
    @desc "The id of the game in which the question is being played"
    field :game_id, :id
  end
end
