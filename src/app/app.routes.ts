import { ResetpasswordComponent } from './pages/resetpassword/resetpassword/resetpassword.component';
import { Routes } from '@angular/router';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout/auth-layout.component';
import { BlankLayoutComponent } from './layouts/blank-layout/blank-layout/blank-layout.component';
import { NotfoundComponent } from './pages/notfound/notfound.component';
import { authGuard } from './core/guards/auth.guard';
import { AdminGuard } from './core/guards/guards/admin.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },

  // 🔐 Auth routes
  {
    path: '',
    component: AuthLayoutComponent,
    children: [
      {
        path: 'login',
        loadComponent: () =>
          import('./pages/login/login.component').then((m) => m.LoginComponent),
        title: 'Login',
      },
      {
        path: 'register',
        loadComponent: () =>
          import('./pages/register/register.component').then((m) => m.RegisterComponent),
        title: 'Register',
      },
       {
      path: 'forgetpassword',
      loadComponent: () =>
        import('./pages/forgetpassword/forgetpassword.component').then((m) => m.ForgetpasswordComponent),
      title: 'Forget Password',
    },
     {
      path: 'resetpassword',
      loadComponent: () =>
        import('./pages/resetpassword/resetpassword/resetpassword.component').then((m) => m.ResetpasswordComponent),
      title: 'Reset Password',
    },
    ],
  },

  // 🌐 Main app routes
  {
    path: '',
    component: BlankLayoutComponent,
    children: [
      {
        path: 'home',
        loadComponent: () =>
          import('./pages/home/home.component').then((m) => m.HomeComponent),
        title: 'Oops',
      },
      {
        path: 'cart',
        canActivate: [authGuard],
        loadComponent: () =>
          import('./pages/cart/cart.component').then((m) => m.CartComponent),
        title: 'Cart',
      },
      {
        path: 'profile',
        canActivate: [authGuard],
        loadComponent: () =>
          import('./pages/profile/profile.component').then((m) => m.ProfileComponent),
        title: 'My Profile',
      },
      {
        path: 'checkout',
        canActivate: [authGuard],
        loadComponent: () =>
          import('./pages/checkout/checkout.component').then((m) => m.CheckoutComponent),
        title: 'Checkout',
      },
      {
        path: 'products',
        loadComponent: () =>
          import('./pages/products/products.component').then((m) => m.ProductsComponent),
        title: 'Our Products',
      },
      {
        path: 'details/:id',

        loadComponent: () =>
          import('./shared/component/details/details.component').then((m) => m.DetailsComponent),
        title: 'Product Details',
      },
      {
        path: 'all-products-admin',
                canActivate: [authGuard , AdminGuard],

        loadComponent: () =>
          import('./pages/allproductadmin/allproductadmin/allproductadmin.component').then((m) => m.AllproductadminComponent),
        title: 'All Products (Admin)',
      },

      {
        path: 'updateproductadmin/:id',
          canActivate: [authGuard , AdminGuard],
        loadComponent: () =>
          import('./pages/updateproductadmin/updateproductadmin/updateproductadmin.component').then((m) => m.UpdateProductAdminComponent),
        title: 'Update Product (Admin)',
      },

      {
        path: 'orders',
        canActivate: [authGuard],
        loadComponent: () =>
          import('./pages/orders/orders.component').then((m) => m.OrdersComponent),
        title: 'My Orders',
      },
      {
        path: 'vieworderuser/:id',
                canActivate: [authGuard],

        loadComponent: () =>
          import('./pages/vieworderuser/vieworderuser/vieworderuser.component').then((m) => m.VieworderuserComponent),
        title: 'View Order (User)',
      },

      {
        path: 'add-product',
          canActivate: [authGuard , AdminGuard],
        loadComponent: () =>
          import('./pages/addproductadmin/addproductadmin/addproductadmin.component').then((m) => m.AddProductComponent),
        title: 'Add Product',
      },

      // ✅ ✅ ✅ ⬇ Add this for admin order view page
      {

        path: 'vieworderadmin/:id',
          canActivate: [authGuard , AdminGuard],
        loadComponent: () =>
          import('./pages/viewOrderAdmin/view-order-admin/view-order-admin.component').then((m) => m.ViewOrderAdminComponent),
        title: 'View Order (Admin)',
      },
      {
  path: 'dashboard',
  canActivate: [authGuard , AdminGuard ],
  loadComponent: () =>
    import('./pages/Dashboard/dashboard/dashboard.component').then((m) => m.DashboardComponent),
  title: 'Dashboard',
},

      {
        path: 'allordersadmin',
          canActivate: [authGuard , AdminGuard],
        loadComponent: () =>
          import('./pages/allordersadmin/allordersadmin/allordersadmin.component').then((m) => m.OrdersComponent),
        title: 'All Orders (Admin)',
      },

      {
  path: 'updatecategoryadmin/:id',
    canActivate: [authGuard , AdminGuard],
  loadComponent: () => import('./pages/updatecategoryAdmin/updatecategory-admin/updatecategory-admin.component').then(m => m.UpdateCategoryComponent)
},




{
  path: 'allusers',
    canActivate: [authGuard , AdminGuard],
  loadComponent: () =>
    import('./pages/allusers/allusers/allusers.component').then(
      (m) => m.UsersAdminComponent
    ),
  title: 'Users (Admin)',
}
,
{
  path: 'addcategoryadmin',
    canActivate: [authGuard , AdminGuard],
  loadComponent: () =>
    import('./pages/addcategoryAdmin/addcategory-admin/addcategory-admin.component').then(
      (m) => m.AddcategoryAdminComponent
    ),
  title: 'Add Category (Admin)',
},



      {
  path: 'allcategoriesadmin',
    canActivate: [authGuard , AdminGuard],
  loadComponent: () =>
    import('./pages/allcategoriesAdmin/allcategories-admin/allcategories-admin.component').then(
      (m) => m.CategoriesComponent
    ),
  title: 'All Categories (Admin)',
}
,
      // 🔚 fallback 404
      {
        path: '',
        component: NotfoundComponent,
        title: 'Not Found',
      },
    ],
  },
];
