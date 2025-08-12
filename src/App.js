import React, { useState } from "react";
import "./App.css";
import InstagramEmbed from "./InstagramEmbed";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

const workshops = [
  {
    id: 1,
    title: "Ishq Di Bajjiyan",
    date: "2025-08-17",
    level: "Intermediate",
    category: "Hip Hop",
    instructor: "Naharjot Narang",
    space: "Dance An Addiction Studio, HSR Layout",
    location: "https://maps.app.goo.gl/ZM5s8XkSWjhUd1qd6",
    instagram: "https://www.instagram.com/reel/DNQDavzyhaK/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==",
  },
  {
    id: 2,
    title: "Contemporary Dance Intensive",
    date: "2025-09-12",
    level: "Intermediate",
    category: "Bollywood",
    instructor: "Move Academy",
    space: "Dance An Addiction Studio, HSR Layout",
    location: "https://maps.app.goo.gl/ZM5s8XkSWjhUd1qd6",
    instagram: "https://instagram.com/p/EXAMPLE2",
  },
  {
    id: 3,
    title: "Hip-Hop Groove",
    date: "2025-09-20",
    level: "All Levels",
    category: "Bollywood",
    instructor: "Street Beats",
    space: "Dance An Addiction Studio, HSR Layout",
    location: "https://maps.app.goo.gl/ZM5s8XkSWjhUd1qd6",
    instagram: "https://instagram.com/p/EXAMPLE3",
  },
  {
    id: 4,
    title: "Ishq Di Bajjiyan",
    date: "2025-08-17",
    level: "Intermediate",
    category: "Bollywood",
    instructor: "Naharjot Narang",
    space: "Dance An Addiction Studio, HSR Layout",
    location: "https://maps.app.goo.gl/ZM5s8XkSWjhUd1qd6",
    instagram: "https://www.instagram.com/reel/DNQDavzyhaK/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==",
  },
  {
    id: 5,
    title: "Contemporary Dance Intensive",
    date: "2025-09-12",
    level: "Intermediate",
    category: "Bollywood",
    instructor: "Move Academy",
    space: "Dance An Addiction Studio, HSR Layout",
    location: "https://maps.app.goo.gl/ZM5s8XkSWjhUd1qd6",
    instagram: "https://instagram.com/p/EXAMPLE2",
  },
  {
    id: 6,
    title: "Hip-Hop Groove",
    date: "2025-09-20",
    level: "All Levels",
    category: "Bollywood",
    instructor: "Street Beats",
    space: "Dance An Addiction Studio, HSR Layout",
    location: "https://maps.app.goo.gl/ZM5s8XkSWjhUd1qd6",
    instagram: "https://instagram.com/p/EXAMPLE3",
  },
  {
    id: 7,
    title: "Ishq Di Bajjiyan",
    date: "2025-08-17",
    level: "Intermediate",
    category: "Bollywood",
    instructor: "Naharjot Narang",
    space: "Dance An Addiction Studio, HSR Layout",
    location: "https://maps.app.goo.gl/ZM5s8XkSWjhUd1qd6",
    instagram: "https://www.instagram.com/reel/DNQDavzyhaK/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==",
  },
  {
    id: 8,
    title: "Contemporary Dance Intensive",
    date: "2025-09-12",
    level: "Intermediate",
    category: "Bollywood",
    instructor: "Move Academy",
    space: "Dance An Addiction Studio, HSR Layout",
    location: "https://maps.app.goo.gl/ZM5s8XkSWjhUd1qd6",
    instagram: "https://instagram.com/p/EXAMPLE2",
  },
  {
    id: 9,
    title: "Hip-Hop Groove",
    date: "2025-09-20",
    level: "All Levels",
    category: "Bollywood",
    instructor: "Street Beats",
    space: "Dance An Addiction Studio, HSR Layout",
    location: "https://maps.app.goo.gl/ZM5s8XkSWjhUd1qd6",
    instagram: "https://instagram.com/p/EXAMPLE3",
  },
  {
    id: 10,
    title: "Ishq Di Bajjiyan",
    date: "2025-08-17",
    level: "Intermediate",
    category: "Bollywood",
    instructor: "Naharjot Narang",
    space: "Dance An Addiction Studio, HSR Layout",
    location: "https://maps.app.goo.gl/ZM5s8XkSWjhUd1qd6",
    instagram: "https://www.instagram.com/reel/DNQDavzyhaK/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==",
  },
  {
    id: 11,
    title: "Contemporary Dance Intensive",
    date: "2025-09-12",
    level: "Intermediate",
    category: "Bollywood",
    instructor: "Move Academy",
    space: "Dance An Addiction Studio, HSR Layout",
    location: "https://maps.app.goo.gl/ZM5s8XkSWjhUd1qd6",
    instagram: "https://instagram.com/p/EXAMPLE2",
  },
  {
    id: 12,
    title: "Hip-Hop Groove",
    date: "2025-09-20",
    level: "All Levels",
    category: "Bollywood",
    instructor: "Street Beats",
    space: "Dance An Addiction Studio, HSR Layout",
    location: "https://maps.app.goo.gl/ZM5s8XkSWjhUd1qd6",
    instagram: "https://instagram.com/p/EXAMPLE3",
  },
  {
    id: 13,
    title: "Ishq Di Bajjiyan",
    date: "2025-08-17",
    level: "Intermediate",
    category: "Bollywood",
    instructor: "Naharjot Narang",
    space: "Dance An Addiction Studio, HSR Layout",
    location: "https://maps.app.goo.gl/ZM5s8XkSWjhUd1qd6",
    instagram: "https://www.instagram.com/reel/DNQDavzyhaK/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==",
  },
  {
    id: 14,
    title: "Contemporary Dance Intensive",
    date: "2025-09-12",
    level: "Intermediate",
    category: "Bollywood",
    instructor: "Move Academy",
    space: "Dance An Addiction Studio, HSR Layout",
    location: "https://maps.app.goo.gl/ZM5s8XkSWjhUd1qd6",
    instagram: "https://instagram.com/p/EXAMPLE2",
  }
];

