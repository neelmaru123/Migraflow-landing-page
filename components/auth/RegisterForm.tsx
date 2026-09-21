'use client';

import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useRegister } from '../../hooks/mutations/useAuthMutations';
import { UserRegisterPayload } from '../../types/auth';
import GoogleAuthButton from './GoogleAuthButton';
import { ArrowRight, Lock, Mail, User, Eye, EyeOff, Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';

export default function RegisterForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const registerMutation = useRegister();
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    const errorParam = searchParams.get('error');
    if (errorParam) {
      toast.error(decodeURIComponent(errorParam));
      window.history.replaceState({}, '', '/register');
    }
  }, [searchParams]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserRegisterPayload>({
    mode: 'onTouched',
  });

  const onSubmit = (data: UserRegisterPayload) => {
    registerMutation.mutate(data, {
      onSuccess: () => {
        const appUrl = process.env.NEXT_PUBLIC_APP_URL;
        if (appUrl && (appUrl.startsWith('http://') || appUrl.startsWith('https://'))) {
          window.location.href = `${appUrl}/dashboard`;
        } else {
          router.push('/dashboard');
        }
      },
    });
  };

  return (
    <div className="space-y-4">
      {/* Google Auth Button */}
      <GoogleAuthButton label="Sign Up with Google" />

      {/* Or Divider */}
      <div className="relative flex items-center justify-center my-3">
        <div className="w-full border-t border-sky-400/15" />
        <span className="absolute px-3 bg-black text-[10px] font-mono text-zinc-400 uppercase tracking-widest">
          OR WITH EMAIL
        </span>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
        {/* Name Field */}
        <div>
          <label className="block text-[11px] font-semibold uppercase tracking-wider text-zinc-300 mb-1">
            Full Name
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-sky-400">
              <User className="w-3.5 h-3.5" />
            </div>
            <input
              type="text"
              placeholder="Alice Smith"
              autoComplete="name"
              disabled={registerMutation.isPending}
              {...register('name', {
                required: 'Full Name is required',
                minLength: {
                  value: 2,
                  message: 'Name must be at least 2 characters',
                },
                maxLength: {
                  value: 255,
                  message: 'Name cannot exceed 255 characters',
                },
              })}
              className={`w-full pl-9 pr-3 py-2 bg-sky-400/[0.04] backdrop-blur-md border ${
                errors.name ? 'border-red-500' : 'border-sky-400/30 focus:border-sky-400'
              } rounded-none text-xs text-white placeholder-zinc-500 focus:outline-none transition-colors font-sans disabled:opacity-50`}
            />
          </div>
          {errors.name && (
            <p className="mt-0.5 text-[11px] text-red-400 font-mono">{errors.name.message}</p>
          )}
        </div>

        {/* Email Field */}
        <div>
          <label className="block text-[11px] font-semibold uppercase tracking-wider text-zinc-300 mb-1">
            Email Address
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-sky-400">
              <Mail className="w-3.5 h-3.5" />
            </div>
            <input
              type="email"
              placeholder="user@example.com"
              autoComplete="email"
              disabled={registerMutation.isPending}
              {...register('email', {
                required: 'Email address is required',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'Please enter a valid email address',
                },
              })}
              className={`w-full pl-9 pr-3 py-2 bg-sky-400/[0.04] backdrop-blur-md border ${
                errors.email ? 'border-red-500' : 'border-sky-400/30 focus:border-sky-400'
              } rounded-none text-xs text-white placeholder-zinc-500 focus:outline-none transition-colors font-sans disabled:opacity-50`}
            />
          </div>
          {errors.email && (
            <p className="mt-0.5 text-[11px] text-red-400 font-mono">{errors.email.message}</p>
          )}
        </div>

        {/* Password Field */}
        <div>
          <label className="block text-[11px] font-semibold uppercase tracking-wider text-zinc-300 mb-1">
            Password (Min. 8 characters)
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-sky-400">
              <Lock className="w-3.5 h-3.5" />
            </div>
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="••••••••"
              autoComplete="new-password"
              disabled={registerMutation.isPending}
              {...register('password', {
                required: 'Password is required',
                minLength: {
                  value: 8,
                  message: 'Password must be at least 8 characters',
                },
                maxLength: {
                  value: 128,
                  message: 'Password must not exceed 128 characters',
                },
              })}
              className={`w-full pl-9 pr-10 py-2 bg-sky-400/[0.04] backdrop-blur-md border ${
                errors.password ? 'border-red-500' : 'border-sky-400/30 focus:border-sky-400'
              } rounded-none text-xs text-white placeholder-zinc-500 focus:outline-none transition-colors font-sans disabled:opacity-50`}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-zinc-400 hover:text-sky-400 transition-colors"
              tabIndex={-1}
            >
              {showPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
            </button>
          </div>
          {errors.password && (
            <p className="mt-0.5 text-[11px] text-red-400 font-mono">{errors.password.message}</p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={registerMutation.isPending}
          className="w-full py-2.5 px-4 rounded-none bg-sky-400 hover:bg-sky-300 text-black text-xs font-bold uppercase tracking-wider transition-colors flex items-center justify-center gap-2 shadow-lg shadow-sky-950/50 disabled:opacity-50 mt-4 cursor-pointer disabled:cursor-not-allowed"
        >
          {registerMutation.isPending ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Creating Account...</span>
            </>
          ) : (
            <>
              <span>Create Account</span>
              <ArrowRight className="w-4 h-4" />
            </>
          )}
        </button>
      </form>

      {/* Switch to Login */}
      <div className="text-center pt-1">
        <p className="text-xs text-zinc-400">
          Already have an account?{' '}
          <Link href="/login" className="text-sky-400 hover:text-sky-300 font-semibold underline underline-offset-4">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
}
