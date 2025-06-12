import React from "react";
import { home, chart, power, pcc, vishnu, logo, vishnu1, growth, predictions } from "../constants";
import { Link } from "react-router-dom";
import { Dropdown, Avatar } from "rsuite";

const Sidebar = () => {
  const renderToggle = (props) => <Avatar circle {...props} src={pcc} />;

  return (
    <div className="bg-[#2c2c2c] flex md:flex-col flex-row justify-between md:w-fit dark:bg-[#2c2c2c]">
      <ul className="flex md:flex-col gap-4 flex-row text-nowrap mx-5 md:my-4 justify-between">
        <li className="w-full text-lg font-medium rounded-lg md:my-2 my-6 md:mx-[8px]">
          <img src={vishnu1} className="w-8" alt="Logo" title="Logo" />
        </li>
        <li className="w-full text-lg font-medium cursor-pointer md:my-8 md:mx-2 ml-5 my-6">
          <Link to="/" title="Home">
            <img src={home} alt="Home" className="w-[30px]" />
          </Link>
        </li>
        <li className="w-full text-lg font-medium rounded-lg md:my-2 md:ml-2 ml-4 my-6">
          <Link to="/graphs" title="Graphs">
            <img src={chart} alt="Graphs" />
          </Link>
        </li>
        <li className="w-full text-lg font-medium rounded-lg cursor-pointer md:my-9 md:mx-2 ml-5 my-6">
          <Dropdown renderToggle={renderToggle} className="absolute">
            <div className="bg-[#2c2c2c] p-2 mt-2 border rounded-lg text-white">
              <Dropdown.Item
                className="hover:bg-white px-2 rounded-sm hover:text-black"
                title="PCC1"
              >
                <Link to="/pcc1">PCC1</Link>
              </Dropdown.Item>
              <Dropdown.Item
                className="hover:bg-white px-2 rounded-sm hover:text-black"
                title="PCC2"
              >
                <Link to="/pcc2">PCC2</Link>
              </Dropdown.Item>
              <Dropdown.Item
                className="hover:bg-white px-2 rounded-sm hover:text-black"
                title="PCC3"
              >
                <Link to="/pcc3">PCC3</Link>
              </Dropdown.Item>
            </div>
          </Dropdown>
        </li>
        <li className="w-full text-lg font-medium rounded-lg md:my-6 md:ml-2 ml-4 my-6">
          <Link to="/predictions" title="Predictions">
            <img src={predictions} alt="Predictions" />
          </Link>
        </li>
        <li className="w-full text-lg font-medium rounded-lg md:my-6 md:ml-2 ml-4 my-6">
          <Link to="/sensordata" title="Sensor Data">
            <img src={growth} alt="Sensor Data" />
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
