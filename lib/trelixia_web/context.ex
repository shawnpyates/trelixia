defmodule TrelixiaWeb.Context do
  @behaviour Plug

  import Plug.Conn
  import Ecto.Query, warn: false

  alias Trelixia.Account
  alias Trelixia.Account.User

  # alias Trelixia.Repo

  def init(opts), do: opts

  def call(conn, _) do
    context = build_context(conn)
    Absinthe.Plug.put_options(conn, context: context)
  end

  def build_context(conn) do
    user_id = get_session(conn, :user_id)

    cond do
      user = user_id && Account.get_user!(user_id) ->
        %{current_user: user}

      true ->
        # create an unregistered user
        with {:ok, %User{} = user} <- Account.create_user(%{is_registered: false}) do
          %{current_user: user}
        end
    end
  end
end
