import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa';

const Contact = () => {
  return (
    <div className="flex w-full h-screen justify-center items-center text-center flex-col">
      <h1 className='text-3xl mt-16 font-bold'>Contact</h1>
        <p className='mt-4'>You can reach me via the following platforms:</p>
      <div className="flex justify-center mt-8 space-x-8">
        <a className='hover:scale-110 transition ease-in-out' href="https://github.com/dyprodg" target="_blank" rel="noopener noreferrer">
          <FaGithub size={80} />
        </a>
        <a className='hover:scale-110 transition ease-in-out' href="https://www.linkedin.com/in/dennis-diepolder-2a5a98276/" target="_blank" rel="noopener noreferrer">
          <FaLinkedin size={80} />
        </a>
        <a className='hover:scale-110 transition ease-in-out' href="mailto:info@dennisdiepolder.com">
          <FaEnvelope size={80} />
        </a>
      </div>
    </div>
  );
};

export default Contact;