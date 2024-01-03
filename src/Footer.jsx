import { Link, useLocation } from "react-router-dom";
import Icon from "./styled-components/Icon";
import classNames from "classnames";

export const Footer = () => {
  const location = useLocation();
  const currentPath = location.pathname || "/";

  return (
    <ul className="z-1 h-18 border border-gray-100 bg-white max-w-md w-full p-2 flex flex-wrap justify-around text-sm font-medium text-center">
      <li>
        <Link
          to="/"
          className={classNames("inline-block px-4 py-3 rounded-lg active", {
            "bg-green-600 text-white": currentPath === "/",
          })}
          aria-current="page"
        >
          <Icon name="phone" />
        </Link>
      </li>
      <li>
        <Link
          to="/archive"
          className={classNames("inline-block px-4 py-3 rounded-lg active", {
            "bg-green-600 text-white": currentPath === "/archive",
          })}
        >
          <Icon name="archive" />
        </Link>
      </li>
      <li>
        <a
          href="#"
          className="inline-block px-4 py-3 rounded-lg hover:text-gray-900 hover:bg-gray-100"
        >
          <Icon name="address-book" />
        </a>
      </li>
      <li>
        <a
          href="#"
          className="inline-block px-4 py-3 rounded-lg hover:text-gray-900 hover:bg-gray-100"
        >
          <Icon name="message" />
        </a>
      </li>
    </ul>
  );
};
