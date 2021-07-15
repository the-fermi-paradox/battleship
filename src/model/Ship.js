const Ship = (length) => {
  const positions = Array(length);
  const hit = (int) => {
    positions[int] = 1;
  };
  const isSunk = () => {
    if (positions.includes(undefined)) {
      return false;
    }
    return true;
  };
  return {
    length,
    hit,
    isSunk,
    positions,
  };
};

export default Ship;
