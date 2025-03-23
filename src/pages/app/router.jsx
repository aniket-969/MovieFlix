import {useMemo} from "react"
import Home from './../Home/index';import { createBrowserRouter, RouterProvider, Route, createRoutesFromElements } from "react-router-dom";


export const AppRouter = ()=>{
    const router = useMemo(
        () =>
          createBrowserRouter(
            createRoutesFromElements(
              <>
               <Route path ="/" element={<Home/>}/>
              </>
            )
          ),[]
        )
        return <RouterProvider router={router}/>
}