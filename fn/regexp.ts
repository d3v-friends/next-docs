const regexp = {
    username: new RegExp(/^[a-z][a-z0-9]{7,20}$/),
    password: new RegExp(/^[a-zA-Z0-9!@#$%^&*()_+|~`=-{}\[\];':",./<>?\\]{8,30}$/),
    repo: new RegExp(/^https:\/\/[a-zA-Z0-9_-].+$/),
    repoKey: new RegExp(/^ghp_.+$/),
};

export default regexp;
