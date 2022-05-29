import React from 'react'
import { useRouter } from 'next/router';
import FormLogin from './FormLogin';
import Modal from 'components/base/Modal';
import { APP_TOKEN_NAME, removeStorage } from 'utils';

interface TopBarProps {
    loginSuccess?: boolean;
    content: string;
}

function TopBar({ loginSuccess = false, content }: TopBarProps) {
    const router = useRouter();

    const onClickHome = () => {
        router.push('/')
    }

    const onLogout = () => {
        removeStorage(APP_TOKEN_NAME)
        router.push('/explore')
    }

    return (
        <div className="flex justify-between">
            <div className="topbar--logo" onClick={onClickHome}>Logo</div>
            {loginSuccess && (<div className='flex'>
                <div className='topbar--login-success'>{content}</div>
                <a onClick={onLogout} className="topbar--login-success w-auto font-bold text-sm text-blue-500 hover:text-blue-800" href="#">
                    Logout
                </a>
            </div>
            )}
            {!loginSuccess && <Modal title="Login" childButton={<div className='topbar--get-started'>{content}</div>}>
                <FormLogin />
            </Modal>}
        </div>
    )
}

export default TopBar