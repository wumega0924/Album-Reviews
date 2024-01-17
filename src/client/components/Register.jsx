import { useState } from "react";
let API = "http://localhost:3000/api/";
function Register({ setToken }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [error, setError] = useState(null);
  async function handleSubmit(event) {
    event.preventDefault();
    try {
      let response = await fetch(`${API}users/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
          role: "USER",
        }),
      });
      let json = await response.json();
      setToken(json.token);
      setSuccessMessage(json.message);
      setName("");
      setEmail("");
      setPassword("");
      // window.location.href= '/login' -> this automatically navigates to login page but I rather have a link so users can see the success message first
    } catch (error) {
      setError(error.message);
    }
  }
  return (
    <div className="register-container">
      {successMessage && <p>{successMessage}</p>}
      {error && <p>{error}</p>}
      <h1>Register</h1>
      <form onSubmit={handleSubmit}>
        <div className="register-form">
          <label>Name:</label>
          <input
            type="text"
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>
        <div className="register-options">
          <button type="submit">Sign up</button>
          {/* Link back to Login page with text/label depending on value (truthy or falsy) of successMessage */}
          {successMessage ? (
            <a href="/login">Return to login</a>
          ) : (
            <a href="/login">Already have an account?</a>
          )}
        </div>
      </form>
    </div>
  );
}
export default Register;
