import classNames from "classnames";
import { func, node, string } from "prop-types";
import { Link } from "react-router-dom";

export default function Button({ onClick, children, type, to }) {
  const className = classNames(
    "group p-4 block mx-auto my-2 rounded hover:text-white rounded-md w-11/12 border border-gray-200 text-left",
    {
      "hover:bg-red-600": type === "danger",
      "hover:bg-blue-600": type === "primary",
    }
  );
  if (to) {
    return (
      <Link className={className} to={to}>
        {children}
      </Link>
    );
  }
  return (
    <button className={className} onClick={onClick}>
      {children}
    </button>
  );
}

Button.propTypes = {
  onClick: func,
  children: node,
  type: string,
  to: string,
};
Button.defaultProps = {
  type: "primary",
};
