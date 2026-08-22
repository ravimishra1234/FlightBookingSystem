const steps = ['Flight', 'Passengers', 'Seats & Extras', 'Payment'];

const BookingStepper = ({ currentStep = 0 }) => (
  <div className="bg-white border-b border-gray-100 sticky top-0 z-30">
    <div className="max-w-screen-xl mx-auto px-6 py-4 flex items-center justify-center gap-2">
      {steps.map((step, i) => (
        <div key={step} className="flex items-center gap-2">
          <div className={`flex items-center gap-2 ${i === currentStep ? '' : 'opacity-50'}`}>
            <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold border-2 transition-all ${
              i === currentStep
                ? 'bg-primary border-primary text-white'
                : i < currentStep
                ? 'bg-accent border-accent text-white'
                : 'border-gray-300 text-gray-400'
            }`}>
              {i < currentStep ? '✓' : i + 1}
            </div>
            <span className={`text-sm font-medium hidden sm:block ${i === currentStep ? 'text-primary' : 'text-gray-400'}`}>
              {step}
            </span>
          </div>
          {i < steps.length - 1 && (
            <div className={`w-16 h-px mx-2 ${i < currentStep ? 'bg-accent' : 'bg-gray-200'}`} />
          )}
        </div>
      ))}
    </div>
  </div>
);

export default BookingStepper;
