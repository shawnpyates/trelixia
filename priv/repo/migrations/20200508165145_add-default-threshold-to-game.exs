defmodule :"Elixir.Trelixia.Repo.Migrations.Add-default-threshold-to-game" do
  use Ecto.Migration

  def change do
    alter table(:games) do
      add :default_compare_threshold, :float
    end
  end
end
