
import React, { useState, useRef, useEffect } from 'react';

interface EditableFieldProps {
  initialValue: string | number;
  onSave: (value: string | number) => void;
  className?: string;
  inputType?: 'text' | 'number';
  textAlign?: 'left' | 'center' | 'right';
}

export const EditableField: React.FC<EditableFieldProps> = ({
  initialValue,
  onSave,
  className = '',
  inputType = 'text',
  textAlign = 'left',
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState(String(initialValue));
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setValue(String(initialValue));
  }, [initialValue]);

  useEffect(() => {
    if (isEditing) {
      inputRef.current?.focus();
      inputRef.current?.select();
    }
  }, [isEditing]);

  const handleSave = () => {
    setIsEditing(false);
    const finalValue = inputType === 'number' ? parseFloat(value) || 0 : value;
    onSave(finalValue);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSave();
    } else if (e.key === 'Escape') {
      setValue(String(initialValue));
      setIsEditing(false);
    }
  };

  if (isEditing) {
    return (
      <input
        ref={inputRef}
        type={inputType === 'number' ? 'text' : 'text'} // Use text to better control parsing
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onBlur={handleSave}
        onKeyDown={handleKeyDown}
        className={`${className} bg-yellow-100 border border-yellow-400 rounded-sm outline-none px-1 -my-px -mx-1`}
        style={{ textAlign }}
      />
    );
  }

  return (
    <span
      onClick={() => setIsEditing(true)}
      className={`${className} hover:bg-yellow-100/50 cursor-pointer rounded-sm px-1 -my-px -mx-1`}
      style={{ textAlign }}
    >
      {value}
    </span>
  );
};
