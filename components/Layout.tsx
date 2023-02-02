import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import Footer from "./Footer";

const Layout = ({ children }:{children:React.ReactNode}) => {
  return (
    <div className="relative  h-full w-full  no-scrollbar dark:bg-gray-600">
      <Navbar />

      <Sidebar />
      <main className="h-fit w-screen overflow-y-scroll no-scrollbar">{children}</main>

      <Footer />
    </div>
  );
};
export default Layout;
