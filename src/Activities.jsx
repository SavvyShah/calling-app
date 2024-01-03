import React from "react";
import { useActivities } from "./useActivities";
import classNames from "classnames";
import Button from "./styled-components/Button";
import Icon from "./styled-components/Icon";
import { Link } from "react-router-dom";

const buttonIcon = "text-gray-400 group-hover:text-gray-200 me-1";

export const Activities = () => {
  const { activities, archiveActivity, resetActivities } = useActivities();
  const unarchivedActivities = activities.filter(
    (activity) => !activity.is_archived
  );
  const groupByDate = (activities) => {
    return activities.reduce((acc, activity) => {
      const date = new Date(activity.created_at).toDateString();
      if (!acc[date]) {
        acc[date] = [];
      }
      acc[date].push(activity);
      return acc;
    }, {});
  };
  const activitiesByDate = groupByDate(unarchivedActivities);
  // Newest first
  const sortedActivitiesMap = new Map(
    Object.entries(activitiesByDate).sort((a, b) => {
      return new Date(b[0]) - new Date(a[0]);
    })
  );

  return (
    <div className="flex flex-col items-center justify-center">
      <Button onClick={resetActivities} type="danger">
        <Icon name="rotate" className={buttonIcon} />
        Reset
      </Button>
      <Button>
        <Icon name="archive" className={buttonIcon} />
        View archived ({activities.length - unarchivedActivities.length})
      </Button>

      <ul className="w-full">
        {Array.from(sortedActivitiesMap).map(([date, activities]) => (
          <li key={date}>
            <h2 className="font-semibold text-center text-slate-600 text-sm mt-2">
              {date}
            </h2>
            <ul>
              {activities.map((activity) => (
                <Link key={activity.id} to={`/activities/${activity.id}`}>
                  <li className="flex items-center p-4 border-b border-gray-200 last:border-b-0 hover:bg-gray-200 cursor-pointer">
                    <Icon
                      name={
                        activity.direction === "inbound"
                          ? "arrow-down"
                          : "arrow-up"
                      }
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
                        {activity.call_type === "answered" ? "had" : "missed"} a
                        call with {activity.to || "Anonymous"}
                      </p>
                    </div>
                    <button
                      className="px-2 py-1 text-white bg-red-500 rounded hover:bg-red-600 ml-auto"
                      onClick={(e) => {
                        // Don't fire moving to activity page
                        e.preventDefault();
                        archiveActivity(activity.id);
                      }}
                    >
                      <Icon name="archive" />
                    </button>
                  </li>
                </Link>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
};
