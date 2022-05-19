// import logo from './logo.svg';
import { Tabs, Tab, TabList, TabPanel } from 'react-tabs';
import './App.css';
import 'react-tabs/style/react-tabs.css';
import StatResponsiveLine from './components/line';
// import { lineDataDict } from './data/lineData';
// import axios from 'axios';
import { useEffect, useState } from 'react';

import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY
const supabase = createClient(supabaseUrl, supabaseAnonKey)

function App() {

  const structureDict = require('./data/structure_data.json')

  const [lineDataDict, setLineData] = useState({});

  // const handleUpdates = (payload) => {
  //   console.log(payload);
  // }

  // const mySubscription = supabase
  //     .from('nivo_data')
  //     .on('UPDATE', handleUpdates)
  //     .subscribe()

  // const fetchLineData = () => {
  //   axios
  //     .get("https://propagatio.onrender.com/fetch")
  //     .then((res) => setLineData(res.data))
  //     .catch((err) => console.log(err));
  // }

  useEffect(() => {
    const fetchData = async () => {
      // eslint-disable-next-line
      const { data, _ } = await supabase
        .from('nivo_data')
        .select('jsonString')
        .single()
      console.log(data.jsonString);
      setLineData(JSON.parse(data.jsonString))
    }

    fetchData()
    // make sure to catch any error
    .catch(console.error);
    
  }, [])

  return (
    <div className="App">
      {/* <button onClick={fetchLineData}>FETCH</button> */}
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
                <TabPanel key={index}>
                  <div style={{ height: "70vh", width: "75%", margin: "0 auto"}}>
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
