defmodule Trelixia.Repo do
  use Ecto.Repo,
    otp_app: :trelixia,
    adapter: Ecto.Adapters.Postgres
end
