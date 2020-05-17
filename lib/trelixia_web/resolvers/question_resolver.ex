defmodule TrelixiaWeb.Resolvers.QuestionResolver do
  alias Trelixia.Trivia

  def create_question(_, args, _) do
    Trivia.create_question(args)
  end

  def update_question(_, %{id: id} = args, _) do
    case Trivia.get_question!(id) do
      nil ->
        {:error, "Question ID #{id} not found."}

      question ->
        Trivia.update_question(question, args)
    end
  end

  def delete_question(_, %{id: id}, _) do
    with question <- Trivia.get_question!(id) do
      Trivia.delete_question(question)
    end
  end
end
