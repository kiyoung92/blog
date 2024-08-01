import buttonStyles from '@/components/button/button.module.css';

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
      className={buttonStyles.basicButton}
      disabled={loading ? true : disabled}
      onClick={onClick}
    >
      {loading ? <span className={buttonStyles.loadingIcon} /> : title}
    </button>
  );
}
