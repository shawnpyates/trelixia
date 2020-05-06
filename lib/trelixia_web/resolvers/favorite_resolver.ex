defmodule TrelixiaWeb.Resolvers.FavoriteResolver do
  alias Trelixia.Trivia

  def create_favorite(_, args, _) do
    Trivia.create_favorite(args)
  end
end
