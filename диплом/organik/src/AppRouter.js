import { Routes, Route } from 'react-router-dom';
import React from 'react';
import { About } from "./pages/About";
import { Blog } from "./pages/Blog";
import { Cart } from "./pages/Cart";
import { Home } from "./pages/HomePage";
import { Shop } from "./pages/Shop";
import { ShopSingle } from "./pages/ShopSingle";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { Order } from "./pages/Order";
import { User } from "./pages/User.jsx";
// import { Admin } from "./pages/Admin.jsx";
import { UserOrder } from './pages/UserOrder.jsx';
import { UserOrders } from './pages/UserOrders.jsx';
import { AppContext } from './AppContext.js';
import { observer } from 'mobx-react-lite';
import { BlogSingle } from './pages/BlogSingle.jsx';
import { TeamSingle } from './pages/TeamSingle.jsx';
import { AdminOrder } from './pages/AdminOrder.jsx';
import { AdminOrders } from './pages/AdminOrders.jsx';
import { AdminCategories } from './pages/AdminCategories.jsx';
import { AdminProducts } from './pages/AdminProducts.jsx';
import { Team } from './pages/Team.jsx';
import { Search } from './pages/Search.jsx';


const publicRoutes = [
    {path: '/', Component: Home},
    {path: '/login', Component: Login},
    {path: '/registration', Component: Register},
    {path: '/about', Component: About},
    {path: '/blog', Component: Blog},
    {path: '/team', Component: Team},
    {path: '/shop', Component: Shop},
    {path: '/product/:id', Component: ShopSingle},
    {path: '/checkout', Component: Order},
    {path: '/basket', Component: Cart},
    {path: '/blog/:id', Component: BlogSingle},
    {path: '/team/:id', Component: TeamSingle},
    {path: '/search', Component: Search},
]

const authRoutes = [
    {path: '/user/:id', Component: User},
    {path: '/user/orders', Component: UserOrders},
    {path: '/user/order/:id', Component: UserOrder},   
]

const adminRoutes = [
    {path: '/admin/:id', Component: AdminOrders},
    {path: '/admin/orders', Component: AdminOrders},
    {path: '/admin/order/:id', Component: AdminOrder},
    {path: '/admin/categories', Component: AdminCategories},
    {path: '/admin/products', Component: AdminProducts},
]

const AppRouter = observer(() => {
    const { user } = React.useContext(AppContext)
    return (
        <Routes>
            {publicRoutes.map(({path, Component}) =>
                <Route key={path} path={path} element={<Component />} />
            )}
            {user.isAuth && authRoutes.map(({path, Component}) =>
                <Route key={path} path={path} element={<Component />} />
            )}
            {user.isAdmin && adminRoutes.map(({path, Component}) =>
                <Route key={path} path={path} element={<Component />} />
            )}
        </Routes>
    )
})

export default AppRouter