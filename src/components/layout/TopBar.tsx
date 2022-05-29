import React, { useState } from 'react'
import { useRouter } from 'next/router';
import FormLogin from './FormLogin';
import Modal from 'components/base/Modal';
import { APP_TOKEN_NAME, removeStorage } from 'utils';
import FormRegister from './FormRegister';

interface TopBarProps {
    loginSuccess?: boolean;
    isGetStarted?: boolean;
    content: string;
}

function TopBar({ loginSuccess = false, isGetStarted = false, content }: TopBarProps) {
    const [currentTab, setCurrentTab] = useState<number>(0);
    const router = useRouter();

    const onClickHome = () => {
        router.push('/');
    }

    const onLogout = () => {
        removeStorage(APP_TOKEN_NAME)
        router.reload();
    }

    const onChangeTab = (currentTab: number) => {
        setCurrentTab(currentTab)
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
            {!loginSuccess && !isGetStarted &&
                <Modal
                    id={currentTab === 0 ? "login" : "register"}
                    title={currentTab === 0 ? "Login" : "Register"}
                    childButton={<div className='topbar--get-started'>{content}</div>}
                >
                    {currentTab === 0 && <FormLogin onChangeTab={onChangeTab} />}
                    {currentTab === 1 && <FormRegister onChangeTab={onChangeTab} />}
                </Modal>}
            {!loginSuccess && isGetStarted && <div className='topbar--get-started'>{content}</div>}
        </div>
    )
}

export default TopBar