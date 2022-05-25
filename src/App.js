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

  const [year, setYear] = useState();

  const [month, setMonth] = useState();

  // const handleUpdates = (payload) => {
  //   console.log(payload);
  // }

  // const mySubscription = supabase
  //     .from('nivo_data')
  //     .on('UPDATE', handleUpdates)
  //     .subscribe()

  const fetchData = async () => {
    // eslint-disable-next-line
    const { data, _ } = await supabase
      .from('nivo_data')
      .select('jsonString')
      .eq("year", year)
      .eq("month", month)
      .single()
    console.log(data.jsonString);
    setLineData(JSON.parse(data.jsonString))
    setYear(year);
    setMonth(month);
  }

  const fetchLineData = () => {

    fetchData()
    // make sure to catch any error
    .catch(console.error);
  }

  useEffect(() => {

    const today = new Date();
    today.setDate(0); // 0 will result in the last day of the previous month
    setYear(today.getFullYear());
    setMonth(today.getMonth() + 1);

    fetchData()
    // make sure to catch any error
    .catch(console.error);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const onChange_cb = (e) => {
    if (e.target.name === "year") {
      setYear(e.target.value)
    } else if (e.target.name === "month") {
      setMonth(e.target.value)
    }
  }

  return (
    <div className="App">
      {/* <button onClick={fetchLineData}>FETCH</button> */}

      <input name="month" type="number" value={month} onChange={(e) => onChange_cb(e)}/>
      <input name="year" type="number" value={year} onChange={(e) => onChange_cb(e)}/>
      <button onClick={fetchLineData}>Apply</button>

      <Tabs style={{ marginTop: '20px' }}>
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
