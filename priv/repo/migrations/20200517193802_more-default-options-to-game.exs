defmodule :"Elixir.Trelixia.Repo.Migrations.More-default-options-to-game" do
  use Ecto.Migration

  def change do
    alter table(:games) do
      add :default_time_allotment, :integer
      add :default_question_type, :string
    end
  end
end
