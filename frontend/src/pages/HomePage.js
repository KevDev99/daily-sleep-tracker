import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Chart from "../components/Chart";
import SleepModal from "../components/SleepModal";
import SleepStats from "../components/SleepStats";
import ToggleSwitch from "../components/ToggleSwitch";
import { getSleepEntries, toggleModal } from "../features/sleep/sleepSlice";

const HomePage = () => {
  const dispatch = useDispatch();

  const { isAddModalOpen, sleepData, isLoading, daysBack } = useSelector(
    (state) => state.sleep
  );

  useEffect(() => {
    dispatch(getSleepEntries());
  }, [dispatch, daysBack]);

  return (
    <>
      {isAddModalOpen && <SleepModal />}
      <div className="container">
        <div className="flex space">
          <div className="flex a-center">
            <h2>Sleep duration</h2>
            <ToggleSwitch />
          </div>

          <button className="btn" onClick={() => dispatch(toggleModal())}>
            New Entry
          </button>
        </div>
        <div className="sleep-duration">
          <Chart sleepData={sleepData} isLoading={isLoading} />
        </div>

        <div className="sleep-stats mt-2">
          <h2 className="mb-2">Sleep stats</h2>
          <SleepStats sleepData={sleepData} isLoading={isLoading} />
        </div>
      </div>
    </>
  );
};

export default HomePage;
