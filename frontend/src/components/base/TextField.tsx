import React from "react";

const TextField = ({
  value,
  onChange,
  placeholder = "",
  className = "",
  multiline = false,
  rows = 1,
}: {
  value: string;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  placeholder?: string;
  className?: string;
  multiline?: boolean;
  rows?: number;
}) => {
  const baseClasses =
    "px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500";

  return multiline ? (
    <textarea
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={`${baseClasses} ${className}`}
      rows={rows}
    />
  ) : (
    <input
      type="text"
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={`${baseClasses} ${className}`}
    />
  );
};
export default TextField;
