export const saveUserInfo = ({id, name, password}) => {
    localStorage.setItem("userId", id);
    localStorage.setItem("username", name);
    localStorage.setItem("password", password);
    localStorage.setItem("isLogin", true);
}


export const getUserInfo = () => {
    let userId = localStorage.getItem("userId");
    let username = localStorage.getItem("username");
    let token = localStorage.getItem("password");
    let isLogin = localStorage.getItem("isLogin");
    return {userId, username, token, isLogin};
}

export const deleteUserInfo = () => {
    localStorage.removeItem("userId")
    localStorage.removeItem("username")
    localStorage.removeItem("password")
    localStorage.removeItem("isLogin")
}

// 格式化日期
export function formatDate(fmt,time) {
    let date = new Date(time);
    let ret;
    const opt = {
        "Y+": date.getFullYear().toString(),        // 年
        "M+": (date.getMonth() + 1).toString(),     // 月
        "d+": date.getDate().toString(),            // 日
        "h+": date.getHours().toString(),           // 时
        "m+": date.getMinutes().toString(),         // 分
        "s+": date.getSeconds().toString()          // 秒
    };
    for (let k in opt) {
        ret = new RegExp("(" + k + ")").exec(fmt);  
        if (ret) {
            fmt = fmt.replace(ret[1], (ret[1].length === 1) ? (opt[k]) : (opt[k].padStart(ret[1].length, "0")))
        }
    }    
    return fmt;
}