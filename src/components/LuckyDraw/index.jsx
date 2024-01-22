import { useEffect, useState } from "react";

import TextLoop from "react-text-loop";
import MovingComponent from "react-moving-text";
import { list as data, list } from "../../data/list";
import "./index.css";
import Stack from "@mui/material/Stack";
import CustomDialog from "../CustomDialog";
import Confetti from "react-dom-confetti";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
const defaultList1 = [0, 1, 2, 3, 4, 9];
const defaultList2 = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
const defaultList = [
  defaultList1,
  ...Array.from({ length: 5 }, (_) => defaultList2),
];
localStorage.setItem("list", JSON.stringify(data));
function LuckyDraw(props) {
  const { prizeType } = props;
  const [stop, setStop] = useState(false);
  const [winnerNumber, setWinnerNumber] = useState([0, 0, 0, 0, 0, 0]);
  const [winner, setWinner] = useState({});
  const [interval, setInterval] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const timeout = 3100;
  const [data, setData] = useState(JSON.parse(localStorage.getItem("list")));
  const [audio, setAudio] = useState(
    new Audio("https://luckydraw.live/audio/v1/sm-roller-loop.mp3")
  );
  const [winAudio, setWinAudio] = useState(
    new Audio("https://luckydraw.live/audio/v1/sm-spin.mp3")
  );
  useEffect(() => {
    setWinnerNumber([0, 0, 0, 0, 0, 0]);
  }, [prizeType]);
  console.log(data);
  return (
    <div className="">
      <div className="flex pb-10">
        <Confetti active={isOpen} />
        {!stop && (
          <div className="w-full ">
            <Stack
              direction="row"
              justifyContent="center"
              alignItems="center"
              spacing={2}
              sx={{
                background: "#393264",
                border: "3px solid #f5db79",
                padding: "0 16px",
              }}
            >
              {defaultList.map((l, i) => (
                <TextLoop
                  mask={true}
                  interval={interval}
                  delay={0 + i * 200}
                  springConfig={{ stiffness: 180, damping: 8 }}
                >
                  {l.map((l) => (
                    <div className="box text-white" style={{ width: 180 }}>
                      {l}
                    </div>
                  ))}
                </TextLoop>
              ))}
            </Stack>
          </div>
        )}
        {stop && (
          <>
            <Stack
              direction="row"
              justifyContent="center"
              alignItems="center"
              spacing={2}
              sx={{
                background: "#393264",
                border: "3px solid #f5db79",
                padding: "0 16px",
              }}
            >
              {winnerNumber.map((w, i) => (
                <MovingComponent
                  type={"slideInFromTop"}
                  duration={100 + i * 500 + "ms"}
                  delay={"0ms"}
                  timing="linear"
                  fillMode="forwards"
                  iteration={1}
                  className="text-center"
                >
                  <div className="box text-white">{winnerNumber[i]}</div>
                </MovingComponent>
              ))}
            </Stack>
          </>
        )}
        <Confetti active={isOpen} />
      </div>
      <div>
        <Stack
          direction="row"
          justifyContent="center"
          alignItems="center"
          spacing={2}
        >
          <button
            onClick={() => {
              setStop(false);
              audio.play();
              audio.loop = true;
              // playAudio = setInterval(() => audio.play(), 1000);
              setInterval(100);
            }}
            class="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded"
          >
            Quay số
          </button>
          <button
            onClick={() => {
              const winner = data[Math.floor(Math.random() * data.length)];
              const winnerNumber = winner.id.split("");
              setWinnerNumber(winnerNumber);
              setWinner(winner);
              setStop(true);
              const filterData = data.filter((e) => e.id !== winner.id);
              setData(filterData);
              localStorage.setItem("list", JSON.stringify(filterData));
              let prevList = JSON.parse(localStorage.getItem(prizeType)) || [];
              prevList.push(winner);
              localStorage.setItem(prizeType, JSON.stringify(prevList));
              setTimeout(() => {
                setIsOpen(true);
                winAudio.play();
              }, timeout);
              audio.pause();
              setAudio(audio);
            }}
            class="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded"
          >
            Chốt
          </button>
          <button
            onClick={() => {
              const listWon = JSON.parse(localStorage.getItem(prizeType));
              setData([...data, listWon]);
              localStorage.setItem("list", JSON.stringify([...data, listWon]));
              localStorage.removeItem(prizeType);
            }}
            class="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded"
          >
            <RestartAltIcon />
          </button>
        </Stack>
        <CustomDialog
          isOpen={isOpen}
          value={winner}
          handleClose={() => setIsOpen(false)}
        />
      </div>
    </div>
  );
}

export default LuckyDraw;
