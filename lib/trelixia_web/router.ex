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
  end

  scope "/", TrelixiaWeb do
    pipe_through :browser

    get "/", PageController, :index
  end

  scope "/api" do
    pipe_through :api

    forward "/graphql", Absinthe.Plug, schema: TrelixiaWeb.Schema

    forward "/graphiql", Absinthe.Plug.GraphiQL,
      schema: TrelixiaWeb.Schema,
      interface: :playground
  end
end