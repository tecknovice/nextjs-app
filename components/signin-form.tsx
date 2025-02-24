'use client';

import { lusitana } from '@/app/fonts';
import {
  AtSymbolIcon,
  KeyIcon,
  ExclamationCircleIcon
} from '@heroicons/react/24/outline';
import { ArrowRightIcon } from '@heroicons/react/20/solid';
import { Button } from './ui/button';
import { useSearchParams } from 'next/navigation';
import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { signin } from '@/services/auth';
import { useRouter } from 'next/navigation'
import { useState } from 'react';

const schema = z.object({
  email: z.string().email("Invalid email format").nonempty("Email is required"),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters")
    .nonempty("Password is required"),
});

type FormData = z.infer<typeof schema>; 

export default function SigninForm() {
  const router = useRouter()
  const [error,setError] = useState("");

  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') || '/dashboard';

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });
  
  const onSubmit = async (data: FormData) => {
    // Handle API call or further actions
    const result = await signin(data);
    if(result.data){
      //redirect to dashboard
      router.push(callbackUrl);
    }
    if(result.error){
      setError(result.error)
    }
  };  
  
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
      <div className="flex-1 rounded-lg bg-gray-50 px-6 pb-4 pt-8">
        <h1 className={`${lusitana.className} mb-3 text-2xl`}>
          Please sign in to continue.
        </h1>
        <div className="w-full">
          <div>
            <label
              className="mb-3 mt-5 block text-xs font-medium text-gray-900"
              htmlFor="email"
            >
              Email
            </label>
            <div className="relative">
              <input
                className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                id="email"
                type="email"
                {...register("email")}
                placeholder="Enter your email address"
                
              />
              <AtSymbolIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
            {errors.email && <p>{errors.email.message}</p>}
          </div>
          <div className="mt-4">
            <label
              className="mb-3 mt-5 block text-xs font-medium text-gray-900"
              htmlFor="password"
            >
              Password
            </label>
            <div className="relative">
              <input
                className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                id="password"
                type="password"
                {...register("password")}
                placeholder="Enter password"
                required
                minLength={6}
              />
              <KeyIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
            {errors.password && <p>{errors.password.message}</p>}
          </div>
        </div>
        <Button className="mt-4 w-full">
          Sign in <ArrowRightIcon className="ml-auto h-5 w-5 text-gray-50" />
        </Button>
        
        <div className="flex h-8 items-end space-x-1">
          {/* Add form errors here */}
          {error && (
            <>
              <ExclamationCircleIcon className="h-5 w-5 text-red-500" />
              <p className="text-sm text-red-500">{error}</p>
            </>
          )}
        </div>
        
      </div>
    </form>
  );
}
