const Spinner = ({ size = 'md', className = '' }) => {
  const sizes = { sm: 'w-5 h-5', md: 'w-8 h-8', lg: 'w-12 h-12' };
  return <div className={`${sizes[size]} border-4 border-gray-100 border-t-accent rounded-full animate-spin ${className}`} />;
};
export const FullPageSpinner = () => (
  <div className="min-h-screen flex items-center justify-center bg-white">
    <Spinner size="lg" />
  </div>
);
export default Spinner;
