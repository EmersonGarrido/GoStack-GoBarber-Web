import React,{ useRef, useCallback, useContext} from 'react'
import { FiUser ,FiArrowLeft, FiMail, FiLock } from 'react-icons/fi'
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core'
import { Link, useHistory } from 'react-router-dom'

import { api } from '../../services/api';
import { useToast } from '../../hooks/toast'
import { useAuth  } from '../../hooks/auth'

import * as S from './styles'
import logoImage from '../../assets/logo.svg'

import * as Yup from 'yup'
import getValidationErrors from '../../utils/getValidationErrors';

import Input from '../../components/Input'
import Button from '../../components/Button'

interface SignUpFormData{
  name: string;
  email: string;
  password: string;
}

const SignUp: React.FC = () => {
  const formRef = useRef<FormHandles>(null)
  const { addToast } = useToast()
  const { signIn } = useAuth()
  const history = useHistory();

  const handleSubmit = useCallback( async (data: SignUpFormData) => {
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

      await api.post('/users', data);

      addToast({
        title: "Cadastro Realizado",
        description: "Seu cadastro foi realizado com Sucesso",
        type: "success"
      })

      history.push('/')

    } catch (error) {
      if(error instanceof Yup.ValidationError){
        const errors =  getValidationErrors(error);
        formRef.current?.setErrors(errors);
        
        return;
      }
      
      addToast({
        type : "error",
        title: "Erro no cadastro",
        description : "Ocorreu um erro ao se cadastrar",
      })
    }

  },[addToast, history])

  return(
    <S.Container>
      <S.Background />
      <S.Content>
        <S.AnimatedContainer>
          <img src={logoImage} alt="GoBarber" />
          
          <Form ref={formRef} onSubmit={handleSubmit}>
            <h1>Faça seu cadastro</h1>
            <Input name="name" icon={FiUser} placeholder="Name" />
            <Input name="email" icon={FiMail} placeholder="E-mail" />
            <Input name="password" icon={FiLock} placeholder="Senha" type="password" />

            <Button type="submit">Cadastrar</Button>
          </Form>

          <Link to="/"><FiArrowLeft /> Voltar para o login</Link>
        </S.AnimatedContainer>
      </S.Content>
      
    </S.Container>
  )
};
export default SignUp;