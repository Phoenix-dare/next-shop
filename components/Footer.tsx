import React from "react";

const Footer = () => {
  return (
    <footer className="flex flex-row w-screen flex-wrap bg-indigo-500 text-white pt-2 py-2  h-1/6 relative inset-x-0 -bottom-20 border-t-2 border-gray-800 dark:bg-gray-800 dark:border-t-2 dark:border-slate-400">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap">
          <div className="w-full md:w-6/12 px-4">
            <h4 className="text-xl font-semibold">Let's keep in touch!</h4>
            <h5 className="text-lg mt-0 mb-2">
              Find us on any of these platforms, we respond 1-2 business days.
            </h5>
            <div className="mt-6">
              <button className="bg-white text-indigo-500 rounded-full p-2 hover:bg-indigo-500 hover:text-white mr-4">
                <i className="fab fa-twitter"></i>
              </button>
              <button className="bg-white text-indigo-500 rounded-full p-2 hover:bg-indigo-500 hover:text-white mr-4">
                <i className="fab fa-facebook-square"></i>
              </button>
              <button className="bg-white text-indigo-500 rounded-full p-2 hover:bg-indigo-500 hover:text-white">
                <i className="fab fa-instagram"></i>
              </button>
            </div>
          </div>
          <div className="w-full md:w-6/12 px-4">
            <h4 className="text-xl font-semibold">Useful Links</h4>
            <ul />
            <div className="mt-6">
              <ul className="list-unstyled">
                <li className="mb-2">
                  <a href="#" className="text-white hover:text-indigo-500">
                    About Us
                  </a>
                </li>
                <li className="mb-2">
                  <a href="#" className="text-white hover:text-indigo-500">
                    Blog
                  </a>
                </li>
                <li className="mb-2">
                  <a href="#" className="text-white hover:text-indigo-500">
                    Github
                  </a>
                </li>
                <li className="mb-2">
                  <a href="#" className="text-white hover:text-indigo-500">
                    Free Products
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="border-t border-indigo-500 py-4">
          <div className="text-center text-sm">
            Copyright &copy; {new Date().getFullYear()} Your Company - All
            rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
