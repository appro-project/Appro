import classes from './TextArea.module.scss'

interface Props {
  placeholder: string;
}

export const TextArea = (props: Props) => {
  return (
    <div className={classes['text-area']}>
      <textarea placeholder={props.placeholder} />
    </div>
  );
};
