import Link from "next/link";
import Image from "next/image";
export default function Dashboard() {
  return (
    <div id="wd-dashboard">
      <h1 id="wd-dashboard-title">Dashboard</h1> <hr />
      <h2 id="wd-dashboard-published">Published Courses (12)</h2> <hr />
      <div id="wd-dashboard-courses">
        <div className="wd-dashboard-course">
          <Link href="/Courses/1234" className="wd-dashboard-course-link">
            <Image src="/images/reactjs.jpg" width={200} height={150} alt="ReactJS course thumbnail"/>
            <div>
              <h5> CS1234 React JS </h5>
              <p className="wd-dashboard-course-title">
                Full Stack software developer
              </p>
              <button> Go </button>
            </div>
          </Link>
        </div>
        <div className="wd-dashboard-course">
          <Link href="/Courses/1235" className="wd-dashboard-course-link">
            <Image src="/images/dbms.jpg" width={200} height={150} alt="DBMS course thumbnail"/>
            <div>
              <h5> CS1235 DBMS </h5>
              <p className="wd-dashboard-course-title">
                Database Management Systems
              </p>
              <button> Go </button>
            </div>
          </Link>
        </div>
        <div className="wd-dashboard-course">
          <Link href="/Courses/1236" className="wd-dashboard-course-link">
            <Image src="/images/pdp.jpg" width={200} height={150} alt="PDP course thumbnail"/>
            <div>
              <h5> CS1236 PDP </h5>
              <p className="wd-dashboard-course-title">
                Software Architecture & Patterns
              </p>
              <button> Go </button>
            </div>
          </Link>
        </div>
        <div className="wd-dashboard-course">
          <Link href="/Courses/1237" className="wd-dashboard-course-link">
            <Image src="/images/algorithms.jpg" width={200} height={150} alt="Algorithms course thumbnail"/>
            <div>
              <h5> CS1237 Algorithms </h5>
              <p className="wd-dashboard-course-title">
                Problem Solving & Optimization
              </p>
              <button> Go </button>
            </div>
          </Link>
        </div>
        <div className="wd-dashboard-course">
          <Link href="/Courses/1238" className="wd-dashboard-course-link">
            <Image src="/images/webdev.jpg" width={200} height={150} alt="WebDevelopment course thumbnail"/>
            <div>
              <h5> CS1238 Web Development </h5>
              <p className="wd-dashboard-course-title">
                Front-End & Back-End Engineering
              </p>
              <button> Go </button>
            </div>
          </Link>
        </div>
        <div className="wd-dashboard-course">
          <Link href="/Courses/1239" className="wd-dashboard-course-link">
            <Image src="/images/hci.jpg" width={200} height={150} alt="HCI course thumbnail"/>
            <div>
              <h5> CS1239 HCI </h5>
              <p className="wd-dashboard-course-title">
                User Experience & Interface Design
              </p>
              <button> Go </button>
            </div>
          </Link>
        </div>
        <div className="wd-dashboard-course">
          <Link href="/Courses/1233" className="wd-dashboard-course-link">
            <Image src="/images/nodejs.png" width={200} height={150} alt="Nodejs course thumbnail"/>
            <div>
              <h5> CS1233 Node JS </h5>
              <p className="wd-dashboard-course-title">
                Server-Side JavaScript Development
              </p>
              <button> Go </button>
            </div>
          </Link>
        </div>
      </div>
    </div>
);}
