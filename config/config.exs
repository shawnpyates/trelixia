# This file is responsible for configuring your application
# and its dependencies with the aid of the Mix.Config module.
#
# This configuration file is loaded before any dependency and
# is restricted to this project.

# General application configuration
use Mix.Config

config :trelixia,
  ecto_repos: [Trelixia.Repo]

# Configures the endpoint
config :trelixia, TrelixiaWeb.Endpoint,
  url: [host: "localhost"],
  secret_key_base: "jJGslW1G5tVR2nhTxllpbKJ/jSwNWi4YCsrJQnzO4rRSrBM3Oja9MiDQxJ1L7Q8u",
  render_errors: [view: TrelixiaWeb.ErrorView, accepts: ~w(html json)],
  pubsub: [name: Trelixia.PubSub, adapter: Phoenix.PubSub.PG2],
  live_view: [signing_salt: "BdYQ781H"]

# Configures Elixir's Logger
config :logger, :console,
  format: "$time $metadata[$level] $message\n",
  metadata: [:request_id]

# Use Jason for JSON parsing in Phoenix
config :phoenix, :json_library, Jason

# Import environment specific config. This must remain at the bottom
# of this file so it overrides the configuration defined above.
import_config "#{Mix.env()}.exs"
