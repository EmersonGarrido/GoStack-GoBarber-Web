import React,{ useCallback, useRef } from 'react'
import { FiLogIn, FiMail, FiLock } from 'react-icons/fi'

import { FormHandles } from '@unform/core'

import * as S from './styles'
import logoImage from '../../assets/logo.svg'
import { Form } from '@unform/web';

import * as Yup from 'yup'
import getValidationErrors from '../../utils/getValidationErrors';


import Input from '../../components/Input'
import Button from '../../components/Button'

const SignIn: React.FC = () => {
  const formRef = useRef<FormHandles>(null)

  const handleSubmit = useCallback( async (data: object) => {
   
    try {
      formRef.current?.setErrors({});
      
      const schema = Yup.object().shape({
        email: Yup.string().required('O e-mail é obrigatório').email('Digite um e-mail valido'),
        password: Yup.string().min(6, 'Deve conter no minimo 6 caracteres')
      })
      await schema.validate(data,{
        abortEarly: false
      })
    } catch (error) {
      const errors =  getValidationErrors(error);
      
      formRef.current?.setErrors(errors);
    }

  },[])

  return (
    <S.Container>
      <S.Content>
        <img src={logoImage} alt="GoBarber" />

        <Form ref={formRef} onSubmit={handleSubmit}> 
          <h1>Faça seu logon</h1>
          <Input name="email" icon={FiMail} placeholder="E-mail" />
          <Input name="password" icon={FiLock} placeholder="Senha" type="password" />

          <Button type="submit">Entrar</Button>
          <a href="forgot">Esqueci minha senha</a>
        </Form>

        <a href="login"><FiLogIn /> Criar conta</a>

      </S.Content>
      <S.Background />
    </S.Container>
  )
};
export default SignIn;