import { permissions } from '../constants';
export default [
    {
        "name": "admin",
        "permissions": `{
            ${ permissions.READ },
            ${ permissions.WRITE },
            ${ permissions.DELETE },
            ${ permissions.SHARE },
            ${ permissions.UPLOAD_FILES }
        }`,
    },
    {
        "name": "content_manager",
        "permissions": `{
            ${ permissions.READ },
            ${ permissions.WRITE },
            ${ permissions.DELETE },
            ${ permissions.SHARE },
            ${ permissions.UPLOAD_FILES }
        }`,
    },
    {
        "name": "customer",
        "permissions": `{
            ${ permissions.READ }
        }`,
    },
    {
        "name": "smm",
        "permissions": `{
            ${ permissions.SHARE }
        }`,
    }
];