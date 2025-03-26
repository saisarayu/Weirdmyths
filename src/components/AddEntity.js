import { useState, useEffect } from "react";

const AddEntity = () => {
  const [entities, setEntities] = useState([]);
  const [name, setName] = useState("");

  useEffect(() => {
    fetchEntities();
  }, []);

  const fetchEntities = async () => {
    const res = await fetch("/api/entities");
    const data = await res.json();
    setEntities(data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch("/api/entities", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name }),
    });
    if (res.ok) {
      fetchEntities(); // Update list
      setName("");
    }
  };

  return (
    <div className="p-4">
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter entity name"
          className="border p-2 w-full"
        />
        <button type="submit" className="bg-blue-500 text-white p-2">Add Entity</button>
      </form>
      <ul className="mt-4">
        {entities.map((entity) => (
          <li key={entity.id} className="border-b p-2">{entity.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default AddEntity;
