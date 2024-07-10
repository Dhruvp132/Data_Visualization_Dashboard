import 'bootstrap/dist/css/bootstrap.min.css';
import Dashboard from './components/Dashboard';

const App = () => {
  return (
    <div className="App">
      <h1 style={{color : "purple", padding : "20px", textAlign  : "center"}}>Interactive Data Visualization Dashboard</h1>
      <Dashboard />
    </div>
  );
};

export default App;
