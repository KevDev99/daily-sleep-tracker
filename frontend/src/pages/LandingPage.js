import React from "react";
import SleepAnalysis from "../assets/images/sleep_analysis.svg";
import { Link } from "react-router-dom";

import { ReactComponent as RescheduleDate } from "../assets/icons/reschedule-date.svg";
import { ReactComponent as WakeUp } from "../assets/icons/wake-up.svg";
import { ReactComponent as Eyelook } from "../assets/icons/eye-look.svg";

const LandingPage = () => {
  return (
    <div className="container">
      <div className="homepage ">
        <div className="legend">
          <p className="legend-text">Track your sleep</p>
          <p className="legend-text">
            for a <span className="underline">better lifestyle</span>
          </p>
          <p className="legend-subheader">
            Understand your sleep cycles to fall asleep better
          </p>

          <div className="get-started">
            <Link to="/signin" className="btn">
              Get Started
            </Link>
          </div>
        </div>

        <div className="landing-img">
          <img src={SleepAnalysis} alt="sleep analysis" />
        </div>
      </div>

      <div className="benefit-list">
        <div className="item">
          <div className="svg_wrapper">
            <RescheduleDate />
          </div>
          <p>Keep Track</p>
        </div>

        <div className="item">
          <div className="svg_wrapper">
            <WakeUp />
          </div>
          <p>
            Optimize your <br /> routine
          </p>
        </div>
        <div className="item">
          <div className="svg_wrapper">
            <Eyelook />
          </div>
          <p>Identify sleep <br/> issues</p>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
