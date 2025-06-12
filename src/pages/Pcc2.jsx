import React, { useEffect, useState } from 'react'
import axios from 'axios'
import CurrentTime from '../components/CurrentTime';
import { Link } from 'react-router-dom';
import { useTheme } from '../components/ThemeContext';
import { dark, green_fusion, light } from '../constants';
import Sidebar from '../components/Sidebar'
import { API_URL } from '../data/api';

const Pcc2 = () => {

  const [data, setData] = useState(null);
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${API_URL}`
        );
        setData(response.data[0]);
        console.log(response.data[0]);
      } catch (error) {
        console.error("Error fetching sensor data:", error);
      }
    };

    fetchData();

    const interval = setInterval(fetchData, 1500); // Fetch data every 60 seconds

    return () => clearInterval(interval); // Cleanup on component unmount
  }, []);

  const getPFClass = (avgPF) => {
    if (avgPF < 0.7) {
        return 'bg-red-400'; // Class for red background
    } else if (avgPF < 0.8) {
        return 'bg-yellow-400'; // Class for yellow background
    }
    return ''; // No special class
  }

  return (
    <div className='flex md:flex-row flex-col'>
      <Sidebar/>
      <section className="bg-[#F1F4FC] dark:bg-[#1e1e1e] w-full text-[#1F2937] px-3 h-screen overflow-auto 2xl:px-5">
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
        <section className="flex justify-center items-center">
              <div className=" my-8 bg-gray-400 xl:px-10 py-5 rounded-lg md:px-7 px-2 overflow-x-auto">
                <h2 className='font-bold text-xl text-center underline my-2 mb-6'>PCC2</h2>
                <div className="flex rounded-md justify-between text-center items-center font-Montserrat font-bold pr-9 my-2 ">
                  <h2 className="rounded-full text-gray-400 w-64 ">
                    PCC
                  </h2>
                  <p className="rounded-full ">Power(kW)</p>
                  <p className=" rounded-full">Energy(kWh)</p>
                  <p className=" rounded-full pr-4">Power Factor</p>
                  <p className=" rounded-full pr-4">kVA</p>
                </div>

                <div className="">

                <div className="param1-div">
                    <Link to='/SingleMeter/108'><h2 className='parameter'>
                        Main Meter
                      </h2></Link>
                      <p className='param-value'>
                        {data?.Total_KW_meter_108.toFixed(2)}
                      </p>
                      <p className='param-value'>
                        {data?.TotalNet_KWH_meter_108.toFixed(2)}
                      </p>
                      <p className='param-value'>
                        {data?.Avg_PF_meter_108.toFixed(2)}
                      </p>
                      <p className='param-value'>
                        {data?.Total_KVA_meter_108.toFixed(2)}
                      </p>
                    </div>


                  <div className="param1-div">
                    <Link to='/SingleMeter/101'><h2
                      className='parameter'
                    >
                      VIT Block 2 Lighting
                    </h2></Link>
                    <p
                      className='param-value'
                    >
                      {data?.Total_KW_meter_101.toFixed(2)}
                    </p>
                    <p
                      className='param-value'
                    >
                      {data?.TotalNet_KWH_meter_101.toFixed(2)}
                    </p>
                    <p
                      className={`param-value ${getPFClass(data?.Avg_PF_meter_101)}`}
                    >
                      {data?.Avg_PF_meter_101.toFixed(2)}
                    </p>
                    <p
                      className='param-value'
                    >
                      {data?.Total_KVA_meter_101.toFixed(2)}
                    </p>
                  </div>

                    <div className="param1-div">
                    <Link to='/SingleMeter/102'><h2 className='parameter'>
                        VIT Block 1 Lighting
                      </h2></Link>
                      <p className='param-value'>
                        {data?.Total_KW_meter_102.toFixed(2)}
                      </p>
                      <p className='param-value'>
                        {data?.TotalNet_KWH_meter_102.toFixed(2)}
                      </p>
                      <p className={`param-value ${getPFClass(data?.Avg_PF_meter_102)}`}>
                        {data?.Avg_PF_meter_102.toFixed(2)}
                      </p>
                      <p className='param-value'>
                        {data?.Total_KVA_meter_102.toFixed(2)}
                      </p>
                    </div>

                    <div className="param1-div">
                    <Link to='/SingleMeter/103'><h2 className='parameter'>
                        VIT Block-2 A/C's
                      </h2></Link>
                      <p className='param-value'>
                        {data?.Total_KW_meter_103}
                      </p>
                      <p className='param-value'>
                        {data?.TotalNet_KWH_meter_103}
                      </p>
                      <p className={`param-value ${getPFClass(data?.Avg_PF_meter_103)}`}>
                        {data?.Avg_PF_meter_103}
                      </p>
                      <p className='param-value'>
                        {data?.Total_KVA_meter_103}
                      </p>
                    </div>

                    <div className="param1-div">
                    <Link to='/SingleMeter/104'><h2 className='parameter'>
                        VIT Block-4 lighting
                      </h2></Link>
                      <p className='param-value'>
                        {data?.Total_KW_meter_104}
                      </p>
                      <p className='param-value'>
                        {data?.TotalNet_KWH_meter_104}
                      </p>
                      <p className={`param-value ${getPFClass(data?.Avg_PF_meter_104)}`}>
                        {data?.Avg_PF_meter_104}
                      </p>
                      <p className='param-value'>
                        {data?.Total_KVA_meter_104}
                      </p>
                    </div>

                    <div className="param1-div">
                    <Link to='/SingleMeter/105'><h2 className='parameter'>
                       VIT Block-4 A/C's
                      </h2></Link>
                      <p className='param-value'>
                        {data?.Total_KW_meter_105}
                      </p>
                      <p className='param-value'>
                        {data?.TotalNet_KWH_meter_105}
                      </p>
                      <p className={`param-value ${getPFClass(data?.Avg_PF_meter_105)}`}>
                        {data?.Avg_PF_meter_105}
                      </p>
                      <p className='param-value'>
                        {data?.Total_KVA_meter_105}
                      </p>
                    </div>

                    <div className="param1-div">
                    <Link to='/SingleMeter/106'><h2 className='parameter'>
                        4th Phase Main Panel Supply
                      </h2></Link>
                      <p className='param-value'>
                        {data?.Total_KW_meter_106}
                      </p>
                      <p className='param-value'>
                        {data?.TotalNet_KWH_meter_106}
                      </p>
                      <p className={`param-value ${getPFClass(data?.Avg_PF_meter_106)}`}>
                        {data?.Avg_PF_meter_106}
                      </p>
                      <p className='param-value'>
                        {data?.Total_KVA_meter_106}
                      </p>
                    </div>
    
                    <div className="param1-div">
                    <Link to='/SingleMeter/107'><h2 className='parameter'>
                        Power House-2
                      </h2></Link>
                      <p className='param-value'>
                        {data?.Total_KW_meter_107}
                      </p>
                      <p className='param-value'>
                        {data?.TotalNet_KWH_meter_107}
                      </p>
                      <p className={`param-value ${getPFClass(data?.Avg_PF_meter_107)}`}>
                        {data?.Avg_PF_meter_107}
                      </p>
                      <p className='param-value'>
                        {data?.Total_KVA_meter_107}
                      </p>
                    </div>

                    <div className="param1-div">
                    <Link to='/SingleMeter/110'><h2 className='parameter'>
                        Seetha Canteen Lighting
                      </h2></Link>
                      <p className='param-value'>
                        {data?.Total_KW_meter_110}
                      </p>
                      <p className='param-value'>
                        {data?.TotalNet_KWH_meter_110}
                      </p>
                      <p className={`param-value ${getPFClass(data?.Avg_PF_meter_110)}`}>
                        {data?.Avg_PF_meter_110}
                      </p>
                      <p className='param-value'>
                        {data?.Total_KVA_meter_110}
                      </p>
                    </div>

                    <div className="param1-div">
                    <Link to='/SingleMeter/111'><h2 className='parameter'>
                        53 rooms lighting supply
                      </h2></Link>
                      <p className='param-value'>
                        {data?.Total_KW_meter_111}
                      </p>
                      <p className='param-value'>
                        {data?.TotalNet_KWH_meter_111}
                      </p>
                      <p className={`param-value ${getPFClass(data?.Avg_PF_meter_111)}`}>
                        {data?.Avg_PF_meter_111}
                      </p>
                      <p className='param-value'>
                        {data?.Total_KVA_meter_111}
                      </p>
                    </div>

                    <div className="param1-div">
                    <Link to='/SingleMeter/112'><h2 className='parameter'>
                        8th Hostels Lighting
                      </h2></Link>
                      <p className='param-value'>
                        {data?.Total_KW_meter_112}
                      </p>
                      <p className='param-value'>
                        {data?.TotalNet_KWH_meter_112}
                      </p>
                      <p className={`param-value ${getPFClass(data?.Avg_PF_meter_112)}`}>
                        {data?.Avg_PF_meter_112}
                      </p>
                      <p className='param-value'>
                        {data?.Total_KVA_meter_112}
                      </p>
                    </div>

                    <div className="param1-div">
                    <Link to='/SingleMeter/113'><h2 className="parameter">
                        Seetha Indoor Audi Lighting
                      </h2></Link>
                      <p className='param-value'>
                        {data?.Total_KW_meter_113}
                      </p>
                      <p className='param-value'>
                        {data?.TotalNet_KWH_meter_113}
                      </p>
                      <p className={`param-value ${getPFClass(data?.Avg_PF_meter_113)}`}>
                        {data?.Avg_PF_meter_113}
                      </p>
                      <p className='param-value'>
                        {data?.Total_KVA_meter_113}
                      </p>
                    </div>

                    <div className="param1-div">
                    <Link to='/SingleMeter/114'><h2 className="parameter">
                        Medha Hostel
                      </h2></Link>
                      <p className='param-value'>
                        {data?.Total_KW_meter_114}
                      </p>
                      <p className='param-value'>
                        {data?.TotalNet_KWH_meter_114}
                      </p>
                      <p className={`param-value ${getPFClass(data?.Avg_PF_meter_114)}`}>
                        {data?.Avg_PF_meter_114}
                      </p>
                      <p className='param-value'>
                        {data?.Total_KVA_meter_114}
                      </p>
                    </div>

                    <div className="param1-div">
                    <Link to='/SingleMeter/115'><h2 className='parameter'>
                        VIT C block lighting
                      </h2></Link>
                      <p className='param-value'>
                        {data?.Total_KW_meter_115}
                      </p>
                      <p className='param-value'>
                        {data?.TotalNet_KWH_meter_115}
                      </p>
                      <p className={`param-value ${getPFClass(data?.Avg_PF_meter_115)}`}>
                        {data?.Avg_PF_meter_115}
                      </p>
                      <p className='param-value'>
                        {data?.Total_KVA_meter_115}
                      </p>
                    </div>
                    </div>
              </div>
            </section>
            </section>
    </div>
  )
}

export default Pcc2