import { Link } from 'react-router-dom';

const Landing = () => {
  return (
    <div>
        <div className='bg-[url(https://thumbs.dreamstime.com/b/e-learning-background-line-icon-linear-vector-pattern-e-learning-background-line-icon-linear-vector-pattern-vector-127473854.jpg)] h-screen pt-5 flex justify-between flex-col w-full'>
            <img className='w-14 ml-8' src="https://t3.ftcdn.net/jpg/05/07/66/58/360_F_507665856_dFXIKJJ4SwROG0df8GNPBhqsZV44p6jn.jpg" alt="" />
            <div className='bg-white py-5 px-5'>
                <h2 className='text-2xl font-bold px-6'>Get started With Ekates</h2>
                <Link to='/students-auth' className='flex item-center justify-center w-full bg-black text-white py-3 rounded mt-2'>Continue</Link>
            </div>
        </div>
    </div>
  )
};

export default Landing;
