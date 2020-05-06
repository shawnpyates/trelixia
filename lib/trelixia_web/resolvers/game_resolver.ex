defmodule TrelixiaWeb.Resolvers.GameResolver do
  alias Trelixia.Trivia

  def get_game(_, %{id: id}, _) do
    case Trivia.get_game!(id) do
      nil ->
        {:error, "Game ID #{id} not found."}

      game ->
        {:ok, game}
    end
  end

  def list_all_games(_, _, _) do
    {:ok, Trivia.list_games()}
  end

  def fetch_games_by_category(_, %{category: category}, _) do
    case Trivia.fetch_games_by_category(category) do
      nil ->
        {:error, "Category #{category} not found."}

      games ->
        {:ok, games}
    end
  end

  def fetch_games_by_user_favorite(_, %{user_id: user_id}, _) do
    case Trivia.fetch_games_by_user_favorite(user_id) do
      nil ->
        {:error, "User ID #{user_id} not found."}

      games ->
        {:ok, games}
    end
  end

  def create_game(_, args, _) do
    Trivia.create_game(args)
  end

  def update_game(_, %{id: id} = args, _) do
    case Trivia.get_game!(id) do
      nil ->
        {:error, "Game ID #{id} not found."}
      game ->
        Trivia.update_game(game, args)
    end
  end
end
