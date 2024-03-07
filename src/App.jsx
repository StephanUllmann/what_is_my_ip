import { useContext } from 'react';
import './App.css';
import { IpContext } from './contexts/IpContext';
import 'leaflet/dist/leaflet.css';
import IpMap from './components/IpMap';

function App() {
  const { ipData } = useContext(IpContext);

  return (
    <div className='App'>
      {ipData && (
        <>
          <IpMap />
          <p className='ip-address'>Your IP-Address: {ipData.ip}</p>
        </>
      )}
    </div>
  );
}

export default App;
