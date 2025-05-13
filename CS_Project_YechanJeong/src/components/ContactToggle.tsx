import React, { useState } from "react";

interface ContactToggleProps {
  tel: string;
  email: string;
}

const ContactToggle: React.FC<ContactToggleProps> = ({ tel, email }) => {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ marginTop: "1rem" }}>
      <button onClick={() => setOpen(!open)}>Contact {open ? "▲" : "▼"}</button>
      {open && (
        <div style={{ marginTop: "0.5rem" }}>
          <p>Tel: {tel}</p>
          <p>Email: {email}</p>
        </div>
      )}
    </div>
  );
};

export default ContactToggle;
