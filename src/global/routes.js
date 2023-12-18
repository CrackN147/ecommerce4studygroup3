import { 
  HomePage,
  AboutUsPage,
  CartPage,
  CheckOutPage,
  ContactPage,
  FavoritesPage,
  GalleryPage,
  ProductPage,
  SearchPage,
  ProfilePage
} from 'pages';
export const routes = [
  {
    path: "/",
    element: <HomePage/>,
  },
  {
    path: "/:lang/",
    element: <HomePage/>,
  },
  {
    path: "/:lang/about",
    element: <AboutUsPage/>,
  },
  {
    path: "/:lang/product/:productId",
    element: <ProductPage/>,
  },
  {
    path: "/:lang/search",
    element: <SearchPage/>,
  },
  {
    path: "/:lang/profile",
    element: <ProfilePage/>,
  },
  {
    path: "/:lang/cart",
    element: <CartPage/>,
  },
  {
    path: "/:lang/checkout",
    element: <CheckOutPage/>,
  },
  {
    path: "/:lang/contact",
    element: <ContactPage/>,
  },
  {
    path: "/:lang/gallery",
    element: <GalleryPage/>,
  },
  {
    path: "/:lang/favorites",
    element: <FavoritesPage/>,
  },
  {
    path: "*",
    element: <HomePage/>,
  },
];