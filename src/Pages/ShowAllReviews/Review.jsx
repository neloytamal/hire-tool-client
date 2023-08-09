/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react';
import undefinedImg from "../../assets/undefinedImg.jpg"

const Review = ({review}) => {
    return (
        <div className='card-style py-10 flex flex-col items-center p-7'>
                    <div className="avatar">
                    <div className="w-24 rounded-full">
                    <img src={review?.photoURL || review?.companyLogo || undefinedImg} className='w-20 mb-4' alt="" />  </div>
        </div>
            <p className='font-bold text-3xl text-yellow-500'> {review?.rating}.00</p>
            <p><strong className='capitalize text-xl '>{review?.displayName}</strong></p>
            <p className='mt-4'>{review?.review}</p>
        </div>
    );
};

export default Review;