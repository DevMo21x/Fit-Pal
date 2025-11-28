import NavBar from './components/NavBar';
import Footer from './components/Footer';
import { Outlet } from 'react-router-dom';

const App = () => {
    return (
        <>
            <NavBar />
            <div id="main-content">
                <Outlet />
            </div>
            <Footer />
        </>
    );
};

export default App;
