defmodule Trelixia.Trivia do
  @moduledoc """
  The Trivia context.
  """

  import Ecto.Query, warn: false
  alias Trelixia.Repo

  alias Trelixia.Trivia.{Game, Question, Favorite}

  @doc """
  Returns the list of games.

  ## Examples

      iex> list_games()
      [%Game{}, ...]

  """
  def list_games do
    now = DateTime.utc_now()

    query =
      from(
        g in Game,
        where: g.scheduled_for > ^now,
        order_by: g.scheduled_for,
        preload: [:users]
      )

    Repo.all(query)
  end

  def fetch_games_by_category(category) do
    now = DateTime.utc_now()

    query =
      from(
        g in Game,
        where: g.category == ^category and g.scheduled_for > ^now,
        order_by: g.scheduled_for,
        preload: [:users]
      )

    Repo.all(query)
  end

  def fetch_games_by_user_favorite(user_id) do
    now = DateTime.utc_now()

    query =
      from(
        g in Game,
        join: f in assoc(g, :favorites),
        where: f.user_id == ^user_id and g.scheduled_for > ^now,
        order_by: [desc: g.inserted_at]
      )

    Repo.all(query)
  end

  def fetch_games_by_host(user_id) do
    now = DateTime.utc_now()

    query =
      from(
        g in Game,
        where: g.owner_id == ^user_id and g.scheduled_for > ^now,
        order_by: [desc: g.inserted_at]
      )

    Repo.all(query)
  end

  @doc """
  Gets a single game.

  Raises `Ecto.NoResultsError` if the Game does not exist.

  ## Examples

      iex> get_game!(123)
      %Game{}

      iex> get_game!(456)
      ** (Ecto.NoResultsError)

  """
  def get_game!(id) do
    question_query = from q in Question, order_by: q.inserted_at
    Repo.get!(Game, id) |> Repo.preload([:user, questions: question_query])
  end

  @doc """
  Creates a game.

  ## Examples

      iex> create_game(%{field: value})
      {:ok, %Game{}}

      iex> create_game(%{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def create_game(attrs \\ %{}) do
    %Game{}
    |> Game.changeset(attrs)
    |> Repo.insert()
  end

  @doc """
  Updates a game.

  ## Examples

      iex> update_game(game, %{field: new_value})
      {:ok, %Game{}}

      iex> update_game(game, %{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def update_game(%Game{} = game, attrs) do
    game
    |> Game.changeset(attrs)
    |> Repo.update()
  end

  defp set_game_to_next_question(game, current_question) do
    case update_question(current_question, %{was_asked: true}) do
      {:ok, _updated_question} ->
        question_query =
          from(q in Question, where: q.game_id == ^game.id and q.was_asked == false, limit: 1)

        case Repo.all(question_query) do
          [new_question | _rest] ->
            # move to next question
            update_game(game, %{current_question_id: new_question.id})

          [] ->
            # no questions left, so set current_question_id to nil
            update_game(game, %{current_question_id: nil})

          nil ->
            {:error, "Question does not exist."}
        end

      {:error, _error} ->
        {:error, "Could not update."}
    end
  end

  def handle_game_guess(%Game{} = game, guess) do
    case Repo.get!(Question, game.current_question_id) do
      nil ->
        {:error, "Question not found."}

      question ->
        cond do
          String.jaro_distance(guess, question.answer) >= question.compare_threshold ->
            case set_game_to_next_question(game, question) do
              {:ok, updated_game} ->
                {:ok, %{current_question_id: updated_game.current_question_id}}

              {:error, error} ->
                {:error, error}
            end

          true ->
            {:ok, %{current_question_id: game.current_question_id}}
        end
    end
  end

  @doc """
  Deletes a game.

  ## Examples

      iex> delete_game(game)
      {:ok, %Game{}}

      iex> delete_game(game)
      {:error, %Ecto.Changeset{}}

  """
  def delete_game(%Game{} = game) do
    Repo.delete(game)
  end

  @doc """
  Returns an `%Ecto.Changeset{}` for tracking game changes.

  ## Examples

      iex> change_game(game)
      %Ecto.Changeset{source: %Game{}}

  """
  def change_game(%Game{} = game) do
    Game.changeset(game, %{})
  end

  @doc """
  Returns the list of questions.

  ## Examples

      iex> list_questions()
      [%Question{}, ...]

  """
  def list_questions do
    Repo.all(Question)
  end

  @doc """
  Gets a single question.

  Raises `Ecto.NoResultsError` if the Question does not exist.

  ## Examples

      iex> get_question!(123)
      %Question{}

      iex> get_question!(456)
      ** (Ecto.NoResultsError)

  """
  def get_question!(id), do: Repo.get!(Question, id)

  @doc """
  Creates a question.

  ## Examples

      iex> create_question(%{field: value})
      {:ok, %Question{}}

      iex> create_question(%{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def create_question(attrs \\ %{}) do
    %Question{}
    |> Question.changeset(attrs)
    |> Repo.insert()
  end

  @doc """
  Updates a question.

  ## Examples

      iex> update_question(question, %{field: new_value})
      {:ok, %Question{}}

      iex> update_question(question, %{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def update_question(%Question{} = question, attrs) do
    question
    |> Question.changeset(attrs)
    |> Repo.update()
  end

  @doc """
  Deletes a question.

  ## Examples

      iex> delete_question(question)
      {:ok, %Question{}}

      iex> delete_question(question)
      {:error, %Ecto.Changeset{}}

  """
  def delete_question(%Question{} = question) do
    Repo.delete(question)
  end

  @doc """
  Returns an `%Ecto.Changeset{}` for tracking question changes.

  ## Examples

      iex> change_question(question)
      %Ecto.Changeset{source: %Question{}}

  """
  def change_question(%Question{} = question) do
    Question.changeset(question, %{})
  end

  @doc """
  Returns the list of favorites.

  ## Examples

      iex> list_favorites()
      [%Favorite{}, ...]

  """
  def list_favorites do
    Repo.all(Favorite)
  end

  @doc """
  Gets a single favorite.

  Raises `Ecto.NoResultsError` if the Favorite does not exist.

  ## Examples

      iex> get_favorite!(123)
      %Favorite{}

      iex> get_favorite!(456)
      ** (Ecto.NoResultsError)

  """
  def get_favorite!(id), do: Repo.get!(Favorite, id)

  def get_favorite_by_attrs(user_id, game_id) do
    Repo.get_by(Favorite, user_id: user_id, game_id: game_id)
  end

  @doc """
  Creates a favorite.

  ## Examples

      iex> create_favorite(%{field: value})
      {:ok, %Favorite{}}

      iex> create_favorite(%{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def create_favorite(attrs \\ %{}) do
    %Favorite{}
    |> Favorite.changeset(attrs)
    |> Repo.insert()
  end

  @doc """
  Updates a favorite.

  ## Examples

      iex> update_favorite(favorite, %{field: new_value})
      {:ok, %Favorite{}}

      iex> update_favorite(favorite, %{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def update_favorite(%Favorite{} = favorite, attrs) do
    favorite
    |> Favorite.changeset(attrs)
    |> Repo.update()
  end

  @doc """
  Deletes a favorite.

  ## Examples

      iex> delete_favorite(favorite)
      {:ok, %Favorite{}}

      iex> delete_favorite(favorite)
      {:error, %Ecto.Changeset{}}

  """
  def delete_favorite(%Favorite{} = favorite) do
    Repo.delete(favorite)
  end

  @doc """
  Returns an `%Ecto.Changeset{}` for tracking favorite changes.

  ## Examples

      iex> change_favorite(favorite)
      %Ecto.Changeset{source: %Favorite{}}

  """
  def change_favorite(%Favorite{} = favorite) do
    Favorite.changeset(favorite, %{})
  end
end
