/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
/* eslint-disable no-unsafe-optional-chaining */

import { useEffect } from "react";

const Notification = (props) => {
  // eslint-disable-next-line react/prop-types
  const { interviewWith } = props;

  const { job, company, interviewTime } = interviewWith;

  console.log(interviewTime);

  /// {
  // appointmentCompanyUID : "QIiqJpQfKddNbhX9VsocpbBPnhc2",
  //     interviewTime : {interviewDate: '2023-06-05', interviewTime: '02:07'}
  //     job_id : "649ddb94ef11bc2731187cbf"
  // }

  return (
    <div>
      <p className="text-center md:text-4xl text-3xl font-semibold text-primary mb-8">
        Notification
      </p>
      <div className="card-style card-hovered p-5 m-5">
        <p>
          You have an interview with {company?.companyName} as a {job.jobTitle}{" "}
          at {interviewTime.interviewTime} in {interviewTime.interviewDate}
        </p>
      </div>
    </div>
  );
};

export default Notification;
