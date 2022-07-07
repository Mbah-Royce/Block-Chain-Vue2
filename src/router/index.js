import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import CreateWallet from '../views/CreateWallet.vue';
import AccessWallet from '../views/AccessWallet.vue';
import Dashboard from '../views/Dashboard.vue';
import Transaction from '../views/Transaction.vue';
import BlockChain from '../views/BlockChain.vue';
import CertificateIssue from '../views/CertificateIssue.vue';
import Wallet from '../views/Wallet.vue';
import FeatureView from '../views/FeatureView.vue';
import Draw from '../views/Draw.vue';
import mapComponent from '../components/Map.vue';

Vue.use(VueRouter)

const routes = [{
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/createwallet',
        name: 'CreateWallet',
        component: CreateWallet
    },
    {
        path: '/dashboard',
        name: 'Dashboard',
        component: Dashboard
    },
    {
        path: '/accesswallet',
        name: 'AccessWallet',
        component: AccessWallet
    },
    {
        path: '/transaction',
        name: 'Transaction',
        component: Transaction
    },
    {
        path: '/blockchain',
        name: 'BlockChain',
        component: BlockChain
    },
    {
        path: '/createCertificate',
        name: 'CertificateIssue',
        component: CertificateIssue
    },
    {
        path: '/wallet',
        name: 'Wallet',
        component: Wallet
    },
    {
        path: '/feature_view',
        name: 'FeatureView',
        component: FeatureView
    },
    {
        path: '/mapComponent',
        name: 'MapComponent',
        component: mapComponent
    },
    {
        path: '/draw/:aspect/:id',
        name: 'Draw',
        component: Draw
    },
    {
        path: '/about',
        name: 'About',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
            import ( /* webpackChunkName: "about" */ '../views/About.vue')
    }
]

const router = new VueRouter({
    routes
})

export default router