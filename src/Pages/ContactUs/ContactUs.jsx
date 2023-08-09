
import React, { useRef, useState } from "react";
import emailjs from '@emailjs/browser';
import { Toaster, toast } from "react-hot-toast";


const ContactUs = () => {

  const form = useRef();
  const[messagestatus,setmessagestatus]=useState("")

  const sendEmail = (e) => {
    e.preventDefault();
    console.log(form.current)

    emailjs.sendForm('service_usnwv15', 'template_m18goqb', form.current, 'wWGjbSAA9MQiu4Eei')
      .then((result) => {
          console.log(result.text);
          toast.success('Your message sent successfully!')
          form.current.reset();
      }, (error) => {
          console.log(error.text);
          toast.error("This didn't work. Try again later.")
          form.current.reset();
      });

  };





  return (
    <div className="min-h-screen">
      <div className="hero min-h-screen">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="text-center lg:text-left lg:w-[40%] md:w-[50%] md:ml-6">
            <h1 className="text-5xl font-bold">Contact Us!</h1>
            <p className="py-6">
            We value your trust and strive to provide the best user experience possible. If you have any questions, concerns, or need assistance with any aspect of our platform, our dedicated support team is always ready to assist you.
            </p>
          </div>
          
          
          <form className="card flex-shrink-0 w-full max-w-sm card-style  bg-base-100" ref={form} onSubmit={sendEmail}>



            <div className="card-body">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Name</span>
                </label>
                <input
                  type="text"
                  placeholder="name"
                  className="input input-bordered"
                  name="user_name" 
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="text"
                  placeholder="email"
                  className="input input-bordered"
                  name="user_email"
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Message</span>
                </label>
                <textarea
                  type="text"
                  placeholder="message"
                  className="input input-bordered"
                  name="message"
                />
              </div>
              <div className="form-control mt-6" >
                {/* <input type="submit" value=""  /> */}
                <button  type="submit" className=" py-4 btn btn-outline btn-primary " >Contact us</button>
              </div>
            </div>

"

          </form>



        </div>
      </div>
      <Toaster
  position="top-center"
  reverseOrder={false}
/>
    </div>
  );
};

export default ContactUs;
