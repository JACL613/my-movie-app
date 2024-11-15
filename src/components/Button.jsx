

// eslint-disable-next-line react/prop-types
export default function Button({ children, className, ...props }) {
  return (
    <button className={`px-4 py-2 rounded-md font-medium flex items-center justify-center ${className}`} {...props}>
    {children}
  </button>
  )
}
