import * as React from "react";
import { registerWidget, registerLink, registerUI, IContextProvider, } from './uxp';
// import { TitleBar, FilterPanel, WidgetWrapper } from "uxp/components";
import './styles.scss';

import { AreaChart, Area, ResponsiveContainer,  LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ComposedChart,  } from 'recharts';
  
import { DataList, WidgetWrapper, DynamicSelect, SearchBox, DataTable, MapComponent, TitleBar, ItemListCard, FilterPanel, DataGrid, ItemCard, FormField, Label, Select, Input, DateRangePicker, DatePicker, Checkbox, ProfileImage, Popover, TrendChartComponent, ToggleFilter } from "uxp/components";
    

interface IWidgetProps {
    uxpContext?: IContextProvider,
    instanceId?: string
}

// import Emission_Overview from './components/emissions_overview';   
import Energy_Optimization_Strategies from './components/energy_optimization_strategies';    
 

/**
 * Register as a Widget
 */
  

registerWidget({
    id: "energy_Optimization_Strategies",
    widget: Energy_Optimization_Strategies,
    configs: {
        layout: {
            // w: 12,
            // h: 12,
            // minH: 12,
            // minW: 12
        }
    }
});
 

 





// import * as React from "react";
// import { registerWidget, registerLink, registerUI, IContextProvider, enableLocalization, registerCustomWidgetTemplate, } from './uxp';
// import { TitleBar, FilterPanel, WidgetWrapper } from "uxp/components";
// import { IWDDesignModeProps } from "widget-designer/components";
// import BundleConfig from '../bundle.json';

// import './styles.scss';

// export interface IWidgetProps {
//     uxpContext?: IContextProvider,
//     instanceId?: string
//     designer?: IWDDesignModeProps,
//     uiProps?: any
// }

// const Energy_Optimization_StrategiesWidget: React.FunctionComponent<IWidgetProps> = (props) => {
//     return (
//         <WidgetWrapper>
//             <TitleBar title='Energy_Optimization_Strategies'>
//                 <FilterPanel>
//                 </FilterPanel>
//             </TitleBar>
//         </WidgetWrapper>
//     )
// };
 
// registerWidget({
//     id: "Energy_Optimization_Strategies",
//     widget: Energy_Optimization_StrategiesWidget,
//     configs: {
//         layout: {
//             // w: 12,
//             // h: 12,
//             // minH: 12,
//             // minW: 12
//         }
//     }
// });
 