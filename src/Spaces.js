import React, { useEffect, useState } from "react";
import "./Spaces.css";
import Hero from "./components/Hero";
import Spinner from "./Spinner";
import { useNavigate } from "react-router-dom";
import Select from "./components/Select";

export default function Spaces() {
  const [spaces, setSpaces] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(6);
  const [totalPages, setTotalPages] = useState(1);
  const navigate = useNavigate();

  const goToWorkshops = (spaceId) => {
    const params = new URLSearchParams({ spaceId: String(spaceId) });
    navigate({ pathname: "/", search: `?${params.toString()}` });
  };
  const goToSlotBooking = (spaceId, spaceName) => {
  navigate(`/spaces/${spaceId}/book`, { state: { spaceName } });
};


  const fetchSpaces = async (pageNo = 1, size = 6) => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://dev-workshops-service-fgdpf6amcahzhuge.centralindia-01.azurewebsites.net/api/v1/spaces?pageNo=${pageNo}&pageSize=${size}`
      );
      if (!response.ok)
        throw new Error(`HTTP error! Status: ${response.status}`);

      const data = await response.json();
      setSpaces(data.payload.spaces);

      const total = data.payload.totalCount || data.payload.spaces.length;
      setTotalPages(Math.ceil(total / size));
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
  const handlePrevPage = () => setCurrentPage((p) => Math.max(1, p - 1));
  const handleNextPage = () => setCurrentPage((p) => Math.min(totalPages, p + 1));
  const getPageNumbers = (total, current) => {
    const pages = [];
    const maxToShow = 5;
    if (total <= maxToShow) {
      for (let i = 1; i <= total; i++) pages.push(i);
      return pages;
    }
    pages.push(1);
    const left = Math.max(2, current - 1);
    const right = Math.min(total - 1, current + 1);
    if (left > 2) pages.push('ellipsis-left');
    for (let i = left; i <= right; i++) pages.push(i);
    if (right < total - 1) pages.push('ellipsis-right');
    pages.push(total);
    return pages;
  };
  

  if (loading) return <Spinner />;
  if (error) return <p>Error fetching spaces: {error}</p>;

  return (
    <div className="spaces-container">
      <Hero
        title="Find a Space"
        subtitle="Explore available studios and book slots instantly."
        right={<div className="result-count">{spaces.length} spaces</div>}
      />

      {spaces.map((space) => (
        <div key={space.id} className="space-card animate-in">
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
          <Select
            value={String(pageSize)}
            onChange={(v)=>{ setPageSize(Number(v)); setCurrentPage(1);} }
            options={[{label:"6",value:"6"},{label:"12",value:"12"},{label:"24",value:"24"}]}
          />
        </div>

        <div className="pagination-buttons">
          <button className="nav prev" onClick={handlePrevPage} disabled={currentPage === 1} aria-label="Previous page">‹</button>
          {getPageNumbers(totalPages, currentPage).map((item, idx) => {
            if (typeof item === 'string') {
              return <span key={item + idx} className="page-ellipsis">…</span>;
            }
            return (
              <button
                key={item}
                className={currentPage === item ? "active" : ""}
                onClick={() => handlePageChange(item)}
              >
                {item}
              </button>
            );
          })}
          <button className="nav next" onClick={handleNextPage} disabled={currentPage === totalPages} aria-label="Next page">›</button>
        </div>
      </div>
    </div>
  );
}
