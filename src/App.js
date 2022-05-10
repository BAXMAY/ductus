// import logo from './logo.svg';
import { Tabs, Tab, TabList, TabPanel } from 'react-tabs';
import './App.css';
import 'react-tabs/style/react-tabs.css';
import StatResponsiveLine from './components/line';
import { lineDataDict } from './data/lineData'

function App() {
  const RPList = ['UN1']
  const SDLList = ['KN', 'KL', 'Spirit', 'RinOne']
  const ULList = ['Eternal_Love', 'KT', 'Honest', 'Skill', 'Navigator']
  return (
    <div className="App">
      <Tabs style={{ marginTop: '50px' }}>
        <TabList>
        {
          Object.keys(lineDataDict).map((key, index) => {
            let bgColor = 'lightblue'
            if (RPList.includes(key)) bgColor = 'gray'
            else if (SDLList.includes(key)) bgColor = 'orange'
            else if (ULList.includes(key)) bgColor = 'pink'
            return (<Tab style={{ backgroundColor: bgColor }} key={index}>{key.replaceAll('_', ' ')}</Tab>)
          })
        }
        </TabList>

        {
          Object.entries(lineDataDict).map(
            ([key, value], index) => {
              return (
                <TabPanel>
                  <div style={{ height: "400px", width: "75%", margin: "0 auto"}} key={index}>
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
