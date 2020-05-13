defmodule TrelixiaWeb.Schema do
  use Absinthe.Schema

  alias TrelixiaWeb.Resolvers.{UserResolver, GameResolver, QuestionResolver, FavoriteResolver}

  import_types(TrelixiaWeb.Types.{UserTypes, GameTypes, QuestionTypes, FavoriteTypes})

  query do
    @desc "game"
    field :game, :game do
      arg(:id, non_null(:id))
      resolve(&GameResolver.get_game/3)
    end

    @desc "list_all_users"
    field :users, list_of(:user) do
      resolve(&UserResolver.list_all_users/3)
    end

    @desc "current_user"
    field :user, :user do
      resolve(&UserResolver.get_current_user/3)
    end

    @desc "list_all_games"
    field :games, list_of(:game) do
      resolve(&GameResolver.list_all_games/3)
    end

    @desc "fetch_games_by_category"
    field :games_by_category, list_of(:game) do
      arg(:category, non_null(:string))
      resolve(&GameResolver.fetch_games_by_category/3)
    end

    @desc "fetch_games_by_user_favorite"
    field :games_by_user_favorite, list_of(:game) do
      arg(:user_id, non_null(:id))
      resolve(&GameResolver.fetch_games_by_user_favorite/3)
    end

    @desc "favorite"
    field :favorite, :game do
      arg(:user_id, non_null(:id))
      arg(:game_id, non_null(:id))
      resolve(&FavoriteResolver.get_favorite/3)
    end
  end

  mutation do
    @desc "create_user"
    field :create_user, :user do
      arg(:username, non_null(:string))
      arg(:is_registered, non_null(:boolean))
      arg(:email, :string)
      arg(:provider, :string)
      arg(:token, :string)
      arg(:current_game_id, :id)
      arg(:current_score, :integer)

      resolve(&UserResolver.create_user/3)
    end

    @desc "create_game"
    field :create_game, :game do
      arg(:name, non_null(:string))
      arg(:category, non_null(:string))
      arg(:current_question_expiry, :datetime)
      arg(:current_question_id, :id)
      arg(:is_automated, non_null(:boolean))
      arg(:default_compare_threshold, :float)
      arg(:max_players, :integer)
      arg(:scheduled_for, :datetime)
      arg(:owner_id, non_null(:id))

      resolve(&GameResolver.create_game/3)
    end

    @desc "create_question"
    field :create_question, :question do
      arg(:question_text, non_null(:string))
      arg(:answer, non_null(:string))
      arg(:compare_threshold, :float)
      arg(:time_allotment, non_null(:integer))
      arg(:topic, :string)
      arg(:type, :string)
      arg(:point_value, :integer)
      arg(:game_id, non_null(:id))

      resolve(&QuestionResolver.create_question/3)
    end

    @desc "create_favorite"
    field :create_favorite, :favorite do
      arg(:user_id, non_null(:id))
      arg(:game_id, non_null(:id))

      resolve(&FavoriteResolver.create_favorite/3)
    end

    @desc "edit_user"
    field :edit_user, :user do
      arg(:id, non_null(:id))
      arg(:username, :string)
      arg(:is_registered, :boolean)
      arg(:email, :string)
      arg(:provider, :string)
      arg(:token, :string)
      arg(:current_game_id, :id)
      arg(:current_score, :integer)

      resolve(&UserResolver.update_user/3)
    end

    @desc "edit_game"
    field :edit_game, :game do
      arg(:id, non_null(:id))
      arg(:name, :string)
      arg(:category, :string)
      arg(:current_question_expiry, :datetime)
      arg(:current_question_id, :id)
      arg(:is_automated, :boolean)
      arg(:default_compare_threshold, :float)
      arg(:max_players, :integer)
      arg(:scheduled_for, :datetime)

      resolve(&GameResolver.update_game/3)
    end

    @desc "edit_question"
    field :edit_question, :question do
      arg(:id, non_null(:id))
      arg(:question_text, :string)
      arg(:answer, :string)
      arg(:compare_threshold, :float)
      arg(:time_allotment, :integer)
      arg(:topic, :string)
      arg(:type, :string)
      arg(:point_value, :integer)

      resolve(&QuestionResolver.update_question/3)
    end

    @desc "delete_favorite"
    field :delete_favorite, :favorite do
      arg(:id, non_null(:id))

      resolve(&FavoriteResolver.delete_favorite/3)
    end
  end
end
