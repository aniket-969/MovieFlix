import {useMemo} from "react"
import Home from './../Home/index';import { createBrowserRouter, RouterProvider, Route, createRoutesFromElements } from "react-router-dom";
import MovieDetails from "../MovieDetails";
import Favourites from "../Favourites";


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