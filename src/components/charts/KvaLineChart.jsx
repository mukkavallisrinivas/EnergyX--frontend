import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';
import moment from 'moment';
import { useTheme } from '../ThemeContext';
import { API_URL2 } from '../../data/api'; // Should point to `/api/energy-summaries` or similar

const PowerLineChart = () => {
  const [data, setData] = useState([]);
  const { theme } = useTheme();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${API_URL2}/energy-summaries`); // Adjust as per route
        const formattedData = response.data.map(item => ({
          timestamp: moment(item.timestamp).format('HH:mm'),
          sumKVA: parseFloat(item.sumKVA),
        }));
        setData(formattedData.reverse()); // Oldest first for the chart
      } catch (error) {
        console.error('Error fetching energy summaries:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className='max-md:py-5 bg-white rounded-lg w-full sm:h-full h-56 p-0 md:p-1 xl:p-3 2xl:p-5 shadow font-OpenSans dark:bg-[#2c2c2c] min-[2200px]:text-2xl text-sm max-[500px]:text-xs font-medium'>
      <ResponsiveContainer>
        <LineChart data={data}>
          <XAxis dataKey="timestamp" tick={{ fill: theme === 'light' ? '#000' : '#fff' }} />
          <YAxis tick={{ fill: theme === 'light' ? '#000' : '#fff' }} />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="sumKVA" stroke="#8884d8" name="kVA" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PowerLineChart;
