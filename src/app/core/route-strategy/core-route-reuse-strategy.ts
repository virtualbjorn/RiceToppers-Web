import { RouteReuseStrategy, DetachedRouteHandle, ActivatedRouteSnapshot } from "@angular/router";
import { environment } from 'environments/environment'

// This impl. bases upon one that can be found in the router's test cases.
export class CoreRouteReuseStrategy implements RouteReuseStrategy {

    handlers: { [key: string]: DetachedRouteHandle } = {};

    shouldDetach(route: ActivatedRouteSnapshot): boolean {
        // console.log('CustomReuseStrategy:shouldDetach', route);
        return true;
    }

    store(route: ActivatedRouteSnapshot, handle: DetachedRouteHandle): void {
        // console.log('CustomReuseStrategy:store', route, handle);

        if (this.isRouteReusable(route)) {
            this.handlers[route.routeConfig.path] = handle;
        }
    }

    shouldAttach(route: ActivatedRouteSnapshot): boolean {
        // console.log('CustomReuseStrategy:shouldAttach', route);
        return !!route.routeConfig && !!this.handlers[route.routeConfig.path];
    }

    retrieve(route: ActivatedRouteSnapshot): DetachedRouteHandle {
        // console.log('CustomReuseStrategy:retrieve', route);
        if (!route.routeConfig && !this.isRouteReusable(route)) {
            return null;
        } else {
            return this.handlers[route.routeConfig.path];
        }
    }

    shouldReuseRoute(future: ActivatedRouteSnapshot, curr: ActivatedRouteSnapshot): boolean {
        // console.log('CustomReuseStrategy:shouldReuseRoute', future, curr);
        return future.routeConfig === curr.routeConfig;
    }

    isRouteReusable(route: ActivatedRouteSnapshot): boolean { // Refactor: Should not use magic variables
        if (!route) {
            return false;
        } else {
            let result = false;

            Object.keys(environment.reusablePaths).forEach(path => {
                if (route.routeConfig.path === environment.reusablePaths[path]) {
                    result = true;
                }
            })

            return result;
        }
    }
}