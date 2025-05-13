import React, { useEffect, useState } from "react";
import ContactToggle from "../components/ContactToggle";

const MainPage: React.FC = () => {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    fetch("/data.json")
      .then((res) => res.json())
      .then((jsonData) => setData(jsonData))
      .catch((err) => console.error(err));
  }, []);

  if (!data) return <div>Loading...</div>;

  return (
    <div style={{ display: "flex", alignItems: "flex-start", padding: "1rem" }}>
      <div style={{ marginRight: "1rem" }}>
        <img
          src="/photo.JPG"
          alt="Profile"
          style={{ width: "150px", borderRadius: "50%", objectFit: "cover" }}
        />
      </div>
      <div>
        <h2>{data.introduction}</h2>
        <ContactToggle tel={data.contact.tel} email={data.contact.email} />
      </div>
    </div>
  );
};

export default MainPage;
