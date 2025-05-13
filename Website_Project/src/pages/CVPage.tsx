import React, { useEffect, useState } from "react";
import CollapsibleSection from "../components/CollapsibleSection";

interface Education {
  degree: string;
  school: string;
  year: string;
  service?: string;
}

interface Employment {
  company: string;
  position: string;
  year: string;
}

interface Teaching {
  course: string;
  role: string;
  year: string;
}

interface Data {
  education: Education[];
  employment: Employment[];
  teaching: Teaching[];
}

const CVPage: React.FC = () => {
  const [data, setData] = useState<Data | null>(null);

  useEffect(() => {
    fetch("/data.json")
      .then((res) => res.json())
      .then((jsonData) => {
        setData({
          education: jsonData.education,
          employment: jsonData.employment,
          teaching: jsonData.teaching,
        });
      })
      .catch((err) => console.error(err));
  }, []);

  if (!data) return <div>Loading...</div>;

  return (
    <div style={{ padding: "1rem" }}>
      <h2>CV</h2>
      <CollapsibleSection title="Education">
        {data.education.map((edu, i) => {
          const degrees = Array.isArray(edu.degree)
            ? edu.degree.join(", ")
            : edu.degree;
          const service = edu.service ? ` (${edu.service})` : "";
          return (
            <p key={i}>
              {degrees}, {edu.school}, {edu.year}.{service}
            </p>
          );
        })}
      </CollapsibleSection>
      <CollapsibleSection title="Employment">
        {data.employment.map((emp, i) => (
          <p key={i}>
            {emp.company}, {emp.position}, {emp.year}.
          </p>
        ))}
      </CollapsibleSection>
      <CollapsibleSection title="Teaching">
        {data.teaching.map((teach, i) => (
          <p key={i}>
            {teach.course}, {teach.role}, {teach.year}.
          </p>
        ))}
      </CollapsibleSection>
    </div>
  );
};

export default CVPage;
