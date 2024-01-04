import React from "react";
import { useActivities } from "./useActivities";
import classNames from "classnames";
import Icon from "./styled-components/Icon";
import { Link } from "react-router-dom";
import { Transition, TransitionGroup } from "react-transition-group";

const UNARCHIVE_TRANSITION_DURATION = 300;

const defaultStyle = {
  transition: `transform ${UNARCHIVE_TRANSITION_DURATION}ms ease-in-out`,
};

const unarchiveTransitionStyles = {
  link: {
    exiting: { backgroundColor: "skyblue", display: "block" },
    exited: { backgroundColor: "skyblue", display: "block" },
  },
  item: {
    exiting: { transform: "translateX(-100%)", opacity: 1 },
    exited: { transform: "translateX(-100%)", opacity: 0 },
  },
};

export const Archive = () => {
  const { activities, unarchiveActivity, nodeMap } = useActivities();
  const archivedActivities = activities.filter(
    (activity) => activity.is_archived
  );
  const groupByDate = (activities) => {
    return activities.reduce((acc, activity) => {
      const date = new Date(activity.created_at).toDateString();
      if (!acc[date]) {
        acc[date] = { activities: [], ref: React.createRef(null) };
      }
      acc[date].activities.push(activity);
      return acc;
    }, {});
  };
  const activitiesByDate = groupByDate(archivedActivities);
  // Make a sorted map of newest first
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
        <TransitionGroup component={null}>
          {Array.from(sortedActivitiesMap).map(([date, sortedActivities]) => (
            // This transition serves the purpose to be on on screen when the last activity is unarchived
            <Transition
              key={date}
              nodeRef={sortedActivities.ref}
              timeout={UNARCHIVE_TRANSITION_DURATION}
            >
              {(groupState) => (
                <li ref={sortedActivities.ref}>
                  <h2 className="font-semibold text-center text-slate-600 text-sm mt-2">
                    {date}
                  </h2>
                  <div style={unarchiveTransitionStyles.link[groupState]}>
                    <ul
                      style={{
                        ...defaultStyle,
                        ...unarchiveTransitionStyles.item[groupState],
                      }}
                    >
                      <TransitionGroup component={null}>
                        {sortedActivities.activities.map((activity) => {
                          return (
                            <Transition
                              key={activity.id}
                              nodeRef={nodeMap && nodeMap[activity.id]}
                              timeout={UNARCHIVE_TRANSITION_DURATION}
                            >
                              {(state) => (
                                <Link
                                  style={{
                                    ...unarchiveTransitionStyles.link[state],
                                  }}
                                  to={`/activities/${activity.id}`}
                                  ref={nodeMap && nodeMap[activity.id]}
                                >
                                  <li
                                    style={{
                                      ...defaultStyle,
                                      ...unarchiveTransitionStyles.item[state],
                                    }}
                                    className="flex items-center p-4 border-b border-gray-200 last:border-b-0 hover:bg-gray-200 cursor-pointer"
                                  >
                                    <Icon
                                      name={
                                        activity.direction === "inbound"
                                          ? "arrow-down"
                                          : "arrow-up"
                                      }
                                      className={classNames(
                                        {
                                          "text-red-600":
                                            activity.call_type !== "answered",
                                          "text-green-600":
                                            activity.call_type === "answered",
                                        },
                                        "me-2"
                                      )}
                                    />
                                    <div>
                                      <h2 className="text-md font-semibold">
                                        {activity.from || "Anonymous"}
                                      </h2>
                                      <p className="text-sm text-slate-600">
                                        {activity.call_type === "answered"
                                          ? "had"
                                          : "missed"}{" "}
                                        a call with {activity.to || "Anonymous"}
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
                              )}
                            </Transition>
                          );
                        })}
                      </TransitionGroup>
                    </ul>
                  </div>
                </li>
              )}
            </Transition>
          ))}
        </TransitionGroup>
      </ul>
      {archivedActivities.length === 0 ? (
        <p className="text-gray-500">No archived activities</p>
      ) : null}
    </div>
  );
};
