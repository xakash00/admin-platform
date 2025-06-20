import { FiArrowRight, FiLoader, FiMail } from 'react-icons/fi';
import { useAuth } from '../../components/AuthContext';

const Login = () => {
    const { login, loading } = useAuth();

    const onSubmit = async () => {
        await login()
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <div className="mx-auto h-12 w-12 rounded-full bg-emerald-100 flex items-center justify-center">
                    <FiMail className="h-6 w-6 text-emerald-600" />
                </div>
                <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                    Sign in to your account
                </h2>
            </div>
            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                    <button onClick={onSubmit}
                        disabled={loading}
                        className="w-full flex justify-center items-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
                    >{
                            loading ? <FiLoader /> : <>Sign in <FiArrowRight className="ml-2" /></>
                        }

                    </button>
                </div>
            </div>
        </div>
    );
};

export default Login;