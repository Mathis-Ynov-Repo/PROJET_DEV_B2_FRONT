import Api from "./Api";

const END_POINT = 'commandes'

export default {
    all() {
        return Api.get(END_POINT);
    },
    store(data) {
        return Api.post(END_POINT, data);
    }

}