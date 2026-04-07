import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AboutUsPage from "./pages/AboutUsPage";
import AdminPortalPage from "./pages/AdminPortalPage";
import BlogCreatePage from "./pages/BlogCreatePage";
import BlogPage from "./pages/BlogPage";
import BlogPostPage from "./pages/BlogPostPage";
import CartPage from "./pages/CartPage";
import ContactUsPage from "./pages/ContactUsPage";
import HomePage from "./pages/HomePage";
import ProductDetailPage from "./pages/ProductDetailPage";
import ProductsPage from "./pages/ProductsPage";
import ProfilePage from "./pages/ProfilePage";
import SignInPage from "./pages/SignInPage";
import SignUpPage from "./pages/SignUpPage";
import AdminLayout from "./components/layout/AdminLayout";
import RootLayout from "./components/layout/RootLayout";
import AdminCustomersView from "./components/admin/AdminCustomersView";
import AdminProductsView from "./components/admin/AdminProductsView";
import AdminOrders from "./components/admin/AdminOrders";
import RequireAuth from "./components/auth/RequireAuth";
import RedirectIfAuthenticated from "./components/auth/RedirectIfAuthenticated";

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<RootLayout />}>
              <Route index element={<HomePage />} />
              <Route path="/products" element={<ProductsPage />} />
              <Route path="/product/:id" element={<ProductDetailPage />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/about" element={<AboutUsPage />} />
              <Route path="/blog" element={<BlogPage />} />
              <Route path="/blog/:id" element={<BlogPostPage />} />
              <Route path="/blog/create" element={<BlogCreatePage />} />
              <Route path="/contact" element={<ContactUsPage />} />
              <Route element={<RedirectIfAuthenticated />}>
                <Route path="/signin" element={<SignInPage />} />
                <Route path="/signup" element={<SignUpPage />} />
              </Route>
              <Route element={<RequireAuth />}>
                <Route path="/profile" element={<ProfilePage />} />
              </Route>
              <Route element={<RequireAuth adminOnly />}>
                <Route path="/admin" element={<AdminLayout />}>
                  <Route index element={<AdminPortalPage />} />
                  <Route path="customers" element={<AdminCustomersView />} />
                  <Route path="products" element={<AdminProductsView />} />
                  <Route path="orders" element={<AdminOrders />} />
                </Route>
              </Route>
              <Route path="*" element={<HomePage />} />
            </Route>
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
