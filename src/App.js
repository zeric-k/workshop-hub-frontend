import React, { useState, useEffect } from "react";
import "./App.css";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import { useUI } from "./context/UIContext";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Spaces from "./Spaces";
import CreateWorkshop from "./CreateWorkshop";
import SkeletonGrid from "./components/Skeleton";
import SlotBooking from "./SlotBooking";
import "./styles/common.css"; // adjust path as needed
import { useSearchParams } from "react-router-dom";
import MySpace from "./MySpace";
import Profile from "./Profile";
import UserBooking from "./UserBooking";
import Hero from "./components/Hero";
import EmptyState from "./components/EmptyState";
import Select from "./components/Select";
import DatePicker from "./components/DatePicker";
import BackToTop from "./components/BackToTop";
import NotFound from "./components/NotFound";
import { LoginPage, RegisterPage } from "./AuthPages";
import { useAuth } from "./context/AuthContext";
import About from "./About";
 

function WorkshopsPage() {
  const [workshops, setWorkshops] = useState([]);
  const [spaces, setSpaces] = useState([]);
  const [category, setCategory] = useState("All");
  const [level, setLevel] = useState("All");
  const [searchParams, setSearchParams] = useSearchParams();
  const formatYMD = (date) => {
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, "0");
    const d = String(date.getDate()).padStart(2, "0");
    return `${y}-${m}-${d}`;
  };
  const defaultStart = (() => {
    const sp = searchParams.get("startDate");
    if (sp) return sp;
    const t = new Date();
    return formatYMD(t);
  })();
  const defaultEnd = (() => {
    const ep = searchParams.get("endDate");
    if (ep) return ep;
    const t = new Date();
    t.setDate(t.getDate() + 21);
    return formatYMD(t);
  })();
  const [startDate, setStartDate] = useState(defaultStart);
  const [endDate, setEndDate] = useState(defaultEnd);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(6);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true); // true only for first page fetch
  const [appending, setAppending] = useState(false); // true when loading subsequent pages
  const [selectedSpace, setSelectedSpace] = useState(
    () => searchParams.get("spaceId") || "All"
  );
  const loadMoreRef = React.useRef(null);
  
  const manualBatchRef = React.useRef(false);

  // No Instagram thumbnail scraping for card media

  const localFallbacks = Array.from({ length: 50 }, (_, i) => `/images/dance-${String(i + 1).padStart(2, '0')}.jpg`);

  

  const imageMapRef = React.useRef(new Map());
  const imageQueueRef = React.useRef([]);
  const seedQueue = () => {
    const idxs = Array.from({ length: localFallbacks.length }, (_, i) => i);
    for (let i = idxs.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [idxs[i], idxs[j]] = [idxs[j], idxs[i]];
    }
    imageQueueRef.current = idxs;
  };
  const assignFallbackImage = (w) => {
    const key = String(w.id || w.title || "dance");
    if (imageMapRef.current.has(key)) return imageMapRef.current.get(key);
    if (imageQueueRef.current.length === 0) seedQueue();
    const nextIdx = imageQueueRef.current.shift();
    const src = localFallbacks[nextIdx % localFallbacks.length];
    imageMapRef.current.set(key, src);
    return src;
  };

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

  useEffect(() => {
    const params = new URLSearchParams();
    if (selectedSpace !== "All") params.set("spaceId", String(selectedSpace));
    if (category !== "All") params.set("category", category);
    if (level !== "All") params.set("level", level);
    params.set("pageNo", String(currentPage));
    params.set("pageSize", String(pageSize));
    if (startDate) params.set("startDate", startDate);
    if (endDate) params.set("endDate", endDate);

    setSearchParams(params, { replace: true });
  }, [currentPage, pageSize, selectedSpace, category, level, startDate, endDate, setSearchParams]);

  // Reset to first page whenever filters change
  useEffect(() => {
    setCurrentPage(1);
    setWorkshops([]);
  }, [category, level, selectedSpace, startDate, endDate]);

  useEffect(() => {
    const fetchWorkshops = async () => {
      if (manualBatchRef.current) return; // Skip when manual batch loader is running
      if (currentPage === 1) {
        setLoading(true);
      } else {
        setAppending(true);
      }
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
        let newItems = data.payload.workshops || [];
        // Client-side date filter
        if (startDate || endDate) {
          const start = startDate ? new Date(startDate) : null;
          const end = endDate ? new Date(endDate) : null;
          if (end) end.setHours(23,59,59,999);
          newItems = newItems.filter((w) => {
            const d = new Date(w.date);
            if (start && d < start) return false;
            if (end && d > end) return false;
            return true;
          });
        }
        setWorkshops((prev) => (currentPage === 1 ? newItems : [...prev, ...newItems]));
        const totalCountVal =
          data.payload.totalCount || (data.payload.workshops || []).length;
        setTotalPages(Math.ceil(totalCountVal / pageSize));
      } catch (err) {
        console.error("Error fetching workshops:", err);
      } finally {
        setLoading(false);
        setAppending(false);
      }
    };

    fetchWorkshops();
  }, [currentPage, pageSize, category, level, selectedSpace, startDate, endDate]);

  const hasMore = currentPage < totalPages;

  // Infinite scroll observer
  useEffect(() => {
    if (!hasMore || loading || appending) return;
    const node = loadMoreRef.current;
    if (!node) return;
    const loadMoreBatch = async () => {
      if (loading || appending) return;
      manualBatchRef.current = true;
      setAppending(true);
      let appendedCount = 0;
      let page = currentPage + 1;
      try {
        while (appendedCount < pageSize && page <= totalPages) {
          const params = new URLSearchParams();
          params.append("pageNo", page);
          params.append("pageSize", pageSize);
          if (category !== "All") params.append("category", category);
          if (level !== "All") params.append("level", level);
          if (selectedSpace !== "All") params.append("spaceId", selectedSpace);
          const res = await fetch(
            `https://dev-workshops-service-fgdpf6amcahzhuge.centralindia-01.azurewebsites.net/api/v1/workshops?${params.toString()}`
          );
          const data = await res.json();
          let pageItems = data.payload.workshops || [];
          if (startDate || endDate) {
            const start = startDate ? new Date(startDate) : null;
            const end = endDate ? new Date(endDate) : null;
            if (end) end.setHours(23, 59, 59, 999);
            pageItems = pageItems.filter((w) => {
              const d = new Date(w.date);
              if (start && d < start) return false;
              if (end && d > end) return false;
              return true;
            });
          }
          setWorkshops((prev) => [...prev, ...pageItems]);
          appendedCount += pageItems.length;
          page += 1;
        }
        setCurrentPage(page - 1);
      } catch (e) {
        console.error("Error loading more:", e);
      } finally {
        manualBatchRef.current = false;
        setAppending(false);
      }
    };
    const observer = new IntersectionObserver((entries) => {
      const first = entries[0];
      if (first.isIntersecting) {
        loadMoreBatch();
      }
    }, { root: null, rootMargin: '200px', threshold: 0 });
    observer.observe(node);
    return () => {
      observer.disconnect();
    };
  }, [hasMore, loading, appending, totalPages, currentPage, pageSize, category, level, selectedSpace, startDate, endDate]);
  

  if (loading && currentPage === 1) return <SkeletonGrid count={6} />;

  return (
    <div className="container">
      <Hero
        title="Discover Workshops"
        subtitle="Browse and register for upcoming dance workshops across spaces."
      />

      {/* Filters */}
      <div className="filters">
        <div className="filter-item">
          <label>Category:</label>
          <Select
            value={category}
            onChange={setCategory}
            options={["All","Bollywood","Hip Hop","Contemporary","Salsa","Indian Classical"]}
          />
        </div>

        <div className="filter-item">
          <label>Level:</label>
          <Select
            value={level}
            onChange={setLevel}
            options={["All","Beginner","Intermediate","Advanced"]}
          />
        </div>

        <div className="filter-item">
          <label>Space:</label>
          <Select
            value={selectedSpace}
            onChange={setSelectedSpace}
            options={[{label:"All", value:"All"}, ...spaces.map(s=>({label:s.space, value:String(s.id)}))]}
          />
        </div>

        <div className="filter-item">
          <label>From:</label>
          <DatePicker value={startDate} onChange={setStartDate} />
        </div>
        <div className="filter-item">
          <label>To:</label>
          <DatePicker value={endDate} onChange={setEndDate} />
        </div>
      </div>

      {/* Results bar removed per request */}

      {/* Workshop cards */}
      {workshops.length === 0 ? (
        <EmptyState
          title="No workshops found"
          description="Try adjusting filters or check back later for new events."
        />
      ) : (
        <div className="card-grid">
          {workshops.map((w, idx) => (
            <div key={w.id} className="card animate-in">
              <div className="media-thumb" style={{ aspectRatio: "16/9" }}>
                {(() => {
                  const thumb = w.imageUrl || assignFallbackImage(w);
                  return (
                    <img
                      src={thumb}
                      alt={w.title}
                      loading="lazy"
                      decoding="async"
                      fetchpriority={idx < 6 ? "high" : "low"}
                      width="1200"
                      height="675"
                    />
                  );
                })()}
              </div>
              <div className="card-header">
                <h2 className="title">{w.title}</h2>
                <span className="badge">{w.level}</span>
              </div>
              <p className="info">
                <strong>Date:</strong> {w.date}
              </p>
              <p className="info">
                <strong>Instructor:</strong> {w.instructor}
              </p>
              <p className="info">
                <strong>Space:</strong> {w.space}
              </p>
              <p className="info">
                <strong>Price:</strong> {w.price}
              </p>
              <div className="actions">
                <a
                  href={w.location}
                  target="_blank"
                  rel="noreferrer"
                  className="link"
                >
                  Location
                </a>
                <a href={w.link} target="_blank" rel="noreferrer" className="link">
                  Instagram
                </a>
                <button
                  className="book-workshop-btn"
                  onClick={() => alert(`Booking workshop: ${w.title} on ${w.date}`)}
                >
                  Register
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Infinite loader */}
      <div ref={loadMoreRef} />
      {appending && (
        <div className="spinner-container" style={{ height: 80 }}>
          <div className="spinner"></div>
        </div>
      )}

    </div>
  );
}

function App({ userRole, toggleRole, theme, toggleTheme }) {
  const { isSidebarOpen, closeSidebar } = useUI();
  const { isAuthenticated, role } = useAuth();
  return (
    <BrowserRouter>
      <div onClick={() => { if (isSidebarOpen) closeSidebar(); }}>
        <Sidebar userRole={userRole} />
      </div>
      <Navbar theme={theme} toggleTheme={toggleTheme} />
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/about" element={<About />} />
        {userRole === "regularUser" && (
          <>
            <Route path="/" element={<WorkshopsPage />} />
            <Route path="/create" element={isAuthenticated && role === "SPACE_OWNER" ? <CreateWorkshop /> : <LoginPage />} />
            <Route path="/spaces/:spaceId/book" element={<SlotBooking />} />
            <Route path="/user-booking" element={<UserBooking />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/spaces" element={<Spaces />} />
            <Route path="*" element={<NotFound />} />
          </>
        )}
        {userRole === "spaceOwner" && (
          <>
            <Route path="/" element={<WorkshopsPage />} />
            <Route path="/create" element={isAuthenticated && role === "SPACE_OWNER" ? <CreateWorkshop /> : <LoginPage />} />
            <Route path="/my-space" element={<MySpace />} />
            <Route path="*" element={<NotFound />} />
          </>
        )}
      </Routes>
      <BackToTop />
    </BrowserRouter>
  );
}

export default App;
