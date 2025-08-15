import React, { useState, useEffect } from "react";
import "./CreateWorkshop.css";

export default function CreateWorkshop() {
  const [formData, setFormData] = useState({
    title: "",
    date: "",
    level: "Beginner",
    category: "Bollywood",
    instructor: "",
    link: "",
    spaceId: "",
  });

  const [spaces, setSpaces] = useState([]);

  // Fetch spaces from API
  useEffect(() => {
    const fetchSpaces = async () => {
      try {
        const res = await fetch(
          "https://dev-workshops-service-fgdpf6amcahzhuge.centralindia-01.azurewebsites.net/api/v1/spaces?pageNo=1&pageSize=100"
        );
        const data = await res.json();
        setSpaces(data.payload.spaces || []);
      } catch (err) {
        console.error("Error fetching spaces:", err);
      }
    };

    fetchSpaces();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.spaceId) {
      alert("Please select a space");
      return;
    }

    try {
      const response = await fetch(
        "https://dev-workshops-service-fgdpf6amcahzhuge.centralindia-01.azurewebsites.net/api/v1/workshops",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to create workshop");
      }

      alert("Workshop created successfully!");
      // Reset form
      setFormData({
        title: "",
        date: "",
        level: "Beginner",
        category: "Bollywood",
        instructor: "",
        link: "",
        spaceId: "",
      });
    } catch (error) {
      console.error(error);
      alert("Error creating workshop");
    }
  };

  return (
    <div className="create-workshop-container">
      <h1>Create Workshop</h1>
      <form onSubmit={handleSubmit} className="workshop-form">
        <label>
          Title:
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Date:
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Level:
          <select name="level" value={formData.level} onChange={handleChange}>
            <option value="Beginner">Beginner</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Advanced">Advanced</option>
          </select>
        </label>

        <label>
          Category:
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
          >
            <option value="Bollywood">Bollywood</option>
            <option value="Hip Hop">Hip Hop</option>
            <option value="Salsa">Salsa</option>
            <option value="Contemporary">Contemporary</option>
            <option value="Indian Classical">Indian Classical</option>
          </select>
        </label>

        <label>
          Instructor:
          <input
            type="text"
            name="instructor"
            value={formData.instructor}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Space:
          <input
            list="spaces-list"
            name="spaceId"
            value={formData.spaceId}
            onChange={handleChange}
            placeholder="Type or select a space"
            required
          />
          <datalist id="spaces-list">
            {spaces.map((s) => (
              <option key={s.id} value={s.id}>
                {s.space}
              </option>
            ))}
          </datalist>
        </label>

        <label>
          Link:
          <input
            type="url"
            name="link"
            value={formData.link}
            onChange={handleChange}
          />
        </label>

        <button type="submit">Create Workshop</button>
      </form>
    </div>
  );
}
