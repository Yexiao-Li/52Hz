import React from 'react';
import style from './style.css';
 
const PageLoading = () => {
    return (
        <div className={style.page_loading_container}>
            {/* <加载动画 */}
            <div className={style.spinner_box}>
                <div className={style.configure_border_1}>
                    <div className={style.configure_core}></div>
                </div>
                <div className={style.configure_border_2}>
                    <div className={style.configure_core}></div>
                </div>
            </div>
        </div>
    );
};
export default PageLoading;