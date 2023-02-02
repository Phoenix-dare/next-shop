import React, { useState } from "react";
import axios from "axios";

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (event:React.BaseSyntheticEvent) => {
    event.preventDefault();

    try {
      const response = await axios.post(
        "/api/register",
        JSON.stringify({
          username,
          password,
        }),
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.success) {
        setUsername("");
        setPassword("");
        setErrorMessage("");
      } else {
        setErrorMessage(response.data.message);
      }
    } catch (error) {
      setErrorMessage("An error occurred while trying to register.");
    }
  };

  return (
    <form className="w-auto h-auto flex flex-col items-center"onSubmit={handleSubmit}>
      {errorMessage && <p className="text-red-500">{errorMessage}</p>}
      <div className="mb-4">
        <label className="block text-gray-700 dark:text-white font-medium mb-2" htmlFor="username">
          Username:
        </label>
        <input
          className="border border-gray-400 p-2 w-full"
          id="username"
          type="text"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700  dark:text-white font-medium mb-2" htmlFor="password">
          Password:
        </label>
        <input
          className="border border-gray-400 p-2 w-full"
          id="password"
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
      </div>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded"
        type="submit"
      >
        Register
      </button>
    </form>
  );
};

export default Register;
