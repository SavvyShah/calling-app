import { node } from "prop-types";
import React, { useEffect, useState } from "react";

const BASE_URL = "https://cerulean-marlin-wig.cyclic.app";

/**
 * GET - BASE_URL/activities: get calls to display in the Activity Feed
GET - BASE_URL/activities/<call_id> retrieve a specific call details
PATCH - BASE_URL/activities/<call_id> update a call. The only field updatable is is_archived (bool). You'll need to send a JSON in the request body:
{
  is_archived: true
}
PATCH - BASE_URL/reset: Reset all calls to initial state (usefull if you archived all calls).
 * */

const CTX = React.createContext();

export function ActivitiesProvider({ children }) {
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    fetch(`${BASE_URL}/activities`)
      .then((res) => res.json())
      .then((data) => setActivities(data));
  }, []);

  const archiveActivity = (id) => {
    fetch(`${BASE_URL}/activities/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ is_archived: true }),
    })
      .then((res) => res.json())
      .then(() => {
        const updatedActivities = activities.filter(
          (activity) => activity.id !== id
        );
        setActivities(updatedActivities);
      });
  };

  const resetActivities = () => {
    fetch(`${BASE_URL}/reset`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
    }).then(() => {
      fetch(`${BASE_URL}/activities`)
        .then((res) => res.json())
        .then((data) => setActivities(data));
    });
  };

  return (
    <CTX.Provider value={{ activities, archiveActivity, resetActivities }}>
      {children}
    </CTX.Provider>
  );
}

ActivitiesProvider.propTypes = {
  children: node.isRequired,
};

export function useActivities() {
  const context = React.useContext(CTX);
  if (context === undefined) {
    throw new Error("useActivities must be used within a ActivitiesProvider");
  }
  return context;
}
