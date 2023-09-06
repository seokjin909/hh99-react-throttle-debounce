import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  let timerId = null;
  //   const [state, setState] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    return () => {
      // 언마운트 시, 메모리 누수를 막기위한 useEffect의 return을 사용해서 clean up 시켜야 한다!
      if (timerId) {
        clearTimeout(timerId);
      }
    };
  }, []);

  const throttle = (delay) => {
    if (timerId) {
      // timerId가 있으면 바로 함수 종료
      return;
    }
    // useState를 사용할 경우 state가 변경됨에 따라 리렌더링이 되기 때문에 정상적으로 동작하지 않게 된다!
    // setState(!state);
    console.log(`API 요청 실행! ${delay}ms 동안 추가요쳥은 안받습니다!`);
    timerId = setTimeout(() => {
      console.log(`${delay}ms 지남 추가요청 받습니다!`);
      timerId = null;
    }, delay);
  };

  // 반복적인 이벤트 이후, delay가 지나면 function
  const debounce = (delay) => {
    if (timerId) {
      // 할당되어 있는 timerId에 해당하는 타이머 제거
      clearTimeout(timerId);
    }
    timerId = setTimeout(() => {
      console.log(`마지막 요청으로부터 ${delay}ms 지났으므로 API 요청 실행!`);
      timerId = null;
    }, delay);
  };
  return (
    <div style={{ paddingLeft: 20, paddingRight: 20 }}>
      <h1>Button 이벤트 예제</h1>
      <button onClick={() => throttle(2000)}>쓰로틀링 버튼</button>
      <button onClick={() => debounce(2000)}>디바운싱 버튼</button>
      <div>
        <button
          onClick={() => {
            navigate("/company");
          }}
        >
          페이지 이동
        </button>
      </div>
    </div>
  );
};

export default Home;
