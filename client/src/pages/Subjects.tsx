import React, { useRef } from "react";

interface DataTypes {
  id: string;
  link: string;
  grade: string;
  subject: string;
}

const Subjects = () => {
  const linksRef = useRef<string[] | null>(null);
  const FetchData = async () => {
    try {
      const response = await fetch("http://localhost:4000/api/subjects");
      const data = await response.json();
      console.log(data);
      linksRef.current = data.map((item: DataTypes) => item.link);
      console.log(linksRef.current)
    } catch (err) {
      console.log("Error", err);
    }
  };

  React.useEffect(() => {
    FetchData();
  }, []);
  return <div>
    {linksRef.current?.map((link, key)=>(
        <p>{link}</p>
    ))}
  </div>;
};

export default Subjects;
