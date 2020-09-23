import React,{ useEffect } from 'react';

import { ToastMessage, useToast } from '../../../hooks/toast'
import { FiAlertCircle, FiXCircle, FiCheckCircle, FiInfo } from 'react-icons/fi';
import * as S from './styles';

interface ToatsProps{
  messege: ToastMessage;
  style: object;
}

const icons = {
  success: <FiCheckCircle size={20}/>,
  error: <FiAlertCircle size={20}/>,
  info: <FiInfo size={20}/>,
}

const Toast: React.FC<ToatsProps> = ({ messege, style }) => {

  const { removeToast } = useToast()

  useEffect(() => {
    const timer = setTimeout(() => {
      removeToast(messege.id)
    }, 3000)

    return () => {
      clearTimeout(timer);
    }
  },[removeToast, messege.id])

  return(
    <S.Container type={messege.type} hasDescripion={!!messege.description} style={style}>
      {icons[messege.type || 'info']}
        <div>
          <strong>{messege.title}</strong>
          {messege.description && <p>{messege.description}</p>}
        </div>
       <button onClick={() => removeToast(messege.id)} type='button'>
         <FiXCircle size={18} />
       </button>
    </S.Container>
  );
}

export default Toast;