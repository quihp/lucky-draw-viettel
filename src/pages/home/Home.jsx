import { useEffect, useLayoutEffect, useState } from "react";
import SiteWrapper from "../../SiteWrapper";
import TextLoop from "react-text-loop";
import MovingComponent from "react-moving-text";
import { useTheme } from "@mui/material/styles";
import { list as data } from "../../data/list";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import MobileStepper from "@mui/material/MobileStepper";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import "./Home.css";
import Stack from "@mui/material/Stack";
import LuckyDraw from "../../components/LuckyDraw";
import { steps } from "../../components/Step";
import CustomizedDialogs from "../../components/WinnerList/Dialog";
import BasicTabs from "../../components/WinnerList";
import SpecialPrize from "../../components/LuckyDraw/specialPrize";
function Home() {
  const [activeStep, setActiveStep] = useState(0);
  const [openResult, setOpenResult] = useState(false);
  const [openPrize, setOpenPrize] = useState(false);
  const maxSteps = steps.length;
  const theme = useTheme();
  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    localStorage.setItem("list", JSON.stringify(data));
    for (let i = 0; i < 5; i++) {
      localStorage.removeItem(i);
    }
  };
  return (
    <SiteWrapper>
      <div className="text-center text-white text-6xl pb-10">
        Year End Party Viettel
      </div>

      <Box sx={{ width: "100%", flexGrow: 1 }}>
        <Paper
          square
          elevation={0}
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: 50,
            width: "50%",
            marginLeft: "25%",
            pl: 2,
            bgcolor: "background.default",
          }}
        >
          <Typography>{steps[activeStep].label}</Typography>
        </Paper>
        <Box sx={{ width: "100%", p: 2 }}>
          {steps[activeStep].id !== 4 ? (
            <LuckyDraw prizeType={steps[activeStep].id} />
          ) : (
            <SpecialPrize />
          )}
        </Box>
        <MobileStepper
          variant="text"
          steps={maxSteps}
          position="static"
          sx={{
            width: "50%",
            marginLeft: "25%",
          }}
          activeStep={activeStep}
          nextButton={
            <Button
              size="small"
              onClick={handleNext}
              disabled={activeStep === maxSteps - 1}
            >
              Giải kế tiếp
              {theme.direction === "rtl" ? (
                <KeyboardArrowLeft />
              ) : (
                <KeyboardArrowRight />
              )}
            </Button>
          }
          backButton={
            <Button
              size="small"
              onClick={handleBack}
              disabled={activeStep === 0}
            >
              {theme.direction === "rtl" ? (
                <KeyboardArrowRight />
              ) : (
                <KeyboardArrowLeft />
              )}
              Trở về
            </Button>
          }
        />
      </Box>
      <div className="py-10">
        <Stack
          direction="row"
          justifyContent="center"
          alignItems="center"
          spacing={2}
        >
          <button
            onClick={() => setOpenPrize(true)}
            class="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded"
          >
            Giải thưởng
          </button>
          <button
            onClick={() => setOpenResult(true)}
            class="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded"
          >
            Xem kết quả
          </button>
          <button
            onClick={handleReset}
            class="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded"
          >
            Reset
          </button>
        </Stack>
        <CustomizedDialogs
          isOpen={openPrize}
          handleClose={() => setOpenPrize(false)}
          content={<BasicTabs type="prize" />}
          title={<div>Giải thưởng</div>}
        />
        <CustomizedDialogs
          isOpen={openResult}
          handleClose={() => setOpenResult(false)}
          content={<BasicTabs type="result" />}
          title={<div>Kết quả</div>}
        />
      </div>
    </SiteWrapper>
  );
}

export default Home;
