import './style.css';

const First = () => {
    return (
        <div id="first" className="mt-[128px] flex items-center">
            <div className="left">
                <p className="intro text-white font-bold text-[32px]">
                    Elias is <span>web desginer</span> and <span>front-end developer</span>
                </p>
                <p className="mt-8 desc text-[16px] text-[#ABB2BF] font-[400] leading-[25px]">
                    He crafts responsive websites where technologies meet creativity
                </p>
                <div className='text-white mt-5 border-[1px] inline-block px-[8px] py-[5px]'>
                    Contact me !!
                </div>
            </div>
            <div className="right">
                <img src={require('./imgs/group-right.png')} alt='' />
                <div className='px-[30px]'>
                    <div className='flex border-[1px] items-center pl-2'>
                        <input type='color' className='p-[0]' hidden />
                        <div className='w-[18px] h-[18px] bg-[#C778DD]' />
                        <p className='text-white ml-2'><span className='text-[#ABB2BF]'>Currently working on</span> Portfolio</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default First;