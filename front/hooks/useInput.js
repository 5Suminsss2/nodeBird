// hooks 는 중복되는 거 관리할때 쓰임
// 컴포넌트 안에서만 사용 가능
// deps가 1일 때만 사용 가능

import { useState, useCallback } from "react";

export default (initialValue = null) => {
  const [value, setValue] = useState(initialValue);
  const handler = useCallback((e) => {
    setValue(e.target.value);
  }, []);
  return [value, handler];
};
