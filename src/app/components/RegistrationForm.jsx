import Link from "next/link"


const RegistrationForm = ({username, setName, email, setEmail, password, setPassword, handleSubmit, message}) => {
  return (
    <div>
      <form className='mt-8 m-8 flex flex-col items-start justify-center' onSubmit={handleSubmit}>
        <label className='flex flex-col items-start mb-4'>
          Username:
          <input
            required
            className='input'
            type="text"
            name="name"
            value={username}
            onChange={(e) => setName(e.target.value)}
          />
        </label>
        <label className='flex flex-col items-start mb-4'>
          Email:
          <input
            required
            className='input'
            type="text"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <label className='flex flex-col items-start mb-8'>
          Password:
          <input
            required
            className='input'
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <button className='bn13 self-center' type="submit">
          Register
        </button>
        {message && (
          <div className='text-xs p-2 text-red-600'>
            {message}
          </div>
        )}
      </form>
      <div className="text-center mb-2">
        Already have an account? 
        <Link 
          className="underline"
          href='/'>
            Login
        </Link>
      </div>
    </div> 
  )
}

export default RegistrationForm;
