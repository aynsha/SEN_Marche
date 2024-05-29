import React from "react";
import banner2 from "./Assets/Imgs/banner2.png";
import { Link } from "react-router-dom";
import {Icon} from "@iconify/react";
import logo from "./Assets/Imgs/logo.png";

const Hero = () => {
  return (
    <div>
      <div className="hero relative inline-block  ">
        <img src={banner2} alt="" className=""/>
        <div className="info absolute top-16 left-[63%]  ">
          <p className=" text-primary text-xs ">WELCOME TO SHOPERY</p>
          <h1 className="text-black text-[50px] lg:text-[50px] md:text-[25px] sm:text-[15px]  w-[90%] font-semibold leading-tight ">
            Fresh & Healthy Organic Food
          </h1>
          <p className="text-[25px] lg:text-[25px] leading-[2] sm:text-[10px] ">
            Sale up to{" "}
            <span className="bg-secondary text-white text-[15px] lg:text-[15px] p-1 rounded sm:text-[10px]">
              30% OFF
            </span>
          </p>
          <p className="text-xs lg:text-xs sm:text-[6px] ">Free shipping on all your order, we deliver, you enjoy</p>
          <Link to="/shop">
            <button className="p-2 pl-8 pr-8 lg:p-2 lg:pl-8 lg:pr-8 sm:pl-2 sm:pr-2 sm:p-1 sm:text-[6px] sm:mt-2 bg-primary text-white lg:text-[13px] lg:mt-6 text-[13px] mt-6 rounded-2xl flex">Shop Now<Icon icon="formkit:arrowright"  style={{color: 'white', marginTop: '4px'}} /></button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Hero;
