import DashboardBox from "@/components/DashboardBox"
import { useGetKpisQuery, useGetProductsQuery } from "@/state/api"
import {useMemo} from 'react'
import {useTheme, Box, Typography} from "@mui/material"
import { ResponsiveContainer, AreaChart, XAxis, ScatterChart, Scatter,
  YAxis, Tooltip, Area, Line, CartesianGrid, Legend, LineChart, Pie, Cell, Bar, BarChart, PieChart, ZAxis } from "recharts";
import BoxHeader from "@/components/BoxHeader";
import FlexBetween from "@/components/FlexBetween";

const pieData = [
  {name:"Group A", value:600},
  {name:"Group B", value:400}
]

const Row2 = () => {
  const {palette} = useTheme()
  const pieColors = [palette.primary[800], palette.primary[300]]
  const {data:operationalData} = useGetKpisQuery();
  const {data:productData} = useGetProductsQuery();
  const operationalExpenses = useMemo(()=>{
    return(
    operationalData && operationalData[0].monthlyData.map(({month, operationalExpenses, nonOperationalExpenses}) =>{
      return{
        name:month.substring(0,3),
        "Operational Expenses":operationalExpenses,
        "Non Operational Expenses":nonOperationalExpenses
      };
    })
    );
  },[operationalData])

  const productExpenseData = useMemo(()=>{
    return(
    productData && productData.map(({_id, price, expense}) =>{
      return{
        id:_id,
        price:price,
        expense:expense
      };
    })
    );
  },[productData])

  return (
    <>
    <DashboardBox bgcolor="#fff" gridArea="d">
    <BoxHeader title="Operational vs Non-Operational Expenses"
      sideText="+4%"></BoxHeader>
    <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={operationalExpenses}
          margin={{
            top: 20,
            right: 0,
            left: -10,
            bottom: 60,
          }}
        >
          <CartesianGrid vertical={false} stroke={palette.grey[800]}/>
          <XAxis dataKey="name" tickLine={false} style={{fontSize:"10px"}}/>
          <YAxis tickLine={false}
          yAxisId="left"
          orientation="left"
          axisLine={false} 
          style={{fontSize:"10px"}}
          />
          <YAxis tickLine={false}
          yAxisId="right"
          orientation="right"
          axisLine={false} 
          style={{fontSize:"10px"}}
          />
          <Tooltip />
          <Line yAxisId="left" type="monotone" dataKey="Non Operational Expenses"
          stroke={palette.tertiary[500]}/>
          <Line yAxisId="right" type="monotone" dataKey="Operational Expenses"
          stroke={palette.primary.main} />
        </LineChart>
      </ResponsiveContainer>
    </DashboardBox>
    <DashboardBox bgcolor="#fff" gridArea="c">
    <BoxHeader title="Revenue Month By Month"
      subtitle="graph representing the revenue month by month"
      sideText="+4%"></BoxHeader>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          width={500}
          height={300}
          data={operationalExpenses}
          margin={{
            top: 17,
            right: 15,
            left: -5,
            bottom: 58,
          }}
        >
          <defs>
          <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
              <stop offset="10%" stopColor={palette.primary[700]}
              stopOpacity={1}/>
              <stop offset="95%" stopColor={palette.primary[700]}
              stopOpacity={0.5}/>
            </linearGradient>
            </defs>
          <CartesianGrid vertical={false} stroke={palette.grey[800]}/>
          <XAxis dataKey="name" axisLine={false} tickLine={false} style={{fontSize: '10px'}}/>
          <YAxis axisLine={false} tickLine={false} style={{fontSize: '10px'}}/>
          <Tooltip />
          <Bar dataKey="revenue" fill="url(#colorRevenue)"/>
        </BarChart>
      </ResponsiveContainer>
    </DashboardBox>

    <DashboardBox bgcolor="#fff" gridArea="e">
      <BoxHeader title="Campaigns and Targets" sideText="+10%"/>
      <FlexBetween mt="0.25rem" gap="1.5rem" pr="1rem">
      <PieChart width={110} height={95}
      margin={{
        top: 0,
        right: -10,
        left: 10,
        bottom: 0,
      }}>
        <Pie
        stroke="none"
          data={pieData}
          innerRadius={18}
          outerRadius={38}
          paddingAngle={2}
          dataKey="value"
        >
          {pieData.map((entry, index) => (
            <Cell fill={pieColors[index]} key={`cell-${index}`}/>
          ))}
        </Pie>
      </PieChart>
      <Box ml="-0.7rem" flexBasis="40%" textAlign="center">
        <Typography variant="h5">Target Sales</Typography>
        <Typography m="0.3rem 0" variant="h3" color={palette.primary[300]}>83</Typography>
        <Typography variant="h6">Finance goals of the campaign that is desired</Typography>
      </Box>
      <Box ml="-0.7rem" flexBasis="40%">
        <Typography variant="h5">Losses in Revenue</Typography>
        <Typography variant="h6">Losses are down 25%</Typography>
        <Typography mt="0.4rem" variant="h5">Profit Margins</Typography>
        <Typography mt="0.4rem" variant="h6">Margins are up by 30% from last month</Typography>
      </Box>
      </FlexBetween>
    </DashboardBox>
    <DashboardBox bgcolor="#fff" gridArea="f">
    <BoxHeader title="Product Prices vs Expenses" sideText="-7%"/>
    <ResponsiveContainer width="100%" height="100%">
        <ScatterChart
          margin={{
            top: 20,
            right: 25,
            bottom: 40,
            left: 0,
          }}
        >
          <CartesianGrid stroke={palette.grey[800]}/>
          <XAxis type="number" dataKey="price" name="price" axisLine={false} tickLine={false}
          style={{fontSize:"10px"}} tickFormatter={(v)=>`$${v}`}/>
          <YAxis type="number" dataKey="expense" name="expense" axisLine={false} tickLine={false}
          style={{fontSize:"10px"}} tickFormatter={(v)=>`$${v}`}/>
          <ZAxis type="number" range={[20]}/>
          <Tooltip formatter={(v)=>`$${v}`}/>
          <Scatter name="Product Expense Ratio" data={productExpenseData} fill="#8884d8" />
        </ScatterChart>
      </ResponsiveContainer>
    </DashboardBox>
    </>
  )
}

export default Row2