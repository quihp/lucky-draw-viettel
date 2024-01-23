import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import BasicTable from "./Table";
function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function BasicTabs(props) {
  const { type } = props;
  const list = [
    JSON.parse(localStorage.getItem(0)),
    JSON.parse(localStorage.getItem(1)),
    JSON.parse(localStorage.getItem(2)),
    JSON.parse(localStorage.getItem(3)),
    JSON.parse(localStorage.getItem(4)),
  ];

  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab label="Giải khuyến khích" {...a11yProps(0)} />
          <Tab label="Giải ba" {...a11yProps(1)} />
          <Tab label="Giải nhì" {...a11yProps(2)} />
          <Tab label="Giải nhất" {...a11yProps(3)} />
          <Tab label="Giải đặc biệt" {...a11yProps(4)} />
        </Tabs>
      </Box>
      {type === "result" &&
        list.map((l, i) => (
          <CustomTabPanel value={value} index={i}>
            <BasicTable data={l} prizeType={i}/>
          </CustomTabPanel>
        ))}
      {type === "prize" &&
        list.map((l, i) => (
          <CustomTabPanel value={value} index={i}>
            <img src="https://bcp.cdnchinhphu.vn/Uploaded/nguyendieuhuong/2021_01_11/%E1%BA%A3nh%20Minh%20Thi%20Viettel.jpg" alt=""/>
          </CustomTabPanel>
        ))}
    </Box>
  );
}
