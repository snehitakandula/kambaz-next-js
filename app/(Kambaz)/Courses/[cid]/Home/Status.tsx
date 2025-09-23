export default function CourseStatus() {
  return (
     <div
        style={{
          flex: 1,
          borderLeft: "1px solid #ccc",
          paddingLeft: "15px",
        }}
      >
        <h3>Course Status</h3>
        <div style={{ marginBottom: "10px" }}>
          <button>Unpublish</button>
          <button>Publish</button>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
          <button>Import Existing Content</button>
          <button>Import from Commons</button>
          <button>Choose Home Page</button>
          <button>View Course Stream</button>
          <button>New Announcement</button>
          <button>New Analytics</button>
          <button>View Course Notifications</button>
        </div>
      </div> );}