defmodule :"Elixir.Trelixia.Repo.Migrations.Readd-current-game-id-with-ref-to-games" do
  use Ecto.Migration

  def change do
    alter table(:users) do
      add :current_game_id, references(:games, on_delete: :nothing)
    end

    create index(:users, [:current_game_id])
  end
end
