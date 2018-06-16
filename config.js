let config = {
    port: 3000,
    auth: {
        client_id: process.env.PRODUCTION ? 'becquerel' : 'steemboard.app',
        redirect_uri: process.env.SC_REDIR_URL ? process.env.SC_REDIR_URL : 'http://localhost:3001/auth'
    },
    session: {
        //secret: 'lkjasdfkjwnqerakdusfhalsdkjfhafd'
        secret : process.env.SESSION_SECRET
    },
    // jwtsecret: 'sdfopuiwepolhadsfkjasdfoiusdferdf',
    db_url : process.env.DB_URL ? process.env.DB_URL : "localhost",
    db_name : process.env.DB_NAME,
    db_user : process.env.DB_USER,
    db_pwd : process.env.DB_PWD,
    jwtsecret: process.env.JWT_SECRET,
  
};

module.exports = config;
