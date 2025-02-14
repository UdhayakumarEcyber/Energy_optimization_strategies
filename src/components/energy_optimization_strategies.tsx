 
import React, { useEffect, useState, useMemo  } from "react"; 
import { registerWidget, registerLink, registerUI, IContextProvider, } from '../uxp';  
import {  AreaChart, Area, ResponsiveContainer,  LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ComposedChart, ReferenceArea,  } from 'recharts';
import { useToast, DataList, WidgetWrapper, Button, DynamicSelect, SearchBox, Modal, DataTable, MapComponent, TitleBar, ItemListCard, FilterPanel, DataGrid, ItemCard, FormField, Label, Select, Input, DateRangePicker, DatePicker, Checkbox, ProfileImage, Popover, TrendChartComponent, ToggleFilter, LinkWidgetContainer, TableComponent } from "uxp/components";
     
interface IWidgetProps {
    uxpContext?: IContextProvider,
    instanceId?: string,
    content: string;  
}      
 
const Energy_Optimization_Strategies: React.FunctionComponent<IWidgetProps> = (props) => {  
   
let [selected, setSelected] = React.useState<string | null>("op-1");
let [selected1, setSelected1] = React.useState<string | null>("op-1");
let [selected2, setSelected2] = React.useState<string | null>("op-1");  
let [selected3, setSelected3] = React.useState<string | null>("op-1");  
let [selected4, setSelected4] = React.useState<string | null>("op-1");  
let [selected5, setSelected5] = React.useState<string | null>("op-1");  
let [selected6, setSelected6] = React.useState<string | null>("op-8");  
 
let [showModal, setShowModal] = React.useState(false);
// let [showModal1, setShowModal1] = React.useState(false);  
const [openIndex, setOpenIndex] = useState(0);
const [startDate, setStartDate] = useState(null);
const [endDate, setEndDate] = useState(null);  
const [selectedDate, setSelectedDate] = useState(null);  
const [visibleTooltip, setVisibleTooltip] = useState(null); 
const [visibleTooltip1, setVisibleTooltip1] = useState(null);
const [visibleTooltip2, setVisibleTooltip2] = useState(false); 

const handleTooltipToggle = (index:any) => {
  setVisibleTooltip((prev:any) => (prev === index ? null : index));
  setVisibleTooltip1(null);  
   setVisibleTooltip2(null);

};
const handleTooltipToggle1 = (index:any) => {
  setVisibleTooltip1((prev:any) => (prev === index ? null : index));
  setVisibleTooltip(null); 
   setVisibleTooltip2(null); 
};  

const handleTooltipToggle2 = () => {
  setVisibleTooltip2((prev) => !prev);
  setVisibleTooltip(null);  
  setVisibleTooltip1(null); 
};   

const toggleAccordion = (index: number) => {
  setOpenIndex(openIndex === index ? null : index);
};    

const airSideEnergyData = [
  { 
    title: 'Setpoint Adjustments',
    value: '2548.25',
    statusClass: 'air-side',
    arrow_status: 'up-arrow', 
    change: '2.52',
    info_cont: 'Adjust the temperature and humidity setpoints based on historical trends, real-time occupancy levels, and environmental conditions.'
  },
  {
    title: 'Chilled Water Valve Controls',
    value: '1548.28',
    statusClass: 'air-side',
    arrow_status: 'down-arrow', 
    change: '1.42',
    info_cont: 'Adjust the chilled water valve positions to match real-time cooling demands.'
  },
  {
    title: 'Fresh Air Damper Control',
    value: '948.25',
    statusClass: 'air-side',
    arrow_status: 'up-arrow', 
    change: '4.12',
    info_cont: 'Regulate fresh air intake based on occupancy and indoor air quality (IAQ).'
  },
  {
    title: 'VSD Control',
    value: '1548.23',
    statusClass: 'air-side',
    arrow_status: 'up-arrow', 
    change: '2.89',
    info_cont: 'Utilize VSDs for fans and pumps and allow equipment to operate based on actual demand rather than fixed speeds.'
  }
]; 

const waterSideEnergyData = [
  { 
    title: 'Chiller Sequencing & Load Optimization',
    value: '5048.25',
    statusClass: 'air-side',
    arrow_status: 'up-arrow', 
    change: '8.52',
    info_cont: 'Allow chillers to operate at partial loads while distributing cooling loads optimally across multiple chillers.'
  },
  {
    title: 'Chilled Water Supply Temperature Optimization',
    value: '948.25',
    statusClass: 'air-side',
    arrow_status: 'down-arrow', 
    change: '1.12',
    info_cont: 'Adjust chilled water supply temperatures based on real-time cooling demand.'
  },
  {
    title: 'Condenser Water Temperature Optimization',
    value: '3548.20',
    statusClass: 'air-side',
    arrow_status: 'up-arrow', 
    change: '1.42',
    info_cont: 'Optimize condenser water temperatures by analyzing ambient conditions and cooling loads.'
  },
  {
    title: 'Cooling Tower Optimization',
    value: '2048.25',
    statusClass: 'air-side',
    arrow_status: 'up-arrow', 
    change: '2.52',
    info_cont: 'Adjust cooling Tower operations by adjusting fan speeds through VSDs.'
  },
  {
    title: 'Chilled Water Pump Optimization',
    value: '1548.24',
    statusClass: 'air-side',
    arrow_status: 'down-arrow', 
    change: '1.13',
    info_cont: 'Pump speeds are modulated  based on real-time pressure differentials and cooling demands.'
  }
];  

const airstatusElements = airSideEnergyData.map((item, index) => ( 
 <div className={`status ${item.statusClass}`} key={index}> 
    <div className="side-title">
        <p onClick={() => setShowLinkWidget(true)}>{item.title}</p>  
          <span className="info" onClick={() => handleTooltipToggle(index)}></span>
            {visibleTooltip === index && (
              <div className="tooltip-content">
                {item.info_cont}
              </div>
            )}  
    </div>  
    <h2>{item.value} <span>kWh</span></h2> 
    <div className="status_bot-sec"><span className={`arrow ${item.arrow_status}`}></span> {item.change} %</div>   
  </div> 
));

const waterstatusElements = waterSideEnergyData.map((item, index) => ( 
  <div className={`status ${item.statusClass}`} key={index}> 
     <div className="side-title">
         <p>{item.title}</p> 
         <span className="info" onClick={() => handleTooltipToggle1(index)}></span>
            {visibleTooltip1 === index && (
              <div className="tooltip-content">
                {item.info_cont}
              </div>
            )} 
     </div>  
     <h2>{item.value} <span>kWh</span></h2> 
     <div className="status_bot-sec"><span className={`arrow ${item.arrow_status}`}></span> {item.change} %</div>  
   </div> 
 ));
 
 const [showLinkWidget, setShowLinkWidget] = useState(false);  
   
const energySavingData = [
  { date: "2025-01-01", daily: 88.29, cumulative: 88.29 },
  { date: "2025-01-02", daily: 81.95, cumulative: 170.23 },
  { date: "2025-01-03", daily: 89.79, cumulative: 260.03 },
  { date: "2025-01-04", daily: 98.53, cumulative: 358.55 },
  { date: "2025-01-05", daily: 80.99, cumulative: 439.55 },
  { date: "2025-01-06", daily: 80.99, cumulative: 520.54 },
  { date: "2025-01-07", daily: 99.09, cumulative: 619.63 },
  { date: "2025-01-08", daily: 90.99, cumulative: 710.61 },
  { date: "2025-01-09", daily: 78.64, cumulative: 789.26 },
  { date: "2025-01-10", daily: 88.74, cumulative: 878.00 },
  { date: "2025-01-11", daily: 78.70, cumulative: 956.70 },
  { date: "2025-01-12", daily: 78.68, cumulative: 1035.38 },
  { date: "2025-01-13", daily: 85.74, cumulative: 1121.13 },
  { date: "2025-01-14", daily: 64.23, cumulative: 1185.36 },
  { date: "2025-01-15", daily: 66.11, cumulative: 1251.48 },
  { date: "2025-01-16", daily: 77.72, cumulative: 1329.19 },
  { date: "2025-01-17", daily: 73.22, cumulative: 1402.41 },
  { date: "2025-01-18", daily: 86.46, cumulative: 1488.88 },
  { date: "2025-01-19", daily: 74.27, cumulative: 1563.15 },
  { date: "2025-01-20", daily: 96.63, cumulative: 1659.78 },
  { date: "2025-01-21", daily: 97.95, cumulative: 1757.74 },
  { date: "2025-01-22", daily: 81.08, cumulative: 1838.81 },
  { date: "2025-01-23", daily: 84.00, cumulative: 1922.81 },
  { date: "2025-01-24", daily: 69.11, cumulative: 1991.92 },
  { date: "2025-01-25", daily: 77.90, cumulative: 2069.82 },
  { date: "2025-01-26", daily: 84.44, cumulative: 2154.25 },
  { date: "2025-01-27", daily: 71.84, cumulative: 2226.10 },
  { date: "2025-01-28", daily: 87.08, cumulative: 2313.17 },
  { date: "2025-01-29", daily: 77.33, cumulative: 2390.51 },
  { date: "2025-01-30", daily: 80.42, cumulative: 2470.93 },
  { date: "2025-01-31", daily: 77.32, cumulative: 2548.25 },
];

// Function to handle bar click
 
  const handleBarClick = (energySavingData: { date: any; }) => {
    console.log("Bar clicked:", energySavingData);
   // setSelectedDate(energySavingData.date); // Set clicked bar's date
    setShowModal(true)
  };

const assetWiseData = [
  {
    date: "2025-01-01",
    totalSavings: "88.29 kWh",
    details: [
      { date: "2025-01-01", asset: "AHU-F1-003", oldValue: "22 °C", setValue: "26 °C", savings: "29.25" },
      { date: "2025-01-01", asset: "AHU-F1-005", oldValue: "23 °C", setValue: "26 °C", savings: "3.72" },
      { date: "2025-01-01", asset: "AHU-F1-005", oldValue: "21 °C", setValue: "25 °C", savings: "27.79" },
      { date: "2025-01-01", asset: "AHU-F1-002", oldValue: "23 °C", setValue: "24 °C", savings: "16.69" },
      { date: "2025-01-01", asset: "AHU-F1-001", oldValue: "23 °C", setValue: "25 °C", savings: "10.84" },
    ],
  },
  {
    date: "2025-01-02",
    totalSavings: "81.95 kWh",
    details: [
      { date: "2025-01-02", asset: "AHU-F1-004", oldValue: "23 °C", setValue: "26 °C", savings: "0.45" },
      { date: "2025-01-02", asset: "AHU-F1-003", oldValue: "23 °C", setValue: "26 °C", savings: "1.49" },
      { date: "2025-01-02", asset: "AHU-F1-004", oldValue: "20 °C", setValue: "23 °C", savings: "47.45" },
      { date: "2025-01-02", asset: "AHU-F1-005", oldValue: "22 °C", setValue: "25 °C", savings: "32.56" },
    ],
  },
  {
    date: "2025-01-03",
    totalSavings: "89.8 kWh",
    details: [
      { date: "2025-01-03", asset: "AHU-F1-002", oldValue: "21 °C", setValue: "22 °C", savings: "15.53" },
      { date: "2025-01-03", asset: "AHU-F1-002", oldValue: "24 °C", setValue: "26 °C", savings: "0.35" },
      { date: "2025-01-03", asset: "AHU-F1-004", oldValue: "23 °C", setValue: "26 °C", savings: "73.92" } 
    ],
  },
]; 

const energyChartData1 = [
  { time: 0, tempSetpoint: 22, ambientTemp: 28.00, humidity: 60.00, occupancy: 0, energySaving: 0.00, savingPeriod: false },
  { time: 1, tempSetpoint: 22, ambientTemp: 28.54, humidity: 58.65, occupancy: 0, energySaving: 0.00, savingPeriod: false },
  { time: 2, tempSetpoint: 22, ambientTemp: 29.04, humidity: 57.40, occupancy: 0, energySaving: 0.00, savingPeriod: false },
  { time: 3, tempSetpoint: 22, ambientTemp: 29.46, humidity: 56.35, occupancy: 0, energySaving: 0.00, savingPeriod: false },
  { time: 4, tempSetpoint: 22, ambientTemp: 29.78, humidity: 55.56, occupancy: 0, energySaving: 0.00, savingPeriod: false },
  { time: 5, tempSetpoint: 22, ambientTemp: 29.96, humidity: 55.10, occupancy: 0, energySaving: 0.00, savingPeriod: false },
  { time: 6, tempSetpoint: 22, ambientTemp: 30.00, humidity: 55.01, occupancy: 0, energySaving: 0.00, savingPeriod: false },
  { time: 7, tempSetpoint: 22, ambientTemp: 29.88, humidity: 55.29, occupancy: 0, energySaving: 0.00, savingPeriod: false },
  { time: 8, tempSetpoint: 22, ambientTemp: 29.63, humidity: 55.92, occupancy: 50, energySaving: 0.00, savingPeriod: false },
  { time: 9, tempSetpoint: 22, ambientTemp: 29.26, humidity: 56.84, occupancy: 50, energySaving: 0.00, savingPeriod: false },
  { time: 10, tempSetpoint: 24, ambientTemp: 28.80, humidity: 58.01, occupancy: 50, energySaving: 3.68, savingPeriod: true },
  { time: 11, tempSetpoint: 24, ambientTemp: 28.27, humidity: 59.32, occupancy: 50, energySaving: 3.68, savingPeriod: true },
  { time: 12, tempSetpoint: 24, ambientTemp: 27.73, humidity: 60.68, occupancy: 50, energySaving: 3.68, savingPeriod: true },
  { time: 13, tempSetpoint: 24, ambientTemp: 27.20, humidity: 61.99, occupancy: 50, energySaving: 3.68, savingPeriod: true },
  { time: 14, tempSetpoint: 22, ambientTemp: 26.74, humidity: 63.16, occupancy: 50, energySaving: 0.00, savingPeriod: false },
  { time: 15, tempSetpoint: 22, ambientTemp: 26.37, humidity: 64.08, occupancy: 50, energySaving: 0.00, savingPeriod: false },
  { time: 16, tempSetpoint: 22, ambientTemp: 26.12, humidity: 64.71, occupancy: 50, energySaving: 0.00, savingPeriod: false },
  { time: 17, tempSetpoint: 22, ambientTemp: 26.00, humidity: 64.99, occupancy: 50, energySaving: 0.00, savingPeriod: false },
  { time: 18, tempSetpoint: 22, ambientTemp: 26.04, humidity: 64.90, occupancy: 0, energySaving: 0.00, savingPeriod: false },
  { time: 19, tempSetpoint: 22, ambientTemp: 26.22, humidity: 64.44, occupancy: 0, energySaving: 0.00, savingPeriod: false },
  { time: 20, tempSetpoint: 22, ambientTemp: 26.54, humidity: 63.65, occupancy: 0, energySaving: 0.00, savingPeriod: false },
  { time: 21, tempSetpoint: 22, ambientTemp: 26.96, humidity: 62.60, occupancy: 0, energySaving: 0.00, savingPeriod: false },
  { time: 22, tempSetpoint: 22, ambientTemp: 27.46, humidity: 61.35, occupancy: 0, energySaving: 0.00, savingPeriod: false },
  { time: 23, tempSetpoint: 22, ambientTemp: 28.00, humidity: 60.00, occupancy: 0, energySaving: 0.00, savingPeriod: false },
];


const energyChartData2 = [
  { time: 0, tempSetpoint: 22, ambientTemp: 28.00, humidity: 60.00, occupancy: 0.00, energySaving: 0.00, savingPeriod: false },
  { time: 1, tempSetpoint: 22, ambientTemp: 28.54, humidity: 58.65, occupancy: 0.00, energySaving: 0.00, savingPeriod: false },
  { time: 2, tempSetpoint: 22, ambientTemp: 29.04, humidity: 57.40, occupancy: 0.00, energySaving: 0.00, savingPeriod: false },
  { time: 3, tempSetpoint: 22, ambientTemp: 29.46, humidity: 56.35, occupancy: 0.00, energySaving: 0.00, savingPeriod: false },
  { time: 4, tempSetpoint: 22, ambientTemp: 29.78, humidity: 55.56, occupancy: 0.00, energySaving: 0.00, savingPeriod: false },
  { time: 5, tempSetpoint: 22, ambientTemp: 29.96, humidity: 55.10, occupancy: 0.00, energySaving: 0.00, savingPeriod: false },
  { time: 6, tempSetpoint: 22, ambientTemp: 30.00, humidity: 55.01, occupancy: 0.00, energySaving: 0.00, savingPeriod: false },
  { time: 7, tempSetpoint: 22, ambientTemp: 29.88, humidity: 55.29, occupancy: 0.00, energySaving: 0.00, savingPeriod: false },
  { time: 8, tempSetpoint: 22, ambientTemp: 29.63, humidity: 55.92, occupancy: 50.00, energySaving: 0.00, savingPeriod: false },
  { time: 9, tempSetpoint: 22, ambientTemp: 29.26, humidity: 56.84, occupancy: 50.00, energySaving: 0.00, savingPeriod: false },
  { time: 10, tempSetpoint: 22, ambientTemp: 28.80, humidity: 58.01, occupancy: 50.00, energySaving: 0.00, savingPeriod: false },
  { time: 11, tempSetpoint: 22, ambientTemp: 28.27, humidity: 59.32, occupancy: 50.00, energySaving: 0.00, savingPeriod: false },
  { time: 12, tempSetpoint: 24, ambientTemp: 27.73, humidity: 60.68, occupancy: 50.00, energySaving: 3.41, savingPeriod: true },
  { time: 13, tempSetpoint: 24, ambientTemp: 27.20, humidity: 61.99, occupancy: 50.00, energySaving: 3.41, savingPeriod: true },
  { time: 14, tempSetpoint: 24, ambientTemp: 26.74, humidity: 63.16, occupancy: 50.00, energySaving: 3.41, savingPeriod: true },
  { time: 15, tempSetpoint: 24, ambientTemp: 26.37, humidity: 64.08, occupancy: 50.00, energySaving: 3.41, savingPeriod: true },
  { time: 16, tempSetpoint: 22, ambientTemp: 26.12, humidity: 64.71, occupancy: 50.00, energySaving: 0.00, savingPeriod: false },
  { time: 17, tempSetpoint: 22, ambientTemp: 26.00, humidity: 64.99, occupancy: 50.00, energySaving: 0.00, savingPeriod: false },
  { time: 18, tempSetpoint: 22, ambientTemp: 26.04, humidity: 64.90, occupancy: 0.00, energySaving: 0.00, savingPeriod: false },
  { time: 19, tempSetpoint: 22, ambientTemp: 26.22, humidity: 64.44, occupancy: 0.00, energySaving: 0.00, savingPeriod: false },
  { time: 20, tempSetpoint: 22, ambientTemp: 26.54, humidity: 63.65, occupancy: 0.00, energySaving: 0.00, savingPeriod: false },
  { time: 21, tempSetpoint: 22, ambientTemp: 26.96, humidity: 62.60, occupancy: 0.00, energySaving: 0.00, savingPeriod: false },
  { time: 22, tempSetpoint: 22, ambientTemp: 27.46, humidity: 61.35, occupancy: 0.00, energySaving: 0.00, savingPeriod: false },
  { time: 23, tempSetpoint: 22, ambientTemp: 28.00, humidity: 60.00, occupancy: 0.00, energySaving: 0.00, savingPeriod: false },
];


const energyChartData3 = [
  { time: 0, tempSetpoint: 22, ambientTemp: 28.00, humidity: 60.00, occupancy: 0.00, energySaving: 0.00, savingPeriod: false },
  { time: 1, tempSetpoint: 22, ambientTemp: 28.54, humidity: 58.65, occupancy: 0.00, energySaving: 0.00, savingPeriod: false },
  { time: 2, tempSetpoint: 22, ambientTemp: 29.04, humidity: 57.40, occupancy: 0.00, energySaving: 0.00, savingPeriod: false },
  { time: 3, tempSetpoint: 22, ambientTemp: 29.46, humidity: 56.35, occupancy: 0.00, energySaving: 0.00, savingPeriod: false },
  { time: 4, tempSetpoint: 22, ambientTemp: 29.78, humidity: 55.56, occupancy: 0.00, energySaving: 0.00, savingPeriod: false },
  { time: 5, tempSetpoint: 22, ambientTemp: 29.96, humidity: 55.10, occupancy: 0.00, energySaving: 0.00, savingPeriod: false },
  { time: 6, tempSetpoint: 22, ambientTemp: 30.00, humidity: 55.01, occupancy: 0.00, energySaving: 0.00, savingPeriod: false },
  { time: 7, tempSetpoint: 22, ambientTemp: 29.88, humidity: 55.29, occupancy: 0.00, energySaving: 0.00, savingPeriod: false },
  { time: 8, tempSetpoint: 22, ambientTemp: 29.63, humidity: 55.92, occupancy: 50.00, energySaving: 0.00, savingPeriod: false },
  { time: 9, tempSetpoint: 22, ambientTemp: 29.26, humidity: 56.84, occupancy: 50.00, energySaving: 0.00, savingPeriod: false },
  { time: 10, tempSetpoint: 22, ambientTemp: 28.80, humidity: 58.01, occupancy: 50.00, energySaving: 0.00, savingPeriod: false },
  { time: 11, tempSetpoint: 22, ambientTemp: 28.27, humidity: 59.32, occupancy: 50.00, energySaving: 0.00, savingPeriod: false },
  { time: 12, tempSetpoint: 22, ambientTemp: 27.73, humidity: 60.68, occupancy: 50.00, energySaving: 0.00, savingPeriod: false },
  { time: 13, tempSetpoint: 22, ambientTemp: 27.20, humidity: 61.99, occupancy: 50.00, energySaving: 0.00, savingPeriod: false },
  { time: 14, tempSetpoint: 24, ambientTemp: 26.74, humidity: 63.16, occupancy: 50.00, energySaving: 3.74, savingPeriod: true },
  { time: 15, tempSetpoint: 24, ambientTemp: 26.37, humidity: 64.08, occupancy: 50.00, energySaving: 3.74, savingPeriod: true },
  { time: 16, tempSetpoint: 24, ambientTemp: 26.12, humidity: 64.71, occupancy: 50.00, energySaving: 3.74, savingPeriod: true },
  { time: 17, tempSetpoint: 24, ambientTemp: 26.00, humidity: 64.99, occupancy: 50.00, energySaving: 3.74, savingPeriod: true },
  { time: 18, tempSetpoint: 22, ambientTemp: 26.04, humidity: 64.90, occupancy: 0.00, energySaving: 0.00, savingPeriod: false },
  { time: 19, tempSetpoint: 22, ambientTemp: 26.22, humidity: 64.44, occupancy: 0.00, energySaving: 0.00, savingPeriod: false },
  { time: 20, tempSetpoint: 22, ambientTemp: 26.54, humidity: 63.65, occupancy: 0.00, energySaving: 0.00, savingPeriod: false },
  { time: 21, tempSetpoint: 22, ambientTemp: 26.96, humidity: 62.60, occupancy: 0.00, energySaving: 0.00, savingPeriod: false },
  { time: 22, tempSetpoint: 22, ambientTemp: 27.46, humidity: 61.35, occupancy: 0.00, energySaving: 0.00, savingPeriod: false },
  { time: 23, tempSetpoint: 22, ambientTemp: 28.00, humidity: 60.00, occupancy: 0.00, energySaving: 0.00, savingPeriod: false },
];

 
const [showModal1, setShowModal1] = useState(false);
const [selectedChartData, setSelectedChartData] = useState(null);

// Function to handle trade-icon click
const handleTradeIconClick = (date: any) => {
  let chartData: { time: number; tempSetpoint: number; ambientTemp: number; humidity: number; occupancy: number; energySaving: number; savingPeriod: boolean; }[];
  switch (date) {
    case "2025-01-01":
      chartData = energyChartData1;
      break;
    case "2025-01-02":
      chartData = energyChartData2;
      break;
    case "2025-01-03":
      chartData = energyChartData3;
      break;
    default:
      chartData = []; // Fallback empty dataset
  }
  
  setSelectedChartData(chartData);
  setShowModal1(true);
};

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
 
                                    <Button  title="TODAY"  onClick={() => {}}/>  
                                    <Button  title="THIS WEEK" onClick={() => {}}/>  
                                    <Button className="active-btn"  title="THIS MONTH"  onClick={() => {}} /> 
                                    <Button title="THIS YEAR"  onClick={() => {}}/> 

                                    <div className="calen-icon">  
                                        <FilterPanel>   
                                            <DateRangePicker
                                                startDate={startDate}
                                                endDate={endDate}
                                                closeOnSelect
                                                onChange={(newStart, newEnd) => { setStartDate(newStart); setEndDate(newEnd) }}
                                            /> 
                                        </FilterPanel>  
                                      </div> 
                                 </div>

                           </div>  
                       </div>
            </TitleBar>    


            <div className="energy_content">

                    <div className="energy-cont-lft"> 
                          <div className="total_energy_status">  
                            <span className="energy-icon"></span>
                              <h6 className="total_energy-title">Energy Saving</h6>   
                              <h2>19,714.20 <span>kWh</span><em>2025-01-01 to 2025-01-31</em></h2> 
                              <div className="status_bot-sec"><span className={`arrow up-arrow`}></span> 3.52 %</div>  
                              <div className="tot-kwh">235.25 kWh</div>  
 
                               <span className="info" onClick={handleTooltipToggle2}></span>
                                {visibleTooltip2 && (
                                  <div className="tooltip-content">
                                      The savings % is compared to the period 2024.12.01 to 2024.12.13  

                                  </div>
                                )}  


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
                                              
                                              <Button  title="TODAY"  onClick={() => {}}/>  
                                              <Button  title="THIS WEEK" onClick={() => {}}/>  
                                              <Button className="active-btn"  title="THIS MONTH"  onClick={() => {}} /> 
                                              <Button title="THIS YEAR"  onClick={() => {}}/> 

                                              <div className="calen-icon">  
                                                  <FilterPanel>   
                                                      <DateRangePicker
                                                          startDate={startDate}
                                                          endDate={endDate}
                                                          closeOnSelect
                                                          onChange={(newStart, newEnd) => { setStartDate(newStart); setEndDate(newEnd) }}
                                                      /> 
                                                  </FilterPanel>  
                                                </div> 
                                           </div>



                                </div>  
                            </div>
 
                            <div className="energy-saving-chart" style={{marginTop:"2em"}}>
                                        
                              <WidgetWrapper>  

                                <TitleBar title='Energy Savings Overview' />  
                                
                                    <div style={{ width: "96%", padding: "2em 2%", margin: "2em" }}>   

                                      <ResponsiveContainer width="100%" height={400}>
                                              <ComposedChart data={energySavingData} margin={{ top: 20, right: 30, left: 20, bottom: 10 }}>
                                                <CartesianGrid strokeDasharray="3 3" /> 
                                                <XAxis
                                                  dataKey="date"
                                                  tick={{ fontSize: 12 }}
                                                  angle={-20}
                                                  textAnchor="end"
                                                /> 
                                                <YAxis yAxisId="left" label={{ value: "Daily Savings (kWh)", angle: -90, position: "insideLeft" }} stroke="#3f51b5" />
                                                <YAxis yAxisId="right" orientation="right" label={{ value: "Cumulative Savings (kWh)", angle: 90, position: "insideRight" }} stroke="#444444" />
                                                <Tooltip />
                                                
                                                <Legend verticalAlign="top" height={36} />
                                                <Bar 
                                                  yAxisId="left" 
                                                  dataKey="daily" 
                                                  fill="#467df4" 
                                                  name="Daily Savings" 
                                                  onClick={handleBarClick}  
                                                /> 
                                                <Line yAxisId="right" dataKey="cumulative" stroke="#4caf50" dot={false} strokeWidth={2} name="Cumulative Savings" />
                                              </ComposedChart>
                                            </ResponsiveContainer>   
                              
                                    </div>   

                                      <div className="scope-overall">
                                            <div className="scope-box blue-scope-box">
                                                <h4>Average Daily Savings</h4>
                                                <h3>82.20 <span>kWh</span></h3> 
                                            </div>

                                            <div className="scope-box green-scope-box">
                                                <h4> Total Savings </h4>
                                                <h3>2548.25 <span>kWh</span></h3>
                                                
                                            </div>

                                            <div className="scope-box purple-scope-box">
                                              <h4>Best Savings Day </h4>
                                              <h3>99.09 <span>kWh</span></h3>
                                              <div className="scope-bottom">
                                                <em>2025-01-20</em> 
                                              </div>
                                          </div>
                                     </div>

                              </WidgetWrapper>  

                            </div> 

                        </div>  
             
             <Modal title="Set Point Adjustments - Asset wise" className="asset_wise-popup" show={showModal} onClose={() => setShowModal(false)}>
                
                <div className="asset_wise-cont">
                         
                            <div className="asset_wise-accordian"> 

                              {assetWiseData.map((item, index) => (
                                  <div key={index} className="accordian-section"> 
                                    <div className="accordian-section-list" onClick={() => toggleAccordion(index)}>
                                      <div className="accordian-date">{selectedDate || item.date}</div> {/* Show selected date */}
                                      <p className="total-saving">Total Savings: {item.totalSavings}</p>
                                      <div className="accordian-section-list-rgt">
                                      <span className="trade-icon" onClick={() => handleTradeIconClick(item.date)}></span>  
                                        <em className={`arrow-icon ${openIndex === index ? "up-arrow" : "down-arrow"}`}></em>
                                      </div>
                                    </div>
 
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


            <Modal title="Trend Analysis" className="asset_wise-popup" show={showModal1} onClose={() => setShowModal1(false)}> 
                  
                  {selectedChartData && (
                    //   <ResponsiveContainer width="100%" height={400}> 
                    //   <ComposedChart data={selectedChartData} margin={{ top: 20, right: 30, left: 20, bottom: 10 }}> 
                    //     <CartesianGrid strokeDasharray="3 3" /> 
                    //     <XAxis dataKey="time" label={{ value: "Time (Hours)", position: "insideBottom", offset: -5 }} />
                    //     <YAxis yAxisId="left" label={{ value: "Conditions", angle: -90, position: "insideLeft" }} />
                    //     <YAxis yAxisId="right" orientation="right" label={{ value: "Energy Consumption (kWh)", angle: -90, position: "insideRight" }} /> 
                    //     <Tooltip /> 
                    //     <Legend verticalAlign="top" height={36} />
                    //     <Area yAxisId="right" type="monotone" dataKey="energySaving" stroke="none" fill="green" fillOpacity={0.3} name="Energy Saved Duration" /> 
                    //     <Line yAxisId="left" type="monotone" dataKey="tempSetpoint" stroke="red" name="Temp Setpoint (°C)" />
                    //     <Line yAxisId="left" type="monotone" dataKey="ambientTemp" stroke="green" name="Ambient Temp (°C)" />
                    //     <Line yAxisId="left" type="monotone" dataKey="humidity" stroke="blue" name="Humidity (%)" />
                    //     <Line yAxisId="left" type="monotone" dataKey="occupancy" stroke="cyan" name="Occupancy Level" /> 
                    //     <Line yAxisId="right" type="monotone" dataKey="energySaving" stroke="magenta" strokeDasharray="5 5" name="Energy Saving (kWh)" /> 
                    //   </ComposedChart>
                    // </ResponsiveContainer>

                    <ResponsiveContainer width="100%" height={400}>
                          <ComposedChart
                            data={selectedChartData}
                            margin={{ top: 20, right: 30, left: 20, bottom: 40 }} // Increased bottom margin
                          >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis 
                              dataKey="time" 
                              label={{ value: "Time (Hours)", position: "bottom", offset: 20 }} // Adjusted label position
                            />
                            <YAxis 
                              yAxisId="left" 
                              label={{ value: "Conditions", angle: -90, position: "insideLeft" }} 
                            />
                            <YAxis 
                              yAxisId="right" 
                              orientation="right" 
                              label={{ value: "Energy Saving", angle: -90, position: "insideRight" }} 
                            />
                            <Tooltip />
                            <Legend verticalAlign="top" height={36} /> {/* Moved legend to the top */}
                            <Area 
                              yAxisId="right" 
                              type="monotone" 
                              dataKey="energySaving" 
                              stroke="none" 
                              fill="green" 
                              fillOpacity={0.3} 
                              name="Energy Saved Duration" 
                            />
                            <Line yAxisId="left" type="monotone" dataKey="tempSetpoint" stroke="red" name="Temp Setpoint (°C)" />
                            <Line yAxisId="left" type="monotone" dataKey="ambientTemp" stroke="green" name="Ambient Temp (°C)" />
                            <Line yAxisId="left" type="monotone" dataKey="humidity" stroke="blue" name="Humidity (%)" />
                            <Line yAxisId="left" type="monotone" dataKey="occupancy" stroke="cyan" name="Occupancy Level" />
                            <Line yAxisId="right" type="monotone" dataKey="energySaving" stroke="magenta" strokeDasharray="5 5" name="Energy Saving (kWh)" />
                          </ComposedChart>
                    </ResponsiveContainer>


                  )}

            </Modal>
   
        </Modal> 

      </LinkWidgetContainer>
                            
    </WidgetWrapper>
 )
}; 

export default Energy_Optimization_Strategies;

  
 


// import React, { useEffect, useState, useMemo  } from "react"; 
// import { registerWidget, registerLink, registerUI, IContextProvider, } from '../uxp';  
// import {  AreaChart, Area, ResponsiveContainer,  LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ComposedChart, ReferenceArea,  } from 'recharts';
// import { useToast, DataList, WidgetWrapper, Button, DynamicSelect, SearchBox, Modal, DataTable, MapComponent, TitleBar, ItemListCard, FilterPanel, DataGrid, ItemCard, FormField, Label, Select, Input, DateRangePicker, DatePicker, Checkbox, ProfileImage, Popover, TrendChartComponent, ToggleFilter, LinkWidgetContainer, TableComponent } from "uxp/components";
     
// interface IWidgetProps {
//     uxpContext?: IContextProvider,
//     instanceId?: string,
//     content: string;  
// }      
 
// const Energy_Optimization_Strategies: React.FunctionComponent<IWidgetProps> = (props) => {  
   
// let [selected, setSelected] = React.useState<string | null>("op-1");
// let [selected1, setSelected1] = React.useState<string | null>("op-1");
// let [selected2, setSelected2] = React.useState<string | null>("op-1");  
// let [selected3, setSelected3] = React.useState<string | null>("op-1");  
// let [selected4, setSelected4] = React.useState<string | null>("op-1");  
// let [selected5, setSelected5] = React.useState<string | null>("op-1");  
// let [selected6, setSelected6] = React.useState<string | null>("op-8");  
 
// let [showModal, setShowModal] = React.useState(false);
// let [showModal1, setShowModal1] = React.useState(false); 


// const [openIndex, setOpenIndex] = useState(null);
// const [startDate, setStartDate] = useState(null);
// const [endDate, setEndDate] = useState(null); 


// const [visibleTooltip, setVisibleTooltip] = useState(null); 
// const [visibleTooltip1, setVisibleTooltip1] = useState(null);
// // const [visibleTooltip2, setVisibleTooltip2] = useState(null);

// const handleTooltipToggle = (index:any) => {
//   setVisibleTooltip((prev:any) => (prev === index ? null : index));
//   setVisibleTooltip1(null);  
//   //setVisibleTooltip2(null);

// };
// const handleTooltipToggle1 = (index:any) => {
//   setVisibleTooltip1((prev:any) => (prev === index ? null : index));
//   setVisibleTooltip(null); 
//   //setVisibleTooltip2(null); 
// };  

// // const handleTooltipToggle2 = (index:any) => {
// //   setVisibleTooltip2((prev:any) => (prev === index ? null : index));
// //   setVisibleTooltip(null);  
// //   setVisibleTooltip1(null);
// // };  


// const [visibleTooltip2, setVisibleTooltip2] = useState<number | null>(null);

// const handleTooltipToggle2 = (index: number) => {
//   setVisibleTooltip2(prev => (prev === index? null: index));
// };

// const toggleAccordion = (index: number) => {
//   setOpenIndex(openIndex === index ? null : index);
// };    

// const airSideEnergyData = [
//   { 
//     title: 'Setpoint Adjustments',
//     value: '2548.25',
//     statusClass: 'air-side',
//     arrow_status: 'up-arrow', 
//     change: '2.52',
//     info_cont: 'Adjust the temperature and humidity setpoints based on historical trends, real-time occupancy levels, and environmental conditions.'
//   },
//   {
//     title: 'Chilled Water Valve Controls',
//     value: '1548.28',
//     statusClass: 'air-side',
//     arrow_status: 'down-arrow', 
//     change: '1.42',
//     info_cont: 'Adjust the chilled water valve positions to match real-time cooling demands.'
//   },
//   {
//     title: 'Fresh Air Damper Control',
//     value: '948.25',
//     statusClass: 'air-side',
//     arrow_status: 'up-arrow', 
//     change: '4.12',
//     info_cont: 'Regulate fresh air intake based on occupancy and indoor air quality (IAQ).'
//   },
//   {
//     title: 'VSD Control',
//     value: '1548.23',
//     statusClass: 'air-side',
//     arrow_status: 'up-arrow', 
//     change: '2.89',
//     info_cont: 'Utilize VSDs for fans and pumps and allow equipment to operate based on actual demand rather than fixed speeds.'
//   }
// ]; 

// const waterSideEnergyData = [
//   { 
//     title: 'Chiller Sequencing & Load Optimization',
//     value: '5048.25',
//     statusClass: 'air-side',
//     arrow_status: 'up-arrow', 
//     change: '8.52',
//     info_cont: 'Allow chillers to operate at partial loads while distributing cooling loads optimally across multiple chillers.'
//   },
//   {
//     title: 'Chilled Water Supply Temperature Optimization',
//     value: '948.25',
//     statusClass: 'air-side',
//     arrow_status: 'down-arrow', 
//     change: '1.12',
//     info_cont: 'Adjust chilled water supply temperatures based on real-time cooling demand.'
//   },
//   {
//     title: 'Condenser Water Temperature Optimization',
//     value: '3548.20',
//     statusClass: 'air-side',
//     arrow_status: 'up-arrow', 
//     change: '1.42',
//     info_cont: 'Optimize condenser water temperatures by analyzing ambient conditions and cooling loads.'
//   },
//   {
//     title: 'Cooling Tower Optimization',
//     value: '2048.25',
//     statusClass: 'air-side',
//     arrow_status: 'up-arrow', 
//     change: '2.52',
//     info_cont: 'Adjust cooling Tower operations by adjusting fan speeds through VSDs.'
//   },
//   {
//     title: 'Chilled Water Pump Optimization',
//     value: '1548.24',
//     statusClass: 'air-side',
//     arrow_status: 'down-arrow', 
//     change: '1.13',
//     info_cont: 'Pump speeds are modulated  based on real-time pressure differentials and cooling demands.'
//   }
// ];  

// const airstatusElements = airSideEnergyData.map((item, index) => ( 
//  <div className={`status ${item.statusClass}`} key={index}> 
//     <div className="side-title">
//         <p onClick={() => setShowLinkWidget(true)}>{item.title}</p>  
//           <span className="info" onClick={() => handleTooltipToggle(index)}></span>
//             {visibleTooltip === index && (
//               <div className="tooltip-content">
//                 {item.info_cont}
//               </div>
//             )}  
//     </div>  
//     <h2>{item.value} <span>kWh</span></h2> 
//     <div className="status_bot-sec"><span className={`arrow ${item.arrow_status}`}></span> {item.change} %</div>   
//   </div> 
// ));

// const waterstatusElements = waterSideEnergyData.map((item, index) => ( 
//   <div className={`status ${item.statusClass}`} key={index}> 
//      <div className="side-title">
//          <p>{item.title}</p> 
//          <span className="info" onClick={() => handleTooltipToggle1(index)}></span>
//             {visibleTooltip1 === index && (
//               <div className="tooltip-content">
//                 {item.info_cont}
//               </div>
//             )} 
//      </div>  
//      <h2>{item.value} <span>kWh</span></h2> 
//      <div className="status_bot-sec"><span className={`arrow ${item.arrow_status}`}></span> {item.change} %</div>  
//    </div> 
//  ));
 
//  const [showLinkWidget, setShowLinkWidget] = useState(false);  
 
// const energySavingData = [
//   { date: "2025-01-01", daily: 160, cumulative: 160 },
//   { date: "2025-01-02", daily: 50, cumulative: 210 },
//   { date: "2025-01-03", daily: 60, cumulative: 270 },
//   { date: "2025-01-04", daily: 70, cumulative: 340 },
//   { date: "2025-01-05", daily: 90, cumulative: 430 },
//   { date: "2025-01-06", daily: 80, cumulative: 510 },
//   { date: "2025-01-07", daily: 100, cumulative: 610 },
//   { date: "2025-01-08", daily: 110, cumulative: 720 },
//   { date: "2025-01-09", daily: 95, cumulative: 815 },
//   { date: "2025-01-10", daily: 85, cumulative: 900 },
//   { date: "2025-01-11", daily: 120, cumulative: 1020 },
//   { date: "2025-01-12", daily: 90, cumulative: 1110 },
//   { date: "2025-01-13", daily: 130, cumulative: 1240 },
//   { date: "2025-01-14", daily: 100, cumulative: 1340 },
//   { date: "2025-01-15", daily: 140, cumulative: 1480 },
//   { date: "2025-01-16", daily: 125, cumulative: 1605 },
//   { date: "2025-01-17", daily: 110, cumulative: 1715 },
//   { date: "2025-01-18", daily: 135, cumulative: 1850 },
//   { date: "2025-01-19", daily: 150, cumulative: 2000 },
//   { date: "2025-01-20", daily: 120, cumulative: 2120 },
//   { date: "2025-01-21", daily: 110, cumulative: 2230 },
//   { date: "2025-01-22", daily: 130, cumulative: 2360 },
//   { date: "2025-01-23", daily: 140, cumulative: 2500 },
//   { date: "2025-01-24", daily: 125, cumulative: 2625 },
//   { date: "2025-01-25", daily: 150, cumulative: 2775 },
//   { date: "2025-01-26", daily: 135, cumulative: 2910 },
//   { date: "2025-01-27", daily: 120, cumulative: 3030 },
//   { date: "2025-01-28", daily: 140, cumulative: 3170 },
//   { date: "2025-01-29", daily: 130, cumulative: 3300 },
//   { date: "2025-01-30", daily: 125, cumulative: 3425 },
//   { date: "2025-01-31", daily: 150, cumulative: 3575 },
// ]; 

// const assetWiseData = [
//   {
//     date: "2025-01-01",
//     totalSavings: "147.74 kWh",
//     details: [
//       { date: "2025-02-01 10:12", asset: "AHU-F1-001", oldValue: "21 °C", setValue: "22.5 °C", savings: "50.36" },
//       { date: "2025-02-01 11:45", asset: "AHU-F1-001", oldValue: "23 °C", setValue: "24 °C", savings: "22.30" },
//       { date: "2025-02-01 20:12", asset: "AHU-F1-007", oldValue: "22 °C", setValue: "23.5 °C", savings: "52.52" },
//       { date: "2025-02-01 23:45", asset: "AHU-F1-002", oldValue: "21 °C", setValue: "27 °C", savings: "22.56" },
//     ],
//   },
//   {
//     date: "2025-01-02",
//     totalSavings: "424.25 kWh",
//     details: [
//       { date: "2025-02-01 10:12", asset: "AHU-F1-001", oldValue: "21 °C", setValue: "22.5 °C", savings: "50.36" },
//       { date: "2025-02-01 11:45", asset: "AHU-F1-001", oldValue: "23 °C", setValue: "24 °C", savings: "22.30" },
//       { date: "2025-02-01 20:12", asset: "AHU-F1-007", oldValue: "22 °C", setValue: "23.5 °C", savings: "52.52" },
//       { date: "2025-02-01 23:45", asset: "AHU-F1-002", oldValue: "21 °C", setValue: "27 °C", savings: "22.56" },
//     ],
//   },
//   {
//     date: "2025-01-03",
//     totalSavings: "124.25 kWh",
//     details: [
//       { date: "2025-02-01 10:12", asset: "AHU-F1-001", oldValue: "21 °C", setValue: "22.5 °C", savings: "50.36" },
//       { date: "2025-02-01 11:45", asset: "AHU-F1-001", oldValue: "23 °C", setValue: "24 °C", savings: "22.30" },
//       { date: "2025-02-01 20:12", asset: "AHU-F1-007", oldValue: "22 °C", setValue: "23.5 °C", savings: "52.52" },
//       { date: "2025-02-01 23:45", asset: "AHU-F1-002", oldValue: "21 °C", setValue: "27 °C", savings: "22.56" },
//     ],
//   },
// ];

// const energyChartData = [
//   { time: 0, tempSetpoint: 22, ambientTemp: 30, humidity: 50, occupancy: 5, energySaving: 0, energyConsumption: 140 },
//   { time: 5, tempSetpoint: 22, ambientTemp: 29, humidity: 48, occupancy: 10, energySaving: 0, energyConsumption: 138 },
//   { time: 10, tempSetpoint: 22, ambientTemp: 28, humidity: 46, occupancy: 15, energySaving: 0, energyConsumption: 136 },
//   { time: 15, tempSetpoint: 22, ambientTemp: 27, humidity: 44, occupancy: 25, energySaving: 70, energyConsumption: 134 },
//   { time: 20, tempSetpoint: 22, ambientTemp: 30, humidity: 42, occupancy: 20, energySaving: 70, energyConsumption: 140 },
// ]; 


//     return (
//         <WidgetWrapper>
//             <TitleBar className="energy_optimization_title" title='Energy Optimization Strategies' icon="https://static.iviva.com/images/Udhayimages/alert-trends.png">
 
//                             <div className="top-filter">
//                                 <div className="select-filter">   

//                                     <div className="select-filter_lft">   
//                                         <Select
//                                             selected={selected}
//                                             options={[
//                                                 { label: "DSTA.BLDG01", value: "op-1" },
//                                                 { label: "Option 02", value: "op-2" },
//                                                 { label: "Option 03", value: "op-3" },
//                                             ]}
//                                             onChange={(value) => { setSelected(value) }}
//                                             placeholder=" -- select --"
//                                         />  

//                                         <Select
//                                             selected={selected1}
//                                             options={[
//                                                 { label: "All ASSET TYPES", value: "op-1" },
//                                                 { label: "Option 02", value: "op-2" },
//                                                 { label: "Option 03", value: "op-3" },
//                                             ]}
//                                             onChange={(value) => { setSelected1(value) }}
//                                             placeholder=" -- select --"
//                                         /> 

//                                     </div>  


//                                 <div className="select-filter_rgt">   
 
//                                     <Button  title="TODAY"  onClick={() => {}}/>  
//                                     <Button  title="THIS WEEK" onClick={() => {}}/>  
//                                     <Button className="active-btn"  title="THIS MONTH"  onClick={() => {}} /> 
//                                     <Button title="THIS YEAR"  onClick={() => {}}/> 

//                                     <div className="calen-icon">  
//                                         <FilterPanel>   
//                                             <DateRangePicker
//                                                 startDate={startDate}
//                                                 endDate={endDate}
//                                                 closeOnSelect
//                                                 onChange={(newStart, newEnd) => { setStartDate(newStart); setEndDate(newEnd) }}
//                                             />

//                                         </FilterPanel>  
//                                       </div>

//                                  </div>

//                            </div>  
//                        </div>
//             </TitleBar>    


//             <div className="energy_content">

//                     <div className="energy-cont-lft"> 
//                           <div className="total_energy_status">  
//                             <span className="energy-icon"></span>
//                               <h6 className="total_energy-title">Energy Saving</h6>   
//                               <h2>19,714.20 <span>kWh</span><em>2025-01-01 to 2025-01-31</em></h2> 
//                               <div className="status_bot-sec"><span className={`arrow up-arrow`}></span> 3.52 %</div>  
//                               <div className="tot-kwh">235.25 kWh</div> 
//                                <span className="info"></span>  
 
//                               {/* <span className="info" onClick={() => handleTooltipToggle2(index)}></span>
//             {visibleTooltip2 === index && (
//               <div className="tooltip-content">
//                  Saving % compared to the period 2025-01-01 to 2025-01-10
//               </div>
//             )}  */} 

//                           </div>   
//                     </div>

//                      <div className="energy-cont-rgt">

//                             <div className="side-section airside-section">
//                                     <div className="section-title airside-section-title"> 
//                                         <h5>Air Side - Energy Optimizations based Savings</h5> 
//                                     </div> 
//                                     <div className="side-section-cont airside-section-cont">
//                                           {airstatusElements} 
//                                     </div>
//                             </div>

//                             <div className="side-section waterside-section">
//                                     <div className="section-title waterside-section-title"> 
//                                         <h5>Water Side - Energy Optimizations based Savings</h5>
//                                     </div>

//                                     <div className="side-section-cont waterside-section-cont">
//                                           {waterstatusElements}
//                                     </div>
//                             </div> 
//                     </div>  
//             </div>

 
//             <LinkWidgetContainer show={showLinkWidget} onClose={() => setShowLinkWidget(false)} 
//                 title="Setpoint Adjustments">

//                           <div className="side-energy-widget">  

//                                 <div className="top-filter">
//                                       <div className="select-filter">   

//                                           <div className="select-filter_lft">   
//                                               <Select
//                                                   selected={selected}
//                                                   options={[
//                                                       { label: "DSTA.BLDG01", value: "op-1" },
//                                                       { label: "Option 02", value: "op-2" },
//                                                       { label: "Option 03", value: "op-3" },
//                                                   ]}
//                                                   onChange={(value) => { setSelected(value) }}
//                                                   placeholder=" -- select --"
//                                               /> 

//                                               <Select
//                                                   selected={selected1}
//                                                   options={[
//                                                       { label: "All ASSET TYPES", value: "op-1" },
//                                                       { label: "Option 02", value: "op-2" },
//                                                       { label: "Option 03", value: "op-3" },
//                                                   ]}
//                                                   onChange={(value) => { setSelected1(value) }}
//                                                   placeholder=" -- select --"
//                                               />

//                                               <Select
//                                                 selected={selected1}
//                                                 options={[
//                                                     { label: "All ASSET", value: "op-1" },
//                                                     { label: "Option 02", value: "op-2" },
//                                                     { label: "Option 03", value: "op-3" },
//                                                 ]}
//                                                 onChange={(value) => { setSelected1(value) }}
//                                                 placeholder=" -- select --"
//                                             />

//                                           </div>  


//                                       <div className="select-filter_rgt">   
//                                           <Select
//                                               selected={selected2}
//                                               options={[
//                                                   { label: "TODAY", value: "op-1" },
//                                                   { label: "Option 02", value: "op-2" },
//                                                   { label: "Option 03", value: "op-3" },
//                                               ]}
//                                               onChange={(value) => { setSelected2(value) }}
//                                               placeholder=" -- select --"
//                                           />

//                                           <Select
//                                               selected={selected3}
//                                               options={[
//                                                   { label: "THIS WEEK", value: "op-1" },
//                                                   { label: "Option 02", value: "op-2" },
//                                                   { label: "Option 03", value: "op-3" },
//                                               ]}
//                                               onChange={(value) => { setSelected3(value) }}
//                                               placeholder=" -- select --"
//                                           /> 

//                                           <Select
//                                               selected={selected4}
//                                               options={[
//                                                   { label: "THIS MONTH", value: "op-1" },
//                                                   { label: "Option 02", value: "op-2" },
//                                                   { label: "Option 03", value: "op-3" },
//                                               ]}
//                                               onChange={(value) => { setSelected4(value) }}
//                                               placeholder=" -- select --"
//                                           />

//                                           <Select
//                                               selected={selected5}
//                                               options={[
//                                                   { label: "THIS YEAR", value: "op-1" },
//                                                   { label: "Option 02", value: "op-2" },
//                                                   { label: "Option 03", value: "op-3" },
//                                               ]}
//                                               onChange={(value) => { setSelected5(value) }}
//                                               placeholder=" -- select --"
//                                           />  
//                                           <div className="calen-icon">  
//                                         <FilterPanel> 
//                                             <Select
//                                                 selected={selected6}
//                                                 options={[
//                                                     { label: "01 : 00", value: "op-1" },
//                                                     { label: "02 : 00", value: "op-2" },
//                                                     { label: "03 : 00", value: "op-3" },
//                                                     { label: "04 : 00", value: "op-4" },
//                                                     { label: "05 : 00", value: "op-5" },
//                                                     { label: "06 : 00", value: "op-6" },
//                                                     { label: "07 : 00", value: "op-7" },
//                                                     { label: "08 : 00", value: "op-8" },
//                                                     { label: "09 : 00", value: "op-9" },
//                                                     { label: "10 : 00", value: "op-10" },
//                                                     { label: "11 : 00", value: "op-11" }, 
//                                                     { label: "12 : 00", value: "op-12" },
//                                                     { label: "13 : 00", value: "op-13" },
//                                                     { label: "14 : 00", value: "op-14" },
//                                                     { label: "15 : 00", value: "op-15" },
//                                                     { label: "16 : 00", value: "op-16" },
//                                                     { label: "17 : 00", value: "op-17" },
//                                                     { label: "18 : 00", value: "op-18" },
//                                                     { label: "19 : 00", value: "op-19" },
//                                                     { label: "20 : 00", value: "op-20" },
//                                                     { label: "21 : 00", value: "op-21" },
//                                                     { label: "22 : 00", value: "op-22" },
//                                                     { label: "23 : 00", value: "op-23" },
//                                                     { label: "24 : 00", value: "op-24" },
//                                                 ]}
//                                                 onChange={(value) => { setSelected6(value) }}
//                                                 placeholder=" -- select --"
//                                             />   
//                                         </FilterPanel>  
//                                       </div>

//                                       </div> 
//                                 </div>  
//                             </div>
 
//                             <div className="energy-saving-chart" style={{marginTop:"2em"}}>
                                        
//                               <WidgetWrapper>  

//                                 <TitleBar title='Energy Savings Overview' />  
                                
//                                     <div style={{ width: "96%", padding: "2em 2%", margin: "2em" }}>  

//                                           <ResponsiveContainer width="100%" height={350}>
//                                             <ComposedChart data={energySavingData} margin={{ top: 20, right: 30, left: 20, bottom: 10 }}>
//                                               <CartesianGrid strokeDasharray="3 3" /> 
//                                               <XAxis
//                                                 dataKey="date"
//                                                 tick={{ fontSize: 12 }}
//                                                 angle={-30}
//                                                 textAnchor="end"
//                                               /> 
//                                               <YAxis yAxisId="left" label={{ value: "Daily Savings (kWh)", angle: -90, position: "insideLeft" }} stroke="#3f51b5" />
//                                               <YAxis yAxisId="right" orientation="right" label={{ value: "Cumulative Savings (kWh)", angle: 90, position: "insideRight" }} stroke="#444444" />
//                                               <Tooltip />
//                                               <Legend verticalAlign="bottom" wrapperStyle={{ marginTop: 80 }} /> 
//                                               <Bar onClick={() => setShowModal(true)} yAxisId="left" dataKey="daily" fill="#467df4" name="Daily Savings" /> 
//                                               <Line yAxisId="right" dataKey="cumulative" stroke="#4caf50" dot={false} strokeWidth={2} name="Cumulative Savings" />
//                                             </ComposedChart>
//                                           </ResponsiveContainer>  
                              
//                                     </div>   

//                                       <div className="scope-overall">
//                                             <div className="scope-box blue-scope-box">
//                                                 <h4>Average Daily Savings</h4>
//                                                 <h3>125.25 <span>kWh</span></h3> 
//                                             </div>

//                                             <div className="scope-box green-scope-box">
//                                                 <h4> Total Savings </h4>
//                                                 <h3>2548.25 <span>kWh</span></h3>
                                                
//                                             </div>

//                                             <div className="scope-box purple-scope-box">
//                                               <h4>Best Savings Day </h4>
//                                               <h3>145.25 <span>kWh</span></h3>
//                                               <div className="scope-bottom">
//                                                 <em>2025-01-20</em> 
//                                               </div>
//                                           </div>
//                                      </div>

//                               </WidgetWrapper>  

//                             </div> 

//                         </div>  
             
//              <Modal title="Set Point Adjustments - Asset wise" className="asset_wise-popup" show={showModal} onClose={() => setShowModal(false)}>
                
//                 <div className="asset_wise-cont">
                         
//                             <div className="asset_wise-accordian">
//                                 {assetWiseData.map((item, index) => (
//                                   <div key={index} className="accordian-section"> 
                                  
//                                     <div className="accordian-section-list" onClick={() => toggleAccordion(index)}>
//                                       <div className="accordian-date">{item.date}</div>
//                                       <p className="total-saving">Total Savings: {item.totalSavings}</p>
//                                       <div className="accordian-section-list-rgt">
                                      
//                                       <span className="trade-icon" onClick={() => setShowModal1(true)}></span>  
//                                           <em className={`arrow-icon ${openIndex === index ? "up-arrow" : "down-arrow"}`}></em>
//                                       </div>
//                                     </div>
 
//                                     {openIndex === index && item.details.length > 0 && (
//                                       <div className="accordian-section-table">
//                                         <TableComponent
//                                           data={item.details} 
//                                           columns={[
//                                             { id: "date", label: "DATE" },
//                                             { id: "asset", label: "ASSET" },
//                                             { id: "oldValue", label: "OLD VALUE" },
//                                             { id: "setValue", label: "SET VALUE" },
//                                             { id: "savings", label: "SAVING (kWh)" },
//                                           ]} 

//                                           pageSize={5}
//                                           total={item.details.length}
//                                         />
//                                       </div>
//                                     )}
//                                   </div>
//                                 ))}

//                            </div>

//                      </div> 

//             <Modal title="Set Point Adjustments - Asset wise" className="asset_wise-popup" show={showModal1} onClose={() => setShowModal1(false)}> 

//               <ResponsiveContainer width="100%" height={400}>
//                 <ComposedChart data={energyChartData} margin={{ top: 20, right: 30, left: 20, bottom: 10 }}>
//                   <CartesianGrid strokeDasharray="3 3" /> 
//                   <XAxis dataKey="time" label={{ value: "Time (Hours)", position: "insideBottom", offset: -5 }} />
//                   <YAxis yAxisId="left" label={{ value: "Conditions", angle: -90, position: "insideLeft" }} />
//                   <YAxis yAxisId="right" orientation="right" label={{ value: "Energy Consumption (kWh)", angle: -90, position: "insideRight" }} /> 
//                   <Tooltip />
//                   <Legend /> 
//                   <Area yAxisId="right" type="monotone" dataKey="energySaving" stroke="none" fill="green" fillOpacity={0.3} name="Energy Saved Duration" /> 
//                   <Line yAxisId="left" type="monotone" dataKey="tempSetpoint" stroke="red" name="Temp Setpoint (°C)" />
//                   <Line yAxisId="left" type="monotone" dataKey="ambientTemp" stroke="green" name="Ambient Temp (°C)" />
//                   <Line yAxisId="left" type="monotone" dataKey="humidity" stroke="blue" name="Humidity (%)" />
//                   <Line yAxisId="left" type="monotone" dataKey="occupancy" stroke="cyan" name="Occupancy Level" /> 
//                   <Line yAxisId="right" type="monotone" dataKey="energySaving" stroke="magenta" strokeDasharray="5 5" name="Energy Saving (kWh)" /> 
//                 </ComposedChart>
//               </ResponsiveContainer> 

//             </Modal>
   
//         </Modal> 

//       </LinkWidgetContainer>
                            
//     </WidgetWrapper>
//  )
// }; 

// export default Energy_Optimization_Strategies;


  
 




 




 