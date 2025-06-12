import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer
} from 'recharts';
import moment from 'moment';
import { useTheme } from '../ThemeContext';
import { API_URL2 } from '../../data/api';

const PowerLineChart = () => {
  const [data, setData] = useState([]);
  const { theme } = useTheme();

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Adjust the API route as needed (e.g., `/api/energy-summaries`)
        const response = await axios.get(`${API_URL2}/energy-summaries`);
        const formattedData = response.data.map(item => ({
          timestamp: moment(item.timestamp).format('HH:mm'),
          sumPower: parseFloat(item.sumPower),
        }));
        setData(formattedData.reverse()); // Oldest first for line chart
      } catch (error) {
        console.error('Error fetching power data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className='max-md:py-5 bg-white rounded-lg w-full h-full p-0 md:p-1 xl:p-3 2xl:p-5 shadow font-OpenSans dark:bg-[#2c2c2c] min-[2200px]:text-2xl text-sm max-[500px]:text-xs font-medium'>
      <ResponsiveContainer>
        <LineChart data={data}>
          <XAxis dataKey="timestamp" tick={{ fill: theme === 'light' ? '#000' : '#fff' }} />
          <YAxis tick={{ fill: theme === 'light' ? '#000' : '#fff' }} />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="sumPower" stroke="#8884d8" name="Power (kW)" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PowerLineChart;
