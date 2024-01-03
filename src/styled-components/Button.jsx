import classNames from "classnames";
import { func, node, string } from "prop-types";

export default function Button({ onClick, children, type }) {
  return (
    <button
      className={classNames(
        "group p-4 block mx-auto my-2 rounded hover:text-white rounded-md w-11/12 border border-gray-200 text-left",
        {
          "hover:bg-red-600": type === "danger",
          "hover:bg-blue-600": type === "primary",
        }
      )}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

Button.propTypes = {
  onClick: func,
  children: node,
  type: string,
};
Button.defaultProps = {
  type: "primary",
};
