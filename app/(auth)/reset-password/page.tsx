'use client';

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import InputField from '@/components/forms/InputField';
import FooterLink from '@/components/forms/FooterLink';
import { resetPassword } from '@/lib/actions/auth.actions';
import { toast } from 'sonner';
import { Lock, ArrowRight, Loader2, CheckCircle, AlertCircle, Eye, EyeOff } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';

interface ResetPasswordFormData {
    password: string;
    confirmPassword: string;
}

const ResetPassword = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [isLoading, setIsLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    
    const token = searchParams.get('token');
    const error = searchParams.get('error');
    
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<ResetPasswordFormData>({
        mode: 'onBlur',
    });

    const password = watch('password');

    // Check if token is invalid
    if (error === 'INVALID_TOKEN' || !token) {
        return (
            <>
                <h1 className="form-title">Invalid Reset Link</h1>
                <div className="text-center py-4">
                    <div className="mx-auto w-16 h-16 bg-red-500/10 rounded-full flex items-center justify-center mb-4">
                        <AlertCircle className="size-8 text-red-500" />
                    </div>
                    <p className="text-muted-foreground mb-6">
                        {error === 'INVALID_TOKEN' 
                            ? 'This password reset link is invalid or has expired.'
                            : 'No reset token provided. Please use the link from your email.'}
                    </p>
                    <Button
                        type="button"
                        variant="premium"
                        size="lg"
                        onClick={() => router.push('/forgot-password')}
                        className="w-full mb-4"
                    >
                        Request New Link
                    </Button>
                    <FooterLink 
                        text="Remember your password?" 
                        linkText="Sign In" 
                        href="/sign-in" 
                    />
                </div>
            </>
        );
    }

    const onSubmit = async (data: ResetPasswordFormData) => {
        setIsLoading(true);
        
        try {
            const result = await resetPassword(token, data.password);
            
            if (result.success) {
                setIsSuccess(true);
                toast.success('Password reset!', {
                    description: 'Your password has been updated successfully.',
                    icon: <div className="size-5 bg-green-500/20 rounded-full flex items-center justify-center"><CheckCircle className="size-3 text-green-500" /></div>,
                    duration: 5000,
                });
                
                // Redirect to sign-in after a short delay
                setTimeout(() => {
                    router.push('/sign-in');
                }, 2000);
            } else {
                toast.error('Reset failed', {
                    description: result.error || 'Please try again.',
                });
            }
        } catch (error) {
            console.error('Reset password error:', error);
            toast.error('Something went wrong', {
                description: 'Please try again or request a new reset link.',
            });
        } finally {
            setIsLoading(false);
        }
    };

    if (isSuccess) {
        return (
            <>
                <h1 className="form-title">Password Reset!</h1>
                <div className="text-center py-4">
                    <div className="mx-auto w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center mb-4 animate-pulse">
                        <CheckCircle className="size-8 text-green-500" />
                    </div>
                    <p className="text-muted-foreground mb-6">
                        Your password has been successfully reset. Redirecting you to sign in...
                    </p>
                    <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                        <Loader2 className="size-4 animate-spin" />
                        Redirecting...
                    </div>
                </div>
            </>
        );
    }

    return (
        <>
            <h1 className="form-title">Reset Password</h1>
            <p className="text-muted-foreground text-sm mb-6">
                Enter your new password below.
            </p>
            
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                <div className="relative">
                    <InputField
                        name="password"
                        label="New Password"
                        placeholder="Enter new password"
                        type={showPassword ? "text" : "password"}
                        register={register}
                        error={errors.password}
                        validation={{
                            required: 'Password is required.',
                            minLength: { value: 8, message: 'Password must be at least 8 characters.' },
                        }}
                    />
                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-[38px] text-muted-foreground hover:text-foreground transition-colors"
                    >
                        {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                    </button>
                </div>

                <div className="relative">
                    <InputField
                        name="confirmPassword"
                        label="Confirm Password"
                        placeholder="Confirm new password"
                        type={showConfirmPassword ? "text" : "password"}
                        register={register}
                        error={errors.confirmPassword}
                        validation={{
                            required: 'Please confirm your password.',
                            validate: (value: string) => value === password || 'Passwords do not match.',
                        }}
                    />
                    <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-3 top-[38px] text-muted-foreground hover:text-foreground transition-colors"
                    >
                        {showConfirmPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                    </button>
                </div>

                {/* Password strength indicator */}
                {password && (
                    <div className="space-y-2">
                        <div className="flex gap-1">
                            <div className={`h-1 flex-1 rounded-full transition-colors ${password.length >= 8 ? 'bg-green-500' : 'bg-gray-300 dark:bg-gray-600'}`} />
                            <div className={`h-1 flex-1 rounded-full transition-colors ${password.length >= 12 ? 'bg-green-500' : 'bg-gray-300 dark:bg-gray-600'}`} />
                            <div className={`h-1 flex-1 rounded-full transition-colors ${/[A-Z]/.test(password) && /[0-9]/.test(password) && /[^A-Za-z0-9]/.test(password) ? 'bg-green-500' : 'bg-gray-300 dark:bg-gray-600'}`} />
                        </div>
                        <p className="text-xs text-muted-foreground">
                            Password should be at least 8 characters. Add uppercase, numbers, and symbols for stronger security.
                        </p>
                    </div>
                )}

                <Button 
                    type="submit" 
                    variant="premium" 
                    size="lg" 
                    disabled={isLoading}
                    className="w-full mt-5 btn-shine hover-lift transition-all duration-300"
                >
                    {isLoading ? (
                        <span className="flex items-center gap-2">
                            <Loader2 className="size-5 animate-spin" />
                            Resetting...
                        </span>
                    ) : (
                        <span className="flex items-center gap-2">
                            Reset Password
                            <ArrowRight className="size-4" />
                        </span>
                    )}
                </Button>

                <FooterLink 
                    text="Remember your password?" 
                    linkText="Sign In" 
                    href="/sign-in" 
                />
            </form>
        </>
    );
};

export default ResetPassword;