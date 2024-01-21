import { useEffect, useState } from "react";

import TextLoop from "react-text-loop";
import MovingComponent from "react-moving-text";
import { list as data } from "../../data/list";
import "./index.css";
import Stack from "@mui/material/Stack";
import CustomDialog from "../CustomDialog";
import Confetti from "react-dom-confetti";

const defaultList1 = [0, 1, 2, 3, 4, 9];
const defaultList2 = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
const defaultList = [
  defaultList1,
  ...Array.from({ length: 5 }, (_) => defaultList2),
];
localStorage.setItem("list", JSON.stringify(data));
function LuckyDraw(props) {
  const { prizeType } = props;
  const [list, setList] = useState(defaultList1);
  const [stop, setStop] = useState(false);
  const [winnerNumber, setWinnerNumber] = useState([0, 0, 0, 0, 0, 0]);
  const [winner, setWinner] = useState({});
  const [interval, setInterval] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const timeout = 3100;
  const [data, setData] = useState(JSON.parse(localStorage.getItem("list")));
    useEffect(() => {
        setWinnerNumber([0, 0, 0, 0, 0, 0])
    }, [prizeType])
  return (
    <div className="">
      <div className="flex">
        <Confetti active={isOpen} />
        {!stop && (
          <div className="w-full">
            <Stack
              direction="row"
              justifyContent="center"
              alignItems="center"
              spacing={2}
            >
              {defaultList.map((l, i) => (
                <TextLoop
                  mask={true}
                  interval={interval}
                  delay={0 + i * 200}
                  springConfig={{ stiffness: 180, damping: 8 }}
                >
                  {list.map((l) => (
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
              setList(defaultList1);
              setStop(false);
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
              setData(data.filter((e) => e.id !== winner.id));
              let prevList = JSON.parse(localStorage.getItem(prizeType)) || [];
              prevList.push(winner);
              localStorage.setItem(prizeType, JSON.stringify(prevList));
              setTimeout(() => {
                setIsOpen(true);
              }, timeout);
            }}
            class="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded"
          >
            Chốt
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
