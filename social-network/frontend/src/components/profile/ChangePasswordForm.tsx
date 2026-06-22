import { useState } from 'react'
import { useForm } from 'react-hook-form'
import type { SubmitHandler } from 'react-hook-form'
import { accountService } from '../../services/accountService'
import { Button } from '../ui/Button'
import { Card } from '../ui/Card'

type PasswordForm = { currentPassword: string; newPassword: string }

export const ChangePasswordForm = () => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm<PasswordForm>()
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')

  const onSubmit: SubmitHandler<PasswordForm> = async (data) => {
    setLoading(true); setError(''); setSuccess(false)
    try {
      await accountService.changePassword(data.currentPassword, data.newPassword)
      setSuccess(true); reset()
    } catch {
      setError('Failed to update password. Check your current password.')
    } finally { setLoading(false) }
  }
  
  const inputCls = (hasErr: boolean) =>
    `w-full px-4 py-3 rounded-xl border bg-[#f5fbff] text-[#3a5a6e] text-sm focus:outline-none focus:border-[#7ec8e3] focus:ring-2 focus:ring-[#bde0f5]/60 transition-all ${hasErr ? 'border-red-300' : 'border-[#cce4f0]'}`

  return (
    <Card title="Change Password">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {error && <p className="text-xs text-red-400">{error}</p>}
        {success && <p className="text-xs text-green-500">Password updated successfully.</p>}
        <div>
          <label className="block text-xs font-semibold text-[#7aa5b8] mb-1">Current Password</label>
          <input type="password" {...register('currentPassword', { required: true })} placeholder="••••••••" className={inputCls(!!errors.currentPassword)} />
          {errors.currentPassword && <p className="mt-1 text-[11px] text-red-400">Required</p>}
        </div>
        <div>
          <label className="block text-xs font-semibold text-[#7aa5b8] mb-1">New Password</label>
          <input type="password" {...register('newPassword', { required: true, minLength: 6 })} placeholder="••••••••" className={inputCls(!!errors.newPassword)} />
          {errors.newPassword && <p className="mt-1 text-[11px] text-red-400">Min 6 characters</p>}
        </div>
        <Button type="submit" loading={loading}>Update Password</Button>
      </form>
    </Card>
  )
}