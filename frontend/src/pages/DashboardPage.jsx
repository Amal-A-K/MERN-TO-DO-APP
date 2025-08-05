import { Link } from 'react-router-dom';

const DashboardPage = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ">
        <Link
          to="/lists"
          className="p-6 bg-violet-300 border rounded-lg hover:bg-violet-400 hover:text-gray-50 transition-colors "
        >
          <h2 className="text-xl font-semibold mb-2 text-gray-900">My Todo Lists</h2>
          <p>View and manage all your todo lists</p>
        </Link>
      </div>
    </div>
  );
};

export default DashboardPage;