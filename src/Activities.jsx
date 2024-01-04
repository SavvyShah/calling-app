import React from "react";
import { useActivities } from "./useActivities";
import classNames from "classnames";
import Button from "./styled-components/Button";
import Icon from "./styled-components/Icon";
import { Link } from "react-router-dom";
import { Transition, TransitionGroup } from "react-transition-group";

const buttonIcon = "text-gray-400 group-hover:text-gray-200 me-1";

const ARCHIVE_TRANSITION_DURATION = 300;

const defaultStyle = {
  transition: `transform ${ARCHIVE_TRANSITION_DURATION}ms ease-in-out`,
};

const archiveTransitionStyles = {
  link: {
    exiting: { backgroundColor: "crimson", display: "block" },
    exited: { backgroundColor: "crimson", display: "block" },
  },
  item: {
    exiting: { transform: "translateX(100%)", opacity: 1 },
    exited: { transform: "translateX(100%)", opacity: 0 },
  },
};

export const Activities = () => {
  const { activities, archiveActivity, resetActivities, nodeMap } =
    useActivities();
  const unarchivedActivities = activities.filter(
    (activity) => !activity.is_archived
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
  const activitiesByDate = groupByDate(unarchivedActivities);
  // Make a sorted map of newest first
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
      <Button to="/archive">
        <Icon name="archive" className={buttonIcon} />
        View archived ({activities.length - unarchivedActivities.length})
      </Button>

      <ul className="w-full">
        <TransitionGroup component={null}>
          {Array.from(sortedActivitiesMap).map(([date, sortedActivities]) => (
            // This transition serves the purpose to be on on screen when the last activity is unarchived
            <Transition
              key={date}
              nodeRef={sortedActivities.ref}
              timeout={ARCHIVE_TRANSITION_DURATION}
            >
              {(groupState) => (
                <li ref={sortedActivities.ref}>
                  <h2 className="font-semibold text-center text-slate-600 text-sm mt-2">
                    {date}
                  </h2>
                  <div style={archiveTransitionStyles.link[groupState]}>
                    <ul
                      style={{
                        ...defaultStyle,
                        ...archiveTransitionStyles.item[groupState],
                      }}
                    >
                      <TransitionGroup component={null}>
                        {sortedActivities.activities.map((activity) => {
                          return (
                            <Transition
                              key={activity.id}
                              nodeRef={nodeMap && nodeMap[activity.id]}
                              timeout={ARCHIVE_TRANSITION_DURATION}
                            >
                              {(state) => (
                                <Link
                                  style={{
                                    ...archiveTransitionStyles.link[state],
                                  }}
                                  to={`/activities/${activity.id}`}
                                  ref={nodeMap && nodeMap[activity.id]}
                                >
                                  <li
                                    style={{
                                      ...defaultStyle,
                                      ...archiveTransitionStyles.item[state],
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
      {unarchivedActivities.length === 0 ? (
        <p className="text-gray-500">No activities</p>
      ) : null}
    </div>
  );
};
