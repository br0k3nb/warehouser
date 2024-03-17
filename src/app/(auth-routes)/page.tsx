"use client";

import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from 'next/navigation';
import Image from "next/image";
import { MdOutlineEmail } from "react-icons/md";
import { FcGoogle } from "react-icons/fc";
import { FieldValues, useForm } from 'react-hook-form';
import Cookies from 'js-cookie';

import api from "@/services/api";
import logo from "../../../public/logo.png";
import warehouse from '../../../public/warehouse2.jpg';
import { toastAlert } from "@/components/ui/alert";
import { useState } from "react";
import { signIn, getSession } from "next-auth/react";

export default function Home () {
  const router = useRouter();
 const { register, handleSubmit } = useForm();
  const [loader, setLoader] = useState(false);

  const handleForm = async ({ email, password }: FieldValues) => {
    try {
      const data = await signIn('credentials', {
        email,
        password,
        redirect: false,
      });

      if(data?.error) {
        console.log(data);
        return;
      }
      const teste = await getSession();
      console.log(teste);      

      // if(!data.settings.theme || (data.settings.theme && data.settings.theme === 'dark')) {
      //     document.documentElement.classList.add("dark");
      // }
      
      // router.push('/home');
      setLoader(false); 
    } catch (err: any) { 
      setLoader(false);
      toastAlert({ icon: "error", title: err.message, timer: 2500 });

      console.log(err);
    } finally { 
      setLoader(false);
    }
  };

  return (
    <div className="bg-black h-screen text-white">
      <div className="flex flex-row">
        <div className="w-[50%] z-50">
          <Image
            fill
            src={warehouse.src}
            alt="App logo"
            className="-z-10 opacity-40 !w-[50%]"
            draggable={false}
          />
          <Image
            src={logo.src}
            alt="App logo"
            width={250}
            height={300}
            className="invert-color ml-8 mt-8 z-50"
            draggable={false}
          />
        </div>
        <Separator className="bg-gray-700 !h-screen z-50" orientation="vertical"/>
        <div className="w-[50%] flex flex-col z-50 bg-black">
          <div className="flex justify-end mt-8 mr-8">
            <Button 
              // onClick={() => handleNav()} 
              className="w-fit text-[16px] dark" 
              variant={'ghost'}
              size={'sm'}
            >
              Sign in
            </Button>
          </div>
          <div className="flex flex-col space-y-10 align-middle m-52">
            <div className="mx-auto flex w-full flex-col justify-center space-y-2 sm:w-[350px] text-center">
              <h1 className="text-2xl font-semibold tracking-tight">Sign in</h1>
              <p className="text-sm text-gray-400">Enter your email below to sign in to your account</p>
            </div>
            <form noValidate onSubmit={handleSubmit(handleForm)} className="flex flex-col space-y-3">
              <Input 
                type="email" 
                placeholder="Email" 
                className="text-md bg-transparent focus:ring-0 outline-none border border-gray-500 focus:border-gray-400 rounded-full pl-5"
                {...register("email")}
              />
              <Input 
                type="password" 
                placeholder="Password" 
                className="text-md bg-transparent focus:ring-0 outline-none border border-gray-500 focus:border-gray-400 rounded-full pl-5"
                {...register("password")}
              />
              <Button 
                className="text-[15px] dark !mt-2 rounded-full w-full"
              >
                <div className={`flex flex-row ${loader && 'animate-pulse'}`}>
                  {loader ? 'Loading...' : 'Sign in with Email'}
                  <MdOutlineEmail size={22} className="ml-2" />
                </div>
              </Button>
            </form>
            <div className="flex flex-row space-x-2 mx-auto !mt-7 text-gray-300">
              <Separator className="w-16 mt-2 bg-gray-300"/>
              <p className="text-xs uppercase tracking-wide">or continue with</p>
              <Separator className="w-16 mt-2 bg-gray-300"/>
            </div>
            <Button 
              className="text-[15px] !mt-7 border border-gray-600 hover:bg-accent dark text-gray-200 rounded-full"
              variant={'ghost'}
            >
              <div className="flex flex-row">
                Sign in Google
                <FcGoogle size={22} className="ml-2" />
              </div>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}