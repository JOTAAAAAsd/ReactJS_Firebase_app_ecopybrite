import { HomePage } from "../../Components/Home/HomePage";
import { LayoutPrivate, LayoutPublic } from "../../Components/Layouts";

import { DashboardPage } from "../../Components/Admin/_AdminComponents";
import { EventsPage } from "../../Components/Events/EventsPage";
import { DetailEvent } from "../../Components/Events/DetailEvent";

const COMPONENTS_pub = [HomePage, EventsPage, DetailEvent];
const COMPONENTS_priv = [DashboardPage];

const PATHS_pub = ["/", "/events", "/event/:id"];
const PATHS_priv = ["/"];

export const funcArrRoutes = (access = "") => {
    let arr = [];

    if (access === "PUBLIC" || access === "PRIVATE") {
        for (let i = 0; i < (
            (access === "PUBLIC" && COMPONENTS_pub.length) ||
            (access === "PRIVATE" && COMPONENTS_priv.length)); i++
        ) {
            arr.push({
                path: (access === "PUBLIC" && PATHS_pub[i]) ||
                    (access === "PRIVATE" && PATHS_priv[i]),

                element: (access === "PUBLIC" && COMPONENTS_pub[i]) ||
                    (access === "PRIVATE" && COMPONENTS_priv[i]),
                exact: true
            });
        }
    }
    return arr;
}


export const appConfigRoutes = [
    {
        path: "/*",
        element: LayoutPublic,
        exact: false,
        routes: funcArrRoutes("PUBLIC")
    },
    {
        path: "/admin/*",
        element: LayoutPrivate,
        exact: false,
        routes: funcArrRoutes("PRIVATE")
    }
];