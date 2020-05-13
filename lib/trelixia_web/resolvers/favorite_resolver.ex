defmodule TrelixiaWeb.Resolvers.FavoriteResolver do
  alias Trelixia.Trivia

  def create_favorite(_, args, _) do
    Trivia.create_favorite(args)
  end

  def get_favorite(_, %{user_id: user_id, game_id: game_id}, _) do
    with result <- Trivia.get_favorite_by_attrs(user_id, game_id) do
      {:ok, result}
    end
  end

  def delete_favorite(_, %{id: id}, _) do
    with favorite <- Trivia.get_favorite!(id) do
      Trivia.delete_favorite(favorite)
    end
  end
end
