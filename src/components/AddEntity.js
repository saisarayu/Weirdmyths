import { useState, useEffect } from "react";

const AddEntity = () => {
  const [entities, setEntities] = useState([]);
  const [name, setName] = useState("");
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState("");
  const [filterUser, setFilterUser] = useState("");

  useEffect(() => {
    fetchEntities();
    fetchUsers();
  }, []);

  useEffect(() => {
    if (filterUser === "") {
      fetchEntities();
    } else {
      fetchEntitiesByUser(filterUser);
    }
  }, [filterUser]);

  const fetchEntities = async () => {
    const res = await fetch("/api/entities");
    const data = await res.json();
    setEntities(data);
  };

  const fetchEntitiesByUser = async (userId) => {
    const res = await fetch(`/api/entities/by-user/${userId}`);
    const data = await res.json();
    setEntities(data);
  };

  const fetchUsers = async () => {
    const res = await fetch("/api/users");
    const data = await res.json();
    setUsers(data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedUser) {
      alert("Please select a creator.");
      return;
    }
    const res = await fetch("/api/entities", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, created_by: selectedUser }),
    });
    if (res.ok) {
      fetchEntities();
      setName("");
    }
  };

  return (
    <div className="p-4 max-w-xl mx-auto">
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter entity name"
          className="border p-2 w-full"
        />

        <select
          value={selectedUser}
          onChange={(e) => setSelectedUser(e.target.value)}
          className="border p-2 w-full"
          required
          select
        >
          <option value="">Select Creator</option>
          {users.map((user) => (
            <option key={user._id} value={user._id}>
              {user.name}
            </option>
          ))}
        </select>

        <button type="submit" className="bg-blue-500 text-white p-2 rounded">
          Add Entity
        </button>
      </form>

      <div className="mt-6">
        <select
          value={filterUser}
          onChange={(e) => setFilterUser(e.target.value)}
          className="border p-2 w-full"
        >
          <option value="">Show All Entities</option>
          {users.map((user) => (
            <option key={user._id} value={user._id}>
              Filter by: {user.name}
            </option>
          ))}
        </select>
      </div>

      <ul className="mt-4">
        {entities.map((entity) => (
          <li key={entity._id} className="border-b p-2">
            <strong>{entity.name}</strong>{" "}
            <span className="text-sm text-gray-500">
              by {entity.created_by?.name || "Unknown"}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AddEntity;
