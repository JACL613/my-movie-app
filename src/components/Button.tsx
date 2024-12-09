import { ReactNode } from "react";


interface ButtonProps { className: string; children: React.ReactNode; onClick: () => void; }

// eslint-disable-next-line react/prop-types
export default function Button({onClick, children, className, ...props }: ButtonProps) {
  return (
    <button className={`px-4 py-2 rounded-md font-medium flex items-center justify-center ${className}`}
    onClick={onClick}
    {...props}>
    {children}
  </button>
  )
}
