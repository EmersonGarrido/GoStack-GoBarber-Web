import React,{ useCallback, useRef, useContext } from 'react'
import { FiLogIn, FiMail, FiLock } from 'react-icons/fi'
import { Link, useHistory } from 'react-router-dom'

import { FormHandles } from '@unform/core'
import { useAuth } from '../../hooks/auth'
import { useToast } from '../../hooks/toast'

import * as S from './styles'
import logoImage from '../../assets/logo.svg'
import { Form } from '@unform/web';

import * as Yup from 'yup'
import getValidationErrors from '../../utils/getValidationErrors';

import Input from '../../components/Input'
import Button from '../../components/Button'

interface SignInData{
  email: string;
  password: string;
}

const SignIn: React.FC = () => {
  const formRef = useRef<FormHandles>(null)
  const { signIn } = useAuth() 
  const { addToast } = useToast()
  const history = useHistory();
  
  const handleSubmit = useCallback( async (data: SignInData) => {
    try {
      formRef.current?.setErrors({});
      const schema = Yup.object().shape({
        email: Yup.string().required('O e-mail é obrigatório').email('Digite um e-mail valido'),
        password: Yup.string().min(6, 'Deve conter no minimo 6 caracteres')
      })
      await schema.validate(data,{
        abortEarly: false
      })
      await signIn({
        email: data.email,
        password: data.password,
      });
      history.push('/dashboard')
      
      addToast({
        type : "success",
        title: "Logado com Sucesso",
      })
     
    } catch (error) {

      if(error instanceof Yup.ValidationError){
        const errors =  getValidationErrors(error);
        formRef.current?.setErrors(errors);
        
        return;
      }
      
      addToast({
        type : "error",
        title: "Erro o logar",
        description : "Suas credenciais de acessos estao incorretas",
      })
    }
  },[signIn, addToast])

  return (
    <S.Container>
      <S.Content>
        <S.AnimatedContainer>
          <img src={logoImage} alt="GoBarber" />
          <Form ref={formRef} onSubmit={handleSubmit}> 
            <h1>Faça seu logon</h1>
            <Input name="email" icon={FiMail} placeholder="E-mail" />
            <Input name="password" icon={FiLock} placeholder="Senha" type="password" />
            <Button type="submit">Entrar</Button>
            <a href="forgot">Esqueci minha senha</a>
          </Form>
          <Link to="signup"><FiLogIn /> Criar conta</Link>
        </S.AnimatedContainer>
      </S.Content>
      <S.Background />
    </S.Container>
  )
};
export default SignIn;