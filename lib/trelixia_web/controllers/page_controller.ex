defmodule TrelixiaWeb.PageController do
  use TrelixiaWeb, :controller

  def index(conn, _params) do
    render(conn, "index.html")
  end
end
