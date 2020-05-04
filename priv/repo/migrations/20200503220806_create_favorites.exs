defmodule Trelixia.Repo.Migrations.CreateFavorites do
  use Ecto.Migration

  def change do
    create table(:favorites) do
      add :user_id, references(:users, on_delete: :delete_all)
      add :game_id, references(:games, on_delete: :delete_all)

      timestamps()
    end

    create index(:favorites, [:user_id])
    create index(:favorites, [:game_id])
  end
end
