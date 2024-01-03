export const Footer = () => {
  return (
    <ul className="fixed bottom-0 border border-gray-100 bg-white max-w-md w-full p-2 flex flex-wrap justify-around text-sm font-medium text-center">
      <li>
        <a
          href="/"
          className="inline-block px-4 py-3 text-white bg-green-600 rounded-lg active"
          aria-current="page"
        >
          <i className="fa fa-home"></i>
        </a>
      </li>
      <li>
        <a
          href="#"
          className="inline-block px-4 py-3 rounded-lg hover:text-gray-900 hover:bg-gray-100"
        >
          <i className="fa fa-phone"></i>
        </a>
      </li>
      <li>
        <a
          href="#"
          className="inline-block px-4 py-3 rounded-lg hover:text-gray-900 hover:bg-gray-100"
        >
          <i className="fa fa-address-book"></i>
        </a>
      </li>
      <li>
        <a
          href="#"
          className="inline-block px-4 py-3 rounded-lg hover:text-gray-900 hover:bg-gray-100"
        >
          <i className="fa fa-message"></i>
        </a>
      </li>
    </ul>
  );
};
