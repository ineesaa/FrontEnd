import { Link, useNavigate } from 'react-router-dom'
import type { SubmitHandler } from 'react-hook-form'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import { useState } from 'react'
import { Http } from '../../../config/api'
import type { User } from '../../../helpers/types'

type SignupUser = { firstName: string; lastName: string; username: string; password: string }
const inputClass = (hasError: boolean) =>
  `w-full pl-10 pr-4 py-3 rounded-xl border bg-[#f5fbff] text-[#3a5a6e] placeholder-[#c0d8e8] text-sm focus:outline-none focus:border-[#7ec8e3] focus:ring-2 focus:ring-[#bde0f5]/60 transition-all ${hasError ? 'border-red-300' : 'border-[#cce4f0]'}`

export const Signup = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<SignupUser>()
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleSignup: SubmitHandler<SignupUser> = (data) => {
    Http.post('/auth/signup', data)
      .then(() => navigate('/'))
      .catch((err) => { if (axios.isAxiosError(err)) setError((err.response?.data as { message: string }).message) })
  }

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[#f5f0e8] relative overflow-hidden">
      <div className="absolute top-[-80px] left-[-80px] w-[340px] h-[340px] rounded-full bg-[#bde0f5] opacity-40 blur-3xl pointer-events-none" />
      <div className="absolute bottom-[-60px] right-[-60px] w-[280px] h-[280px] rounded-full bg-[#a8d5ee] opacity-30 blur-3xl pointer-events-none" />
      <div className="absolute top-[40%] right-[8%] w-[160px] h-[160px] rounded-full bg-[#e8ddd0] opacity-50 blur-2xl pointer-events-none" />

      <div className="relative z-10 w-full max-w-md mx-4 my-8">
        <div className="h-1.5 w-full rounded-t-2xl bg-gradient-to-r from-[#7ec8e3] via-[#a8d5ee] to-[#c5e8f5]" />
        <div className="bg-white/70 backdrop-blur-md border border-[#d8ecf5] rounded-b-2xl shadow-[0_8px_40px_rgba(126,200,227,0.18)] px-10 py-10">
          <div className="flex justify-center mb-6">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#bde0f5] to-[#7ec8e3] flex items-center justify-center shadow-md">
              <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0ZM4 19.235v-.11a6.375 6.375 0 0 1 12.75 0v.109A12.318 12.318 0 0 1 10.374 21c-2.331 0-4.512-.645-6.374-1.766Z" />
              </svg>
            </div>
          </div>
          <h1 className="text-center text-3xl font-bold tracking-tight text-[#3a5a6e] mb-1" style={{ fontFamily: "'Georgia', serif" }}>Create account</h1>
          <p className="text-center text-sm text-[#8aabbf] mb-8" style={{ fontFamily: "'Georgia', serif" }}>Join us — it only takes a moment</p>

          <form onSubmit={handleSubmit(handleSignup)} className="space-y-5">
            <div>{error && <p className="my-2 text-red-400">{error}</p>}</div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-widest text-[#7aa5b8] mb-2">First Name</label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-3.5 flex items-center text-[#a8cfe0]"><svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0" /></svg></span>
                  <input type="text" placeholder="John" {...register('firstName', { required: true })} className={inputClass(!!errors.firstName)} />
                </div>
                {errors.firstName && <p className="mt-1 text-[11px] text-red-400">Required</p>}
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase tracking-widest text-[#7aa5b8] mb-2">Last Name</label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-3.5 flex items-center text-[#a8cfe0]"><svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0" /></svg></span>
                  <input type="text" placeholder="Doe" {...register('lastName', { required: true })} className={inputClass(!!errors.lastName)} />
                </div>
                {errors.lastName && <p className="mt-1 text-[11px] text-red-400">Required</p>}
              </div>
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase tracking-widest text-[#7aa5b8] mb-2">Username</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-3.5 flex items-center text-[#a8cfe0]"><svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M16 12a4 4 0 1 1-8 0 4 4 0 0 1 8 0Zm0 0v1.5a2.5 2.5 0 0 0 5 0V12a9 9 0 1 0-9 9m4.5-1.206a8.959 8.959 0 0 1-4.5 1.207" /></svg></span>
                <input type="text" placeholder="john_doe" {...register('username', { required: true })} className={inputClass(!!errors.username)} />
              </div>
              {errors.username && <p className="mt-1 text-[11px] text-red-400">Required</p>}
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase tracking-widest text-[#7aa5b8] mb-2">Password</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-3.5 flex items-center text-[#a8cfe0]"><svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" /></svg></span>
                <input type="password" placeholder="Password123" {...register('password', { required: true, pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/ })} className={inputClass(!!errors.password)} />
              </div>
              <p className={`mt-2 text-[11px] ${errors.password ? 'text-red-400' : 'text-[#a8c8d8]'}`}>Must contain uppercase, lowercase, and a number.</p>
            </div>
            <button type="submit" className="w-full mt-2 py-3.5 rounded-xl bg-gradient-to-r from-[#7ec8e3] to-[#5ab6d8] text-white font-semibold text-sm tracking-wide shadow-[0_4px_18px_rgba(126,200,227,0.45)] hover:shadow-[0_6px_24px_rgba(126,200,227,0.6)] hover:from-[#6dbedd] hover:to-[#4aaece] active:scale-[0.98] transition-all">Create Account</button>
          </form>

          <div className="flex items-center gap-3 my-7"><div className="flex-1 h-px bg-[#ddeef5]" /><span className="text-xs text-[#b0cdd9]" style={{ fontFamily: "'Georgia', serif" }}>or</span><div className="flex-1 h-px bg-[#ddeef5]" /></div>
          <p className="text-center text-xs text-[#9abfce]">Already have an account?{' '}<Link to="/" className="text-[#5ab6d8] font-semibold hover:text-[#3a9cc0] transition-colors">Sign in</Link></p>
        </div>
        <p className="text-center text-[10px] text-[#b8cfda] mt-5 tracking-wide">Protected · Secure · Private</p>
      </div>
    </div>
  )
}