import NavBar from './Basic_Web3_App/NavBar';
import Welcome from './Basic_Web3_App/Welcome';
import Services from './Basic_Web3_App/Services';
import Footer from './Basic_Web3_App/Footer';
import Transactions from './Basic_Web3_App/Transactions';

function App() {
  return (
    <div className='min-h-screen'>
      <div className='gradient-bg-welcome'>
        <NavBar />
        <Welcome />
      </div>
      <Services />
      <Transactions />
      <Footer />
    </div>
  );
}

export default App;
