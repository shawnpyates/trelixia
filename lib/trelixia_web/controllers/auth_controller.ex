defmodule TrelixiaWeb.AuthController do
  use TrelixiaWeb, :controller
  plug Ueberauth

  alias Trelixia.Account
  alias Trelixia.Account.User

  action_fallback TrelixiaWeb.FallbackController

  def get_current(conn, _attrs) do
    conn
    |> render("show.json", user: conn.assigns.user)
  end

  def callback(%{assigns: %{ueberauth_auth: auth}} = conn, _attrs) do
    user_attrs = %{
      token: auth.credentials.token,
      email: auth.info.email,
      name: auth.info.name,
      provider: Atom.to_string(auth.provider),
      is_registered: true
    }

    changeset = User.changeset(%User{}, user_attrs)

    signin(conn, changeset)
  end

  def signout(conn, _attrs) do
    frontend_url = System.get_env("FRONTEND_URL")

    conn
    |> configure_session(drop: true)
    |> redirect(external: frontend_url)
  end

  defp signin(conn, changeset) do
    frontend_url = System.get_env("FRONTEND_URL")

    case Account.insert_or_update_user(changeset) do
      {:ok, user} ->
        conn
        |> put_session(:user_id, user.id)
        |> redirect(external: frontend_url)

      {:error, _reason} ->
        conn
        |> redirect(external: frontend_url)
    end
  end
end
