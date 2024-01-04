import { Link, useParams } from "react-router-dom";
import { useActivities } from "./useActivities";
import Icon from "./styled-components/Icon";
import classNames from "classnames";
import { AircallIcon } from "./AircallIcon";

const cardClass =
  "flex items-center p-2 border m-2 border-gray-200 w-11/12 rounded-md";

const formatSecondsToMMSS = (seconds) => {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds - hours * 3600) / 60);
  const remainingSeconds = seconds - hours * 3600 - minutes * 60;

  let output = "";
  if (hours > 0) {
    output += `${hours}hrs `;
  }
  if (minutes > 0) {
    output += `${minutes}mins `;
  }
  if (remainingSeconds > 0) {
    output += `${remainingSeconds}secs`;
  }
  return output;
};

export const Activity = () => {
  const { id } = useParams();
  const { activities } = useActivities();
  const activity = activities.find((activity) => activity.id === id);
  return (
    <div className="flex flex-col items-center">
      <Link className="sticky top-2 left-2 self-start px-2 py-1 mb-2" to="/">
        <Icon name="arrow-left" />
      </Link>
      <div className={cardClass}>
        <Icon
          name={activity.direction === "inbound" ? "arrow-down" : "arrow-up"}
          className={classNames(
            {
              "text-red-600": activity.call_type !== "answered",
              "text-green-600": activity.call_type === "answered",
            },
            "me-2"
          )}
        />
        <div>
          <h2 className="text-md font-semibold">
            {activity.from || "Anonymous"}
          </h2>
          <p className="text-sm text-slate-600">
            {activity.call_type === "answered" ? "had" : "missed"} a call with{" "}
            {activity.to || "Anonymous"}
          </p>
        </div>
      </div>
      <div className={cardClass}>
        <AircallIcon size={50} />
        <span className="ms-2">Phone: {activity.via}</span>
      </div>
      <div className={cardClass}>
        <Icon name="clock" className="text-slate-600 me-2" />
        <span>{formatSecondsToMMSS(activity.duration)}</span>
      </div>
    </div>
  );
};
