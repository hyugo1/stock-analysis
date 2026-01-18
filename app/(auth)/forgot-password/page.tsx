'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import InputField from '@/components/forms/InputField';
import FooterLink from '@/components/forms/FooterLink';
import { requestPasswordReset } from '@/lib/actions/auth.actions';
import { toast } from 'sonner';
import { Mail, ArrowRight, Loader2, CheckCircle, AlertCircle, Lock } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';

interface ForgotPasswordFormData {
    email: string;
}

const ForgotPassword = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [isLoading, setIsLoading] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [email, setEmail] = useState('');
    
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<ForgotPasswordFormData>({
        mode: 'onBlur',
    });

    const onSubmit = async (data: ForgotPasswordFormData) => {
        setIsLoading(true);
        setEmail(data.email);
        
        try {
            const result = await requestPasswordReset(data.email);
            
            if (result.success) {
                setIsSubmitted(true);
                toast.success('Check your email', {
                    description: 'If an account exists, we sent a password reset link.',
                    icon: <div className="size-5 bg-green-500/20 rounded-full flex items-center justify-center"><CheckCircle className="size-3 text-green-500" /></div>,
                    duration: 5000,
                });
            } else {
                toast.error('Failed to send reset link', {
                    description: result.error || 'Please try again later.',
                });
            }
        } catch (error) {
            console.error('Password reset error:', error);
            toast.error('Something went wrong', {
                description: 'Please try again or contact support.',
            });
        } finally {
            setIsLoading(false);
        }
    };

    if (isSubmitted) {
        return (
            <>
                <h1 className="form-title">Check Your Email</h1>
                <div className="text-center py-4">
                    <div className="mx-auto w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center mb-4">
                        <Mail className="size-8 text-green-500" />
                    </div>
                    <p className="text-muted-foreground mb-2">
                        We sent a password reset link to
                    </p>
                    <p className="font-medium text-foreground mb-6">{email}</p>
                    <div className="p-4 rounded-lg bg-amber-500/10 border border-amber-500/20 mb-6">
                        <p className="text-sm text-amber-600 dark:text-amber-400">
                            Click the link in the email to reset your password. The link will expire in 1 hour.
                        </p>
                    </div>
                    <Button
                        type="button"
                        variant="premium"
                        size="lg"
                        onClick={() => {
                            setIsSubmitted(false);
                            setEmail('');
                        }}
                        className="w-full"
                    >
                        Send Again
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

    return (
        <>
            <h1 className="form-title">Forgot Password?</h1>
            <p className="text-muted-foreground text-sm mb-6">
                Enter your email address and we'll send you a link to reset your password.
            </p>
            
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                <InputField
                    name="email"
                    label="Email"
                    placeholder="Enter your email"
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
                            Sending...
                        </span>
                    ) : (
                        <span className="flex items-center gap-2">
                            Send Reset Link
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

export default ForgotPassword;