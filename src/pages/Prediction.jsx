import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend } from 'recharts';
import PredictionChart1 from "../components/charts/PredictionChart1";
import PredictionChart from "../components/charts/PredictionChart";
import axios from 'axios';
import PredictionBarChart from "./PredictionBarChart";
import { API_URL2 } from "../data/api";

const Prediction = () => {

      const [data, setData] = useState([]);
      const [nextMonthPred, setNextMonthPred] = useState(null);

      useEffect(() => {
        const fetchPredictions = async () => {
          try {
            const response = await axios.get(`${API_URL2}/predict`);
      
            if (response.data.success) {
              const { predictions, nextMonthPrediction } = response.data;
      
              // Directly use the predictions array from the API
              setData(predictions);
              setNextMonthPred(nextMonthPrediction);
            } else {
              console.error("Invalid API response format");
            }
          } catch (error) {
            console.error("Error fetching predictions:", error);
          }
        };
      
        fetchPredictions();
      }, []);      

  return (
    <div>
      <section className="w-full h-fit flex md:flex-row flex-col">
        <Sidebar />
        <div className="p-6 bg-gray-100 min-h-screen w-full dark:bg-[#1e1e1e] dark:text-white">
            <h1 className="text-2xl font-bold mb-4 font-Montserrat">Predictions</h1>
            <div className="flex flex-col gap-4">
                <div className="flex gap-4 md:flex-row flex-col">
                    <div className="bg-white rounded-lg shadow  text-lg font-OpenSans dark:bg-[#2c2c2c] dark:text-white text-center p-5 w-full h-full">
                        <h2 className="font-bold text-xl text-center py-2 font-Montserrat">
                            Energy Consumption Prediction
                        </h2>
                        <p className="font-medium mt-6">Units Consumed Next Month</p>
                        <p className="bg-[#a4a4e3] mx-4 p-2 my-3 rounded-lg font-semibold">{nextMonthPred} Units</p>
                        <p className="font-medium mt-6" >Units Consumed Next Year</p>
                        <p className="bg-[#a4a4e3] mx-4 my-3 p-2 rounded-lg font-semibold">5864622.72 Units</p>
                    </div>
                    <div className="bg-white rounded-lg shadow  text-lg font-OpenSans dark:bg-[#2c2c2c] dark:text-white text-center p-5 w-full h-full">
                        <h2 className="font-bold text-xl text-center py-2 font-Montserrat">
                            Energy Consumption Bill Prediction
                        </h2>
                        <p className="font-medium mt-6">Next Month Bill</p>
                        <p className="bg-[#a4a4e3] mx-4 p-2 my-3 rounded-lg font-semibold">Rs.{nextMonthPred*11}</p>
                        <p className="font-medium mt-6" >Next Year Bill</p>
                        <p className="bg-[#a4a4e3] mx-4 my-3 p-2 rounded-lg font-semibold">Rs.{5864622*11}</p>
                    </div>
                </div>
                <div className="xl:flex gap-4 h-full ">
                    <PredictionChart1 />
                    <PredictionBarChart data={data} />
                </div>
            </div>
        </div>
      </section>
    </div>
  );
};

export default Prediction;
