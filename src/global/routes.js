import { 
  HomePage,
  AboutUsPage,
  CartPage,
  CheckOutPage,
  ContactPage,
  FavoritesPage,
  GalleryPage,
  ProductPage,
  SearchPage
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
    path: "*",
    element: <HomePage/>,
  },
];