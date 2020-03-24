import Vue from 'vue';
import Vuetify from 'vuetify/lib';

Vue.use(Vuetify);

export default new Vuetify({
    iconfont: 'md',
    theme: {
        themes: {
            light : {
                primary : '#1BE7FF',
                secondary:'#FFEAE4',
                accent: '0069d9'
            },
            dark : {
                primary: '#0069d9'
            }
        }
    }
});
