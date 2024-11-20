import { cn } from "@/lib/utils";
import * as React from "react";

type PinInputProps = {
  children:
    | React.ReactElement<typeof PinInputField>
    | React.ReactElement<typeof PinInputField>[];
  /**
   * className for the input container
   */
  className?: string;
  /**
   * `aria-label` for the input fields
   */
  ariaLabel?: string;
  /**
   * If set, the pin input receives focus on mount, `false` by default
   */
  autoFocus?: boolean;
  /**
   * Called when value changes
   */
  onChange?: (value: string) => void;
  /**
   * Called when all inputs have valid value
   */
  onComplete?: (value: string) => void;
  /**
   * Called when any input doesn't have value
   */
  onIncomplete?: (value: string) => void;
  /**
   * `name` attribute for input fields
   */
  name?: string;
  /**
   * `form` attribute for hidden input
   */
  form?: string;
  /**
   * If set, the input's value will be masked just like password input. This field is `false` by default
   */
  mask?: boolean;
  /**
   * If set, the pin input component signals to its fields that they should
   * use `autocomplete="one-time-code"`. This field is `false` by default
   */
  otp?: boolean;
  /**
   * Uncontrolled pin input default value.
   */
  defaultValue?: string;
  /**
   * Controlled pin input value.
   */
  value?: string;
  /**
   * The type of value pin input should allow, `alphanumeric` by default
   */
  type?: "numeric" | "alphanumeric";
  /**
   * Placeholder for input fields, `○` by default
   */
  placeholder?: string;
  /**
   * If set, the user cannot set the value, `false` by default
   */
  readOnly?: boolean;
  /**
   * If set, the input fields are disabled, `false` by default
   */
  disabled?: boolean;
};

const PinInputContext = React.createContext<boolean>(false);

const PinInput = React.forwardRef<HTMLDivElement, PinInputProps>(
  ({ className, children, ...props }, ref) => {
    const {
      defaultValue,
      value,
      onChange,
      onComplete,
      onIncomplete,
      placeholder = "○",
      type = "alphanumeric",
      name,
      form,
      otp = false,
      mask = false,
      disabled = false,
      readOnly = false,
      autoFocus = false,
      ariaLabel = "",
      ...rest
    } = props;

    // Count PinInputField children
    const length = React.useMemo(() => {
      const childArray = Array.isArray(children) ? children : [children];
      return childArray.filter(
        (child): child is React.ReactElement =>
          React.isValidElement(child) && child.type === PinInputField,
      ).length;
    }, [children]);

    // pins, pinValue, refMap, ...handlers
    const { pins, pinValue, refMap, ...handlers } = usePinInput({
      value,
      defaultValue,
      placeholder,
      type,
      length,
      readOnly,
    });

    /* call onChange func if pinValue changes */
    React.useEffect(() => {
      if (!onChange) {
        return;
      }
      onChange(pinValue);
    }, [onChange, pinValue]);

    /* call onComplete/onIncomplete func if pinValue is valid and completed/incompleted */
    const completeRef = React.useRef(pinValue.length === length);
    React.useEffect(() => {
      if (pinValue.length === length && !completeRef.current) {
        completeRef.current = true;
        if (onComplete) {
          onComplete(pinValue);
        }
      }
      if (pinValue.length !== length && completeRef.current) {
        completeRef.current = false;
        if (onIncomplete) {
          onIncomplete(pinValue);
        }
      }
    }, [length, onComplete, onIncomplete, pinValue]);

    /* focus on first input field if autoFocus is set */
    React.useEffect(() => {
      if (!autoFocus) {
        return;
      }
      const node = refMap?.get(0);
      if (node) {
        node.focus();
      }
    }, [autoFocus, refMap]);

    const renderPinFields = () => {
      const fields: JSX.Element[] = [];
      let counter = 0;

      const childArray = Array.isArray(children) ? children : [children];

      childArray.forEach((child) => {
        if (!React.isValidElement(child)) {
          return;
        }

        if (child.type === PinInputField) {
          const pinIndex = counter++;

          fields.push(
            <PinInputField
              {...child.props}
              key={`pin-field-${pinIndex}`}
              name={name}
              value={length > pinIndex ? pins[pinIndex] : ""}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                handlers.handleChange(e, pinIndex)}
              onFocus={(e: React.FocusEvent<HTMLInputElement>) =>
                handlers.handleFocus(e, pinIndex)}
              onBlur={() => handlers.handleBlur(pinIndex)}
              onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) =>
                handlers.handleKeyDown(e, pinIndex)}
              onPaste={handlers.handlePaste}
              placeholder={placeholder}
              type={type}
              mask={mask}
              autoComplete={otp ? "one-time-code" : "off"}
              disabled={disabled}
              readOnly={readOnly}
              aria-label={ariaLabel || `Pin input ${pinIndex + 1} of ${length}`}
              ref={(node: HTMLInputElement | null) => {
                if (node) {
                  refMap?.set(pinIndex, node);
                } else {
                  refMap?.delete(pinIndex);
                }
              }}
            />,
          );
        } else {
          fields.push(child);
        }
      });

      return fields;
    };

    return (
      <PinInputContext.Provider value>
        <div ref={ref} aria-label="Pin Input" className={className} {...rest}>
          {renderPinFields()}
          <input type="hidden" name={name} form={form} value={pinValue} />
        </div>
      </PinInputContext.Provider>
    );
  },
);
PinInput.displayName = "PinInput";

