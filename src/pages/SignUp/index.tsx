import React,{ useRef, useCallback} from 'react'
import { FiUser ,FiArrowLeft, FiMail, FiLock } from 'react-icons/fi'
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core'

import * as S from './styles'
import logoImage from '../../assets/logo.svg'

import * as Yup from 'yup'
import getValidationErrors from '../../utils/getValidationErrors';

import Input from '../../components/Input'
import Button from '../../components/Button'

const SignUp: React.FC = () => {
  const formRef = useRef<FormHandles>(null)

  const handleSubmit = useCallback( async (data: object) => {
   
    try {
      formRef.current?.setErrors({});
      const schema = Yup.object().shape({
        name: Yup.string().required('O nome é obrigatório'),
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

  return(
    <S.Container>
      <S.Background />
      <S.Content>
        <img src={logoImage} alt="GoBarber" />

        <Form ref={formRef} onSubmit={handleSubmit}>
          <h1>Faça seu cadastro</h1>
          <Input name="name" icon={FiUser} placeholder="Name" />
          <Input name="email" icon={FiMail} placeholder="E-mail" />
          <Input name="password" icon={FiLock} placeholder="Senha" type="password" />

          <Button type="submit">Cadastrar</Button>
        </Form>

        <a href="login"><FiArrowLeft /> Voltar para o login</a>

      </S.Content>
      
    </S.Container>
  )
};
export default SignUp;