import { FiMail } from "react-icons/fi";
import { useCurrentUser } from "../../apis/user.api";

const Header = ({ activeTab, sidebarOpen }) => {
    const { data, isFetched } = useCurrentUser();

    return (
        <header className="bg-white shadow-sm">
            <div className="px-6 py-4 flex justify-between items-center">
                <h1 className="text-xl font-semibold text-gray-800 capitalize">
                    {activeTab.replace('-', ' ')} - {data?.message}
                </h1>
                <div className="flex items-center space-x-4">
                    <div className="relative">
                        <button className="p-2 rounded-full bg-emerald-100 hover:bg-emerald-200 text-emerald-800">
                            <FiMail size={20} />
                        </button>
                        <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500"></span>
                    </div>
                    {isFetched === true && <div div className="flex items-center space-x-2">
                        <div className="h-8 w-8 rounded-full bg-emerald-600 flex items-center justify-center text-white font-semibold">
                            AD
                        </div>
                        {sidebarOpen && <span className="text-gray-700">Admin</span>}
                    </div>}
                </div>
            </div>
        </header>
    )
}

export default Header