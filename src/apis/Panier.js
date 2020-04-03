import Api from "./Api";

const END_POINT = 'paniers-details'

export default {
    all() {
        return Api.get(END_POINT+'?panier=41');
    },
    store(data) {
        return Api.post(END_POINT, data);
    },
    patch(id,data) {
        return Api.patch(END_POINT + '/'+ id, data)
    },
    patchWithPlat(plat_id,data) {
        return Api.patch(END_POINT + '?panier=41&plat=' +plat_id, data)
    },
    delete(id) {
        return Api.delete(END_POINT + '/' +id)
    },
    deleteWithPlat(plat_id) {
        return Api.delete(END_POINT + '?panier=41&plat=' +plat_id)
    },
    deleteAll() {
        return Api.delete(END_POINT + '-delete?panier=41')
    },
    getOne(plat_id) {
        return Api.get(END_POINT + '-single?panier=41&plat=' + plat_id)
    }

}