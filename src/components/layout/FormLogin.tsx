import React from 'react';
import { apiGet, APP_TOKEN_NAME } from 'utils';
import { IUser } from 'types/api';
import { encodeToken, setLocalItem, setSessionItem } from 'utils/auth';
import { useRouter } from 'next/router';

interface FormLoginProps {
    onChangeTab?: (currentTab: number) => void;
}

function FormLogin({ onChangeTab }: FormLoginProps) {
    const router = useRouter();

    const onLogin = async (e: any) => {
        e.preventDefault();
        const userName = e.target['inline-full-name'].value;
        const passWord = e.target['inline-password'].value;
        const rememberPw = e.target['inline-remember'].checked;
        const response = await apiGet<IUser[]>('/users');
        if (response.data) {
            const users = response.data;
            const user = users.find(user => user.username === userName && user.password === passWord);
            if (user) {
                const { id, token, username } = user
                alert('Đăng nhập thành công');
                router.reload();
                rememberPw && setLocalItem(APP_TOKEN_NAME, encodeToken({ id, token, username }));
                !rememberPw && setSessionItem(APP_TOKEN_NAME, encodeToken({ id, token, username }));
            }
            else {
                alert('Đăng nhập thất bại');
            }
        }

    }
    return (
        <form onSubmit={onLogin}>
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
            <div className="md:flex md:items-center mb-6">
                <div className="md:w-1/4"></div>
                <label className="block text-gray-500 font-bold">
                    <input className="mr-2 leading-tight" type="checkbox" id="inline-remember" />
                    <span className="text-sm">
                        Remember Password
                    </span>
                </label>
            </div>
            <div className="md:flex flex-col">
                <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                    Login
                </button>
                <a className="cursor-pointer inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800 mt-4" onClick={() => onChangeTab && onChangeTab(1)}>
                    Don't account? Register here
                </a>
            </div>
        </form>
    )
}

export default FormLogin