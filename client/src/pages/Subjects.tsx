import React, { useState, useEffect } from "react";
import "@cyntler/react-doc-viewer/dist/index.css";
import DocViewer, { DocViewerRenderers } from "@cyntler/react-doc-viewer";

interface DataTypes {
  id: string;
  link: string;
  grade: string;
  subject: string;
}

const Subjects = () => {
  const [links, setLinks] = useState<string[]>([]);

  const FetchData = async () => {
    try {
      const response = await fetch("http://localhost:4000/api/subjects");
      const data = await response.json();
      const allLinks = data.map((item: DataTypes) => item.link);
      console.log(allLinks)
      setLinks(allLinks);
    } catch (err) {
      console.log("Error", err);
    }
  };

  useEffect(() => {
    FetchData();
  }, []);

  const docs = links.map((link) => ({ uri: link }));

  return (
    <div style={{ height: "100vh" }}>
      {docs.length > 0 && (
        <DocViewer documents={docs} pluginRenderers={DocViewerRenderers} />
      )}
    </div>
  );
};

export default Subjects;
