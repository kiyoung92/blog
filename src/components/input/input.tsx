import inputStyles from '@components/input/input.module.css';
import { BaseSyntheticEvent } from 'react';

export default function UnderlineInput({
  type,
  placeholder = '',
  name = '',
  autoFocus = false,
  onChangeEvent = () => {},
  disabled = false,
}: {
  type: string;
  name: string;
  placeholder: string;
  autoFocus: boolean;
  onChangeEvent: (e: BaseSyntheticEvent) => void;
  disabled: boolean;
}) {
  return (
    <div className={inputStyles.wrap}>
      <input
        type={type}
        placeholder={placeholder}
        name={name}
        autoComplete={autoFocus ? 'on' : 'off'}
        onChange={onChangeEvent}
        disabled={disabled}
      />
      <p />
    </div>
  );
}
