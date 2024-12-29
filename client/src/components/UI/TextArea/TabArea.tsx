import classes from './TextArea.module.scss'

interface Props {
  placeholder: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  error?: boolean;
}

export const TextArea: React.FC<Props> = ({ placeholder, value, onChange, error }) => {
  return (
    <div className={classes['text-area']}>
      <textarea
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={error ? classes['text-area__error'] : ''}
      />
    </div>
  );
};
