import React, {useEffect, useState} from "react";

interface ItextInputProps {
  label: string;
  value: string;
  required?: boolean;
  type?: string;
  max?: number;
  readonly?: boolean;
  isError?: boolean;
  mask?: string;
  placeholder?: string
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void; // Mantém o evento completo
}

export default function TextInput({
  label,
  value = "", // Valor padrão para evitar undefined
  type,
  max,
  required,
  readonly,
  isError,
  mask,
  placeholder,
  onChange
}: ItextInputProps) {


  const [currentType, setCurrentType] = useState<string>('Text')

  useEffect(() => {
    if(type){
      setCurrentType(type)
      return
    }

    setCurrentType('Text')
  }, [type])

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const inputElement = event.target;
    const rawValue = inputElement.value;
    const cursorPosition = inputElement.selectionStart || 0;
  
    if (!mask) {
      onChange(event);
      return;
    }
  
    let formattedValue = "";
    let maskIndex = 0;
    let valueIndex = 0;
  
    while (valueIndex < rawValue.length && maskIndex < mask.length) {
      const maskChar = mask[maskIndex];
      const currentChar = rawValue[valueIndex];
  
      if (maskChar === "a" || maskChar === "A") {
        if (/[a-zA-Z]/.test(currentChar)) {
          formattedValue += currentChar;
          maskIndex++;
        }
        valueIndex++;
      } else if (maskChar === "0" || maskChar === "9") {
        if (/[0-9]/.test(currentChar)) {
          formattedValue += currentChar;
          maskIndex++;
        }
        valueIndex++;
      } else if (maskChar === "x" || maskChar === "X") {
        if (/[a-zA-Z0-9]/.test(currentChar)) {
          formattedValue += currentChar;
          maskIndex++;
        }
        valueIndex++;
      } else {
        // Caractere fixo da máscara
        formattedValue += maskChar;
        maskIndex++;
        if (currentChar === maskChar) {
          valueIndex++;
        }
      }
    }
  
    // Adiciona quaisquer caracteres fixos restantes da máscara
    while (maskIndex < mask.length && /[^a-zA-Z0-9]/.test(mask[maskIndex])) {
      formattedValue += mask[maskIndex];
      maskIndex++;
    }
  
    const newCursorPosition = formattedValue.length;
  
    // Atualiza o valor formatado
    const formattedEvent = {
      ...event,
      target: { ...inputElement, value: formattedValue },
    };
    onChange(formattedEvent as React.ChangeEvent<HTMLInputElement>);
  
    // Restaura a posição do cursor
    requestAnimationFrame(() => {
      inputElement.selectionStart = inputElement.selectionEnd = newCursorPosition;
    });
  }
  
  

  return (
    <div className="w-full flex flex-col items-center justify-center">
      <div className="w-4/5 text-[0.8rem] md:text-md font-[600] truncate">
        {label}:
      </div>
      <div className="w-full flex justify-center items-center focus:shadow-md">
        <input
          readOnly={readonly}
          required={required}
          maxLength={max}
          value={value}
          type={currentType}
          placeholder={placeholder}
          onChange={handleChange}
          className={`pl-1 focus:outline-bg-gray-500  focus:ring-0 w-4/5 h-8 bg-gray-200 border-b ${isError ? "border-red-500" : "border-black"} ${readonly ? "cursor-not-allowed text-gray-500" : "cursor-text"} transition-all duration-200`}
        />
      </div>
    </div>
  );
}
