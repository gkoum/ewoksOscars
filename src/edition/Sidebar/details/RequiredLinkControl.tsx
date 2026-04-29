import BooleanRadioButtons from '../table/controls/BooleanRadioButtons';
import styles from './RequiredLinkControl.module.css';

interface Props {
  value: boolean | 'auto' | undefined;
  onChange: (newValue: boolean | 'auto') => void;
  disabled?: boolean;
}

function RequiredLinkControl(props: Props) {
  const { value, onChange, disabled } = props;

  return (
    <div
      className={styles.container}
      role="radiogroup"
      aria-labelledby="groupLabel"
    >
      {/* eslint-disable-next-line jsx-a11y/label-has-associated-control*/}
      <label className={styles.label} id="groupLabel">
        Required
      </label>

      <div className={styles.buttons}>
        <label id="autoLabel">
          <input
            className={styles.input}
            aria-labelledby="autoLabel"
            type="radio"
            value={undefined}
            checked={value === 'auto' || value === undefined}
            onChange={() => onChange('auto')}
            disabled={disabled}
          />
          Auto
        </label>
        <BooleanRadioButtons
          className={styles.boolInput}
          value={value}
          onChange={onChange}
          disabled={disabled}
        />
      </div>
    </div>
  );
}

export default RequiredLinkControl;
