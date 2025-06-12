import React, { useState, useEffect } from "react";
import axios from "axios";
import CurrentTime from "../components/CurrentTime";
import Loading from '../components/Loading'
import { useTheme } from "../components/ThemeContext";
import { dark, green_fusion, light, vishnu } from "../constants";
import RealTimeEnergyMeter from '../components/charts/RealTimeEnergyMeter';
import { Link } from "react-router-dom";
import { API_URL, API_URL2 } from "../data/api";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PowerFactorCharts from "../components/charts/PowerFactorCharts";
import PowerLineChart from "../components/charts/PowerLineChart";
import KvaLineChart from '../components/charts/KvaLineChart'
import EnergyUnits from "../components/EnergyUnits";
import EnergyConsumptionChart from "../components/charts/EnergyConsumptionChart";
import RealTimeKvaMeter from "../components/charts/RealTimeKvaMeter";

const Home = () => {
  const [data, setData] = useState(null);
  const { theme, toggleTheme } = useTheme();
  const [currentEnergy, setCurrentEnergy] = useState({
    meter_6: null,
    meter_108: null,
    meter_201: null,
    meter_227: null,
  });
  const [initialEnergyValues, setInitialEnergyValues] = useState({
    meter_6: null,
    meter_108: null,
    meter_201: null,
    meter_227: null,
  });
  const [todayConsumption, setTodayConsumption] = useState({
    meter_6: null,
    meter_108: null,
    meter_201: null,
    meter_227: null,
  });
  const [monthlyEnergy, setMonthlyEnergy] = useState(null)
  const [highestkva, setHighestkva] = useState({
    today:null,
    month:null
  })

  const notify = () => toast.error("Energy limit exceeded!");

  useEffect(() => {
    // Fetch previous day's energy (initial energy)
    const fetchPreviousDayEnergy = async () => {
      try {
        const response = await axios.get(`${API_URL2}/previousDayEnergy`);
        const response1 = await axios.get(`${API_URL2}/monthly-energy`);
        const response3 = await axios.get(`${API_URL2}/highest-kva`);

        setInitialEnergyValues(response.data.initialEnergyValues || {
          meter_6: null,
          meter_108: null,
          meter_201: null,
          meter_227: null,
        });
        setMonthlyEnergy(response1.data.totalEnergyConsumption.toFixed(3))
        setHighestkva({
          today: response3.data.highestKvaToday.toFixed(3),
          month: response3.data.highestKvaMonth.toFixed(3)
        })
      } catch (error) {
        console.error("Error fetching previous day energy:", error);
      }
    };

    fetchPreviousDayEnergy();
  }, []);

  useEffect(() => {
    // Fetch current energy values every minute
    const fetchData = async () => {
      try {
        const response = await axios.get(`${API_URL}`);
        const newData = response.data[0];
        setData(newData);
        setCurrentEnergy({
          meter_6: newData.TotalNet_KWH_meter_6,
          meter_108: newData.TotalNet_KWH_meter_108,
          meter_201: newData.TotalNet_KWH_meter_201,
          meter_227: newData.TotalNet_KWH_meter_227,
        });
      } catch (error) {
        console.error("Error fetching sensor data:", error);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 30000); // Fetch data every 1 minute

    return () => clearInterval(interval); // Cleanup on component unmount
  }, []);

  useEffect(() => {
    // Calculate consumption based on initial energy and current energy
    if (initialEnergyValues && currentEnergy) {
      setTodayConsumption({
        meter_6: initialEnergyValues.meter_6 && currentEnergy.meter_6 ? 
          (currentEnergy.meter_6 - initialEnergyValues.meter_6).toFixed(3) : 0,
        meter_108: initialEnergyValues.meter_108 && currentEnergy.meter_108 ? 
          (currentEnergy.meter_108 - initialEnergyValues.meter_108).toFixed(3) : 0,
        meter_201: initialEnergyValues.meter_201 && currentEnergy.meter_201 ? 
          (currentEnergy.meter_201 - initialEnergyValues.meter_201).toFixed(3) : 0,
        meter_227: initialEnergyValues.meter_227 && currentEnergy.meter_227 ? 
          (currentEnergy.meter_227 - initialEnergyValues.meter_227).toFixed(3) : 0,
      });
    }
  }, [initialEnergyValues, currentEnergy]);

  const energy = (
    Number(todayConsumption.meter_6) + 
    Number(todayConsumption.meter_201) + 
    Number(todayConsumption.meter_108)
  ).toFixed(3);

  const getPFClass = (avgPF) => {
    if (avgPF < 0.7) {
        return 'bg-red-300'; // Class for red background
    } else if (avgPF < 0.8) {
        return 'bg-yellow-300'; // Class for yellow background
    }
    return ''; // No special class
  }

  if (!data) {
    return <div className="flex justify-center items-center w-full"><Loading/></div>;
  }

  return (
    <section className="bg-[#F1F4FC] dark:bg-[#1e1e1e] w-full text-[#1F2937] px-3 h-screen overflow-auto 2xl:px-5">
      <ToastContainer />
      <header className="justify-between flex items-center py-2">
        <Link to='/'><h1 className="md:text-2xl 2xl:text-5xl text-xl p-4 flex md:gap-3 font-Audiowide font-bold dark:text-[#e4e2e2]">
        Green Fusion IoT Solutions<img src={green_fusion} className="w-20" alt="" /> 
        </h1></Link>
        <span className="flex flex-row justify-center items-center">
          <img
            className="w-[30px] h-[30px] cursor-pointer 2xl:w-[42px] 2xl:h-[42px]"
            src={theme === "light" ? dark : light}
            alt="add"
            onClick={toggleTheme}
          />
          <p className="md:text-sm 2xl:text-2xl text-xs text-center px-4 text-gray-500 font-Audiowide font-medium dark:text-[#eae8e8]">
            <CurrentTime />
          </p>
        </span>
      </header>
      <div className="grid lg:grid-cols-2 gap-4 grid-cols-1 mt- 2xl:mt-6">
        <div className="w-full flex flex-col justify-around bg-[#a4a4e3] rounded-lg min-[2000px]:text-4xl xl:text-xl text-lg max-[530px]:text-[12px] font-medium shadow font-OpenSans py-4 px-3 2xl:px-7 max-[500px]:px-0">
          <div className="param-div font-bold font-Montserrat text-lg max-[530px]:text-base max-[350px]:text-[13px]">
            <h2 className=" value bg-transparent">
              PCC
            </h2>
            <p className="  value bg-transparent pr-2 leading-5">
              Power<p className="text-sm max-[530px]:text-[11px]">(kW)</p>
            </p>
            <p className="  value bg-transparent pr-2 leading-5">
              Energy<p className="text-sm max-[530px]:text-[11px]">(kWh)</p>
            </p>
            <p className="  value bg-transparent pr-2">
              kVA
            </p>
            <p className="  value bg-transparent leading-5 pr-1">
              Power<p>Factor</p>
            </p>
            <p className="  value bg-transparent pr-5">
              kVAh
            </p>
          </div>
          <div className="param-div">
            <Link to='/pcc1'><h2 className="pccs">
              PCC1
            </h2></Link>
            <p className="value">
              {data?.Total_KW_meter_6.toFixed(2)}
            </p>
            <p className="value">
              {data?.TotalNet_KWH_meter_6.toFixed(1)} {/* {todayConsumption.meter_6} */}
            </p>
            <p className="value">
              {data?.Total_KVA_meter_6.toFixed(2)}
            </p>
            <p className="value">
              {data?.Avg_PF_meter_6.toFixed(2)}
            </p>
            <p className="value">
              {data.TotalNet_KVAH_meter_6.toFixed(1)}
            </p>
          </div>
          
          <div className="param-div">
            <Link to='/pcc2'><h2 className="pccs">
              PCC2
            </h2></Link>
            <p className="value">
                {data?.Total_KW_meter_108.toFixed(2)}
            </p>
            <p className="value">
                {data?.TotalNet_KWH_meter_108.toFixed(1)} {/* {todayConsumption.meter_108} */}
            </p>
            <p className="value">
                {data?.Total_KVA_meter_108.toFixed(2)}
            </p>
            <p className="value">
              {data?.Avg_PF_meter_108.toFixed(3)}
            </p>
            <p className="value">
              {data?.TotalNet_KVAH_meter_108.toFixed(1)}
            </p>
          </div>
          <div className="param-div">
            <Link to='/pcc3'><h2 className="pccs">
              PCC3
            </h2></Link>
            <p className="value">
            {data?.Total_KW_meter_201.toFixed(2)}
            </p>
            <p className="value">
            {data?.TotalNet_KWH_meter_201.toFixed(1)} {/* {todayConsumption.meter_201} */}
            </p>
            <p className="value">
            {data?.Total_KVA_meter_201.toFixed(2)}
            </p>
            <p className={`value ${getPFClass(data?.Avg_PF_meter_201)}`}>
            {data?.Avg_PF_meter_201.toFixed(3)}
            </p>
            <p className="value">
            {data?.TotalNet_KVAH_meter_201.toFixed(1)}
            </p>
          </div>
        </div>
        <div className="grid md:grid-cols-2 gap-4 grid-cols-1">
          {/* <RealTimeEnergyMeter totalEnergy={data?.TotalNet_KWH_meter_1.toFixed(2)} /> */}
          <EnergyUnits energy={energy} monthlyEnergy={monthlyEnergy} />
          <div className="flex flex-col gap-4">
            <RealTimeKvaMeter kva={(data?.Total_KVA_meter_6 + data?.Total_KVA_meter_108 + data?.Total_KVA_meter_201).toFixed(2)} todayKva={highestkva.today} monthKva = {highestkva.month} />
            {/* <PowerFactorCharts powerFactor={data?.Avg_PF_meter_1.toFixed(3)} />  */}
          </div>
        </div>
      </div>
      <div className="flex md:flex-row gap-4 flex-col h-[44%] mt-4 ">
        <EnergyConsumptionChart/>
        <PowerLineChart/>
        <KvaLineChart/>
      </div>
    </section>
  );
};

export default Home;