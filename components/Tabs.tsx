import React from "react";
import Link from "next/link";

const Tabs = () => {
  return (
    <div className="space-y-5">
      <div className="border-b border-b-gray-200">
        <ul className="-mb-px flex items-center gap-4 text-sm font-medium">
          <li className="flex-1">
            <Link
              href="#"
              className="relative flex items-center justify-center gap-2 px-1 py-3 text-blue-700 after:absolute after:left-0 after:bottom-0 after:h-0.5 after:w-full after:bg-blue-700 hover:text-blue-700"
            >
              Profile
            </Link>
          </li>
          <li className="flex-1">
            <Link
              href="#"
              className="flex items-center justify-center gap-2 px-1 py-3 text-gray-500 hover:text-blue-700"
            >
              Preferences
            </Link>
          </li>
          <li className="flex-1">
            <Link
              href="#"
              className="flex items-center justify-center gap-2 px-1 py-3 text-gray-500 hover:text-blue-700"
            >
              Notifications
              <span className="rounded-full bg-gray-100 px-2 py-0.5 text-xs font-semibold text-gray-500">
                {" "}
                8{" "}
              </span>
            </Link>
          </li>
          <li className="flex-1">
            <Link
              href="#"
              className="flex items-center justify-center gap-2 px-1 py-3 text-gray-500 hover:text-blue-700"
            >
              Applications
            </Link>
          </li>
          <li className="flex-1">
            <Link
              href="#"
              className="flex items-center justify-center gap-2 px-1 py-3 text-gray-500 hover:text-blue-700"
            >
              API
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};
export default Tabs;
