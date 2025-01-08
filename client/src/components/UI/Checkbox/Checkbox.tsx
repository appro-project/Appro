import './checkbox.module.scss'

interface CheckboxProps {
  checked: boolean;
  labelName: string;
  id?: string;
  htmlFor?: string;
  onClick?: () => void;
}

export const Checkbox = ({ id, checked, onClick, htmlFor, labelName }: CheckboxProps) => {
  return (
		<>
			<input type='checkbox' id={id} checked={checked} readOnly />
			<label onClick={onClick} htmlFor={htmlFor}>
				{labelName}
			</label>
		</>
	)
};
