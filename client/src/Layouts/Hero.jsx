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
          <h1 className="text-black text-[50px] w-[90%] font-semibold leading-tight ">
            Fresh & Healthy Organic Food
          </h1>
          <p className="text-[25px] leading-[2] ">
            Sale up to{" "}
            <span className="bg-secondary text-white text-[15px] p-1 rounded">
              30% OFF
            </span>
          </p>
          <p className="text-xs">Free shipping on all your order, we deliver, you enjoy</p>
          <Link to="/shop">
            <button className="p-2 pl-8 pr-8 bg-primary text-white text-[13px] mt-6 rounded-2xl flex">Shop Now<Icon icon="formkit:arrowright"  style={{color: 'white', marginTop: '4px'}} /></button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Hero;
