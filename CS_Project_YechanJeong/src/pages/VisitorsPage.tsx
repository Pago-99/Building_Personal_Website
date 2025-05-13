import React, { useState } from "react";

interface Message {
  id: number;
  author: string;
  password: string;
  text: string;
  secret: boolean;
  timestamp: number;
}

function maskString(str: string) {
  if (str.length <= 3) return "***";
  return str.slice(0, 3) + "****";
}

const VisitorsPage: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [idInput, setIdInput] = useState("");
  const [pwInput, setPwInput] = useState("");
  const [textInput, setTextInput] = useState("");
  const [secretInput, setSecretInput] = useState(false);

  const [loginId, setLoginId] = useState("");
  const [loginPw, setLoginPw] = useState("");

  const [loggedInUser, setLoggedInUser] = useState<{
    id: string;
    password: string;
  } | null>(null);
  const [adminLoggedIn, setAdminLoggedIn] = useState(false);

  const [editingMessageId, setEditingMessageId] = useState<number | null>(null);
  const [editText, setEditText] = useState("");
  const [editSecret, setEditSecret] = useState(false);

  const handleAddMessage = () => {
    const newMessage: Message = {
      id: Date.now(),
      author: idInput,
      password: pwInput,
      text: textInput,
      secret: secretInput,
      timestamp: Date.now(),
    };
    setMessages([...messages, newMessage]);
    setIdInput("");
    setPwInput("");
    setTextInput("");
    setSecretInput(false);
  };

  const handleLogin = () => {
    if (loginId === "Admin" && loginPw === "1234") {
      setAdminLoggedIn(true);
      setLoggedInUser(null);
    } else {
      const validUser = messages.some(
        (msg) => msg.author === loginId && msg.password === loginPw
      );

      if (validUser) {
        setLoggedInUser({ id: loginId, password: loginPw });
        setAdminLoggedIn(false);
      } else {
        alert("Invalid ID or Password");
      }
    }

    setLoginId("");
    setLoginPw("");
  };

  const handleLogout = () => {
    setAdminLoggedIn(false);
    setLoggedInUser(null);
  };

  const handleDelete = (msgId: number) => {
    setMessages(messages.filter((msg) => msg.id !== msgId));
  };

  const startEdit = (msg: Message) => {
    setEditingMessageId(msg.id);
    setEditText(msg.text);
    setEditSecret(msg.secret);
  };

  const cancelEdit = () => {
    setEditingMessageId(null);
    setEditText("");
    setEditSecret(false);
  };

  const saveEdit = (msgId: number) => {
    setMessages(
      messages.map((msg) =>
        msg.id === msgId ? { ...msg, text: editText, secret: editSecret } : msg
      )
    );
    setEditingMessageId(null);
    setEditText("");
    setEditSecret(false);
  };

  return (
    <div style={{ padding: "1rem" }}>
      <h2>Visitors</h2>
      <div
        style={{
          border: "1px solid #ccc",
          padding: "1rem",
          marginBottom: "1rem",
        }}
      >
        <h3>Write a Message</h3>
        <input
          type="text"
          placeholder="ID"
          value={idInput}
          onChange={(e) => setIdInput(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={pwInput}
          onChange={(e) => setPwInput(e.target.value)}
          style={{ marginLeft: "0.5rem" }}
        />
        <br />
        <br />
        <textarea
          placeholder="Write your message here..."
          value={textInput}
          onChange={(e) => setTextInput(e.target.value)}
          style={{ width: "100%", height: "80px" }}
        />
        <br />
        <label>
          <input
            type="checkbox"
            checked={secretInput}
            onChange={(e) => setSecretInput(e.target.checked)}
          />{" "}
          Secret
        </label>
        <br />
        <br />
        <button onClick={handleAddMessage}>Save</button>
      </div>

      <div
        style={{
          border: "1px solid #ccc",
          padding: "1rem",
          marginBottom: "1rem",
        }}
      >
        <h3>Login</h3>
        {adminLoggedIn || loggedInUser ? (
          <>
            <p>
              You are logged in as {adminLoggedIn ? "Admin" : loggedInUser?.id}
            </p>
            <button onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <>
            <input
              type="text"
              placeholder="ID"
              value={loginId}
              onChange={(e) => setLoginId(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              value={loginPw}
              onChange={(e) => setLoginPw(e.target.value)}
              style={{ marginLeft: "0.5rem" }}
            />
            <button onClick={handleLogin} style={{ marginLeft: "0.5rem" }}>
              Login
            </button>
          </>
        )}
      </div>

      <h3>Messages</h3>
      {messages.map((msg) => {
        const isOwner =
          loggedInUser &&
          loggedInUser.id === msg.author &&
          loggedInUser.password === msg.password &&
          !adminLoggedIn;

        const showRealData = adminLoggedIn || isOwner;
        const displayAuthor =
          showRealData || !msg.secret ? msg.author : maskString(msg.author);
        const displayText = showRealData || !msg.secret ? msg.text : "****";

        // Format the timestamp
        // Inside the map over messages:
        const timeString = new Date(msg.timestamp).toLocaleString("en-US", {
          month: "short", // "Jan", "Feb", "Mar", etc.
          day: "numeric",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        });

        // This might produce something like "Mar 10, 2024, 3:45 PM"

        if (editingMessageId === msg.id) {
          return (
            <div
              key={msg.id}
              style={{ borderBottom: "1px solid #ccc", padding: "0.5rem 0" }}
            >
              <strong>{displayAuthor}:</strong>
              <textarea
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
                style={{ width: "100%", height: "50px", margin: "0.5rem 0" }}
              />
              <br />
              <label>
                <input
                  type="checkbox"
                  checked={editSecret}
                  onChange={(e) => setEditSecret(e.target.checked)}
                />{" "}
                Secret
              </label>
              <br />
              <br />
              <button onClick={() => saveEdit(msg.id)}>Save</button>
              <button onClick={cancelEdit} style={{ marginLeft: "0.5rem" }}>
                Cancel
              </button>
              <p style={{ fontSize: "0.9rem", color: "#555" }}>{timeString}</p>
            </div>
          );
        }

        return (
          <div
            key={msg.id}
            style={{ borderBottom: "1px solid #ccc", padding: "0.5rem 0" }}
          >
            <strong>{displayAuthor}:</strong> {displayText}
            <div>
              {isOwner && (
                <>
                  <button onClick={() => startEdit(msg)}>Edit</button>
                  <button onClick={() => handleDelete(msg.id)}>X</button>
                </>
              )}
              {adminLoggedIn && !isOwner && (
                <button onClick={() => handleDelete(msg.id)}>Delete</button>
              )}
            </div>
            <p style={{ fontSize: "0.9rem", color: "#555" }}>{timeString}</p>
          </div>
        );
      })}
    </div>
  );
};

export default VisitorsPage;
