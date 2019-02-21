import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Layout from './hoc/layout';
import Auth from './hoc/auth';
import ProductPage from './components/Product';
import Home from './components/Home';
import BodyBid from './components/utils/BuyBid';
import RegisterLogin from './components/Register_login';
import Register from './components/Register_login/register';
import Shop from './components/Shop';
import Dimensions from './components/User/Admin/Dimensions';

import UserDashboard from './components/User';
import AddProduct from './components/User/Admin/add_product';
import ManageCategories from './components/User/Admin/manage_categories';
import UserCart from './components/User/cart';
const Routes = () => {
  return(
    <Layout>
      <Switch>
        <Route path="/user/dashboard" exact component={Auth(UserDashboard,true)}/>
        <Route path="/user/payment" exact component={BodyBid}/>
        <Route path="/user/cart" exact component={Auth(UserCart,true)}/>
        <Route path="/admin/add_product" exact component={Auth(AddProduct,true)}/>
        <Route path="/admin/manage_categories" exact component={Auth(ManageCategories,true)}/>
        <Route path="/admin/add_dimensions" exact component={Auth(Dimensions,true)}/>
        <Route path="/register" exact component={Auth(Register,false)}/>
        <Route path="/product_detail/:id" exact component={Auth(ProductPage,null)}/>
        <Route path="/register_login" exact component={Auth(RegisterLogin,false)}/>
        <Route path="/shop" exact component={Auth(Shop,null)}/>
        <Route path="/" exact component={Auth(Home,null)}/>
      </Switch>
    </Layout>

  )
}

export default Routes;
