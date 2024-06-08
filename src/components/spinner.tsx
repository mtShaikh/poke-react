import clsx from "clsx";

const Spinner = ({ className }: { className?: string }) => (
  <div
    className={clsx(
      "w-12 h-12 rounded-full animate-spin border-4 border-solid border-blue-500 border-t-transparent",
      className
    )}
  />
);

export default Spinner;
