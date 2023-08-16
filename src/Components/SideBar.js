import { Link } from 'react-router-dom'
function SideBar() {
    return <ul className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion" id="accordionSidebar" style={{ paddingTop: '0.5em' }}>
        {/* <!-- Sidebar - Student-mentor Management --> */}
        <div className="sidebar-brand d-flex align-items-center justify-content-center" href="javascript(void)">
            <div className="sidebar-brand d-flex align-items-center justify-content-center">
                <div className="sidebar-brand-icon rotate-n-15">
                    <i className="fa-solid fa-people-roof"></i>
                </div>
                <div className="sidebar-brand-text mx-3">Student-mentor Management</div>
            </div>
        </div>

        {/* <!-- Divider --> */}
        <hr className="sidebar-divider my-0" />

        {/* <!-- Nav Item - Mentor Dashboard --> */}
        <li className="nav-item active">
            <Link to='/dashboard/mentor-dashboard'>
                <div className="nav-link">
                    <i className="fa-solid fa-school"></i>
                    <span>Mentor Dashboard</span>
                </div>
            </Link>
        </li>

        {/* <!-- Divider --> */}
        <hr className="sidebar-divider" />

        {/* <!-- Nav Item - Student DashBoard --> */}
        <li className="nav-item active">
            <Link to='/dashboard/student-dashboard'>
                <div className="nav-link">
                    <i className="fa-solid fa-school"></i>
                    <span>Student Dashboard</span>
                </div>
            </Link>
        </li>

        {/* <!-- Divider --> */}
        <hr className="sidebar-divider" />

        {/* <!-- Nav Item - Create Student --> */}
        <li className="nav-item active">
            <Link to='/dashboard/create-student'>
                <div className="nav-link">
                    <i className="fa-solid fa-school"></i>
                    <span>Create Student</span>
                </div>
            </Link>
        </li>

        {/* <!-- Divider --> */}
        <hr className="sidebar-divider" />

        {/* <!-- Nav Item - Create Mentor --> */}
        <li className="nav-item active">
            <Link to='/dashboard/create-mentor'>
                <div className="nav-link">
                    <i className="fa-solid fa-school"></i>
                    <span>Create Mentor</span>
                </div>
            </Link>
        </li>

        {/* <!-- Divider --> */}
        <hr className="sidebar-divider" />
    </ul>
}
export default SideBar;