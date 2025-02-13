import React, { useEffect, useState, useMemo  } from "react"; 
import { registerWidget, registerLink, registerUI, IContextProvider, } from '../uxp';  
import {  AreaChart, Area, ResponsiveContainer,  LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ComposedChart, ReferenceArea,  } from 'recharts';
import { useToast, DataList, WidgetWrapper, Button, DynamicSelect, SearchBox, Modal, DataTable, MapComponent, TitleBar, ItemListCard, FilterPanel, DataGrid, ItemCard, FormField, Label, Select, Input, DateRangePicker, DatePicker, Checkbox, ProfileImage, Popover, TrendChartComponent, ToggleFilter, LinkWidgetContainer, TableComponent } from "uxp/components";
    
 
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";  

interface IWidgetProps {
    uxpContext?: IContextProvider,
    instanceId?: string,
    content: string; // Ensure this is correct
}     
 

interface EmissionData {
    [x: string]: any;
    ScopeKey: string;
    ScopeName: string;
    CarbonEmission: string; // This can also be a number if you always get numbers
}
interface ScopePopupData {
    MonthString: string;
    Scope1: number;
    Scope2: number;
    Scope3: number;
} 

interface IDataItem {
    name: string;
    value: number;
    color?: string;  
  }
  interface AggregatedData {
    name: string;
    y: number; // This will hold the aggregated carbon emissions
}
const Energy_Optimization_Strategies: React.FunctionComponent<IWidgetProps> = (props) => { 
 

    const months=[
        {Value:'1',Label:'January'},
        {Value:'2',Label:'February'},
        {Value:'3',Label:'March'},
        {Value:'4',Label:'April'},
        {Value:'5',Label:'May'},
        {Value:'6',Label:'June'},
        {Value:'7',Label:'July'},
        {Value:'8',Label:'August'},
        {Value:'9',Label:'September'},
        {Value:'10',Label:'October'},
        {Value:'11',Label:'November'},
        {Value:'12',Label:'December'}
     ] 

const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  
   
let [selected, setSelected] = React.useState<string | null>("op-1");
let [selected1, setSelected1] = React.useState<string | null>("op-1");
let [selected2, setSelected2] = React.useState<string | null>("op-1");  
let [selected3, setSelected3] = React.useState<string | null>("op-1");  
let [selected4, setSelected4] = React.useState<string | null>("op-1");  
let [selected5, setSelected5] = React.useState<string | null>("op-1");  
 
let [showModal, setShowModal] = React.useState(false);
let [showModal1, setShowModal1] = React.useState(false);
let [modelData, setModelData] = React.useState<any>(null);  



const airSideEnergyData = [
  { 
    title: 'Setpoint Adjustments',
    value: '2548.25',
    info_content: 'test',
    statusClass: 'air-side',
    arrow_status: 'up-arrow', 
    change: '3.52',
    info_cont: 'Adjust the temperature and humidity setpoints based on historical trends, real-time occupancy levels, and environmental conditions.'
  },
  {
    title: 'Chilled Water Valve Controls',
    value: '2548.25',
    info_content: 'test',
    statusClass: 'air-side',
    arrow_status: 'up-arrow', 
    change: '3.52',
    info_cont: 'Adjust the chilled water valve positions to match real-time cooling demands.'
  },
  {
    title: 'Fresh Air Damper Control',
    value: '2548.25',
    info_content: 'test',
    statusClass: 'air-side',
    arrow_status: 'down-arrow', 
    change: '3.52',
    info_cont: 'Regulate fresh air intake based on occupancy and indoor air quality (IAQ).'
  },
  {
    title: 'VSD Control',
    value: '2548.25',
    info_content: 'test',
    statusClass: 'air-side',
    arrow_status: 'up-arrow', 
    change: '3.52',
    info_cont: 'Utilize VSDs for fans and pumps and allow equipment to operate based on actual demand rather than fixed speeds.'
  }
]; 

const waterSideEnergyData = [
  { 
    title: 'Chiller Sequencing & Load Optimization',
    value: '2548.25',
    info_content: 'test',
    statusClass: 'air-side',
    arrow_status: 'up-arrow', 
    change: '3.52',
    info_cont: 'Allow chillers to operate at partial loads while distributing cooling loads optimally across multiple chillers.'
  },
  {
    title: 'Chilled Water Supply Temperature Optimization',
    value: '2548.25',
    info_content: 'test',
    statusClass: 'air-side',
    arrow_status: 'up-arrow', 
    change: '3.52',
    info_cont: 'Adjust chilled water supply temperatures based on real-time cooling demand.'
  },
  {
    title: 'Condenser Water Temperature Optimization',
    value: '2548.25',
    info_content: 'test',
    statusClass: 'air-side',
    arrow_status: 'down-arrow', 
    change: '3.52',
    info_cont: 'Optimize condenser water temperatures by analyzing ambient conditions and cooling loads.'
  },
  {
    title: 'Cooling Tower Optimization',
    value: '2548.25',
    info_content: 'test',
    statusClass: 'air-side',
    arrow_status: 'up-arrow', 
    change: '3.52',
    info_cont: 'Adjust cooling Tower operations by adjusting fan speeds through VSDs.'
  },
  {
    title: 'Chilled Water Pump Optimization',
    value: '2548.25',
    info_content: 'test',
    statusClass: 'air-side',
    arrow_status: 'up-arrow', 
    change: '3.52',
    info_cont: 'Pump speeds are modulated  based on real-time pressure differentials and cooling demands.'
  }
];

const airstatusElements = airSideEnergyData.map((item, index) => ( 
 <div className={`status ${item.statusClass}`} key={index}> 
    <div className="side-title">
        <p onClick={() => setShowLinkWidget(true)}>{item.title}</p>
        {/* <span className="info"><p>{item.info_content} <span className="info-cont">{item.info_cont}</span></p></span> */}
        {/* <span className="info"><p> <span className="info-cont">{item.info_cont}</span></p></span> */}

        {/* <span className="info"><p> <span className="info-cont">{item.info_cont}</span></p></span> */}
        {/* <Tooltip content="This is a tooltip" /> */} 

        <span className="info"><p> <span className="info-cont"><Tooltip content={() => <div>{item.info_cont}</div>} /></span></p></span>
          
    </div>  
    <h2>{item.value} <span>kWh</span></h2> 
    <div className="status_bot-sec"><span className={`arrow ${item.arrow_status}`}></span> {item.change} %</div> 

   

  </div> 
));

const waterstatusElements = waterSideEnergyData.map((item, index) => ( 
  <div className={`status ${item.statusClass}`} key={index}> 
     <div className="side-title">
         <p>{item.title}</p>
         {/* <span className="info"><p> <span className="info-cont">{item.info_cont}</span></p></span> */}
         
        <span className="info"><p> <span className="info-cont"><Tooltip content={() => <div>{item.info_cont}</div>} /></span></p></span>
         
     </div>  
     <h2>{item.value} <span>kWh</span></h2> 
     <div className="status_bot-sec"><span className={`arrow ${item.arrow_status}`}></span> {item.change} %</div>  
   </div> 
 ));
 
 const [showLinkWidget, setShowLinkWidget] = useState(false); // Set to true initially
 const [showLinkWidget1, setShowLinkWidget1] = useState(false); // Set to true initially


 
const consumptionCompositionData = [
  { 
    "years": 2021,
    "Scope 1": 4000,
    "Scope 2": 2400,
    "Scope 3": 2400,
    "Baseline": 587,
    "Carbon Reduction Goals": 758,
    "Trend Forecast": 368
  },
  { 
    "years": 2022,
    "Scope 1": 3000,
    "Scope 2": 1398,
    "Scope 3": 2210,
    "Baseline": 2543,
    "Carbon Reduction Goals": 254,
    "Trend Forecast": 457
  },
  { 
    "years": 2023,
    "Scope 1": 2000,
    "Scope 2": 9800,
    "Scope 3": 2290,
    "Baseline": 1570,
    "Carbon Reduction Goals": 758,
    "Trend Forecast": 498
  },
  { 
    "years": 2024,
    "Scope 1": 2780,
    "Scope 2": 3908,
    "Scope 3": 2000,
    "Baseline": 1690,
    "Carbon Reduction Goals": 657,
    "Trend Forecast": 462
  },
  { 
    "years": 2025,
    "Scope 1": 1890,
    "Scope 2": 4800,
    "Scope 3": 2181,
    "Baseline": 1247,
    "Carbon Reduction Goals": 854,
    "Trend Forecast": 357
  },
  { 
    "years": 2026,
    "Scope 1": 2390,
    "Scope 2": 3800,
    "Scope 3": 2500,
    "Baseline": 1658,
    "Carbon Reduction Goals": 654,
    "Trend Forecast": 124
  },
  { 
    "years": 2027,
    "Scope 1": 3490,
    "Scope 2": 4300,
    "Scope 3": 2100,
    "Baseline": 1520,
    "Carbon Reduction Goals": 365,
    "Trend Forecast": 784
  }
]; 



// Data with Daily & Cumulative Savings
const energySavingData = [
  { date: "2025-01-01", daily: 160, cumulative: 160 },
  { date: "2025-01-02", daily: 50, cumulative: 210 },
  { date: "2025-01-03", daily: 60, cumulative: 270 },
  { date: "2025-01-04", daily: 70, cumulative: 340 },
  { date: "2025-01-05", daily: 90, cumulative: 430 },
  { date: "2025-01-06", daily: 80, cumulative: 510 },
  { date: "2025-01-07", daily: 100, cumulative: 610 },
  { date: "2025-01-08", daily: 110, cumulative: 720 },
  { date: "2025-01-09", daily: 95, cumulative: 815 },
  { date: "2025-01-10", daily: 85, cumulative: 900 },
  { date: "2025-01-11", daily: 120, cumulative: 1020 },
  { date: "2025-01-12", daily: 90, cumulative: 1110 },
  { date: "2025-01-13", daily: 130, cumulative: 1240 },
  { date: "2025-01-14", daily: 100, cumulative: 1340 },
  { date: "2025-01-15", daily: 140, cumulative: 1480 },
  { date: "2025-01-16", daily: 125, cumulative: 1605 },
  { date: "2025-01-17", daily: 110, cumulative: 1715 },
  { date: "2025-01-18", daily: 135, cumulative: 1850 },
  { date: "2025-01-19", daily: 150, cumulative: 2000 },
  { date: "2025-01-20", daily: 120, cumulative: 2120 },
  { date: "2025-01-21", daily: 110, cumulative: 2230 },
  { date: "2025-01-22", daily: 130, cumulative: 2360 },
  { date: "2025-01-23", daily: 140, cumulative: 2500 },
  { date: "2025-01-24", daily: 125, cumulative: 2625 },
  { date: "2025-01-25", daily: 150, cumulative: 2775 },
  { date: "2025-01-26", daily: 135, cumulative: 2910 },
  { date: "2025-01-27", daily: 120, cumulative: 3030 },
  { date: "2025-01-28", daily: 140, cumulative: 3170 },
  { date: "2025-01-29", daily: 130, cumulative: 3300 },
  { date: "2025-01-30", daily: 125, cumulative: 3425 },
  { date: "2025-01-31", daily: 150, cumulative: 3575 },
];



const assetWiseData = [
  {
    date: "2025-01-01",
    totalSavings: "147.74 kWh",
    details: [
      { date: "2025-02-01 10:12", asset: "AHU-F1-001", oldValue: "21 °C", setValue: "22.5 °C", savings: "50.36" },
      { date: "2025-02-01 11:45", asset: "AHU-F1-001", oldValue: "23 °C", setValue: "24 °C", savings: "22.30" },
      { date: "2025-02-01 20:12", asset: "AHU-F1-007", oldValue: "22 °C", setValue: "23.5 °C", savings: "52.52" },
      { date: "2025-02-01 23:45", asset: "AHU-F1-002", oldValue: "21 °C", setValue: "27 °C", savings: "22.56" },
    ],
  },
  {
    date: "2025-01-02",
    totalSavings: "424.25 kWh",
    details: [
      { date: "2025-02-01 10:12", asset: "AHU-F1-001", oldValue: "21 °C", setValue: "22.5 °C", savings: "50.36" },
      { date: "2025-02-01 11:45", asset: "AHU-F1-001", oldValue: "23 °C", setValue: "24 °C", savings: "22.30" },
      { date: "2025-02-01 20:12", asset: "AHU-F1-007", oldValue: "22 °C", setValue: "23.5 °C", savings: "52.52" },
      { date: "2025-02-01 23:45", asset: "AHU-F1-002", oldValue: "21 °C", setValue: "27 °C", savings: "22.56" },
    ],
  },
  {
    date: "2025-01-03",
    totalSavings: "124.25 kWh",
    details: [
      { date: "2025-02-01 10:12", asset: "AHU-F1-001", oldValue: "21 °C", setValue: "22.5 °C", savings: "50.36" },
      { date: "2025-02-01 11:45", asset: "AHU-F1-001", oldValue: "23 °C", setValue: "24 °C", savings: "22.30" },
      { date: "2025-02-01 20:12", asset: "AHU-F1-007", oldValue: "22 °C", setValue: "23.5 °C", savings: "52.52" },
      { date: "2025-02-01 23:45", asset: "AHU-F1-002", oldValue: "21 °C", setValue: "27 °C", savings: "22.56" },
    ],
  },
];


const [openIndex, setOpenIndex] = useState(null);

const toggleAccordion = (index: number) => {
  setOpenIndex(openIndex === index ? null : index);
};






const trendAnalysisData = [
  { time: 0, tempSetpoint: 22, ambientTemp: 30, humidity: 60, occupancy: 10, energySaving: null, energyConsumption: 130 },
  { time: 5, tempSetpoint: 22, ambientTemp: 32, humidity: 62, occupancy: 12, energySaving: null, energyConsumption: 132 },
  { time: 10, tempSetpoint: 22, ambientTemp: 31, humidity: 58, occupancy: 10, energySaving: null, energyConsumption: 131 },
  { time: 15, tempSetpoint: 22, ambientTemp: 30, humidity: 57, occupancy: 20, energySaving: 135, energyConsumption: 134 }, // Energy saving starts
  { time: 20, tempSetpoint: 22, ambientTemp: 35, humidity: 55, occupancy: 18, energySaving: 140, energyConsumption: 138 }, // Energy saving duration

];


    return (
        <WidgetWrapper>
            <TitleBar className="energy_optimization_title" title='Energy Optimization Strategies' icon="https://static.iviva.com/images/Udhayimages/alert-trends.png">
 
                            <div className="top-filter">
                                <div className="select-filter">   

                                    <div className="select-filter_lft">   
                                        <Select
                                            selected={selected}
                                            options={[
                                                { label: "DSTA.BLDG01", value: "op-1" },
                                                { label: "Option 02", value: "op-2" },
                                                { label: "Option 03", value: "op-3" },
                                            ]}
                                            onChange={(value) => { setSelected(value) }}
                                            placeholder=" -- select --"
                                        /> 

                                        <Select
                                            selected={selected1}
                                            options={[
                                                { label: "All ASSET TYPES", value: "op-1" },
                                                { label: "Option 02", value: "op-2" },
                                                { label: "Option 03", value: "op-3" },
                                            ]}
                                            onChange={(value) => { setSelected1(value) }}
                                            placeholder=" -- select --"
                                        /> 

                                    </div>  


                                <div className="select-filter_rgt">   
                                    <Select
                                        selected={selected2}
                                        options={[
                                            { label: "TODAY", value: "op-1" },
                                            { label: "Option 02", value: "op-2" },
                                            { label: "Option 03", value: "op-3" },
                                        ]}
                                        onChange={(value) => { setSelected2(value) }}
                                        placeholder=" -- select --"
                                    />

                                    <Select
                                        selected={selected3}
                                        options={[
                                            { label: "THIS WEEK", value: "op-1" },
                                            { label: "Option 02", value: "op-2" },
                                            { label: "Option 03", value: "op-3" },
                                        ]}
                                        onChange={(value) => { setSelected3(value) }}
                                        placeholder=" -- select --"
                                    /> 

                                    <Select
                                        selected={selected4}
                                        options={[
                                            { label: "THIS MONTH", value: "op-1" },
                                            { label: "Option 02", value: "op-2" },
                                            { label: "Option 03", value: "op-3" },
                                        ]}
                                        onChange={(value) => { setSelected4(value) }}
                                        placeholder=" -- select --"
                                    />

                                    <Select
                                        selected={selected5}
                                        options={[
                                            { label: "THIS YEAR", value: "op-1" },
                                            { label: "Option 02", value: "op-2" },
                                            { label: "Option 03", value: "op-3" },
                                        ]}
                                        onChange={(value) => { setSelected5(value) }}
                                        placeholder=" -- select --"
                                    />  
                                    <div className="calen-icon"></div>

                                 </div>

                           </div>  
                       </div>
            </TitleBar>    


            <div className="energy_content">

                    <div className="energy-cont-lft">

                    <div className="total_energy_status">  
                      <span className="energy-icon"></span>
                        <h6 className="total_energy-title">Energy Saving</h6>   
                        <h2>19.214.20 <span>kWh</span><em>2025-01-01 to 2025-01-31</em></h2> 
                        <div className="status_bot-sec"><span className={`arrow up-arrow`}></span> 3.52 %</div>  
                        <div className="tot-kwh">235.25 kWh</div> 
                        <span className="info"></span> 
                    </div> 



                    </div>

                     <div className="energy-cont-rgt">

                            <div className="side-section airside-section">
                                    <div className="section-title airside-section-title"> 
                                        <h5>Air Side - Energy Optimizations based Savings</h5> 
                                    </div>

                                    <div className="side-section-cont airside-section-cont">
                                          {airstatusElements}

                                         
                                    </div>
                            </div>

                            <div className="side-section waterside-section">
                                    <div className="section-title waterside-section-title"> 
                                        <h5>Water Side - Energy Optimizations based Savings</h5>
                                    </div>

                                    <div className="side-section-cont waterside-section-cont">
                                          {waterstatusElements}
                                    </div>
                            </div> 
                    </div>  
            </div>

 
            <LinkWidgetContainer show={showLinkWidget} onClose={() => setShowLinkWidget(false)} 
            title="Setpoint Adjustments">

                          <div className="side-energy-widget"> 


                                <div className="top-filter">
                                      <div className="select-filter">   

                                          <div className="select-filter_lft">   
                                              <Select
                                                  selected={selected}
                                                  options={[
                                                      { label: "DSTA.BLDG01", value: "op-1" },
                                                      { label: "Option 02", value: "op-2" },
                                                      { label: "Option 03", value: "op-3" },
                                                  ]}
                                                  onChange={(value) => { setSelected(value) }}
                                                  placeholder=" -- select --"
                                              />


                                              <Select
                                                  selected={selected1}
                                                  options={[
                                                      { label: "All ASSET TYPES", value: "op-1" },
                                                      { label: "Option 02", value: "op-2" },
                                                      { label: "Option 03", value: "op-3" },
                                                  ]}
                                                  onChange={(value) => { setSelected1(value) }}
                                                  placeholder=" -- select --"
                                              />

                                              <Select
                                                selected={selected1}
                                                options={[
                                                    { label: "All ASSET", value: "op-1" },
                                                    { label: "Option 02", value: "op-2" },
                                                    { label: "Option 03", value: "op-3" },
                                                ]}
                                                onChange={(value) => { setSelected1(value) }}
                                                placeholder=" -- select --"
                                            />

                                          </div>  


                                      <div className="select-filter_rgt">   
                                          <Select
                                              selected={selected2}
                                              options={[
                                                  { label: "TODAY", value: "op-1" },
                                                  { label: "Option 02", value: "op-2" },
                                                  { label: "Option 03", value: "op-3" },
                                              ]}
                                              onChange={(value) => { setSelected2(value) }}
                                              placeholder=" -- select --"
                                          />

                                          <Select
                                              selected={selected3}
                                              options={[
                                                  { label: "THIS WEEK", value: "op-1" },
                                                  { label: "Option 02", value: "op-2" },
                                                  { label: "Option 03", value: "op-3" },
                                              ]}
                                              onChange={(value) => { setSelected3(value) }}
                                              placeholder=" -- select --"
                                          /> 

                                          <Select
                                              selected={selected4}
                                              options={[
                                                  { label: "THIS MONTH", value: "op-1" },
                                                  { label: "Option 02", value: "op-2" },
                                                  { label: "Option 03", value: "op-3" },
                                              ]}
                                              onChange={(value) => { setSelected4(value) }}
                                              placeholder=" -- select --"
                                          />

                                          <Select
                                              selected={selected5}
                                              options={[
                                                  { label: "THIS YEAR", value: "op-1" },
                                                  { label: "Option 02", value: "op-2" },
                                                  { label: "Option 03", value: "op-3" },
                                              ]}
                                              onChange={(value) => { setSelected5(value) }}
                                              placeholder=" -- select --"
                                          />  
                                          <div className="calen-icon"></div>

                                      </div>

                                </div>  
                            </div>


                            <div className="energy-saving-chart" style={{marginTop:"2em"}}>
                                        
                            <WidgetWrapper>  

                                <TitleBar title='Energy Savings Overview' />  
                                
                                    <div style={{ width: "96%", padding: "2em 2%", margin: "2em" }}>  
                                      
                                   

                                    <ResponsiveContainer width="100%" height={350}>
                                            <ComposedChart data={energySavingData} margin={{ top: 20, right: 30, left: 20, bottom: 10 }}>
                                              <CartesianGrid strokeDasharray="3 3" /> 
                                              <XAxis
                                                dataKey="date"
                                                tick={{ fontSize: 12 }}
                                                angle={-30}
                                                textAnchor="end"
                                              /> 
                                              <YAxis yAxisId="left" label={{ value: "Daily Savings (kWh)", angle: -90, position: "insideLeft" }} stroke="#3f51b5" />
                                              <YAxis yAxisId="right" orientation="right" label={{ value: "Cumulative Savings (kWh)", angle: 90, position: "insideRight" }} stroke="#444444" />
                                              <Tooltip />
                                              <Legend verticalAlign="bottom" wrapperStyle={{ marginTop: 80 }} /> 
                                              <Bar onClick={() => setShowModal(true)} yAxisId="left" dataKey="daily" fill="#467df4" name="Daily Savings" /> 
                                              <Line yAxisId="right" dataKey="cumulative" stroke="#4caf50" dot={false} strokeWidth={2} name="Cumulative Savings" />
                                            </ComposedChart>
                                          </ResponsiveContainer> 

                              
                                    </div>  


                                      <div className="scope-overall">
                                            <div className="scope-box blue-scope-box">
                                                <h4>Average Daily Savings</h4>
                                                <h3>125.25 <span>kWh</span></h3> 
                                            </div>

                                            <div className="scope-box green-scope-box">
                                                <h4> Total Savings </h4>
                                                <h3>2548.25 <span>kWh</span></h3>
                                                
                                            </div>

                                            <div className="scope-box purple-scope-box">
                                              <h4>Best Savings Day </h4>
                                              <h3>145.25 <span>kWh</span></h3>
                                              <div className="scope-bottom">
                                                <em>2025-01-20</em> 
                                              </div>
                                          </div>
                                     </div>

                              </WidgetWrapper>  

                            </div> 

                          </div> 



                          
            
             {/* Modal for Editing Table 1 */}
             <Modal title="Set Point Adjustments - Asset wise" className="asset_wise-popup" show={showModal} onClose={() => setShowModal(false)}>
                
                <div className="asset_wise-cont">
                         
                            <div className="asset_wise-accordian">
                                {assetWiseData.map((item, index) => (
                                  <div key={index} className="accordian-section">

                                    {/* Accordion Header */}
                                    <div className="accordian-section-list" onClick={() => toggleAccordion(index)}>
                                      <div className="accordian-date">{item.date}</div>
                                      <p className="total-saving">Total Savings: {item.totalSavings}</p>
                                      <div className="accordian-section-list-rgt">
                                      
                                      <span className="trade-icon" onClick={() => setShowModal1(true)}></span> 
                                          {/* <span className="trade-icon" onClick={() => setShowLinkWidget1(true)}></span>  */}
                                          <em className={`arrow-icon ${openIndex === index ? "up-arrow" : "down-arrow"}`}></em>
                                      </div>
                                    </div>

                                    {/* Accordion Content */}
                                    {openIndex === index && item.details.length > 0 && (
                                      <div className="accordian-section-table">
                                        <TableComponent
                                          data={item.details} 
                                          columns={[
                                            { id: "date", label: "DATE" },
                                            { id: "asset", label: "ASSET" },
                                            { id: "oldValue", label: "OLD VALUE" },
                                            { id: "setValue", label: "SET VALUE" },
                                            { id: "savings", label: "SAVING (kWh)" },
                                          ]} 

                                          pageSize={5}
                                          total={item.details.length}
                                        />
                                      </div>
                                    )}
                                  </div>
                                ))}

                           </div>

                     </div>


                     {/* <LinkWidgetContainer show={showLinkWidget1} onClose={() => setShowLinkWidget1(false)} 
                        title="Trend Analysis"> */}



<Modal title="Set Point Adjustments - Asset wise" className="asset_wise-popup" show={showModal1} onClose={() => setShowModal1(false)}>
                

                          Hello


                             {/* <ResponsiveContainer width="100%" height={400}>  

                                          <ComposedChart 
                                          data={consumptionCompositionData.map((entry) => ({
                                              ...entry,
                                              "Business as usual": (entry["Scope 1"] + entry["Scope 2"] + entry["Scope 3"]) / 3, // Calculating average inline
                                          }))} 
                                          margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
                                          
                                          <CartesianGrid strokeDasharray="3 3" />
                                          <XAxis dataKey="years" />
                                          <YAxis />
                                          <Tooltip />
                                          <Legend />
                                          
                                          <Bar barSize={10} dataKey="Scope 1" stackId="a" fill="#4c6a48" />
                                          <Bar barSize={10} dataKey="Scope 2" stackId="a" fill="#466f81" />
                                          <Bar barSize={10} dataKey="Scope 3" stackId="a" fill="#b97244" />

                                          <Line type="monotone" dataKey="Baseline" stroke="#4c6a48" />
                                          <Line type="monotone" dataKey="Carbon Reduction Goals" stroke="#ff7300" />
                                          <Line type="monotone" dataKey="Trend Forecast" stroke="#b97244" />
                                              
                                          <Line type="monotone" dataKey="Business as usual" stroke="#424242" strokeDasharray="3 3" dot={true} name="Business as usual" />

                                          </ComposedChart> 


                                      </ResponsiveContainer>    */}




                                      


                                      
 
        
      <ResponsiveContainer width="100%" height={400}>
      <ComposedChart 
        data={trendAnalysisData} 
        margin={{ top: 20, right: 40, left: 20, bottom: 30 }}>
        
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="time" label={{ value: "Time (Hours)", position: "bottom" }} />

        {/* Left Y-Axis (Conditions) */}
        <YAxis 
          yAxisId="left" 
          label={{ value: "Conditions", angle: -90, position: "insideLeft" }} 
          domain={[0, 100]} 
          type="number"
          allowDataOverflow
        />

        {/* Right Y-Axis (Energy Consumption) */}
        <YAxis 
          yAxisId="right" 
          orientation="right" 
          label={{ value: "Energy Consumption (kWh)", angle: -90, position: "insideRight" }} 
          domain={[120, 150]} 
          type="number"
          allowDataOverflow
        />

        <Tooltip />
        <Legend />

        {/* Shaded Region - Energy Saved Duration */}
        <ReferenceArea x1={15} x2={20} strokeOpacity={0.3} fill="green" fillOpacity={0.3} />

        {/* Conditions Lines */}
        <Line yAxisId="left" type="monotone" dataKey="tempSetpoint" stroke="red" name="Temp Setpoint (°C)" />
        <Line yAxisId="left" type="monotone" dataKey="ambientTemp" stroke="blue" name="Ambient Temp (°C)" />
        <Line yAxisId="left" type="monotone" dataKey="humidity" stroke="green" name="Humidity (%)" />
        <Line yAxisId="left" type="monotone" dataKey="occupancy" stroke="lightblue" name="Occupancy Level" />

        {/* Energy Consumption Line */}
        <Line yAxisId="right" type="monotone" dataKey="energyConsumption" stroke="black" name="Energy Consumption (kWh)" />

        {/* Energy Saving Line - Dashed */}
        <Line 
          yAxisId="right" 
          type="monotone" 
          dataKey="energySaving" 
          stroke="purple" 
          strokeDasharray="5 5" 
          dot={false} 
          name="Energy Saving (kWh)" 
        />
      </ComposedChart>
    </ResponsiveContainer>



 




            {/* </LinkWidgetContainer> */}

            </Modal>
   
                </Modal>


                       </LinkWidgetContainer>
                            

                    </WidgetWrapper>
                )
            }; 

export default Energy_Optimization_Strategies;


  
 




 




 