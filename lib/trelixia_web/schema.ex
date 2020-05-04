defmodule TrelixiaWeb.Schema do
  use Absinthe.Schema

  alias TrelixiaWeb.Resolvers.{UserResolver, GameResolver}

  import_types(TrelixiaWeb.Types.{UserTypes, GameTypes})

  query do
    @desc "list_all_users"
    field :users, list_of(:user) do
      resolve(&UserResolver.list_all_users/3)
    end

    @desc "list_all_games"
    field :games, list_of(:game) do
      resolve(&GameResolver.list_all_games/3)
    end

  end
end
