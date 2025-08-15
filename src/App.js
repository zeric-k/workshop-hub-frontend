import React, { useState, useEffect } from "react";
import "./App.css";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Spaces from "./Spaces";
import CreateWorkshop from "./CreateWorkshop";
import Spinner from "./Spinner";
import "./styles/common.css"; // adjust path as needed

function WorkshopsPage() {
  const [workshops, setWorkshops] = useState([]);
  const [spaces, setSpaces] = useState([]);
  const [category, setCategory] = useState("All");
  const [level, setLevel] = useState("All");
  const [selectedSpace, setSelectedSpace] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(4);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);

  // Fetch spaces for dropdown
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


  useEffect(() => {
    fetchSpaces();
  }, []);

  // eslint-disable-next-line react-hooks/exhaustive-deps
useEffect(() => {
  const fetchWorkshops = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      params.append("pageNo", currentPage);
      params.append("pageSize", pageSize);
      if (category !== "All") params.append("category", category);
      if (level !== "All") params.append("level", level);
      if (selectedSpace !== "All") params.append("spaceId", selectedSpace);

      const res = await fetch(
        `https://dev-workshops-service-fgdpf6amcahzhuge.centralindia-01.azurewebsites.net/api/v1/workshops?${params.toString()}`
      );
      const data = await res.json();
      setWorkshops(data.payload.workshops || []);
      const totalCount =
        data.payload.totalCount || (data.payload.workshops || []).length;
      setTotalPages(Math.ceil(totalCount / pageSize));
    } catch (err) {
      console.error("Error fetching workshops:", err);
    } finally {
      setLoading(false);
    }
  };

  fetchWorkshops();
}, [currentPage, pageSize, category, level, selectedSpace]);


  const handlePageChange = (page) => setCurrentPage(page);
  const handlePageSizeChange = (e) => {
    setPageSize(Number(e.target.value));
    setCurrentPage(1);
  };

  if (loading) return <Spinner />;
  //if (loading) return <p style={{ textAlign: "center" }}>Loading workshops...</p>;

  return (
    <div className="container">
      <h1>Upcoming Workshops</h1>

      {/* Filters */}
      <div className="filters">
        <div className="filter-item">
          <label>Category:</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
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

        <div className="filter-item">
          <label>Space:</label>
          <select
            value={selectedSpace}
            onChange={(e) => setSelectedSpace(e.target.value)}
          >
            <option value="All">All</option>
            {spaces.map((space) => (
              <option key={space.id} value={space.id}>
                {space.space}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Workshop cards */}
      {workshops.map((w) => (
        <div key={w.id} className="card">
          <h2 className="title">{w.title}</h2>
          <p className="info">
            <strong>Date:</strong> {w.date}
          </p>
          <p className="info">
            <strong>Level:</strong> {w.level}
          </p>
          <p className="info">
            <strong>Instructor:</strong> {w.instructor}
          </p>
          <p className="info">
            <strong>Space:</strong> {w.space}
          </p>
          <a
            href={w.location}
            target="_blank"
            rel="noreferrer"
            className="link"
          >
            Location
          </a>
          &nbsp;&nbsp;
          <a href={w.link} target="_blank" rel="noreferrer" className="link">
            View on Instagram
          </a>
        </div>
      ))}

      {/* Pagination */}
      <div className="pagination-bar">
        <div className="page-size-container">
          <span className="page-size-label">Show per page:</span>
          <select
            value={pageSize}
            onChange={handlePageSizeChange}
            className="page-size-select"
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
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Sidebar />
      <Navbar />
      <Routes>
        <Route path="/" element={<WorkshopsPage />} />
        <Route path="/spaces" element={<Spaces />} />
        <Route path="/create" element={<CreateWorkshop />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
