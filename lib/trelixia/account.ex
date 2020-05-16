defmodule Trelixia.Account do
  @moduledoc """
  The Account context.
  """
  @email_constraint "users_email_index"
  @username_constraint "users_username_index"
  @email_constraint_error_message "Unable to create user. Email already exists."
  @username_constraint_error_message "Unable to create user. Username already exists."
  @user_not_found_error_message "Login failed: User not found."
  @invalid_password_error_message "Login failed: Invalid password."

  import Ecto.{Query, Changeset}, warn: false
  alias Trelixia.Repo

  alias Trelixia.Account.User

  @doc """
  Returns the list of users.

  ## Examples

      iex> list_users()
      [%User{}, ...]

  """
  def list_users do
    Repo.all(User)
  end

  @doc """
  Gets a single user.

  Raises `Ecto.NoResultsError` if the User does not exist.

  ## Examples

      iex> get_user!(123)
      %User{}

      iex> get_user!(456)
      ** (Ecto.NoResultsError)

  """
  def get_user!(id), do: Repo.get!(User, id)

  @doc """
  Creates a user.

  ## Examples

      iex> create_user(%{field: value})
      {:ok, %User{}}

      iex> create_user(%{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def create_user(attrs \\ %{}) do
    try do
      %User{} |> User.changeset(attrs) |> put_pass_hash() |> Repo.insert()
    rescue
      error in Ecto.ConstraintError ->
        case error.constraint do
          @email_constraint -> {:error, @email_constraint_error_message}
          @username_constraint -> {:error, @username_constraint_error_message}
        end
    end
  end

  def login_user(%{username: username, password: password}) do
    case Repo.get_by(User, username: username) do
      nil ->
        {:error, @user_not_found_error_message}

      user ->
        case Bcrypt.check_pass(user, password, hash_key: :password) do
          {:ok, authenticated_user} -> authenticated_user
          {:error, _reason} -> {:error, @invalid_password_error_message}
        end
    end
  end

  defp put_pass_hash(%Ecto.Changeset{valid?: true, changes: %{password: password}} = changeset) do
    change(changeset, Bcrypt.add_hash(password, hash_key: :password))
  end

  defp put_pass_hash(changeset), do: changeset

  @doc """
  Updates a user.

  ## Examples

      iex> update_user(user, %{field: new_value})
      {:ok, %User{}}

      iex> update_user(user, %{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def update_user(%User{} = user, attrs) do
    user
    |> User.changeset(attrs)
    |> Repo.update()
  end

  @doc """
  Deletes a user.

  ## Examples

      iex> delete_user(user)
      {:ok, %User{}}

      iex> delete_user(user)
      {:error, %Ecto.Changeset{}}

  """
  def delete_user(%User{} = user) do
    Repo.delete(user)
  end

  @doc """
  Returns an `%Ecto.Changeset{}` for tracking user changes.

  ## Examples

      iex> change_user(user)
      %Ecto.Changeset{source: %User{}}

  """
  def change_user(%User{} = user) do
    User.changeset(user, %{})
  end

  def insert_or_update_user(changeset) do
    case Repo.get_by(User, email: changeset.changes.email) do
      nil ->
        Repo.insert(changeset)

      user ->
        {:ok, user}
    end
  end
end
