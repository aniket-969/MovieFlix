
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import Home from './pages/Home/Home';

function App() {
 
  return (
    <>
    <Routes>
      <Route index element = {<Home/>}/>
      <Route path={"/movie/:id"} />
      <Route path={"/favourites"} />
      <Route path={"/search"} />
      
    </Routes>
    </>
  )
}

export default App
