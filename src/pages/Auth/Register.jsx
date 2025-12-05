import Input from '../../components/Input';
import Button from '../../components/Button';

export default function Register() {
  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-950 text-white'>
      <div className='w-full max-w-sm bg-gray-900 p-6 rounded-xl border border-gray-700'>
        <h1 className='text-xl mb-4'>Criar Conta</h1>

        <Input label='Nome' />
        <Input label='Email' className='mt-2' />
        <Input label='Senha' type='password' className='mt-2' />
        <Input label='CPF' className='mt-2' />
        <Input label='Nascimento' type='date' className='mt-2' />

        <Button className='mt-4 w-full'>Cadastrar</Button>
      </div>
    </div>
  );
}
