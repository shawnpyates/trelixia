use Mix.Config

# Configure your database
config :trelixia, Trelixia.Repo,
  username: "shawnyates",
  password: "postgres",
  database: "trelixia_test",
  hostname: "localhost",
  pool: Ecto.Adapters.SQL.Sandbox

# We don't run a server during test. If one is required,
# you can enable the server option below.
config :trelixia, TrelixiaWeb.Endpoint,
  http: [port: 4004],
  server: false

# Print only warnings and errors during test
config :logger, level: :warn
