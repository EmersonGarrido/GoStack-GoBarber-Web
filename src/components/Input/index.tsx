import React,{ InputHTMLAttributes, useRef, useEffect, useState, useCallback } from 'react';
import { IconBaseProps } from 'react-icons';
import { FiAlertCircle } from 'react-icons/fi';
import { useField } from '@unform/core';

import Tooltip from '../Tooltip'

import * as S from './styles'

interface InputProps extends InputHTMLAttributes<HTMLInputElement>{
  name: string;
  icon?: React.ComponentType<IconBaseProps>;
}

const Input: React.FC<InputProps> = ({name, icon: Icon, ...rest}) => {
  const { fieldName, defaultValue, registerField, error } = useField(name);
  const inputRef = useRef<HTMLInputElement>(null)
  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);

  const handleInputFocus = useCallback(() => {
    setIsFocused(true)
  }, [])

  const handleInputBlur = useCallback(() =>{
    setIsFocused(false)

    setIsFilled(!!inputRef.current?.value)
  }, []);
  
  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'value'
    });
  }, [fieldName, registerField])

  
  return(
    <S.Container isErrored={!!error} isFilled={isFilled} isFocused={isFocused}>
   { Icon &&  <Icon size={20}/>}
    <input 
    onFocus={handleInputFocus}
    onBlur={handleInputBlur}
    defaultValue={defaultValue}
    ref={inputRef} {...rest} 
    />
    
    {error && 
    <S.Error title={error}>
      <FiAlertCircle size={20} />  
    </S.Error>}
  </S.Container>
  )
};

export default Input;