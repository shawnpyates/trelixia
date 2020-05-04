defmodule Trelixia.TriviaTest do
  use Trelixia.DataCase

  alias Trelixia.Trivia

  describe "games" do
    alias Trelixia.Trivia.Game

    @valid_attrs %{category: "some category", current_question_expiry: "2010-04-17T14:00:00Z", current_question_id: 42, is_automated: true, max_players: 42, scheduled_for: "2010-04-17T14:00:00Z"}
    @update_attrs %{category: "some updated category", current_question_expiry: "2011-05-18T15:01:01Z", current_question_id: 43, is_automated: false, max_players: 43, scheduled_for: "2011-05-18T15:01:01Z"}
    @invalid_attrs %{category: nil, current_question_expiry: nil, current_question_id: nil, is_automated: nil, max_players: nil, scheduled_for: nil}

    def game_fixture(attrs \\ %{}) do
      {:ok, game} =
        attrs
        |> Enum.into(@valid_attrs)
        |> Trivia.create_game()

      game
    end

    test "list_games/0 returns all games" do
      game = game_fixture()
      assert Trivia.list_games() == [game]
    end

    test "get_game!/1 returns the game with given id" do
      game = game_fixture()
      assert Trivia.get_game!(game.id) == game
    end

    test "create_game/1 with valid data creates a game" do
      assert {:ok, %Game{} = game} = Trivia.create_game(@valid_attrs)
      assert game.category == "some category"
      assert game.current_question_expiry == DateTime.from_naive!(~N[2010-04-17T14:00:00Z], "Etc/UTC")
      assert game.current_question_id == 42
      assert game.is_automated == true
      assert game.max_players == 42
      assert game.scheduled_for == DateTime.from_naive!(~N[2010-04-17T14:00:00Z], "Etc/UTC")
    end

    test "create_game/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = Trivia.create_game(@invalid_attrs)
    end

    test "update_game/2 with valid data updates the game" do
      game = game_fixture()
      assert {:ok, %Game{} = game} = Trivia.update_game(game, @update_attrs)
      assert game.category == "some updated category"
      assert game.current_question_expiry == DateTime.from_naive!(~N[2011-05-18T15:01:01Z], "Etc/UTC")
      assert game.current_question_id == 43
      assert game.is_automated == false
      assert game.max_players == 43
      assert game.scheduled_for == DateTime.from_naive!(~N[2011-05-18T15:01:01Z], "Etc/UTC")
    end

    test "update_game/2 with invalid data returns error changeset" do
      game = game_fixture()
      assert {:error, %Ecto.Changeset{}} = Trivia.update_game(game, @invalid_attrs)
      assert game == Trivia.get_game!(game.id)
    end

    test "delete_game/1 deletes the game" do
      game = game_fixture()
      assert {:ok, %Game{}} = Trivia.delete_game(game)
      assert_raise Ecto.NoResultsError, fn -> Trivia.get_game!(game.id) end
    end

    test "change_game/1 returns a game changeset" do
      game = game_fixture()
      assert %Ecto.Changeset{} = Trivia.change_game(game)
    end
  end

  describe "questions" do
    alias Trelixia.Trivia.Question

    @valid_attrs %{answer: "some answer", compare_threshold: 120.5, question_text: "some question_text", time_allotment: 42, topic: "some topic", type: "some type"}
    @update_attrs %{answer: "some updated answer", compare_threshold: 456.7, question_text: "some updated question_text", time_allotment: 43, topic: "some updated topic", type: "some updated type"}
    @invalid_attrs %{answer: nil, compare_threshold: nil, question_text: nil, time_allotment: nil, topic: nil, type: nil}

    def question_fixture(attrs \\ %{}) do
      {:ok, question} =
        attrs
        |> Enum.into(@valid_attrs)
        |> Trivia.create_question()

      question
    end

    test "list_questions/0 returns all questions" do
      question = question_fixture()
      assert Trivia.list_questions() == [question]
    end

    test "get_question!/1 returns the question with given id" do
      question = question_fixture()
      assert Trivia.get_question!(question.id) == question
    end

    test "create_question/1 with valid data creates a question" do
      assert {:ok, %Question{} = question} = Trivia.create_question(@valid_attrs)
      assert question.answer == "some answer"
      assert question.compare_threshold == 120.5
      assert question.question_text == "some question_text"
      assert question.time_allotment == 42
      assert question.topic == "some topic"
      assert question.type == "some type"
    end

    test "create_question/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = Trivia.create_question(@invalid_attrs)
    end

    test "update_question/2 with valid data updates the question" do
      question = question_fixture()
      assert {:ok, %Question{} = question} = Trivia.update_question(question, @update_attrs)
      assert question.answer == "some updated answer"
      assert question.compare_threshold == 456.7
      assert question.question_text == "some updated question_text"
      assert question.time_allotment == 43
      assert question.topic == "some updated topic"
      assert question.type == "some updated type"
    end

    test "update_question/2 with invalid data returns error changeset" do
      question = question_fixture()
      assert {:error, %Ecto.Changeset{}} = Trivia.update_question(question, @invalid_attrs)
      assert question == Trivia.get_question!(question.id)
    end

    test "delete_question/1 deletes the question" do
      question = question_fixture()
      assert {:ok, %Question{}} = Trivia.delete_question(question)
      assert_raise Ecto.NoResultsError, fn -> Trivia.get_question!(question.id) end
    end

    test "change_question/1 returns a question changeset" do
      question = question_fixture()
      assert %Ecto.Changeset{} = Trivia.change_question(question)
    end
  end

  describe "favorites" do
    alias Trelixia.Trivia.Favorite

    @valid_attrs %{}
    @update_attrs %{}
    @invalid_attrs %{}

    def favorite_fixture(attrs \\ %{}) do
      {:ok, favorite} =
        attrs
        |> Enum.into(@valid_attrs)
        |> Trivia.create_favorite()

      favorite
    end

    test "list_favorites/0 returns all favorites" do
      favorite = favorite_fixture()
      assert Trivia.list_favorites() == [favorite]
    end

    test "get_favorite!/1 returns the favorite with given id" do
      favorite = favorite_fixture()
      assert Trivia.get_favorite!(favorite.id) == favorite
    end

    test "create_favorite/1 with valid data creates a favorite" do
      assert {:ok, %Favorite{} = favorite} = Trivia.create_favorite(@valid_attrs)
    end

    test "create_favorite/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = Trivia.create_favorite(@invalid_attrs)
    end

    test "update_favorite/2 with valid data updates the favorite" do
      favorite = favorite_fixture()
      assert {:ok, %Favorite{} = favorite} = Trivia.update_favorite(favorite, @update_attrs)
    end

    test "update_favorite/2 with invalid data returns error changeset" do
      favorite = favorite_fixture()
      assert {:error, %Ecto.Changeset{}} = Trivia.update_favorite(favorite, @invalid_attrs)
      assert favorite == Trivia.get_favorite!(favorite.id)
    end

    test "delete_favorite/1 deletes the favorite" do
      favorite = favorite_fixture()
      assert {:ok, %Favorite{}} = Trivia.delete_favorite(favorite)
      assert_raise Ecto.NoResultsError, fn -> Trivia.get_favorite!(favorite.id) end
    end

    test "change_favorite/1 returns a favorite changeset" do
      favorite = favorite_fixture()
      assert %Ecto.Changeset{} = Trivia.change_favorite(favorite)
    end
  end
end
