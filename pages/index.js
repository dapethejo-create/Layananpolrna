import Header from '../components/Header'
import Navbar from '../components/Navbar'
import History from '../components/History'

export default function Home() {
  return (
    <div className="bg-gray-100 min-h-screen">
      <Header />
      <Navbar />
      <main className="max-w-4xl mx-auto p-4">
        <h2 className="text-xl font-bold text-blue-800 mb-4">History Pengajuan</h2>
        <History />
      </main>
    </div>
  )
}