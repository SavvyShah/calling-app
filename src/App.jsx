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
import { Activity } from "./Activity";
import { Archive } from "./Archive";

const routes = [
  {
    name: "Home",
    path: "/",
    element: <Activities />,
    nodeRef: React.createRef(),
  },
  {
    name: "Activity",
    path: "/activities/:id",
    element: <Activity />,
    nodeRef: React.createRef(),
  },
  {
    name: "Archive",
    path: "/archive",
    element: <Archive />,
    nodeRef: React.createRef(),
  },
];

const ROUTE_TRANSITION_DURATION = 200;

const defaultStyle = {
  transition: `transform ${ROUTE_TRANSITION_DURATION}ms ease-in-out`,
};
const transitionStyles = {
  // Default route would enter from the left and exit to the left
  Home: {
    entering: { transform: "translateX(-100%)", opacity: 0 },
    entered: { transform: "translateX(0%)", opacity: 1 },
    exiting: { transform: "translateX(-100%)", opacity: 1 },
    exited: { transform: "translateX(-100%)", opacity: 0 },
  },
  // Activity route would enter from the right and exit to the right
  Activity: {
    entering: { transform: "translateX(100%)", opacity: 0 },
    entered: { transform: "translateX(0%)", opacity: 1 },
    exiting: { transform: "translateX(100%)", opacity: 1 },
    exited: { transform: "translateX(100%)", opacity: 0 },
  },
  Archive: {
    entering: { transform: "translateX(100%)", opacity: 0 },
    entered: { transform: "translateX(0%)", opacity: 1 },
    exiting: { transform: "translateX(100%)", opacity: 1 },
    exited: { transform: "translateX(100%)", opacity: 0 },
  },
};

const App = () => {
  const location = useLocation();
  const currentOutlet = useOutlet();
  const { id } = useParams();
  // When location.pathname is empty, we are at the root of the app
  const currentPath = location.pathname || "/";
  const { nodeRef, name } =
    routes.find((route) => route.path.replace(":id", id) === currentPath) ?? {};

  return (
    <div className="max-w-md h-screen mx-auto border border-slate-100 flex flex-col overflow-hidden">
      <Navbar />
      <div className="bg-gray-50 w-md h-full overflow-y-auto overflow-x-hidden">
        <SwitchTransition mode="out-in">
          <Transition
            key={location.pathname}
            nodeRef={nodeRef}
            timeout={ROUTE_TRANSITION_DURATION}
          >
            {(state) => (
              <div
                style={{ ...defaultStyle, ...transitionStyles[name][state] }}
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
