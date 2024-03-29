import { forwardRef, useEffect, useRef } from 'react';

export default forwardRef(function TextInput({ type = 'text', className = '', isFocused = false, ...props }, ref) {
    const input = ref ? ref : useRef();

    useEffect(() => {
        if (isFocused) {
            input.current.focus();
        }
    }, []);
    if(type === 'textarea') {
        return (
            <textarea  {...props} className={'border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm form-control ' + className }
            ref={input}> </textarea>
        );
    } else {
        return (

            <input
                {...props}
                type={type}
                className={
                    'border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm ' +
                    className
                }
                ref={input}
            />
        );

    }
});
