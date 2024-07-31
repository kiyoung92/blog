import './button.css';

export default function Button({
  title,
  disabled = false,
  loading = false,
  onClick = () => {},
}: {
  title: string;
  disabled: boolean;
  loading: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      className="basic-button"
      disabled={loading ? true : disabled}
      onClick={onClick}
    >
      {loading ? <span className="loading-icon" /> : title}
    </button>
  );
}
