import React, { useEffect, useState } from 'react'
import axios from 'axios'
import CurrentTime from '../components/CurrentTime';
import { Link } from 'react-router-dom';
import { useTheme } from '../components/ThemeContext';
import { dark, green_fusion, light } from '../constants';
import Sidebar from '../components/Sidebar'
import { API_URL } from '../data/api';

const Pcc3 = () => {

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
              <h2 className='font-bold text-xl text-center underline my-2 mb-6'>PCC3</h2>
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
                    <Link to='/SingleMeter/201'><h2
                      className='parameter'
                    >
                     Main meter
                    </h2></Link>
                    <p
                      className='param-value'
                    >
                      {data?.Total_KW_meter_201.toFixed(2)}
                    </p>
                    <p
                      className='param-value'
                    >
                      {data?.TotalNet_KWH_meter_201.toFixed(2)}
                    </p>
                    <p
                      className={`param-value ${getPFClass(data?.Avg_PF_meter_201)}`}
                    >
                      {data?.Avg_PF_meter_201.toFixed(2)}
                    </p>
                    <p
                      className='param-value'
                    >
                      {data?.Total_KVA_meter_201.toFixed(2)}
                    </p>
                  </div>


                <div className="param1-div">
                    <Link to='/SingleMeter/226'><h2
                      className='parameter'
                    >
                     11F1 800A TPN ACB
                    </h2></Link>
                    <p
                      className='param-value'
                    >
                      {data?.Total_KW_meter_226.toFixed(2)}
                    </p>
                    <p
                      className='param-value'
                    >
                      {data?.TotalNet_KWH_meter_226.toFixed(2)}
                    </p>
                    <p
                      className={`param-value ${getPFClass(data?.Avg_PF_meter_226)}`}
                    >
                      {data?.Avg_PF_meter_226.toFixed(2)}
                    </p>
                    <p
                      className='param-value'
                    >
                      {data?.Total_KVA_meter_226.toFixed(2)}
                    </p>
                  </div>

                  <div className="param1-div">
                    <Link to='/SingleMeter/222'><h2
                      className='parameter'
                    >
                      10F1 400A TPN SFU
                    </h2></Link>
                    <p
                      className='param-value'
                    >
                      {data?.Total_KW_meter_222.toFixed(2)}
                    </p>
                    <p
                      className='param-value'
                    >
                      {data?.TotalNet_KWH_meter_222.toFixed(2)}
                    </p>
                    <p
                      className={`param-value ${getPFClass(data?.Avg_PF_meter_222)}`}
                    >
                      {data?.Avg_PF_meter_222.toFixed(2)}
                    </p>
                    <p
                      className='param-value'
                    >
                      {data?.Total_KVA_meter_222.toFixed(2)}
                    </p>
                  </div>

                  <div className="param1-div">
                    <Link to='/SingleMeter/223'><h2
                      className='parameter'
                    >
                      10F2 400A TPN SFU
                    </h2></Link>
                    <p
                      className='param-value'
                    >
                      {data?.Total_KW_meter_223.toFixed(2)}
                    </p>
                    <p
                      className='param-value'
                    >
                      {data?.TotalNet_KWH_meter_223.toFixed(2)}
                    </p>
                    <p
                      className={`param-value ${getPFClass(data?.Avg_PF_meter_223)}`}
                    >
                      {data?.Avg_PF_meter_223.toFixed(2)}
                    </p>
                    <p
                      className='param-value'
                    >
                      {data?.Total_KVA_meter_223.toFixed(2)}
                    </p>
                  </div>

                  <div className="param1-div">
                    <Link to='/SingleMeter/224'><h2
                      className='parameter'
                    >
                      Womens Ground Panel
                    </h2></Link>
                    <p
                      className='param-value'
                    >
                      {data?.Total_KW_meter_224.toFixed(2)}
                    </p>
                    <p
                      className='param-value'
                    >
                      {data?.TotalNet_KWH_meter_224.toFixed(2)}
                    </p>
                    <p
                      className={`param-value ${getPFClass(data?.Avg_PF_meter_224)}`}
                    >
                      {data?.Avg_PF_meter_224.toFixed(2)}
                    </p>
                    <p
                      className='param-value'
                    >
                      {data?.Total_KVA_meter_224.toFixed(2)}
                    </p>
                  </div>

                  <div className="param1-div">
                    <Link to='/SingleMeter/225'><h2
                      className='parameter'
                    >
                      SVECW Seminar Hall
                    </h2></Link>
                    <p
                      className='param-value'
                    >
                      {data?.Total_KW_meter_225.toFixed(2)}
                    </p>
                    <p
                      className='param-value'
                    >
                      {data?.TotalNet_KWH_meter_225.toFixed(2)}
                    </p>
                    <p
                      className={`param-value ${getPFClass(data?.Avg_PF_meter_225)}`}
                    >
                      {data?.Avg_PF_meter_225.toFixed(2)}
                    </p>
                    <p
                      className='param-value'
                    >
                      {data?.Total_KVA_meter_225.toFixed(2)}
                    </p>
                  </div>

                  <div className="param1-div">
                    <Link to='/SingleMeter/218'><h2
                      className='parameter'
                    >
                      9F1 400A TPN SFU
                    </h2></Link>
                    <p
                      className='param-value'
                    >
                      {data?.Total_KW_meter_218.toFixed(2)}
                    </p>
                    <p
                      className='param-value'
                    >
                      {data?.TotalNet_KWH_meter_218.toFixed(2)}
                    </p>
                    <p
                      className={`param-value ${getPFClass(data?.Avg_PF_meter_218)}`}
                    >
                      {data?.Avg_PF_meter_218.toFixed(2)}
                    </p>
                    <p
                      className='param-value'
                    >
                      {data?.Total_KVA_meter_218.toFixed(2)}
                    </p>
                  </div>

                  <div className="param1-div">
                    <Link to='/SingleMeter/219'><h2
                      className='parameter'
                    >
                      9F2 400A TPN SFU
                    </h2></Link>
                    <p
                      className='param-value'
                    >
                      {data?.Total_KW_meter_219.toFixed(2)}
                    </p>
                    <p
                      className='param-value'
                    >
                      {data?.TotalNet_KWH_meter_219.toFixed(2)}
                    </p>
                    <p
                      className={`param-value ${getPFClass(data?.Avg_PF_meter_219)}`}
                    >
                      {data?.Avg_PF_meter_219.toFixed(2)}
                    </p>
                    <p
                      className='param-value'
                    >
                      {data?.Total_KVA_meter_219.toFixed(2)}
                    </p>
                  </div>

                  <div className="param1-div">
                    <Link to='/SingleMeter/220'><h2
                      className='parameter'
                    >
                      9F3 315A TPN SFU
                    </h2></Link>
                    <p
                      className='param-value'
                    >
                      {data?.Total_KW_meter_220.toFixed(2)}
                    </p>
                    <p
                      className='param-value'
                    >
                      {data?.TotalNet_KWH_meter_220.toFixed(2)}
                    </p>
                    <p
                      className={`param-value ${getPFClass(data?.Avg_PF_meter_220)}`}
                    >
                      {data?.Avg_PF_meter_220.toFixed(2)}
                    </p>
                    <p
                      className='param-value'
                    >
                      {data?.Total_KVA_meter_220.toFixed(2)}
                    </p>
                  </div>

                  <div className="param1-div">
                    <Link to='/SingleMeter/221'><h2
                      className='parameter'
                    >
                      9F4 250A TPN SFU
                    </h2></Link>
                    <p
                      className='param-value'
                    >
                      {data?.Total_KW_meter_221.toFixed(2)}
                    </p>
                    <p
                      className='param-value'
                    >
                      {data?.TotalNet_KWH_meter_221.toFixed(2)}
                    </p>
                    <p
                      className={`param-value ${getPFClass(data?.Avg_PF_meter_221)}`}
                    >
                      {data?.Avg_PF_meter_221.toFixed(2)}
                    </p>
                    <p
                      className='param-value'
                    >
                      {data?.Total_KVA_meter_221.toFixed(2)}
                    </p>
                  </div>

                    <div className="param1-div">
                    <Link to='/SingleMeter/214'><h2 className='parameter'>
                        8F1 400A TPN SFU
                      </h2></Link>
                      <p className='param-value'>
                        {data?.Total_KW_meter_214.toFixed(2)}
                      </p>
                      <p className='param-value'>
                        {data?.TotalNet_KWH_meter_214.toFixed(2)}
                      </p>
                      <p className={`param-value ${getPFClass(data?.Avg_PF_meter_214)}`}>
                        {data?.Avg_PF_meter_214.toFixed(2)}
                      </p>
                      <p className='param-value'>
                        {data?.Total_KVA_meter_214.toFixed(2)}
                      </p>
                    </div>

                    <div className="param1-div">
                    <Link to='/SingleMeter/215'><h2 className='parameter'>
                    8F2 400A TPN SFU
                      </h2></Link>
                      <p className='param-value'>
                        {data?.Total_KW_meter_215}
                      </p>
                      <p className='param-value'>
                        {data?.TotalNet_KWH_meter_215}
                      </p>
                      <p className={`param-value ${getPFClass(data?.Avg_PF_meter_215)}`}>
                        {data?.Avg_PF_meter_215}
                      </p>
                      <p className='param-value'>
                        {data?.Total_KVA_meter_215}
                      </p>
                    </div>

                    <div className="param1-div">
                    <Link to='/SingleMeter/216'><h2 className='parameter'>
                    8F3 315A TPN SFU
                      </h2></Link>
                      <p className='param-value'>
                        {data?.Total_KW_meter_216}
                      </p>
                      <p className='param-value'>
                        {data?.TotalNet_KWH_meter_216}
                      </p>
                      <p className={`param-value ${getPFClass(data?.Avg_PF_meter_216)}`}>
                        {data?.Avg_PF_meter_216}
                      </p>
                      <p className='param-value'>
                        {data?.Total_KVA_meter_216}
                      </p>
                    </div>

                    <div className="param1-div">
                    <Link to='/SingleMeter/217'><h2 className='parameter'>
                    8F4 250A TPN SFU
                      </h2></Link>
                      <p className='param-value'>
                        {data?.Total_KW_meter_217}
                      </p>
                      <p className='param-value'>
                        {data?.TotalNet_KWH_meter_217}
                      </p>
                      <p className={`param-value ${getPFClass(data?.Avg_PF_meter_217)}`}>
                        {data?.Avg_PF_meter_217}
                      </p>
                      <p className='param-value'>
                        {data?.Total_KVA_meter_217}
                      </p>
                    </div>
    
                    <div className="param1-div">
                    <Link to='/SingleMeter/210'><h2 className='parameter'>
                        6F1 400A TPN SFU
                      </h2></Link>
                      <p className='param-value'>
                        {data?.Total_KW_meter_210}
                      </p>
                      <p className='param-value'>
                        {data?.TotalNet_KWH_meter_210}
                      </p>
                      <p className={`param-value ${getPFClass(data?.Avg_PF_meter_210)}`}>
                        {data?.Avg_PF_meter_210}
                      </p>
                      <p className='param-value'>
                        {data?.Total_KVA_meter_210}
                      </p>
                    </div>

                    <div className="param1-div">
                    <Link to='/SingleMeter/211'><h2 className='parameter'>
                      6F2 400A TPN SFU
                      </h2></Link>
                      <p className='param-value'>
                        {data?.Total_KW_meter_211}
                      </p>
                      <p className='param-value'>
                        {data?.TotalNet_KWH_meter_211}
                      </p>
                      <p className={`param-value ${getPFClass(data?.Avg_PF_meter_211)}`}>
                        {data?.Avg_PF_meter_211}
                      </p>
                      <p className='param-value'>
                        {data?.Total_KVA_meter_211}
                      </p>
                    </div>

                    <div className="param1-div">
                    <Link to='/SingleMeter/212'><h2 className="parameter">
                    6F3 315A TPN SFU
                      </h2></Link>
                      <p className='param-value'>
                        {data?.Total_KW_meter_212}
                      </p>
                      <p className='param-value'>
                        {data?.TotalNet_KWH_meter_212}
                      </p>
                      <p className={`param-value ${getPFClass(data?.Avg_PF_meter_212)}`}>
                        {data?.Avg_PF_meter_212}
                      </p>
                      <p className='param-value'>
                        {data?.Total_KVA_meter_212}
                      </p>
                    </div>

                    <div className="param1-div">
                    <Link to='/SingleMeter/213'><h2 className='parameter'>
                    6F4 250A TPN SFU
                      </h2></Link>
                      <p className='param-value'>
                        {data?.Total_KW_meter_213}
                      </p>
                      <p className='param-value'>
                        {!data?.TotalNet_KWH_meter_213 ? 0 : data?.TotalNet_KWH_meter_213}
                      </p>
                      <p className={`param-value ${getPFClass(data?.Avg_PF_meter_213)}`}>
                        {data?.Avg_PF_meter_213}
                      </p>
                      <p className='param-value'>
                        {data?.Total_KVA_meter_213}
                      </p>
                    </div>

                    <div className="param1-div">
                    <Link to='/SingleMeter/206'><h2 className='parameter'>
                        Womens Ground Panel A/C
                      </h2></Link>
                      <p className='param-value'>
                        {data?.Total_KW_meter_206}
                      </p>
                      <p className='param-value'>
                        {data?.TotalNet_KWH_meter_206}
                      </p>
                      <p className={`param-value ${getPFClass(data?.Avg_PF_meter_206)}`}>
                        {data?.Avg_PF_meter_206}
                      </p>
                      <p className='param-value'>
                        {data?.Total_KVA_meter_206}
                      </p>
                    </div>

                    <div className="param1-div">
                    <Link to='/SingleMeter/208'><h2 className='parameter'>
                        4F3 315A TPN SFU
                      </h2></Link>
                      <p className='param-value'>
                        {data?.Total_KW_meter_208}
                      </p>
                      <p className='param-value'>
                        {data?.TotalNet_KWH_meter_208}
                      </p>
                      <p className={`param-value ${getPFClass(data?.Avg_PF_meter_208)}`}>
                        {data?.Avg_PF_meter_208}
                      </p>
                      <p className='param-value'>
                        {data?.Total_KVA_meter_208}
                      </p>
                    </div>

                    <div className="param1-div">
                    <Link to='/SingleMeter/209'><h2 className='parameter'>
                        SVECW Seminar Hall AC'S
                      </h2></Link>
                      <p className='param-value'>
                        {data?.Total_KW_meter_209}
                      </p>
                      <p className='param-value'>
                        {data?.TotalNet_KWH_meter_209}
                      </p>
                      <p className={`param-value ${getPFClass(data?.Avg_PF_meter_209)}`}>
                        {data?.Avg_PF_meter_209}
                      </p>
                      <p className='param-value'>
                        {data?.Total_KVA_meter_209}
                      </p>
                    </div>

                    <div className="param1-div">
                    <Link to='/SingleMeter/204'><h2 className='parameter'>
                        3F1 800A TPN ACB
                      </h2></Link>
                      <p className='param-value'>
                        {data?.Total_KW_meter_204}
                      </p>
                      <p className='param-value'>
                        {data?.TotalNet_KWH_meter_204}
                      </p>
                      <p className={`param-value ${getPFClass(data?.Avg_PF_meter_204)}`}>
                        {data?.Avg_PF_meter_204}
                      </p>
                      <p className='param-value'>
                        {data?.Total_KVA_meter_204}
                      </p>
                    </div>

                    <div className="param1-div">
                    <Link to='/SingleMeter/205'><h2 className='parameter'>
                        3F2 800A TPN ACB
                      </h2></Link>
                      <p className='param-value'>
                        {data?.Total_KW_meter_205}
                      </p>
                      <p className='param-value'>
                        {data?.TotalNet_KWH_meter_205}
                      </p>
                      <p className={`param-value ${getPFClass(data?.Avg_PF_meter_205)}`}>
                        {data?.Avg_PF_meter_205}
                      </p>
                      <p className='param-value'>
                        {data?.Total_KVA_meter_205}
                      </p>
                    </div>

                    <div className="param1-div">
                    <Link to='/SingleMeter/202'><h2 className='parameter'>
                        APRC Panel Supply 
                      </h2></Link>
                      <p className='param-value'>
                        {data?.Total_KW_meter_202}
                      </p>
                      <p className='param-value'>
                        {data?.TotalNet_KWH_meter_202}
                      </p>
                      <p className={`param-value ${getPFClass(data?.Avg_PF_meter_202)}`}>
                        {data?.Avg_PF_meter_202}
                      </p>
                      <p className='param-value'>
                        {data?.Total_KVA_meter_202}
                      </p>
                    </div>

                    <div className="param1-div">
                    <Link to='/SingleMeter/203'><h2 className='parameter'>
                        Power Room-1 Loop Supply
                      </h2></Link>
                      <p className='param-value'>
                        {data?.Total_KW_meter_203}
                      </p>
                      <p className='param-value'>
                        {data?.TotalNet_KWH_meter_203}
                      </p>
                      <p className={`param-value ${getPFClass(data?.Avg_PF_meter_203)}`}>
                        {data?.Avg_PF_meter_203}
                      </p>
                      <p className='param-value'>
                        {data?.Total_KVA_meter_203}
                      </p>
                    </div>

                    <h2 className='text-center text-lg font-semibold underline mt-4 my-2'>PCC3-A</h2>
                    <div className="param1-div">
                    <Link to='/SingleMeter/227'><h2
                      className='parameter'
                    >
                      Main meter
                    </h2></Link>
                    <p
                      className='param-value'
                    >
                      {data?.Total_KW_meter_227.toFixed(2)}
                    </p>
                    <p
                      className='param-value'
                    >
                      {data?.TotalNet_KWH_meter_227.toFixed(2)}
                    </p>
                    <p
                      className={`param-value ${getPFClass(data?.Avg_PF_meter_227)}`}
                    >
                      {data?.Avg_PF_meter_227.toFixed(2)}
                    </p>
                    <p
                      className='param-value'
                    >
                      {data?.Total_KVA_meter_227.toFixed(2)}
                    </p>
                  </div>

                    <div className="param1-div">
                    <Link to='/SingleMeter/51'><h2
                      className='parameter'
                    >
                      VDC Block 2&3 Lighting
                    </h2></Link>
                    <p
                      className='param-value'
                    >
                      {data?.Total_KW_meter_51.toFixed(2)}
                    </p>
                    <p
                      className='param-value'
                    >
                      {data?.TotalNet_KWH_meter_51.toFixed(2)}
                    </p>
                    <p
                      className={`param-value ${getPFClass(data?.Avg_PF_meter_51)}`}
                    >
                      {data?.Avg_PF_meter_51.toFixed(2)}
                    </p>
                    <p
                      className='param-value'
                    >
                      {data?.Total_KVA_meter_51.toFixed(2)}
                    </p>
                  </div>

                    <div className="param1-div">
                    <Link to='/SingleMeter/52'><h2 className='parameter'>
                        VDC Block 2&3 AC's
                      </h2></Link>
                      <p className='param-value'>
                        {data?.Total_KW_meter_52.toFixed(2)}
                      </p>
                      <p className='param-value'>
                        {data?.TotalNet_KWH_meter_52.toFixed(2)}
                      </p>
                      <p className={`param-value ${getPFClass(data?.Avg_PF_meter_52)}`}>
                        {data?.Avg_PF_meter_52.toFixed(2)}
                      </p>
                      <p className='param-value'>
                        {data?.Total_KVA_meter_52.toFixed(2)}
                      </p>
                    </div>

                    <div className="param1-div">
                    <Link to='/SingleMeter/53'><h2 className='parameter'>
                        Mini Auditorium AC's
                      </h2></Link>
                      <p className='param-value'>
                        {data?.Total_KW_meter_53}
                      </p>
                      <p className='param-value'>
                        {data?.TotalNet_KWH_meter_53}
                      </p>
                      <p className={`param-value ${getPFClass(data?.Avg_PF_meter_53)}`}>
                        {data?.Avg_PF_meter_53}
                      </p>
                      <p className='param-value'>
                        {data?.Total_KVA_meter_53}
                      </p>
                    </div>

                    <div className="param1-div">
                    <Link to='/SingleMeter/54'><h2 className='parameter'>
                        Sumedha Hostel AC's
                      </h2></Link>
                      <p className='param-value'>
                        {data?.Total_KW_meter_54}
                      </p>
                      <p className='param-value'>
                        {data?.TotalNet_KWH_meter_54}
                      </p>
                      <p className={`param-value ${getPFClass(data?.Avg_PF_meter_54)}`}>
                        {data?.Avg_PF_meter_54}
                      </p>
                      <p className='param-value'>
                        {data?.Total_KVA_meter_54}
                      </p>
                    </div>

                    <div className="param1-div">
                    <Link to='/SingleMeter/55'><h2 className='parameter'>
                        Sita Auditorium AC's
                      </h2></Link>
                      <p className='param-value'>
                        {data?.Total_KW_meter_55}
                      </p>
                      <p className='param-value'>
                        {data?.TotalNet_KWH_meter_55}
                      </p>
                      <p className={`param-value ${getPFClass(data?.Avg_PF_meter_55)}`}>
                        {data?.Avg_PF_meter_55}
                      </p>
                      <p className='param-value'>
                        {data?.Total_KVA_meter_55}
                      </p>
                    </div>

                    <div className="param1-div">
                    <Link to='/SingleMeter/57'><h2 className='parameter'>
                        VDC Girls Hostels
                      </h2></Link>
                      <p className='param-value'>
                        {data?.Total_KW_meter_57}
                      </p>
                      <p className='param-value'>
                        {data?.TotalNet_KWH_meter_57}
                      </p>
                      <p className={`param-value ${getPFClass(data?.Avg_PF_meter_57)}`}>
                        {data?.Avg_PF_meter_57}
                      </p>
                      <p className='param-value'>
                        {data?.Total_KVA_meter_57}
                      </p>
                    </div>
    
                    <div className="param1-div">
                    <Link to='/SingleMeter/58'><h2 className='parameter'>
                        VDC Block-1 AC's
                      </h2></Link>
                      <p className='param-value'>
                        {data?.Total_KW_meter_58}
                      </p>
                      <p className='param-value'>
                        {data?.TotalNet_KWH_meter_58}
                      </p>
                      <p className={`param-value ${getPFClass(data?.Avg_PF_meter_58)}`}>
                        {data?.Avg_PF_meter_58}
                      </p>
                      <p className='param-value'>
                        {data?.Total_KVA_meter_58}
                      </p>
                    </div>
  
                    <div className="param1-div">
                    <Link to='/SingleMeter/61'><h2 className="parameter">
                        SVECW Library AC's
                      </h2></Link>
                      <p className='param-value'>
                        {data?.Total_KW_meter_61}
                      </p>
                      <p className='param-value'>
                        {data?.TotalNet_KWH_meter_61}
                      </p>
                      <p className={`param-value ${getPFClass(data?.Avg_PF_meter_61)}`}>
                        {data?.Avg_PF_meter_61}
                      </p>
                      <p className='param-value'>
                        {data?.Total_KVA_meter_61}
                      </p>
                    </div>

                    <div className="param1-div">
                    <Link to='/SingleMeter/62'><h2 className='parameter'>
                        CSSD Building
                      </h2></Link>
                      <p className='param-value'>
                        {data?.Total_KW_meter_62}
                      </p>
                      <p className='param-value'>
                        {data?.TotalNet_KWH_meter_62}
                      </p>
                      <p className={`param-value ${getPFClass(data?.Avg_PF_meter_62)}`}>
                        {data?.Avg_PF_meter_62}
                      </p>
                      <p className='param-value'>
                        {data?.Total_KVA_meter_62}
                      </p>
                    </div>

                    <div className="param1-div">
                    <Link to='/SingleMeter/64'><h2 className='parameter'>
                        Medha Hostel Lighting
                      </h2></Link>
                      <p className='param-value'>
                        {data?.Total_KW_meter_64}
                      </p>
                      <p className='param-value'>
                        {data?.TotalNet_KWH_meter_64}
                      </p>
                      <p className={`param-value ${getPFClass(data?.Avg_PF_meter_64)}`}>
                        {data?.Avg_PF_meter_64}
                      </p>
                      <p className='param-value'>
                        {data?.Total_KVA_meter_64}
                      </p>
                    </div>

                    <div className="param1-div">
                    <Link to='/SingleMeter/59'><h2 className='parameter'>
                       Geysers
                      </h2></Link>
                      <p className='param-value'>
                        {data?.Total_KW_meter_59}
                      </p>
                      <p className='param-value'>
                        {data?.TotalNet_KWH_meter_59}
                      </p>
                      <p className={`param-value ${getPFClass(data?.Avg_PF_meter_59)}`}>
                        {data?.Avg_PF_meter_59}
                      </p>
                      <p className='param-value'>
                        {data?.Total_KVA_meter_59}
                      </p>
                    </div>

                    <div className="param1-div">
                    <Link to='/SingleMeter/63'><h2 className='parameter'>
                        Medha Hostel Geysers
                      </h2></Link>
                      <p className='param-value'>
                        {data?.Total_KW_meter_63}
                      </p>
                      <p className='param-value'>
                        {data?.TotalNet_KWH_meter_63}
                      </p>
                      <p className={`param-value ${getPFClass(data?.Avg_PF_meter_63)}`}>
                        {data?.Avg_PF_meter_63}
                      </p>
                      <p className='param-value'>
                        {data?.Total_KVA_meter_63}
                      </p>
                    </div>

                    <div className="param1-div">
                    <Link to='/SingleMeter/65'><h2 className='parameter'>
                        Hostel Geysers VDC
                      </h2></Link>
                      <p className='param-value'>
                        {data?.Total_KW_meter_65}
                      </p>
                      <p className='param-value'>
                        {data?.TotalNet_KWH_meter_65}
                      </p>
                      <p className={`param-value ${getPFClass(data?.Avg_PF_meter_65)}`}>
                        {data?.Avg_PF_meter_65}
                      </p>
                      <p className='param-value'>
                        {data?.Total_KVA_meter_65}
                      </p>
                    </div>
                    </div>
              </div>
            </section>
            </section>
    </div>
  )
}

export default Pcc3