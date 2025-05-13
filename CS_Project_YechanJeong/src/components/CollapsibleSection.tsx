import React, { useState } from "react";

interface CollapsibleSectionProps {
  title: string;
  children: React.ReactNode;
}

const CollapsibleSection: React.FC<CollapsibleSectionProps> = ({
  title,
  children,
}) => {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ margin: "1rem 0" }}>
      <h3
        style={{ cursor: "pointer", textDecoration: "underline" }}
        onClick={() => setOpen(!open)}
      >
        {title} {open ? "▲" : "▼"}
      </h3>
      {open && <div style={{ marginLeft: "1rem" }}>{children}</div>}
    </div>
  );
};

export default CollapsibleSection;
