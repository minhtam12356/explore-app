import React from 'react'

interface ModalProps {
    id: string;
    childButton?: React.ReactNode,
    children: React.ReactNode,
    title: string,
}

function Modal({ id, title, children, childButton }: ModalProps) {
    return (
        <>
            <button
                data-bs-toggle="modal"
                data-bs-target={`#${id}-modal`}
            >
                {childButton}
            </button>

            <div className="modal fade fixed top-0 left-0 hidden w-full h-full m-auto outline-none overflow-x-hidden overflow-y-auto"
                id={`${id}-modal`} tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog relative w-auto pointer-events-none">
                    <div
                        className="modal-content border-none shadow-lg relative flex flex-col w-full pointer-events-auto bg-white bg-clip-padding rounded-md outline-none text-current">
                        <div
                            className="modal-header flex flex-shrink-0 items-center justify-between p-4 border-b border-gray-200 rounded-t-md">
                            <h5 className="text-xl font-medium leading-normal text-gray-800" id="exampleModalLabel">{title}</h5>
                            <button
                                type="button"
                                className="btn-close box-content w-4 h-4 p-1 text-black border-none rounded-none focus:shadow-none focus:outline-none focus:opacity-100 hover:text-black hover:opacity-75 hover:no-underline"
                                data-bs-dismiss="modal"
                                aria-label="Close"></button>
                        </div>
                        <div className="modal-body relative p-8 text-center">
                            {children}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Modal