import { RouteInfo } from './sidebar.metadata';
import { environment } from '../../../environments/environment'

export const ROUTES: RouteInfo[] = [
    // {
    //     path: '/login', title: 'Login', icon: 'ft-log-in', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: []
    // },
    {
        path: '/dashboard', title: 'Dashboard', icon: 'ft-layout', class: '', badge: '', badgeClass: '', isExternalLink: false, permittedRoles: [], submenu: []
    },
    {
        path: '', title: 'Content Pages', icon: 'ft-feather', class: 'has-sub', badge: '', badgeClass: '', isExternalLink: false, permittedRoles: [],
        submenu: [
            { path: '/login', title: 'Login Page', icon: '', class: '', badge: '', badgeClass: '', isExternalLink: false, permittedRoles: [], submenu: [] },
            { path: '/reset-password', title: 'Reset Password Page', icon: '', class: '', badge: '', badgeClass: '', isExternalLink: false, permittedRoles: [], submenu: [] },
            { path: '/content-layout-sample-page', title: 'Content Layout Sample Page', icon: '', class: '', badge: '', badgeClass: '', isExternalLink: false, permittedRoles: [], submenu: [] },
        ]
    },
    // {
    //     path: '', title: 'Partner Tools', icon: 'ft-feather', class: 'has-sub', badge: '', badgeClass: '', isExternalLink: false,
    //     submenu: [
    //         { path: '/tools/viral-contents', title: 'Viral Contents', icon: '', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
    //         { path: '/tools/page-editor', title: 'Page Editor', icon: '', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
    //     ]
    // },
    // {
    //     path: '/payouts', title: 'Payouts', icon: 'ft-credit-card', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: []
    // }
    // {
    //     path: '/content-layout-page', title: 'Content Layout', icon: 'ft-square', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: []
    // }
    // {
    //     path: '', title: 'Menu Levels', icon: 'ft-align-left', class: 'has-sub', badge: '1', badgeClass: 'badge badge-pill badge-danger float-right mr-1 mt-1', isExternalLink: false,
    //     submenu: [
    //         { path: 'javascript:;', title: 'Second Level', icon: '', class: '', badge: '', badgeClass: '', isExternalLink: true, submenu: [] },
    //         {
    //             path: '', title: 'Second Level Child', icon: '', class: 'has-sub', badge: '', badgeClass: '', isExternalLink: false,
    //             submenu: [
    //                 { path: 'javascript:;', title: 'Third Level 1.1', icon: '', class: '', badge: '', badgeClass: '', isExternalLink: true, submenu: [] },
    //                 { path: 'javascript:;', title: 'Third Level 1.2', icon: '', class: '', badge: '', badgeClass: '', isExternalLink: true, submenu: [] },
    //             ]
    //         },
    //     ]
    // },
    // { path: 'https://pixinvent.com/apex-angular-4-bootstrap-admin-template/documentation', title: 'Documentation', icon: 'ft-folder', class: '', badge: '', badgeClass: '', isExternalLink: true, submenu: [] },
    // { path: 'https://pixinvent.ticksy.com/', title: 'Support', icon: 'ft-life-buoy', class: '', badge: '', badgeClass: '', isExternalLink: true, submenu: [] },

];
