import React from "react";
import {
  RouterProvider,
  createBrowserRouter,
  useLocation,
  useOutlet,
  useParams,
} from "react-router-dom";
import { ActivitiesProvider } from "./useActivities";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { Activities } from "./Activities";
import { SwitchTransition, Transition } from "react-transition-group";

const Activity = () => {
  return (
    <div className="flex flex-col items-center">
      <h1>Activity</h1>
    </div>
  );
};

const routes = [
  {
    name: "Home",
    path: "/",
    element: <Activities />,
    nodeRef: React.createRef(),
  },
  {
    name: "Activities",
    path: "/activities",
    element: <Activities />,
    nodeRef: React.createRef(),
  },
  {
    name: "Activity",
    path: "/activities/:id",
    element: <Activity />,
    nodeRef: React.createRef(),
  },
];

const ROUTE_TRANSITION_DURATION = 1000;

const defaultStyle = {
  transition: `opacity ${ROUTE_TRANSITION_DURATION}ms ease-in-out`,
  opacity: 0,
};
const transitionStyles = {
  entering: { opacity: 0 },
  entered: { opacity: 1 },
  exiting: { opacity: 0 },
  exited: { opacity: 0 },
};

const App = () => {
  const location = useLocation();
  const currentOutlet = useOutlet();
  const { id } = useParams();
  const { nodeRef } =
    routes.find(
      (route) => route.path.replace(":id", id) === (location.pathname || "/")
    ) ?? {};

  return (
    <div className="max-w-md h-screen mx-auto border border-slate-100 flex flex-col">
      <Navbar />
      <div className="bg-gray-50 max-w-md w-full h-full overflow-auto">
        <SwitchTransition>
          <Transition
            key={location.pathname}
            nodeRef={nodeRef}
            timeout={ROUTE_TRANSITION_DURATION}
          >
            {(state) => (
              <div
                style={{ ...defaultStyle, ...transitionStyles[state] }}
                ref={nodeRef}
              >
                {currentOutlet}
              </div>
            )}
          </Transition>
        </SwitchTransition>
      </div>
      <Footer />
    </div>
  );
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: routes.map((route) => ({
      index: route.path === "/",
      path: route.path === "/" ? undefined : route.path,
      element: route.element,
    })),
  },
]);

const Root = () => {
  return (
    <ActivitiesProvider>
      <RouterProvider router={router}>
        <App />
      </RouterProvider>
    </ActivitiesProvider>
  );
};

export default Root;