/* ========== PinInputField ========== */

type _PinInputFieldProps = {
  mask?: boolean;
  inputKey?: string;
  type?: "numeric" | "alphanumeric";
};

type PinInputFieldProps<T> = _PinInputFieldProps & {
  component?: T;
} & Omit<React.ComponentPropsWithoutRef<"input">, keyof _PinInputFieldProps>;

const PinInputFieldNoRef = <T extends React.ElementType = "input">(
  {
    className,
    component,
    mask = false,
    type = "alphanumeric",
    inputKey,
    inputMode,
    key,
    ...props
  }: PinInputFieldProps<T> &
    (React.ComponentType<T> extends undefined
      ? never
      : React.ComponentProps<T>),
  ref: React.ForwardedRef<HTMLInputElement>,
) => {
  // Check if PinInputField is used within PinInput
  const isInsidePinInput = React.useContext(PinInputContext);
  if (!isInsidePinInput) {
    throw new Error(
      `PinInputField must be used within ${PinInput.displayName}.`,
    );
  }

  const Element = component || "input";

  // Calculate the final inputMode value
  const finalInputMode = type === "numeric" ? "numeric" : "text";

  return (
    <Element
      {...props}
      ref={ref}
      key={inputKey || key}
      type={mask ? "password" : type === "numeric" ? "tel" : "text"}
      inputMode={finalInputMode}
      className={cn("size-10 text-center", className)}
    />
  );
};

const PinInputField = React.forwardRef(PinInputFieldNoRef) as (<
  T extends React.ElementType = "input",
>(
  {
    className,
    component,
    ...props
  }: PinInputFieldProps<T> & React.ComponentProps<T>,
  ref: React.ForwardedRef<HTMLInputElement>,
) => JSX.Element) & { displayName?: string };

PinInputField.displayName = "PinInputField";

/* ========== usePinInput custom hook ========== */

type UsePinInputProps = {
  value: string | undefined;
  defaultValue: string | undefined;
  placeholder: string;
  type: "numeric" | "alphanumeric";
  length: number;
  readOnly: boolean;
};

