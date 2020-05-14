defmodule :"Elixir.Trelixia.Repo.Migrations.Add-password-to-user" do
  use Ecto.Migration

  def change do
    alter table(:users) do
      add :password, :string
    end
  end
end
