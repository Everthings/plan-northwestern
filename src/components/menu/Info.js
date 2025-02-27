import React from 'react';

class Info extends React.Component {

    render() {
        return (
            <div className='flex items-center justify-center my-4 px-4 py-3 text-black text-center whitespace-nowrap bg-purple-50 dark:bg-gray-800 border-2 border-purple-800 rounded-3xl dark:border-purple-300'>
                <svg aria-hidden='true' focusable='false' data-prefix='fas' data-icon='calendar' class='mx-2 w-6 h-6 text-purple-800 dark:text-purple-300 svg-inline--fa fa-calendar fa-w-14' role='img' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 448 512'><path fill='currentColor' d='M12 192h424c6.6 0 12 5.4 12 12v260c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V204c0-6.6 5.4-12 12-12zm436-44v-36c0-26.5-21.5-48-48-48h-48V12c0-6.6-5.4-12-12-12h-40c-6.6 0-12 5.4-12 12v52H160V12c0-6.6-5.4-12-12-12h-40c-6.6 0-12 5.4-12 12v52H48C21.5 64 0 85.5 0 112v36c0 6.6 5.4 12 12 12h424c6.6 0 12-5.4 12-12z'></path></svg>
                <p className='text-2xl font-normal text-purple-800 dark:text-purple-300'>
                    Plan Northwestern
                </p>
            </div>
        )
    }

}

export default Info;