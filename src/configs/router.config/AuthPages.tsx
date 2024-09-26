import MyProfile from "@src/pages/MyProfile";
import DailyFeeds from "@src/pages/DailyFeeds";
import Chat from "../../pages/Chat";
import Friends from "../../pages/Friends";

const AuthPages = [
  {
    path: "/",
    element: <DailyFeeds />,
    meta: {
      layout: "vertical",
      publicRoute: false,
    },
  },
  {
    path: "/chat",
    element: <Chat />,
    meta: {
      layout: "vertical"
    },
  },
  {
    path: "/friends",
    element: <Friends />,
    meta: {
      layout: "vertical"
    },
  },
  {
    path: "/profile",
    element: <MyProfile />,
    meta: {
      layout: "vertical"
    },
  },
  {
    path: "/profile/:id",
    element: <MyProfile />,
    meta: {
      layout: "vertical"
    },
  },
];

export default AuthPages;
