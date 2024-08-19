import React, { useEffect, useRef, useState } from "react";

function Timer({ expiryDate }) {
  const [countDown, setCountDown] = useState("");
  const intervalId = useRef(null);

  const updateCountdown = () => {
    const currentTime = Date.now();
    const timeRemaining = expiryDate - currentTime;
    if (timeRemaining < 1) {
      setCountDown("Expired");
      clearInterval(intervalId.current);
    } else {
      const nftExpiryDateSecs = Math.floor((timeRemaining / 1000) % 60);
      const nftExpiryDateMinutes = Math.floor(timeRemaining /1000 / 60) % 60;
      const nftExpiryDateHours = Math.floor(timeRemaining /1000 / 60 /60);
      setCountDown(`${nftExpiryDateHours}h ${nftExpiryDateMinutes}m ${nftExpiryDateSecs}s`);
    }
  };

  useEffect(() => {
    intervalId.current = setInterval(updateCountdown, 1000);
    updateCountdown();
    return () => clearInterval(intervalId.current);
  }, []);

  return <div>{countDown}</div>;
}

export default Timer;