const usePinInput = ({
  value,
  defaultValue,
  placeholder,
  type,
  length,
  readOnly,
}: UsePinInputProps) => {
  const pinInputs = React.useMemo(
    () =>
      Array.from({ length }, (_, index) =>
        defaultValue
          ? defaultValue.charAt(index)
          : value
            ? value.charAt(index)
            : ""),
    [defaultValue, length, value],
  );

  const [pins, setPins] = React.useState<(string | number)[]>(pinInputs);
  const pinValue = pins.join("").trim();

  /**
   * Update pins when values changes.
   * This is necessary and this allows pins to be synced
   * when the value is update or reset programmatically
   */
  React.useEffect(() => {
    setPins(pinInputs);
  }, [pinInputs]);

  const itemsRef = React.useRef<Map<number, HTMLInputElement> | null>(null);

  function getMap() {
    if (!itemsRef.current) {
      // Initialize the Map on first usage.
      itemsRef.current = new Map();
    }
    return itemsRef.current;
  }

  function getNode(index: number) {
    const map = getMap();
    return map?.get(index);
  }

  function focusInput(itemId: number) {
    const node = getNode(itemId);
    if (node) {
      node.focus();
      node.placeholder = "";
    }
  }

  function handleFocus(
    event: React.FocusEvent<HTMLInputElement>,
    index: number,
  ) {
    event.target.select();
    focusInput(index);
  }

  function handleBlur(index: number) {
    const node = getNode(index);
    if (node) {
      node.placeholder = placeholder;
    }
  }

  function updateInputField(val: string, index: number) {
    const node = getNode(index);

    if (node) {
      node.value = val;
    }

    setPins(prev =>
      prev.map((p, i) => {
        if (i === index) {
          return val;
        } else {
          return p;
        }
      }),
    );
  }

  function validate(value: string) {
    const NUMERIC_REGEX = /^\d+$/;
    const ALPHA_NUMERIC_REGEX = /^[a-z0-9]+$/i;
    const regex = type === "alphanumeric" ? ALPHA_NUMERIC_REGEX : NUMERIC_REGEX;
    return regex.test(value);
  }

  const pastedVal = React.useRef<null | string>(null);
  function handleChange(e: React.ChangeEvent<HTMLInputElement>, index: number) {
    const inputValue = e.target.value;
    const pastedValue = pastedVal.current;
    const inputChar
      = pastedValue && pastedValue.length === length
        ? pastedValue.charAt(length - 1)
        : inputValue.slice(-1);

    if (validate(inputChar)) {
      updateInputField(inputChar, index);
      pastedVal.current = null;
      if (inputValue.length > 0) {
        focusInput(index + 1);
      }
    }
  }

  function handlePaste(event: React.ClipboardEvent<HTMLInputElement>) {
    event.preventDefault();
    const copyValue = event.clipboardData
      .getData("text/plain")
      .replace(/\s+/g, "");
    const copyArr = copyValue.split("").slice(0, length);

    const isValid = copyArr.every(c => validate(c));

    if (!isValid) {
      return;
    }

    for (let i = 0; i < length; i++) {
      if (i < copyArr.length) {
        updateInputField(copyArr[i] || "", i);
      }
    }

    pastedVal.current = copyValue;
    focusInput(copyArr.length < length ? copyArr.length : length - 1);
  }

  function handleKeyDown(
    event: React.KeyboardEvent<HTMLInputElement>,
    index: number,
  ) {
    const { ctrlKey, key, shiftKey, metaKey } = event;

    if (type === "numeric") {
      const canTypeSign
        = key === "Backspace"
        || key === "Tab"
        || key === "Control"
        || key === "Delete"
        || (ctrlKey && key === "v")
        || (metaKey && key === "v")
          ? true
          : !Number.isNaN(Number(key));

      if (!canTypeSign || readOnly) {
        event.preventDefault();
      }
    }

    if (key === "ArrowLeft" || (shiftKey && key === "Tab")) {
      event.preventDefault();
      focusInput(index - 1);
    } else if (key === "ArrowRight" || key === "Tab" || key === " ") {
      event.preventDefault();
      focusInput(index + 1);
    } else if (key === "Delete") {
      event.preventDefault();
    } else if (key === "Backspace") {
      event.preventDefault();
      updateInputField("", index);
      if ((event.target as HTMLInputElement).value === "") {
        focusInput(index - 1);
      }
    }
  }

  return {
    pins,
    pinValue,
    refMap: getMap(),
    handleFocus,
    handleBlur,
    handleChange,
    handlePaste,
    handleKeyDown,
  };
};

export { PinInput, PinInputField };
