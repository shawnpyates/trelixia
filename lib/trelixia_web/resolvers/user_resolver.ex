defmodule TrelixiaWeb.Resolvers.UserResolver do
  alias Trelixia.Account

  def list_all_users(_, _, _) do
    {:ok, Account.list_users()}
  end
end
