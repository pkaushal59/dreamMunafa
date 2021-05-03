import axios from 'axios'

const instance = axios.create({
    baseURL: 'http://localhost:5001/clone-8b84b/us-central1/api'
});

export default instance;
//'sk_test_51Ikuh4SCnrsQyNklPeWFwGgqpUwtowKRvDtl1xQ5hh1rXN7p9mzxsechkaa2OZeDnni797YvbR3o8BMHCj9YX6jw007PckES4N'