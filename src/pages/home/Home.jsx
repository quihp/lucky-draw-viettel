import { useEffect, useLayoutEffect, useState } from "react";
import SiteWrapper from "../../SiteWrapper";
import { useTheme } from "@mui/material/styles";
import { list as data } from "../../data/list";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Stepper, Grid } from "@mui/material";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import "./Home.css";
import Stack from "@mui/material/Stack";
import LuckyDraw from "../../components/LuckyDraw";
import { steps } from "../../components/Step";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import FilterListIcon from "@mui/icons-material/FilterList";
import CardGiftcardIcon from "@mui/icons-material/CardGiftcard";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import Carousel from "react-bootstrap/Carousel";
import kkPrize from "../../img/sac-du-phong-anker-323-usb-c-powercore-piq-10-000mah-a1334.png";
import Prize3 from "../../img/tab-a7-lite-332_main_909.png";
import Prize2 from "../../img/lc-khong-khi-electrolux-fa31-202gy_a2245e14.png";
import Prize1 from "../../img/loa_karaoke_di_dong_nova_audio_nv_300_platinum_mau_den_6.png";
import PrizeSpecial from "../../img/smart-tivi-samsung-4k-55.png";

function Home() {
  const [activeStep, setActiveStep] = useState(0);
  const [openResult, setOpenResult] = useState(false);
  const [openPrize, setOpenPrize] = useState(false);
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };
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
      <div className="text-center text-[#FFD212] font-bold text-6xl pb-4">
        Year End Party 2023
      </div>

      {openPrize ? (
        <>
          <Carousel
            activeIndex={index}
            interval={null}
            prevLabel={"Trở lại"}
            nextLabel={"Tiếp theo"}
            onSelect={handleSelect}
          >
            <Carousel.Item>
              <Stack
                direction="row"
                spacing={2}
                justifyContent="center"
                alignItems="center"
              >
                <div className="">
                  <span className="text-5xl stroke-1 stroke-slate-200 font-bold text-gray-900 dark:text-white">
                    Giải khuyến khích
                  </span>
                  <h5 class="text-3xl font-semibold tracking-tight text-gray-900 dark:text-white">
                    4 Pin sạc dự phòng Anker 323
                  </h5>
                </div>
                <div>
                  <img className="w-96"  src={kkPrize} alt="product image" />
                </div>
              </Stack>
            </Carousel.Item>
            <Carousel.Item>
              <Stack
                direction="row"
                spacing={2}
                justifyContent="center"
                alignItems="center"
              >
                <div className="">
                  <span className="text-5xl font-bold text-gray-900 dark:text-white">
                    Giải ba
                  </span>
                  <h5 class="text-3xl font-semibold tracking-tight text-gray-900 dark:text-white">
                    2 Samsung Galaxy Tab A7 Lite
                  </h5>
                </div>
                <div>
                  <img className="w-96"  src={Prize3} alt="product image" />
                </div>
              </Stack>
            </Carousel.Item>
            <Carousel.Item>
              <Stack
                direction="row"
                spacing={2}
                justifyContent="center"
                alignItems="center"
              >
                <div className="">
                  <span className="text-5xl font-bold text-gray-900 dark:text-white">
                    Giải nhì
                  </span>
                  <h5 class="text-3xl font-semibold tracking-tight text-gray-900 dark:text-white">
                    1 Máy lọc không khí Electrolux Fa31
                  </h5>
                </div>
                <div>
                  <img className="w-96"  src={Prize2} alt="product image" />
                </div>
              </Stack>
            </Carousel.Item>
            <Carousel.Item>
              <Stack
                direction="row"
                spacing={2}
                justifyContent="center"
                alignItems="center"
              >
                <div className="">
                  <span className="text-5xl font-bold text-gray-900 dark:text-white">
                    Giải nhất
                  </span>
                  <h5 class="text-3xl font-semibold tracking-tight text-gray-900 dark:text-white">
                    1 Loa Di Động Nova Audio NV-300
                  </h5>
                </div>
                <div>
                  <img className="w-96"  src={Prize1} alt="product image" />
                </div>
              </Stack>
            </Carousel.Item>
            <Carousel.Item>
              <Stack
                direction="row"
                spacing={2}
                justifyContent="center"
                alignItems="center"
              >
                <div className="">
                  <span className="text-5xl font-bold text-gray-900 dark:text-white">
                    Giải đặc biệt
                  </span>
                  <h5 class="text-3xl stroke-slate-700 font-semibold tracking-tight text-gray-900 dark:text-white">
                    1 Smart Tivi SAMSUNG
                  </h5>
                </div>
                <div>
                  <img
                    className="w-96" 
                    src={PrizeSpecial}
                    alt="product image"
                  />
                </div>
              </Stack>
            </Carousel.Item>
          </Carousel>
        </>
      ) : (
        <Box sx={{ width: "100%", flexGrow: 1 }}>
          <Box sx={{ width: "100%", p: 2 }}>
            <LuckyDraw
              prizeType={steps[activeStep].id}
              currentStep={activeStep}
            />
          </Box>
          <Stepper
            // variant="text"
            steps={maxSteps}
            position="static"
            sx={{
              border: "3px solid #f5db79",
              background: "#393264",
              borderRadius: "0",
              fontSize: "20px",
              letterSpacing: "1px",
              color: "#ffda56",
              textTransform: "uppercase",
              height: "48px",
              lineHeight: "42px",
              width: "30%",
              margin: "0 auto",
            }}
            activeStep={activeStep}
            nextButton={
              <Button
                size="small"
                onClick={handleNext}
                disabled={activeStep === maxSteps - 1}
                sx={{
                  outline: "none!important",
                  border: "none!important",
                }}
              >
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
                sx={{
                  outline: "none!important",
                  border: "none!important",
                }}
              >
                {theme.direction === "rtl" ? (
                  <KeyboardArrowRight />
                ) : (
                  <KeyboardArrowLeft />
                )}
              </Button>
            }
          >
            <div
              style={{
                borderRadius: "0",
                fontSize: "20px",
                letterSpacing: "1px",
                color: "#ffda56",
                textTransform: "uppercase",
                width: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <button
                style={{
                  margin: "0 8px",
                  padding: "0 12px",
                  fontSize: "18px",
                  lineHeight: "42px",
                  display: "inline-flex",
                  height: "48px",
                  justifyContent: "center",
                  alignItems: "center",
                  cursor: "pointer",
                  outline: "none",
                  border: "none",
                }}
                disabled={activeStep === 0}
                onClick={handleBack}
              >
                <ChevronLeftIcon
                  htmlColor={`${activeStep === 0 ? "gray" : "#ffda56"}`}
                  fontSize="large"
                />
              </button>
              <Typography variant="body1" color="inherit">
                {steps[activeStep].label}
              </Typography>
              <button
                style={{
                  margin: "0 8px",
                  padding: "0 12px",
                  fontSize: "18px",
                  lineHeight: "42px",
                  display: "inline-flex",
                  height: "48px",
                  justifyContent: "center",
                  alignItems: "center",
                  cursor: "pointer",
                  outline: "none",
                  border: "none",
                }}
                disabled={activeStep === maxSteps - 1}
                onClick={handleNext}
              >
                <ChevronRightIcon
                  htmlColor={`${
                    activeStep === maxSteps - 1 ? "gray" : "#ffda56"
                  }`}
                  fontSize="large"
                />
              </button>
            </div>
          </Stepper>
        </Box>
      )}
      <div className="py-10">
        <Stack
          direction="row"
          justifyContent="center"
          alignItems="center"
          spacing={2}
        >
          <Box
            component="span"
            sx={{
              color: "#fff",
              margin: "0 1rem",
              display: "inline-flex",
              justifyContent: "center",
              alignItems: "center",
              cursor: "pointer",

              "&:hover": {
                color: "#fbce3d",
              },
            }}
            onClick={() => setOpenResult(true)}
          >
            <FilterListIcon htmlColor="#fff" fontSize="large" />
            <span style={{ marginLeft: "0.4rem" }}>Kết quả</span>
          </Box>
          <Box
            component="span"
            sx={{
              color: "#fff",
              margin: "0 1rem",
              display: "inline-flex",
              justifyContent: "center",
              alignItems: "center",
              cursor: "pointer",
              "& :hover": {
                color: "#fbce3d",
              },
            }}
            onClick={() => setOpenPrize(!openPrize)}
          >
            <CardGiftcardIcon htmlColor="#fff" fontSize="large" />
            <span style={{ marginLeft: "0.4rem" }}>
              {openPrize ? "Quay số" : "Thông tin Giải"}
            </span>
          </Box>
          <Box
            component="span"
            sx={{
              color: "#fff",
              margin: "0 1rem",
              display: "inline-flex",
              justifyContent: "center",
              alignItems: "center",
              cursor: "pointer",
              "& :hover": {
                color: "#fbce3d",
              },
            }}
            onClick={handleReset}
          >
            <RestartAltIcon htmlColor="#fff" fontSize="large" />
            <span style={{ marginLeft: "0.4rem" }}>Reset</span>
          </Box>
        </Stack>
      </div>
    </SiteWrapper>
  );
}

export default Home;
