import Input from '../../components/Input';
import Button from '../../components/Button';

export default function Login() {
  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-950 text-white'>
      <div className='w-full max-w-sm bg-gray-900 p-6 rounded-xl border border-gray-700'>
        <h1 className='text-xl mb-4'>Entrar</h1>

        <Input label='Email' />
        <Input label='Senha' type='password' className='mt-3' />

        <Button className='mt-4 w-full'>Entrar</Button>
      </div>
    </div>
  );
}
