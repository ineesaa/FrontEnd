import { useForm } from 'react-hook-form';
import type { SubmitHandler } from 'react-hook-form';
import type { UserFormValues } from '../../types/user';

interface UserFormProps {
  defaultValues?: UserFormValues;
  onSubmit: (data: UserFormValues) => void;
  submitLabel?: string;
  isSubmitting?: boolean;
}

const emptyDefaults: UserFormValues = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  age: 0,
  city: '',
};

const inputBase =
  'px-3 py-2.5 border rounded-lg text-[0.95rem] outline-none transition-colors focus:border-indigo-500 focus:ring-3 focus:ring-indigo-100';

function UserForm({
  defaultValues,
  onSubmit,
  submitLabel = 'Save',
  isSubmitting = false,
}: UserFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserFormValues>({
    defaultValues: defaultValues ?? emptyDefaults,
    mode: 'onBlur',
  });

  const submitHandler: SubmitHandler<UserFormValues> = (data) => {
    onSubmit({ ...data, age: Number(data.age) });
  };

  return (
    <form
      className="flex flex-col gap-[1.1rem] max-w-[480px] bg-white p-8 rounded-xl shadow-sm"
      onSubmit={handleSubmit(submitHandler)}
      noValidate
    >
      <div className="flex flex-col gap-1.5">
        <label htmlFor="firstName" className="text-sm font-semibold text-slate-800">
          First Name
        </label>
        <input
          id="firstName"
          className={`${inputBase} ${errors.firstName ? 'border-red-400 focus:border-red-400 focus:ring-red-100' : 'border-slate-300'}`}
          {...register('firstName', {
            required: 'First name is required',
            minLength: { value: 2, message: 'Minimum 2 characters' },
            maxLength: { value: 40, message: 'Maximum 40 characters' },
          })}
        />
        {errors.firstName && (
          <span className="text-red-500 text-xs">{errors.firstName.message}</span>
        )}
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="lastName" className="text-sm font-semibold text-slate-800">
          Last Name
        </label>
        <input
          id="lastName"
          className={`${inputBase} ${errors.lastName ? 'border-red-400 focus:border-red-400 focus:ring-red-100' : 'border-slate-300'}`}
          {...register('lastName', {
            required: 'Last name is required',
            minLength: { value: 2, message: 'Minimum 2 characters' },
            maxLength: { value: 40, message: 'Maximum 40 characters' },
          })}
        />
        {errors.lastName && (
          <span className="text-red-500 text-xs">{errors.lastName.message}</span>
        )}
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="email" className="text-sm font-semibold text-slate-800">
          Email
        </label>
        <input
          id="email"
          type="email"
          className={`${inputBase} ${errors.email ? 'border-red-400 focus:border-red-400 focus:ring-red-100' : 'border-slate-300'}`}
          {...register('email', {
            required: 'Email is required',
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: 'Invalid email format',
            },
          })}
        />
        {errors.email && <span className="text-red-500 text-xs">{errors.email.message}</span>}
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="phone" className="text-sm font-semibold text-slate-800">
          Phone
        </label>
        <input
          id="phone"
          className={`${inputBase} ${errors.phone ? 'border-red-400 focus:border-red-400 focus:ring-red-100' : 'border-slate-300'}`}
          {...register('phone', {
            required: 'Phone number is required',
            pattern: {
              value: /^[+0-9\s-]{6,20}$/,
              message: 'Invalid phone number format',
            },
          })}
        />
        {errors.phone && <span className="text-red-500 text-xs">{errors.phone.message}</span>}
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="age" className="text-sm font-semibold text-slate-800">
          Age
        </label>
        <input
          id="age"
          type="number"
          className={`${inputBase} ${errors.age ? 'border-red-400 focus:border-red-400 focus:ring-red-100' : 'border-slate-300'}`}
          {...register('age', {
            required: 'Age is required',
            min: { value: 0, message: 'Age must be positive' },
            max: { value: 120, message: 'Age is too large' },
            valueAsNumber: true,
          })}
        />
        {errors.age && <span className="text-red-500 text-xs">{errors.age.message}</span>}
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="city" className="text-sm font-semibold text-slate-800">
          City
        </label>
        <input
          id="city"
          className={`${inputBase} ${errors.city ? 'border-red-400 focus:border-red-400 focus:ring-red-100' : 'border-slate-300'}`}
          {...register('city', {
            required: 'City is required',
            minLength: { value: 2, message: 'Minimum 2 characters' },
          })}
        />
        {errors.city && <span className="text-red-500 text-xs">{errors.city.message}</span>}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="mt-2 px-4 py-3 border-none rounded-lg bg-indigo-600 text-white text-base font-semibold cursor-pointer transition-all hover:not-disabled:bg-indigo-700 active:not-disabled:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {isSubmitting ? 'Submitting...' : submitLabel}
      </button>
    </form>
  );
}

export default UserForm;
