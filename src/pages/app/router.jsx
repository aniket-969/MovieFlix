import {useMemo} from "react"
import Home from './../Home/index';import { createBrowserRouter, RouterProvider, Route, createRoutesFromElements } from "react-router-dom";
import MovieDetails from "../MovieDetails";


const AppRouter = ()=>{
    const router = useMemo(
        () =>
          createBrowserRouter(
            createRoutesFromElements(
              <>
               <Route path ="/" element={<Home/>}/>
               <Route path ="/movie/:movieId" element={<MovieDetails/>}/>
              </>
            )
          ),[]
        )
        return <RouterProvider router={router}/>
}
export default AppRouter