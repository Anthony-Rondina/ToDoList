import '../../App.css';
import { Outlet } from 'react-router-dom';

const Layout = () => {
  return (
    <div className="layout">
      <header>
      </header>
      <main>
        <Outlet /> 
      </main>
    </div>
  );
};

export default Layout;