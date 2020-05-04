defmodule Trelixia.Repo.Migrations.CreateGames do
  use Ecto.Migration

  def change do
    create table(:games) do
      add :name, :string
      add :category, :string
      add :max_players, :integer
      add :scheduled_for, :utc_datetime
      add :is_automated, :boolean, default: false, null: false
      add :current_question_id, :integer
      add :current_question_expiry, :utc_datetime
      add :owner_id, references(:users, on_delete: :delete_all)

      timestamps()
    end

    create index(:games, [:owner_id])
  end
end
