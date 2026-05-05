import React from 'react'
import { Button } from '../ui/button'
import CompaniesTable from './CompaniesTable'
import { useNavigate } from 'react-router-dom'
import useGetAllCompanies from '@/hooks/useGetAllCompanies'
import Footer from '../shared/Footer'
import { Plus } from 'lucide-react'
import Navbar from '../shared/Navbar'



const Companies = () => {
    useGetAllCompanies();
    const navigate = useNavigate();

    // Use a background image similar to the home page for consistency
    const bgImage = 'https://images.unsplash.com/photo-1485083269755-a7b559a4fe5e?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8Y29uc3RydWN0aW9ufGVufDB8MHwwfHx8MA%3D%3D';

    return (
        <div className="min-h-screen flex flex-col font-[Inter] bg-black">
            <Navbar />
            <div className="flex-grow relative py-12">
                {/* Background Image with Overlay */}
                <div
                    className="fixed inset-0 w-full h-full bg-center bg-cover z-0"
                    style={{
                        backgroundImage: `url(${bgImage})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}
                ></div>
                <div className="fixed inset-0 bg-gradient-to-b from-black/80 via-black/70 to-black/90 z-0"></div>

                {/* Decorative Elements */}
                <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
                    <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_30%_20%,rgba(99,102,241,0.15),transparent_50%)]"></div>
                    <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(circle_at_70%_80%,rgba(59,130,246,0.15),transparent_50%)]"></div>
                </div>

                <div className='relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10'>
                    {/* Header Section (Glassmorphism) */}
                    <div className='flex flex-col sm:flex-row items-center justify-between gap-4 mb-8 bg-white/10 backdrop-blur-md p-6 rounded-2xl shadow-[0_0_30px_rgba(0,0,0,0.3)] border border-white/20'>
                        <div>
                            <h1 className="text-3xl font-bold tracking-tight text-white">
                                Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-blue-400">Companies</span>
                            </h1>
                            <p className="text-sm text-gray-300 mt-2">Manage and track your registered organizations.</p>
                        </div>
                        <Button 
                            onClick={() => navigate("/admin/companies/create")}
                            className="group relative flex items-center justify-center gap-2 overflow-hidden bg-white/90 hover:bg-white text-indigo-600 px-6 py-5 rounded-xl font-bold shadow-xl shadow-white/10 transition-all duration-300 pointer-events-auto cursor-pointer border border-white/40"
                        >
                            <div className="absolute inset-0 w-full h-full bg-indigo-600/10 -translate-x-full skew-x-[-15deg] group-hover:translate-x-full transition-transform duration-700 ease-out" />
                            <Plus size={18} className="relative z-10" />
                            <span className="relative z-10 whitespace-nowrap">Add New Company</span>
                        </Button>
                    </div>

                    {/* Table Section */}
                    <div className="relative">
                        <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 via-blue-500 to-purple-500 rounded-3xl blur-md opacity-30 z-0"></div>
                        <div className="relative z-10">
                            <CompaniesTable/>
                        </div>
                    </div>
                </div>
            </div>
            <Footer/>
        </div>
    )
}

export default Companies