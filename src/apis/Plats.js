import Api from "./Api";

const END_POINT = 'plats'

export default {
    all() {
        return Api.get(END_POINT);
    }
}