export const getUser = () => {
    const user = localStorage.getItem("user");
    console.log(user,"user");
    
    return user ? JSON.parse(user) : null;
};

export const isAuthenticated = () => {
    return !!getUser();
};
