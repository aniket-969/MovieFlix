
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../App.css'
import  AppProvider  from './provider';
import  AppRouter  from './router';

function App() {
 
  return (
    <>
   <AppProvider>
    <AppRouter/>
   </AppProvider>
    </>
  )
}

export default App
