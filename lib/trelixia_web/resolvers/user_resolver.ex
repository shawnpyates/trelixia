defmodule TrelixiaWeb.Resolvers.UserResolver do
  alias Trelixia.Account

  def list_all_users(_, _, _) do
    {:ok, Account.list_users()}
  end

  def get_current_user(_, _, resolution) do
    {:ok, resolution.context.current_user}
  end

  def create_user(_, args, _) do
    Account.create_user(args)
  end

  def login_user(_, args, _) do
    # TODO: assign session with new user_id
    Account.login_user(args)
  end

  def update_user(_, %{id: id} = args, _) do
    case Account.get_user!(id) do
      nil ->
        {:error, "User ID #{id} not found."}

      user ->
        Account.update_user(user, args)
    end
  end
end
