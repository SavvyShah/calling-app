import classNames from "classnames";
import { string } from "prop-types";

export default function Icon({ name, className, ...restProps }) {
  return (
    <i className={classNames(`fa fa-${name}`, className)} {...restProps}></i>
  );
}

Icon.propTypes = {
  name: string.isRequired,
  className: string,
};
