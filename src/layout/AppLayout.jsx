import Header from "./Header";
import Sidebar from "./Sidebar"; // ✅ THIS WAS MISSING

const AppLayout = ({ children }) => {
  return (
    <div className="flex min-h-screen bg-gray-100 dark:bg-gray-900">
      <Sidebar />
      <div className="flex flex-col flex-1">
        <Header />
        <main className="p-6 text-gray-800 dark:text-gray-100">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AppLayout;
