defmodule TrelixiaWeb.Resolvers.GameResolver do
  alias Trelixia.Trivia

  def list_all_games(_, _, _) do
    {:ok, Trivia.list_games()}
  end
end
