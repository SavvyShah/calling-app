import { Link } from "react-router-dom";
import Icon from "./styled-components/Icon";

export const Footer = () => {
  return (
    <ul className="z-1 h-18 border border-gray-100 bg-white max-w-md w-full p-2 flex flex-wrap justify-around text-sm font-medium text-center">
      <li>
        <Link
          to="/"
          className="inline-block px-4 py-3 text-white bg-green-600 rounded-lg active"
          aria-current="page"
        >
          <Icon name="home" />
        </Link>
      </li>
      <li>
        <a
          href="#"
          className="inline-block px-4 py-3 rounded-lg hover:text-gray-900 hover:bg-gray-100"
        >
          <Icon name="phone" />
        </a>
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
