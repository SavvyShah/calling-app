import React from "react";
import { useActivities } from "./useActivities";
import classNames from "classnames";

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
    <div className="flex flex-col items-center justify-center py-20 bg-gray-50">
      <button
        className="group p-4 block mx-auto my-2 rounded hover:bg-red-500 hover:text-white rounded-md w-11/12 border border-gray-200 text-left"
        onClick={resetActivities}
      >
        <i className="fa fa-rotate text-gray-400 group-hover:text-gray-200 me-1"></i>{" "}
        Reset
      </button>
      <ul className="w-full">
        {Array.from(sortedActivitiesMap).map(([date, activities]) => (
          <li key={date}>
            <h2 className="font-semibold text-center text-slate-600 text-sm mt-2">
              {date}
            </h2>
            <ul>
              {activities.map((activity) => (
                <li
                  key={activity.id}
                  className="flex items-center p-4 border-b border-gray-200 last:border-b-0 hover:bg-gray-200 cursor-pointer"
                >
                  {activity.direction === "inbound" ? (
                    <i
                      className={classNames(
                        {
                          "text-red-600": activity.call_type === "answered",
                          "text-green-600": activity.call_type === "missed",
                        },
                        "fa fa-arrow-down me-2"
                      )}
                    ></i>
                  ) : (
                    <i
                      className={classNames(
                        {
                          "text-red-600": activity.call_type === "answered",
                          "text-green-600": activity.call_type === "missed",
                        },
                        "fa fa-arrow-up me-2"
                      )}
                    ></i>
                  )}
                  <div>
                    <h2 className="text-md font-semibold">
                      {activity.from || "Anonymous"}
                    </h2>
                    <p className="text-sm text-slate-600">
                      had a call with {activity.to || "Anonymous"}
                    </p>
                  </div>
                  <button
                    className="px-4 py-2 text-white bg-red-500 rounded hover:bg-red-600 ml-auto"
                    onClick={() => archiveActivity(activity.id)}
                  >
                    <i className="fa fa-archive"></i>
                  </button>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
};
