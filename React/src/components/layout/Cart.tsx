import { XMarkIcon } from "@heroicons/react/24/outline";

interface CartProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Cart({ isOpen, onClose }: CartProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50">
      <button
        type="button"
        aria-label="Close shopping cart"
        className="absolute inset-0 bg-black/45"
        onClick={onClose}
      />

      <aside className="absolute inset-0 flex flex-col bg-white md:inset-y-0 md:right-0 md:left-auto md:w-full md:max-w-md md:border-l md:border-black/10 md:shadow-2xl">
        <div className="flex items-center justify-between border-b border-black/10 px-6 py-5">
          <h2 className="text-2xl font-anton font-semibold md:text-3xl">Shopping Cart</h2>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full p-2 text-black transition-colors hover:bg-black/5"
          >
            <XMarkIcon className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>

        <div className="flex flex-1 items-center justify-center px-6 text-center font-lato text-lg text-black/70">
          Your cart is empty for now.
        </div>
      </aside>
    </div>
  );
}
