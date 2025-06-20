import { useState } from 'react';
import { FiHome, FiUsers, FiFileText, FiPieChart, FiSettings, FiLogOut, FiLoader } from 'react-icons/fi';
import { useAuth } from '../../components/AuthContext';
import Header from '../../components/Header';

const Home = () => {
    const { logout, loading } = useAuth()
    const [activeTab, setActiveTab] = useState('dashboard');
    const [sidebarOpen, setSidebarOpen] = useState(true);

    // Mock data
    const stats = [
        { title: 'Active Listings', value: '142', change: '+12%' },
        { title: 'Total Traffic', value: '8,542', change: '+7.2%' },
        { title: 'New Leads', value: '64', change: '+23%' },
        { title: 'Pending Approvals', value: '8', change: '-2' }
    ];

    const recentLeads = [
        { id: 1, name: 'John Smith', email: 'john@example.com', property: 'Beachfront Villa', date: '2023-06-15', status: 'New' },
        { id: 2, name: 'Sarah Johnson', email: 'sarah@example.com', property: 'Downtown Loft', date: '2023-06-14', status: 'Contacted' },
        { id: 3, name: 'Michael Brown', email: 'michael@example.com', property: 'Mountain Cabin', date: '2023-06-13', status: 'Interested' }
    ];

    const renderContent = () => {
        switch (activeTab) {
            case 'dashboard':
                return (
                    <div className="space-y-6">

                        {/* Stats Cards */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                            {stats.map((stat, index) => (
                                <div key={index} className="bg-white p-4 rounded-lg shadow border-l-4 border-emerald-500">
                                    <p className="text-gray-600 text-sm">{stat.title}</p>
                                    <p className="text-2xl font-bold mt-1 text-gray-800">{stat.value}</p>
                                    <p className={`text-sm mt-1 ${stat.change.startsWith('+') ? 'text-emerald-600' : 'text-red-500'}`}>
                                        {stat.change} from last week
                                    </p>
                                </div>
                            ))}
                        </div>

                        {/* Recent Leads */}
                        <div className="bg-white p-4 rounded-lg shadow">
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="text-lg font-semibold text-gray-800">Recent Leads</h3>
                                <button className="px-3 py-1 bg-emerald-600 text-white rounded-md text-sm hover:bg-emerald-700 transition">
                                    View All
                                </button>
                            </div>
                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Property</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {recentLeads.map(lead => (
                                            <tr key={lead.id} className="hover:bg-gray-50">
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="flex items-center">
                                                        <div className="flex-shrink-0 h-10 w-10 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-800 font-medium">
                                                            {lead.name.charAt(0)}
                                                        </div>
                                                        <div className="ml-4">
                                                            <div className="text-sm font-medium text-gray-900">{lead.name}</div>
                                                            <div className="text-sm text-gray-500">{lead.email}</div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{lead.property}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{lead.date}</td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${lead.status === 'New' ? 'bg-emerald-100 text-emerald-800' :
                                                        lead.status === 'Contacted' ? 'bg-blue-100 text-blue-800' :
                                                            'bg-amber-100 text-amber-800'
                                                        }`}>
                                                        {lead.status}
                                                    </span>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                );
            case 'properties':
                return <div className="bg-white p-6 rounded-lg shadow">Properties Management Content</div>;
            case 'users':
                return <div className="bg-white p-6 rounded-lg shadow">Users Management Content</div>;
            case 'content':
                return <div className="bg-white p-6 rounded-lg shadow">Content Management Content</div>;
            case 'reports':
                return <div className="bg-white p-6 rounded-lg shadow">Reports Content</div>;
            default:
                return <div className="bg-white p-6 rounded-lg shadow">Dashboard Content</div>;
        }
    };

    return (
        <div className="flex h-screen bg-gray-50">
            {/* Sidebar */}
            <div className={`${sidebarOpen ? 'w-64' : 'w-20'} bg-emerald-800 text-white transition-all duration-300 ease-in-out`}>
                <div className="p-4 flex items-center justify-between border-b border-emerald-700">
                    {sidebarOpen && <h1 className="text-xl font-bold">Propera</h1>}
                    <button
                        onClick={() => setSidebarOpen(!sidebarOpen)}
                        className="p-2 rounded-md hover:bg-emerald-700 text-emerald-200"
                    >
                        {sidebarOpen ? '←' : '→'}
                    </button>
                </div>

                <nav className="mt-6">
                    <NavItem
                        icon={<FiHome size={20} />}
                        text="Dashboard"
                        active={activeTab === 'dashboard'}
                        onClick={() => setActiveTab('dashboard')}
                        sidebarOpen={sidebarOpen}
                    />
                    <NavItem
                        icon={<FiHome size={20} />}
                        text="Properties"
                        active={activeTab === 'properties'}
                        onClick={() => setActiveTab('properties')}
                        sidebarOpen={sidebarOpen}
                    />
                    <NavItem
                        icon={<FiUsers size={20} />}
                        text="Users"
                        active={activeTab === 'users'}
                        onClick={() => setActiveTab('users')}
                        sidebarOpen={sidebarOpen}
                    />
                    <NavItem
                        icon={<FiFileText size={20} />}
                        text="Content"
                        active={activeTab === 'content'}
                        onClick={() => setActiveTab('content')}
                        sidebarOpen={sidebarOpen}
                    />
                    <NavItem
                        icon={<FiPieChart size={20} />}
                        text="Reports"
                        active={activeTab === 'reports'}
                        onClick={() => setActiveTab('reports')}
                        sidebarOpen={sidebarOpen}
                    />
                    <NavItem
                        icon={<FiSettings size={20} />}
                        text="Settings"
                        active={activeTab === 'settings'}
                        onClick={() => setActiveTab('settings')}
                        sidebarOpen={sidebarOpen}
                    />
                </nav>

                <div className="absolute bottom-0 w-full p-4  border-emerald-700">
                    <button onClick={logout} className="flex items-center space-x-2 p-2 rounded-md text-emerald-100">
                        {
                            loading
                                ? <FiLoader />
                                : <> <FiLogOut size={20} />
                                    {sidebarOpen && <span>Logout</span>}</>
                        }

                    </button>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 overflow-auto">
                {/* Header */}
                <Header {...{ activeTab, sidebarOpen }} />
                {/* Content Area */}
                <main className="p-6 bg-gray-50 min-h-[calc(100vh-120px)]">
                    {renderContent()}
                </main>

                {/* Footer */}
                <footer className="bg-white border-t px-6 py-4 border-gray-200">
                    <div className="flex items-center justify-between">
                        <p className="text-gray-500 text-sm">© 2023 Propera Admin Panel</p>
                    </div>
                </footer>
            </div>
        </div>
    );
};

// NavItem Component
const NavItem = ({ icon, text, active, onClick, sidebarOpen }) => {
    return (
        <button
            onClick={onClick}
            className={`flex items-center space-x-3 w-full p-3 rounded-md transition-colors ${active ? 'bg-emerald-700 text-white' : 'text-emerald-200 hover:bg-emerald-700 hover:text-white'
                } ${sidebarOpen ? 'mx-2' : 'mx-1 justify-center'}`}
        >
            <span>{icon}</span>
            {sidebarOpen && <span>{text}</span>}
        </button>
    );
};

export default Home;