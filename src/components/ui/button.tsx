import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary';
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', ...props }, ref) => {
    const baseClasses =
      'inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50';

    const variantClasses = {
      primary: 'bg-primary text-primary-foreground hover:bg-primary/90',
      secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
    };

    return (
      <button
        className={`${baseClasses} ${variantClasses[variant]} ${className}`}
        ref={ref}
        {...props}
      />
    );
  }
);

Button.displayName = 'Button';

export { Button };
