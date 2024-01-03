import React from "react";
import { useActivities } from "./useActivities";
import classNames from "classnames";
import Icon from "./styled-components/Icon";
import { Link } from "react-router-dom";

export const Archive = () => {
  const { activities, unarchiveActivity } = useActivities();
  const archivedActivities = activities.filter(
    (activity) => activity.is_archived
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
  const activitiesByDate = groupByDate(archivedActivities);
  // Newest first
  const sortedActivitiesMap = new Map(
    Object.entries(activitiesByDate).sort((a, b) => {
      return new Date(b[0]) - new Date(a[0]);
    })
  );

  return (
    <div className="flex flex-col items-center justify-center">
      <Link
        className="sticky top-2 left-2 bg-white self-start px-2 py-1"
        to="/"
      >
        <Icon name="arrow-left" />
      </Link>

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
                      className="px-2 py-1 text-white bg-blue-500 rounded hover:bg-blue-600 ml-auto"
                      onClick={(e) => {
                        // Don't fire moving to activity page
                        e.preventDefault();
                        unarchiveActivity(activity.id);
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
      {archivedActivities.length === 0 ? (
        <p className="text-gray-500">No archived activities</p>
      ) : null}
    </div>
  );
};
