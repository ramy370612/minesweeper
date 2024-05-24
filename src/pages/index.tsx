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
    [1, 1, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
  ]);

  const [board, setboard] = useState([
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
  const bombset = (x: number, y: number, bombMap: number[][]) => {
    const bombPosition: number[][] = [];
    while (bombPosition.length < 10) {
      const bombx = Math.floor(Math.random() * 9);
      const bomby = Math.floor(Math.random() * 9);
      console.log(bomby, bombx);
      if (x === bombx && y === bomby) {
        continue;
      }
      const double = [0];
      for (const i of bombPosition) {
        if (i[0] === bomby && i[1] === bombx) {
          double[0]++;
          break;
        }
      }
      if (double[0] === 1) continue;

      bombPosition.push([bomby, bombx]);
    }
    for (const s of bombPosition) {
      bombMap[s[1]][s[0]] = 11;
    }
    return bombMap;
  };
  console.log(samplePos);
  console.log(styles.box1);
  const clickHandler = (x: number, y: number) => {
    const newbomMap = structuredClone(bombMap);
    setBombMap(bombset(x, y, newbomMap));
    console.log(x, y);
  };
  //   console.log(`Cell clicked at x: ${x}, y: ${y}`);
  //   // ここにセルをクリックした際の処理を追加
  // };
  return (
    <div className={styles.container}>
      <div className={styles.bigboardStyle}>
        <div className={styles.pointStyle}>
          <div className={styles.nicoStyle}>
            <div
              className={styles.sampleStyle}
              style={{ backgroundPosition: `${samplePos * -30}px 0px` }}
            />
            {/* <button onClick={() => setsamplePos((p) => (p + 1) % 14)}>sample</button> */}
          </div>
        </div>

        <div className={styles.gameboardStyle}>
          {bombMap.map((row, y) =>
            row.map((cell, x) => (
              <div
                className={styles.stoneStyle}
                onClick={() => clickHandler(x, y)}
                key={`${x}-${y}`}
                style={{
                  borderColor: bombMap[y][x] >= 0 ? '#909090' : '#fff #909090 #909090 #fff',
                }}
              >
                <div
                  className={styles.sampleStyle}
                  style={{
                    backgroundPosition: `${(bombMap[y][x] - 1) * -30}px 0px`,
                  }}

                  // onClick={() => clickHandler(y, x)}
                />

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
