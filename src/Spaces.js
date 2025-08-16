import React, { useEffect, useState } from "react";
import "./Spaces.css";
import Spinner from "./Spinner";
import { useNavigate } from "react-router-dom";

export default function Spaces() {
  const [spaces, setSpaces] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [totalPages, setTotalPages] = useState(1);
  const navigate = useNavigate();

  const goToWorkshops = (spaceId) => {
    const params = new URLSearchParams({ spaceId: String(spaceId) });
    navigate({ pathname: "/", search: `?${params.toString()}` });
  };
  const goToSlotBooking = (spaceId, spaceName) => {
  navigate(`/spaces/${spaceId}/book`, { state: { spaceName } });
};


  const fetchSpaces = async (pageNo = 1, size = 5) => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://dev-workshops-service-fgdpf6amcahzhuge.centralindia-01.azurewebsites.net/api/v1/spaces?pageNo=${pageNo}&pageSize=${size}`
      );
      if (!response.ok)
        throw new Error(`HTTP error! Status: ${response.status}`);

      const data = await response.json();
      setSpaces(data.payload.spaces);

      const totalCount = data.payload.totalCount || data.payload.spaces.length;
      setTotalPages(Math.ceil(totalCount / size));
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSpaces(currentPage, pageSize);
  }, [currentPage, pageSize]);

  const handlePageChange = (page) => setCurrentPage(page);
  const handlePageSizeChange = (e) => {
    setPageSize(Number(e.target.value));
    setCurrentPage(1);
  };

  if (loading) return <Spinner />;
  if (error) return <p>Error fetching spaces: {error}</p>;

  return (
    <div className="spaces-container">
      <h1 className="spaces-title">Available Spaces</h1>

      {spaces.map((space) => (
        <div key={space.id} className="space-card">
          <h2 className="space-name">{space.space}</h2>

          <div className="space-actions">
            <button
              type="button"
              className="space-link"
              onClick={() => goToWorkshops(space.id)}
            >
              See Workshops
            </button>

            <button
              type="button"
              className="space-link"
              onClick={() => goToSlotBooking(space.id, space.space)}
            >
              Book Slot
            </button>
            <button
              type="button"
              className="space-link"
              onClick={() => goToSlotBooking(space.id, space.space)}
            >
              Regular Classes
            </button>
          </div>

          <a
            href={space.location}
            target="_blank"
            rel="noreferrer"
            className="get-direction"
          >
            Get Directions
          </a>
        </div>
      ))}

      <div className="pagination-bar">
        <div className="page-size-container">
          <span className="page-size-label">Show per page:</span>
          <select
            className="page-size-select"
            value={pageSize}
            onChange={handlePageSizeChange}
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={20}>20</option>
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
