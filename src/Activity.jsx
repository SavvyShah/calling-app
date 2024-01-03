import { useParams } from "react-router-dom";
import { useActivities } from "./useActivities";
import Icon from "./styled-components/Icon";
import classNames from "classnames";
import { AircallIcon } from "./AircallIcon";

const cardClass =
  "flex items-center p-2 border m-2 border-gray-200 w-11/12 rounded-md";

const formatSecondsToMMSS = (seconds) => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}mins ${remainingSeconds}secs`;
};

export const Activity = () => {
  const { id } = useParams();
  const { activities } = useActivities();
  const activity = activities.find((activity) => activity.id === id);
  return (
    <div className="flex flex-col items-center">
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
