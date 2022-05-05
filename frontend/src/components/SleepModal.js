import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { reset, toggleModal } from "../features/sleep/sleepSlice";
import { createSleepEntry } from "../features/sleep/sleepSlice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const SleepModal = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isError, isSuccess, message } = useSelector(
    (state) => state.sleep
  );

  useEffect(() => {
 
    if (isError) {
      toast.error(message);
      dispatch(reset())
    }

    if (isSuccess) {
      navigate("/");
    }

  }, [dispatch, isError, isSuccess, navigate, message]);

  const [formData, setFormData] = useState({
    date: new Date().toISOString().slice(0, 10),
    sleepTime: "22:00",
    wakeUpTime: "08:00",
  });

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const getTotalSleepDuration = () => {
    const sleepTimeDate = new Date("01/01/1970 " + formData.sleepTime);
    const wakeUpTimeDate = new Date("01/02/1970 " + formData.wakeUpTime);
    return Math.abs(wakeUpTimeDate - sleepTimeDate) / 36e5;
  };

  const [totalSleepDuration, setTotalSleepDuration] = useState(
    getTotalSleepDuration()
  );

  const onChange = (e) => {
    setFormData((oldFormData) => {
      return {
        ...oldFormData,
        [e.target.name]: e.target.value,
      };
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(createSleepEntry(formData));
  };

  useEffect(() => {
    setTotalSleepDuration(getTotalSleepDuration());
  }, [formData.sleepTime, formData.wakeupTime, getTotalSleepDuration]);

  return (
    <div className="modal">
      <div className="modal-content">
        <h1>New entry</h1>

        <form id="add-sleep" onSubmit={onSubmit}>
          <div className="form-control mt-2">
            <label htmlFor="date">Date</label>
            <input
              type="date"
              name="date"
              id="date"
              value={formData.date}
              onChange={onChange}
            />
          </div>
          <div className="form-control">
            <label htmlFor="sleep-time">Sleep time</label>
            <input
              type="time"
              id="sleepTime"
              name="sleepTime"
              value={formData.sleepTime}
              onChange={onChange}
              required
            />
          </div>
          <div className="form-control">
            <label htmlFor="date">Wake up time</label>
            <input
              type="time"
              id="wakeUpTime"
              name="wakeUpTime"
              value={formData.wakeUpTime}
              onChange={onChange}
              required
            />
          </div>
          <h3>Total slept hours: {totalSleepDuration}</h3>

          <div className="mt-2">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => dispatch(toggleModal())}
            >
              Close
            </button>
            <button className="btn" type="submit">
              Add Data
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SleepModal;
