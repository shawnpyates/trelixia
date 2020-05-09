defmodule :"Elixir.Trelixia.Repo.Migrations.Add-point-value-to-question" do
  use Ecto.Migration

  def change do
    alter table(:questions) do
      add :point_value, :integer
    end
  end
end
