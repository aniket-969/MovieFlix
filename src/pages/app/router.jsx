import {useMemo,lazy} from "react"
import Home from './../Home/index';
import { createBrowserRouter, RouterProvider, Route, createRoutesFromElements } from "react-router-dom";

const MovieDetails = lazy(() => import("../MovieDetails"));
const Favourites = lazy(() => import("../Favourites"));

const AppRouter = ()=>{
    const router = useMemo(
        () =>
          createBrowserRouter(
            createRoutesFromElements(
              <>
               <Route path ="/" element={<Home/>}/>
               <Route path ="/movie/:movieId" element={<MovieDetails/>}/>
               <Route path ="/favorites" element={<Favourites/>}/>
              </>
            )
          ),[]
        )
        return <RouterProvider router={router}/>
}
export default AppRouter