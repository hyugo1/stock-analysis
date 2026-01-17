'use client';

// app/(auth)/sign-up/page.tsx
import {useForm} from "react-hook-form";
import { Button } from '@/components/ui/button';
import InputField from "@/components/forms/InputField";
import SelectField from "@/components/forms/SelectField";
import {CountrySelectField} from "@/components/forms/CountrySelectField";
import {INVESTMENT_GOALS, PREFERRED_INDUSTRIES, RISK_TOLERANCE_OPTIONS} from "@/lib/constants";
import FooterLink from "@/components/forms/FooterLink";
import { signUpWithEmail } from "@/lib/actions/auth.actions";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const SignUp = () => {
  const router = useRouter()
  const {
    register, 
    handleSubmit,
    control, 
    formState: {errors, isSubmitting},
    } = useForm<SignUpFormData>( {
      defaultValues: {
        fullName: '',
        email: '',
        password: '',
        country: 'US',
        investmentGoals: 'Growth',
        riskTolerance: 'Medium',
        preferredIndustry: 'Technology'}, mode: 'onBlur'
      },
    );

  const onSubmit = async (data: SignUpFormData) => {
    try {
      const result = await signUpWithEmail(data);
      if (result.success) router.push('/');
    } catch (error) {
      console.error("Error submitting form: ", error);
      toast.error("Sign up failed.", { description: error instanceof Error ? error.message : "Failed to create an account." }); 
    }
  } 
  return (
    <>
      <h1 className="form-title animate-fade-up">Sign Up</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        {/* INPUTS */}
          <InputField 
            name="fullName" 
            label="Full Name" 
            placeholder="Robert Anderson" 
            register={register}
            error={errors.fullName}
            validation={{ required: "Full name must be at least 2 characters.", minLength: 2 }}
            />

          <InputField
            name="email"
            label="Email"
            placeholder="marketpulse@12345.com"
            type="email"
            register={register}
            error={errors.email}
            validation={{
              required: 'Email is required.',
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: 'Invalid email address',
              },
            }}
          />

          <InputField
            name="password"
            label="Password"
            placeholder="Enter a strong password"
            type="password"
            register={register}
            error={errors.password}
            validation={{ 
              required: 'Password is required.', 
              minLength: { value: 8, message: 'Password must be at least 8 characters.' }
            }}
          />

          {/* country */}

          <div className="grid grid-cols-2 gap-4">
          <CountrySelectField
              name="country"
              label="Country"
              control={control}
              error={errors.country}
              required
            />

            <SelectField
              name="riskTolerance"
              label="Risk Tolerance"
              placeholder="Select your risk level"
              options={RISK_TOLERANCE_OPTIONS}
              control={control}
              error={errors.riskTolerance}
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
           <SelectField
              name="investmentGoals"
              label="Investment Goals"
              placeholder="Select your investment goal"
              options={INVESTMENT_GOALS}
              control={control}
              error={errors.investmentGoals}
                required
            />

            <SelectField
                name="preferredIndustry"
                label="Preferred Industry"
                placeholder="Select your preferred industry"
                options={PREFERRED_INDUSTRIES}
                control={control}
                error={errors.preferredIndustry}
                required
            />
          </div>
        

        <Button
          type="submit"
          variant="premium"
          size="lg"
          disabled={isSubmitting}
          className="w-full mt-5 btn-shine hover-lift transition-all duration-300"
        >
          {isSubmitting ? (
            <span className="flex items-center gap-2">
              <svg
                className="animate-spin h-5 w-5"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
              Creating Account...
            </span>
          ) : (
            'Start Investing'
          )}
        </Button>


        {/* footer */}
        <FooterLink 
          text="Already have an account?" 
          linkText="Sign In" 
          href="/sign-in" 
        />

      </form>

    </>
  )
}

export default SignUp