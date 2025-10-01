
import { FaBan, FaCheckCircle, FaFileImport, FaCloudDownloadAlt, FaHome, FaStream, FaBullhorn, FaChartBar, FaBell } from "react-icons/fa";


export default function CourseStatus() {
  return (
     <div
        style={{
          flex: 1,
          borderLeft: "1px solid #ccc",
          paddingLeft: "15px",
        }}
      >
        <div style={{ flex: 1 }}>
  <div className="border p-3 bg-light">
    <h5>Course Status</h5>
    <div className="d-flex gap-2 mb-3">
      <button className="btn btn-secondary">
        <FaBan className="me-1" /> Unpublish
      </button>
      <button className="btn btn-success">
        <FaCheckCircle className="me-1" /> Publish
      </button>
    </div>
    <div className="d-grid gap-2">
      <button className="btn btn-light border d-flex align-items-center justify-content-start">
        <FaFileImport className="me-2" /> Import Existing Content
      </button>
      <button className="btn btn-light border d-flex align-items-center justify-content-start">
        <FaCloudDownloadAlt className="me-2" /> Import from Commons
      </button>
      <button className="btn btn-light border d-flex align-items-center justify-content-start">
        <FaHome className="me-2" /> Choose Home Page
      </button>
      <button className="btn btn-light border d-flex align-items-center justify-content-start">
        <FaStream className="me-2" /> View Course Stream
      </button>
      <button className="btn btn-light border d-flex align-items-center justify-content-start">
        <FaBullhorn className="me-2" /> New Announcement
      </button>
      <button className="btn btn-light border d-flex align-items-center justify-content-start">
        <FaChartBar className="me-2" /> New Analytics
      </button>
      <button className="btn btn-light border d-flex align-items-center justify-content-start">
        <FaBell className="me-2" /> View Course Notifications
      </button>
    </div>
  </div>
</div>

      </div> );}