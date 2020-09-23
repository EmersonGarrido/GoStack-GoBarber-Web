import React from 'react';
import Toast from './Toast'
import { useTransition } from 'react-spring'
import { ToastMessage } from '../../hooks/toast'
import * as S from './styles';

interface ToastContainerProps{
  messeges: ToastMessage[];
}

const ToastContainer: React.FC<ToastContainerProps> = ({ messeges }) => {

  const messegeWithTransictions = useTransition(
    messeges, 
    messege => messege.id,
    {
      from: { right: '-120%', opacity: 0 },
      enter: { right: '0%', opacity: 1 },
      leave: { right: '-120%', opacity: 0 },
    }
    )

  return (
    <S.Container>
      {messegeWithTransictions.map(({ item, key, props}) => (
        <Toast style={props} key={key} messege={item}/>
        
      ))}
    </S.Container>
  );
}

export default ToastContainer;