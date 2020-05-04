defmodule Trelixia.Repo.Migrations.CreateUsers do
  use Ecto.Migration

  def change do
    create table(:users) do
      add :username, :string
      add :email, :string
      add :provider, :string
      add :token, :string
      add :is_registered, :boolean, default: false, null: false
      add :current_game_id, :integer
      add :current_score, :integer

      timestamps()
    end

  end
end
