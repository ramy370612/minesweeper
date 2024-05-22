import { useState } from 'react';
import styles from './index.module.css';

const Home = () => {
  const [samplePos, setsamplePos] = useState(0);
  const [bombMap, setBombMap] = useState([
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
  ]);
  const [userInputs, setUserInputs] = useState([
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
  ]);
  // const board = [...Array(9)].map((_, y) => [...Array(9)].map((_, x) => ((y + x + 1) % 13) - 1));
  // const board: number[][] = [];

  console.log(samplePos);
  console.log(styles.box1);
  // const clickHandler = (x, y) => {
  //   console.log(`Cell clicked at x: ${x}, y: ${y}`);
  //   // ここにセルをクリックした際の処理を追加
  // };
  return (
    <div className={styles.container}>
      <div className={styles.bigboardStyle}>
        <div className={styles.boardStyle}>
          <div className={styles.nicoStyle}>
            {/* <button onClick={() => setsamplePos((p) => (p + 1) % 14)}>sample</button> */}
          </div>
        </div>

        <div className={styles.gameboardStyle}>
          {userInputs.map((row, y) =>
            row.map((number, x) => (
              <div className={styles.stoneStyle} key={`${x}-${y}`}>
                {/* <div
                  className={styles.sampleStyle}
                  style={{ backgroundPosition: `${samplePos * -30}px 0px` }}
                /> */}
              </div>

              // <div className={styles.cellStyle}>

              //
            )),
          )}
        </div>
      </div>

      {/* <button onClick={() => setsamplePos((p) => (p + 1) % 14)}>sample</button> */}
    </div>
  );
};

export default Home;
