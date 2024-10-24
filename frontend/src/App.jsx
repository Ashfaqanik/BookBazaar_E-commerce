import Footer from "./components/Footer/Footer";
import Navbar from "./components/Navbar/Navbar";
import Home from "./pages/Home";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Cart from "./pages/Cart";
import Profile from "./pages/Profile";
import Favorites from "./pages/Favorites";
import OrderHistory from "./components/profile/OrderHistory";
import AboutUs from "./pages/AboutUs";
import Allbooks from "./pages/AllBooks";
import BookDetails from "./pages/BookDetails";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "./store/auth";
import { useEffect } from "react";
import AccountDetails from "./pages/AccountDetails";
import AllOrders from "./pages/AllOrders";
import AddBook from "./pages/AddBook";
import UpdateBook from "./pages/UpdateBook";
import PaymentSuccess from "./pages/PaymentSuccess";
import PaymentCancelled from "./pages/PaymentCancelled";
import { ToastContainer } from "react-toastify"; // Import ToastContainer
import "react-toastify/dist/ReactToastify.css";

function App() {
  const dispatch = useDispatch();
  const role = useSelector((state) => state.auth.role);
  useEffect(() => {
    if (
      localStorage.getItem("id") &&
      localStorage.getItem("token") &&
      localStorage.getItem("role")
    ) {
      dispatch(authActions.login());
      dispatch(authActions.changeRole(localStorage.getItem("role")));
    }
  }, []);
  return (
    <div id="root">
      <Navbar />
      <main>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/all-books" element={<Allbooks />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signUp" element={<SignUp />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/profile" element={<Profile />}>
            {role === "user" ? (
              <Route index element={<AccountDetails />} />
            ) : (
              <Route index element={<AllOrders />} />
            )}
            {role === "user" ? (
              <Route path="/profile/orderHistory" element={<OrderHistory />} />
            ) : (
              <Route path="/profile/addBook" element={<AddBook />} />
            )}
          </Route>
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/book-details/:id" element={<BookDetails />} />
          <Route path="/update-book/:id" element={<UpdateBook />} />
          <Route path="/success" element={<PaymentSuccess />} />
          <Route path="/cancelled" element={<PaymentCancelled />} />
        </Routes>
      </main>
      <Footer />
      <ToastContainer />
    </div>
  );
}

export default App;
