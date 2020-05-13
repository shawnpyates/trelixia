defmodule TrelixiaWeb.Router do
  use TrelixiaWeb, :router

  pipeline :browser do
    plug :accepts, ["html"]
    plug :fetch_session
    plug :fetch_flash
    plug :protect_from_forgery
    plug :put_secure_browser_headers
  end

  pipeline :api do
    plug :accepts, ["json"]
    plug :fetch_session
    plug TrelixiaWeb.Context
  end

  scope "/", TrelixiaWeb do
    pipe_through :browser

    get "/", PageController, :index
  end

  scope "/auth", TrelixiaWeb do
    pipe_through :api

    get "/signout", AuthController, :signout
    get "/:provider", AuthController, :request
    get "/:provider/callback", AuthController, :callback
  end

  scope "/api" do
    pipe_through :api

    forward "/graphql",
            Absinthe.Plug,
            schema: TrelixiaWeb.Schema,
            before_send: {__MODULE__, :absinthe_before_send}

    forward "/graphiql", Absinthe.Plug.GraphiQL, schema: TrelixiaWeb.Schema
  end

  def absinthe_before_send(conn, %Absinthe.Blueprint{} = blueprint) do
    # TODO - check how this affects registered users
    if current_user = blueprint.execution.context[:current_user] do
      put_session(conn, :user_id, current_user.id)
    else
      conn
    end
  end

  def absinthe_before_send(conn, _) do
    conn
  end
end
