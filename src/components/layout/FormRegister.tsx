import React from 'react';
import { apiGet, apiPost } from 'utils';
import { IUser } from 'types/api';
import { generateUUID } from 'utils';
import { useRouter } from 'next/router';

interface FormRegisterProps {
    onChangeTab?: (currentTab: number) => void;
}

function FormRegister({ onChangeTab }: FormRegisterProps) {
    const onRegisterSubmit = async (e: any) => {
        e.preventDefault();
        const userName = e.target['inline-full-name'].value;
        const passWord = e.target['inline-password'].value;
        const UUID = generateUUID();
        const responseUsers = await apiGet<IUser[]>('/users');
        if (responseUsers.data) {
            const users = responseUsers.data;
            const userExist = users.find(user => user.username === userName);
            userExist && alert('Username đã có người sử dụng');
            if (!userExist) {
                const response = await apiPost<IUser>('/users', { username: userName, password: passWord, token: UUID });
                if (response.status_code === 201) { // register success
                    alert('Đăng ký thành công');
                    onChangeTab && onChangeTab(0)
                }
                else {
                    alert('Đăng ký thất bại');
                }
            }
        }

    }
    return (
        <form onSubmit={onRegisterSubmit}>
            <div className="text-center mb-4">Welcome to ...</div>
            <div className="md:flex md:items-center mb-6">
                <div className="md:w-1/4">
                    <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" htmlFor="inline-full-name">
                        Username
                    </label>
                </div>
                <div className="md:w-2/3">
                    <input className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" id="inline-full-name" type="text" placeholder='Type your username...' />
                </div>
            </div>
            <div className="md:flex md:items-center mb-6">
                <div className="md:w-1/4">
                    <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" htmlFor="inline-password">
                        Password
                    </label>
                </div>
                <div className="md:w-2/3">
                    <input className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" id="inline-password" type="password" placeholder="Type your password..." />
                </div>
            </div>
            <div className="md:flex flex-col">
                <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                    Register
                </button>
                <a className="cursor-pointer inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800 mt-4" onClick={() => onChangeTab && onChangeTab(0)}>
                    Already have account? Login here
                </a>
            </div>
        </form>
    )
}

export default FormRegister