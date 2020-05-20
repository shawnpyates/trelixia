defmodule :"Elixir.Trelixia.Repo.Migrations.Add-wasAsked-to-question" do
  use Ecto.Migration

  def change do
    alter table(:questions) do
      add :was_asked, :boolean
    end
  end
end
