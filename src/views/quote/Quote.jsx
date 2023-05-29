const Quote = () => {
    return (
        <div id="quote" className='flex justify-center flex-col items-center'>
            <div className='w-[720px] mt-[100px] relative flex flex-col'>
                <fieldset className='border-[1px]'>
                    <legend className='absolute top-[-10px] left-2 bg-[#282C33] px-[8px]'>
                        <img src={require('../../resources/imgs/quote.png')} alt='' />
                    </legend>
                    <p className='font-[500] text-white text-[24px] text-center p-[32px]'>With great power comes great electricity bill</p>
                </fieldset>
                <div className='auth border-[1px] text-white self-end inline-block px-[15px] py-[18px] relative'>
                    <legend className='absolute top-[-10px] right-2 bg-[#282C33] px-[8px]'>
                        <img src={require('../../resources/imgs/quote.png')} alt='' />
                    </legend>
                    <p><span>-</span> Dr. Who</p>
                </div>
            </div>
        </div>
    );
}
export default Quote;