function WorkshopCard({ workshop }) {
  return (
    <div className="card">
      <h2 className="title">{workshop.title}</h2>
      <p className="info">
        <strong>Date:</strong> {workshop.date}
      </p>
      <p className="info">
        <strong>Level:</strong> {workshop.level}
      </p>
      <p className="info">
        <strong>Instructor:</strong> {workshop.instructor}
      </p>
      <p className="info">
        <strong>Space:</strong> {workshop.space}
      </p>
      <a
        href={workshop.location}
        target="_blank"
        rel="noreferrer"
        className="link"
      >
        Location
      </a>&nbsp;&nbsp;
      <a
        href={workshop.instagram}
        target="_blank"
        rel="noreferrer"
        className="link"
      >
        View on Instagram
      </a>
    </div>
  );
}

function App() {
  const [category, setCategory] = useState("All");
  const [level, setLevel] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(4);
  const totalPages = Math.ceil(workshops.length / pageSize);

    const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handlePageSizeChange = (e) => {
    setPageSize(parseInt(e.target.value));
    setCurrentPage(1); // Reset to first page
  };

  const filteredWorkshops = workshops.filter((w) => {
    return (
      (category === "All" || w.category === category) &&
      (level === "All" || w.level === level)
    );
  });

  const indexOfLastWorkshop = currentPage * pageSize;
  const indexOfFirstWorkshop = indexOfLastWorkshop - pageSize;
  const currentWorkshops = workshops.filter((w) => {
    return (
      (category === "All" || w.category === category) &&
      (level === "All" || w.level === level)
    )}).slice(indexOfFirstWorkshop, indexOfLastWorkshop);


  return (
    <div>
      <Sidebar />
      <Navbar />
    <div className="container">
      <h1>Upcoming Workshops</h1>

      {/* Filter Section */}
      <div className="filters">
        <div className="filter-item">
          <label>Category:</label>
          <select value={category} onChange={(e) => setCategory(e.target.value)}>
            <option value="All">All</option>
            <option value="Bollywood">Bollywood</option>
            <option value="Hip Hop">Hip Hop</option>
            <option value="Contemporary">Contemporary</option>
            <option value="Salsa">Salsa</option>
            <option value="Indian Classical">Indian Classical</option>
          </select>
        </div>

        <div className="filter-item">
          <label>Level:</label>
          <select value={level} onChange={(e) => setLevel(e.target.value)}>
            <option value="All">All</option>
            <option value="Beginner">Beginner</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Advanced">Advanced</option>
          </select>
        </div>
      </div>


      {currentWorkshops.map((w) => (
        <WorkshopCard key={w.id} workshop={w} />
      ))}

        <div className="pagination-bar">
        <div className="page-size-container">
          <span className="page-size-label">Show per page:</span>
          <select
            className="page-size-select"
            value={pageSize}
            onChange={(e) => setPageSize(Number(e.target.value))}
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={50}>50</option>
          </select>
        </div>

        <div className="pagination-buttons">
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i + 1}
              className={currentPage === i + 1 ? "active" : ""}
              onClick={() => handlePageChange(i + 1)}
            >
              {i + 1}
            </button>
          ))}
        </div>
      </div>


        <div className="page-size-container">
  
</div>

    </div>
    </div>
  );
}

export default App;
