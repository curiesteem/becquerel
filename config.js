let config = {
    port: 3000,
    auth: {
        client_id: 'steemboard.app',
        redirect_uri: process.env.SC_REDIR_URL ? process.env.SC_REDIR_URL : 'http://localhost:3001/auth'
    },
    session: {
        secret: 'lkjasdfkjwnqerakdusfhalsdkjfhafd'
    },
    jwtsecret: 'sdfopuiwepolhadsfkjasdfoiusdferdf',
    db_url : process.env.DB_URL ? process.env.DB_URL : "localhost",
    db_name : process.env.DB_NAME,
    db_user : process.env.DB_USER,
    db_pwd : process.env.DB_PWD
  
};

module.exports = config;
