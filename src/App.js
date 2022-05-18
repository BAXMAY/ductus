// import logo from './logo.svg';
import { Tabs, Tab, TabList, TabPanel } from 'react-tabs';
import './App.css';
import 'react-tabs/style/react-tabs.css';
import StatResponsiveLine from './components/line';
// import { lineDataDict } from './data/lineData';
import axios from 'axios';
import { useEffect, useState } from 'react';

function App() {

  const structureDict = require('./data/structure_data.json')

  const [lineDataDict, setLineData] = useState({});

  const fetchLineData = () => {
    axios
      .get("https://propagatio.onrender.com/fetch")
      .then((res) => setLineData(res.data))
      .catch((err) => console.log(err));
  }

  useEffect(() => {
    fetchLineData()
  }, [])

  return (
    <div className="App">
      <button onClick={fetchLineData()}>FETCH</button>
      <Tabs style={{ marginTop: '50px' }}>
        <TabList>
        {
          Object.keys(lineDataDict).map((key, index) => {
            let bgColor = 'lightblue'
            if (structureDict.RP.includes(key)) bgColor = 'yellow'
            else if (structureDict.SDL.includes(key)) bgColor = 'orange'
            else if (structureDict.UL.includes(key)) bgColor = 'pink'
            return (<Tab style={{ backgroundColor: bgColor }} key={index}>{key.replaceAll('_', ' ')}</Tab>)
          })
        }
        </TabList>

        {
          Object.entries(lineDataDict).map(
            ([key, value], index) => {
              return (
                <TabPanel>
                  <div style={{ height: "70vh", width: "75%", margin: "0 auto"}} key={index}>
                    <h2 style={{ textAlign: 'center' }} >{key.replaceAll('_', ' ')}</h2>
                    <StatResponsiveLine data={value}/>
                    <hr/>
                  </div>
                </TabPanel>
              )
            }
          )
        }
        

        
      </Tabs>
      
    </div>
  );
}

export default App;
