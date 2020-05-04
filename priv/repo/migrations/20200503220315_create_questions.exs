defmodule Trelixia.Repo.Migrations.CreateQuestions do
  use Ecto.Migration

  def change do
    create table(:questions) do
      add :question_text, :text
      add :answer, :string
      add :topic, :string
      add :type, :string
      add :time_allotment, :integer
      add :compare_threshold, :float
      add :game_id, references(:games, on_delete: :delete_all)

      timestamps()
    end

  end
end
