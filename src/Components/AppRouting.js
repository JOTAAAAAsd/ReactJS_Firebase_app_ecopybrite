import { appConfigRoutes } from "../Helpers/config/appConfigRoutes";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";


export const AppRouting = () => {
    return (
        <Router>
            <Routes>
                {
                    appConfigRoutes.map((route, index) => (
                        <Route key={index} path={route.path} exact={route.exact}
                            element={<route.element routes={route.routes} {...route} />} />
                    ))
                }
            </Routes>
        </Router>
    );
}
