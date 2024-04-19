import { createRouter,createWebHashHistory} from 'vue-router'
import HistoricalData from './components/Historical.vue'

const routes=[
    {
        path: '/historical',
        name: 'HistoricalData',
        component: HistoricalData
    },
]

const router = createRouter({
    history:createWebHashHistory(),
    routes
});

export default router

