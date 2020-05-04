defmodule Trelixia.AccountTest do
  use Trelixia.DataCase

  alias Trelixia.Account

  describe "users" do
    alias Trelixia.Account.User

    @valid_attrs %{current_game_id: 42, current_score: 42, email: "some email", is_registered: true, provider: "some provider", token: "some token", username: "some username"}
    @update_attrs %{current_game_id: 43, current_score: 43, email: "some updated email", is_registered: false, provider: "some updated provider", token: "some updated token", username: "some updated username"}
    @invalid_attrs %{current_game_id: nil, current_score: nil, email: nil, is_registered: nil, provider: nil, token: nil, username: nil}

    def user_fixture(attrs \\ %{}) do
      {:ok, user} =
        attrs
        |> Enum.into(@valid_attrs)
        |> Account.create_user()

      user
    end

    test "list_users/0 returns all users" do
      user = user_fixture()
      assert Account.list_users() == [user]
    end

    test "get_user!/1 returns the user with given id" do
      user = user_fixture()
      assert Account.get_user!(user.id) == user
    end

    test "create_user/1 with valid data creates a user" do
      assert {:ok, %User{} = user} = Account.create_user(@valid_attrs)
      assert user.current_game_id == 42
      assert user.current_score == 42
      assert user.email == "some email"
      assert user.is_registered == true
      assert user.provider == "some provider"
      assert user.token == "some token"
      assert user.username == "some username"
    end

    test "create_user/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = Account.create_user(@invalid_attrs)
    end

    test "update_user/2 with valid data updates the user" do
      user = user_fixture()
      assert {:ok, %User{} = user} = Account.update_user(user, @update_attrs)
      assert user.current_game_id == 43
      assert user.current_score == 43
      assert user.email == "some updated email"
      assert user.is_registered == false
      assert user.provider == "some updated provider"
      assert user.token == "some updated token"
      assert user.username == "some updated username"
    end

    test "update_user/2 with invalid data returns error changeset" do
      user = user_fixture()
      assert {:error, %Ecto.Changeset{}} = Account.update_user(user, @invalid_attrs)
      assert user == Account.get_user!(user.id)
    end

    test "delete_user/1 deletes the user" do
      user = user_fixture()
      assert {:ok, %User{}} = Account.delete_user(user)
      assert_raise Ecto.NoResultsError, fn -> Account.get_user!(user.id) end
    end

    test "change_user/1 returns a user changeset" do
      user = user_fixture()
      assert %Ecto.Changeset{} = Account.change_user(user)
    end
  end
end
