import React from "react";

export const customDateFormat = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString();
};

export const getTotalSleepDuration = (sleepTime, wakeUpTime) => {
  const sleepTimeDate = new Date("01/01/1970 " + sleepTime);
  const wakeUpTimeDate = new Date("01/02/1970 " + wakeUpTime);
  return Math.abs(wakeUpTimeDate - sleepTimeDate) / 36e5;
};

const SleepStats = ({ sleepData, isLoading }) => {
  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (!sleepData || sleepData.length <= 0) {
    return <p>No data currently.</p>;
  }

  return (
    <div className="stats-container">
      <table className="stats-table">
        <thead className="stats-table_header">
          <tr>
            <th></th>
            <th>Time of sleep</th>
            <th>Wake up time</th>
            <th>Sleep duration</th>
          </tr>
        </thead>
        <tbody className="stats-table_body">
          {sleepData.map((sleep) => {
            return (
              <tr key={sleep._id}>
                <td>{customDateFormat(sleep.date)}</td>
                <td>{sleep.sleepTime}</td>
                <td>{sleep.wakeUpTime}</td>
                <td>
                  {getTotalSleepDuration(sleep.sleepTime, sleep.wakeUpTime)}{" "}
                  hours
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default SleepStats;
