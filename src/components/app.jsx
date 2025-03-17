// src/components/MyEntity.tsx
import React from "react";

const MyEntity = () => {
  const dummyData = {
    title: "ASAP Feature",
    description: "This is a sample entity component.",
  };

  return (
    <div>
      <h2>{dummyData.title}</h2>
      <p>{dummyData.description}</p>
    </div>
  );
};

export default MyEntity;
