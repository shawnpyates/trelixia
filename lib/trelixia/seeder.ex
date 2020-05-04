defmodule Trelixia.Seeder do
  def seed() do
    alias Trelixia.Trivia.Game
    alias Trelixia.Account.User
    alias Trelixia.Repo

    {:ok, user } =
      %User{
        username: "some_username",
        email: "some_email@email.com",
        current_game_id: 1,
        current_score: 3000,
        is_registered: true,
        provider: "github",
        token: "abc123"
      } |> Repo.insert()

    _game = %Game{
      name: "some_game",
      category: "general",
      current_question_expiry: ~U[2020-05-03 23:23:59Z],
      current_question_id: 1,
      is_automated: true,
      max_players: 100,
      scheduled_for: ~U[2020-05-03 23:00:00Z],
      owner_id: user.id
    } |> Repo.insert()

    :ok
  end
end
