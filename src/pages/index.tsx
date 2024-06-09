import { useState } from 'react';
import styles from './index.module.css';

const directions = [
  [0, 1], //右
  [-1, 1], //右下
  [-1, 0], //下
  [-1, -1], //左下
  [0, -1], //左
  [1, -1], //左上
  [1, 0], //上
  [1, 1], //右上
];

const Home = () => {
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

  //再起関数
  const openCell = (board: number[][], x: number, y: number) => {
    let bombCount = 0;
    //クリックしたセルのボードの周りのボムを数え、ボム数を表示・bombMapをboardに反映させる
    for (const [dy, dx] of directions) {
      const nx = x + dx;
      const ny = y + dy;
      if (nx < 0 || nx >= 9 || ny < 0 || ny >= 9) continue;

      if (bombMap[ny][nx] === 1) {
        bombCount += 1;
      }
      board[y][x] = bombMap[y][x] === 1 ? 11 : bombCount;
    }

    // ボムだったら再起関数終了
    if (bombMap[y][x] === 1) return;
    // 周りに０があったら開く
    for (const [dy, dx] of directions) {
      const nx = x + dx;
      const ny = y + dy;
      if (nx < 0 || nx >= 9 || ny < 0 || ny >= 9) continue;
      if (bombCount === 0 && userInputs[ny][nx] === 0 && bombMap[ny][nx] === 0) {
        userInputs[ny][nx] = 1;
        openCell(board, nx, ny);
      }
    }
  };

  //userInputsが0なら石にする・1ならopenCellを呼び出す
  const board = structuredClone(bombMap);

  for (let y = 0; y < 9; y++) {
    for (let x = 0; x < 9; x++) {
      if (userInputs[y][x] === 0) {
        board[y][x] = -1;
      } else {
        openCell(board, x, y);
      }
    }
  }
  let setIsGameOver = false;
  const isGameOver = (x: number, y: number) => {
    if (userInputs[y][x] === 1 && bombMap[y][x] === 1) {
      for (let y = 0; y < 9; y++) {
        for (let x = 0; x < 9; x++) {
          if (bombMap[y][x] === 1) {
            board[y][x] = 11;
          }
        }
      }
      setIsGameOver = true;
    }
    return setIsGameOver;
  };

  const isGameClear = () => {
    let bombCount2 = 0;
    for (let y = 0; y < 9; y++) {
      for (let x = 0; x < 9; x++) {
        if (board[y][x] !== -1 && bombMap[y][x] !== 1) {
          bombCount2++;
        }
      }
    }
    return bombCount2 === 71;
  };

  //クリック時の動作
  const clickHandler = (x: number, y: number) => {
    if (setIsGameOver || isGameClear()) return;

    let bombCount = 0;
    for (let y = 0; y < 9; y++) {
      for (let x = 0; x < 9; x++) {
        if (bombMap[y][x] === 1) {
          bombCount += 1;
        }
      }
    }

    if (bombCount === 0) {
      const newbomMap = structuredClone(bombMap);
      setBombMap(bombset(x, y, newbomMap));
    }

    const newUserInputs = structuredClone(userInputs);
    newUserInputs[y][x] = 1;
    setUserInputs(newUserInputs);
  };

  //ボムをランダムに置く
  const bombset = (x: number, y: number, bombMap: number[][]) => {
    const bombPosition: number[][] = [];
    while (bombPosition.length < 10) {
      const bombx = Math.floor(Math.random() * 9);
      const bomby = Math.floor(Math.random() * 9);
      console.table([bomby, bombx]);
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
      bombMap[s[1]][s[0]] = 1;
    }
    return bombMap;
  };

  if (isGameClear()) {
    for (let y = 0; y < 9; y++) {
      for (let x = 0; x < 9; x++) {
        if (bombMap[y][x] === 1) {
          board[y][x] = 10;
        }
      }
    }
  }

  const resetButton = () => {
    setIsGameOver = false;
    const newbomMap = [
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
    ];
    setBombMap(newbomMap);

    const newUserInputs = [
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
    ];
    setUserInputs(newUserInputs);
  };

  return (
    <div className={styles.container}>
      {/* <button onClick={() => userInputs((p) => (p + 1) % 14)}>初級</button> */}
      <div className={styles.bigboardStyle}>
        <div className={styles.miniBoardStyle} onClick={() => resetButton()}>
          <div className={styles.bombCountStyle} />
          <div className={styles.nicoStyle}>
            {board.map((row, y) =>
              row.map((cell, x) => (
                <div
                  className={styles.sampleStyle}
                  key={`${x}-${y}`}
                  style={{
                    backgroundPosition: isGameOver(x, y)
                      ? `${13 * -30}px 0px`
                      : isGameClear()
                        ? `${12 * -30}px 0px`
                        : `${11 * -30}px 0px`,
                  }}
                />
              )),
            )}

            {/* <button onClick={() => setsamplePos((p) => (p + 1) % 14)}>sample</button> */}
          </div>
          <div className={styles.timeStyle} />
        </div>

        <div className={styles.gameboardStyle}>
          {board.map((row, y) =>
            row.map((cell, x) => (
              <div
                className={styles.stoneStyle}
                onClick={() => clickHandler(x, y)}
                key={`${x}-${y}`}
                style={{
                  borderColor:
                    board[y][x] >= 0 && board[y][x] !== 10
                      ? '#909090'
                      : '#fff #909090 #909090 #fff',
                  backgroundColor: isGameOver(x, y) ? '#f39c9c' : '#c9c7c7',
                }}
              >
                <div
                  className={styles.sampleStyle}
                  style={{
                    backgroundPosition: `${(board[y][x] - 1) * -30}px 0px`,
                  }}
                />
              </div>

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
