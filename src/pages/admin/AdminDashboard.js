import React from 'react';
import Layout from '../../components/layout/Layout';
import Card from '../../components/shared/Card';
import Button from '../../components/shared/Button';
import { 
  Chart as ChartJS, 
  CategoryScale, 
  LinearScale, 
  PointElement, 
  LineElement, 
  BarElement, 
  ArcElement, 
  Title, 
  Tooltip, 
  Legend 
} from 'chart.js';
import { Line, Bar, Pie } from 'react-chartjs-2';
import { FaUserGraduate, FaBuilding, FaClipboardList, FaFileAlt, FaHandshake, FaExclamationCircle, FaBell, FaCheckCircle, FaPlusCircle } from 'react-icons/fa';
import activitiesData from '../../data/activities.json';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const AdminDashboard = () => {
  const currentDate = new Date().toLocaleDateString('en-US', { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });

  // Chart Data
  const lineData = {
    labels: ['Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb'],
    datasets: [
      {
        label: 'Number of Applications',
        data: [12, 18, 25, 31, 28, 42],
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'rgba(59, 130, 246, 0.5)',
        tension: 0.3,
      },
    ],
  };

  const barData = {
    labels: ['Technology', 'Finance', 'Healthcare', 'Manufacturing', 'Media'],
    datasets: [
      {
        label: 'Internships',
        data: [45, 32, 28, 18, 12],
        backgroundColor: [
          'rgba(59, 130, 246, 0.8)',
          'rgba(16, 185, 129, 0.8)',
          'rgba(245, 158, 11, 0.8)',
          'rgba(239, 68, 68, 0.8)',
          'rgba(139, 92, 246, 0.8)',
        ],
      },
    ],
  };

  const pieData = {
    labels: ['Submitted', 'Under Review', 'Accepted', 'Rejected'],
    datasets: [
      {
        data: [45, 38, 34, 39],
        backgroundColor: [
          '#3B82F6', // Blue
          '#F59E0B', // Yellow
          '#10B981', // Green
          '#EF4444', // Red
        ],
        borderWidth: 1,
      },
    ],
  };

  const getActivityIcon = (type) => {
    switch(type) {
      case 'application': return <FaFileAlt className="text-blue-500" />;
      case 'company': return <FaBuilding className="text-purple-500" />;
      case 'listing': return <FaPlusCircle className="text-green-500" />;
      case 'approval': return <FaCheckCircle className="text-indigo-500" />;
      case 'hired': return <FaHandshake className="text-green-600" />;
      default: return <FaBell className="text-gray-400" />;
    }
  };

  return (
    <Layout role="admin">
      <div className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-500">As of {currentDate}</p>
        </div>
        <Button size="sm" variant="secondary" className="flex items-center">
          <FaBell className="mr-2" /> Notifications
        </Button>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {/* Row 1 */}
        <Card className="flex items-center p-4">
          <div className="p-3 rounded-full bg-blue-100 text-blue-600 mr-4">
            <FaUserGraduate size={24} />
          </div>
          <div>
            <p className="text-xs font-bold text-gray-500 uppercase">Total Students</p>
            <p className="text-2xl font-bold text-gray-900">87</p>
            <p className="text-xs text-green-600 font-semibold">↑ 12 this month</p>
          </div>
        </Card>

        <Card className="flex items-center p-4">
          <div className="p-3 rounded-full bg-purple-100 text-purple-600 mr-4">
            <FaBuilding size={24} />
          </div>
          <div>
            <p className="text-xs font-bold text-gray-500 uppercase">Total Companies</p>
            <p className="text-2xl font-bold text-gray-900">12</p>
            <p className="text-xs text-green-600 font-semibold">↑ 2 this month</p>
          </div>
        </Card>

        <Card className="flex items-center p-4">
          <div className="p-3 rounded-full bg-green-100 text-green-600 mr-4">
            <FaClipboardList size={24} />
          </div>
          <div>
            <p className="text-xs font-bold text-gray-500 uppercase">Active Listings</p>
            <p className="text-2xl font-bold text-gray-900">23</p>
            <p className="text-xs text-yellow-600 font-semibold">6 expiring soon</p>
          </div>
        </Card>

        {/* Row 2 */}
        <Card className="flex items-center p-4">
          <div className="p-3 rounded-full bg-indigo-100 text-indigo-600 mr-4">
            <FaFileAlt size={24} />
          </div>
          <div>
            <p className="text-xs font-bold text-gray-500 uppercase">Total Applications</p>
            <p className="text-2xl font-bold text-gray-900">156</p>
            <p className="text-xs text-green-600 font-semibold">↑ 34 this month</p>
          </div>
        </Card>

        <Card className="flex items-center p-4">
          <div className="p-3 rounded-full bg-teal-100 text-teal-600 mr-4">
            <FaHandshake size={24} />
          </div>
          <div>
            <p className="text-xs font-bold text-gray-500 uppercase">Successful Placements</p>
            <p className="text-2xl font-bold text-gray-900">34</p>
            <p className="text-xs text-blue-600 font-semibold">Overall success rate: 22%</p>
          </div>
        </Card>

        <Card className="flex items-center p-4 border-2 border-red-100">
          <div className="p-3 rounded-full bg-red-100 text-red-600 mr-4">
            <FaExclamationCircle size={24} />
          </div>
          <div>
            <p className="text-xs font-bold text-gray-500 uppercase">Pending Approvals</p>
            <div className="flex items-center">
              <p className="text-2xl font-bold text-gray-900">8</p>
              <span className="ml-2 px-2 py-0.5 bg-red-500 text-white text-[10px] rounded-full font-bold animate-pulse">ACTION REQUIRED</span>
            </div>
            <p className="text-xs text-gray-500">Listings and Company accounts</p>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Charts Column */}
        <div className="lg:col-span-2 space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card title="Applications per Month">
              <div className="h-64">
                <Line data={lineData} options={{ maintainAspectRatio: false }} />
              </div>
            </Card>
            <Card title="Top Industries">
              <div className="h-64">
                <Bar data={barData} options={{ maintainAspectRatio: false }} />
              </div>
            </Card>
          </div>
          <Card title="Application Status Distribution">
            <div className="h-64 flex justify-center">
              <div className="w-1/2">
                <Pie data={pieData} options={{ maintainAspectRatio: false }} />
              </div>
            </div>
          </Card>
        </div>

        {/* Recent Activity Feed */}
        <div className="lg:col-span-1">
          <Card title="Recent Activity" className="h-full">
            <div className="flow-root">
              <ul className="-mb-8">
                {activitiesData.map((activity, idx) => (
                  <li key={activity.id}>
                    <div className="relative pb-8">
                      {idx !== activitiesData.length - 1 && (
                        <span className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200" aria-hidden="true"></span>
                      )}
                      <div className="relative flex space-x-3">
                        <div>
                          <span className="h-8 w-8 rounded-full bg-gray-50 flex items-center justify-center ring-8 ring-white">
                            {getActivityIcon(activity.type)}
                          </span>
                        </div>
                        <div className="min-w-0 flex-1 pt-1.5 flex justify-between space-x-4">
                          <div>
                            <p className="text-sm text-gray-800">{activity.description}</p>
                          </div>
                          <div className="text-right text-xs whitespace-nowrap text-gray-500">
                            {/* In real app use date-fns/dayjs for relative time */}
                            {idx < 3 ? 'Just now' : idx < 6 ? '2h ago' : '1d ago'}
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            <div className="mt-6">
              <button className="w-full flex justify-center items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                View All Activity
              </button>
            </div>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default AdminDashboard;