import { fileURLToPath, URL } from 'node:url';

import { defineConfig } from 'vite';
import plugin from '@vitejs/plugin-react';
import fs from 'fs';
import path from 'path';
import child_process from 'child_process';

const baseFolder =
    process.env.APPDATA !== undefined && process.env.APPDATA !== ''
        ? `${process.env.APPDATA}/ASP.NET/https`
        : `${process.env.HOME}/.aspnet/https`;

const certificateArg = process.argv.map(arg => arg.match(/--name=(?<value>.+)/i)).filter(Boolean)[0];
const certificateName = certificateArg ? certificateArg.groups.value : "cms.client";

if (!certificateName) {
    console.error('Invalid certificate name. Run this script in the context of an npm/yarn script or pass --name=<<app>> explicitly.')
    process.exit(-1);
}

const certFilePath = path.join(baseFolder, `${certificateName}.pem`);
const keyFilePath = path.join(baseFolder, `${certificateName}.key`);

if (!fs.existsSync(certFilePath) || !fs.existsSync(keyFilePath)) {
    if (0 !== child_process.spawnSync('dotnet', [
        'dev-certs',
        'https',
        '--export-path',
        certFilePath,
        '--format',
        'Pem',
        '--no-password',
    ], { stdio: 'inherit', }).status) {
        throw new Error("Could not create certificate.");
    }
}

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [plugin()],
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url))
        }
    },
    server: {
        proxy: {
            '^/timesheet': {
                target: 'https://localhost:7062/',
                secure: false
            },
            '^/company': {
                target: 'https://localhost:7062/',
                secure: false
            },
            '^/page': {
                target: 'https://localhost:7062/',
                secure: false
            },
            '^/category': {
                target: 'https://localhost:7062/',
                secure: false
            },
            '^/employee': {
                target: 'https://localhost:7062/',
                secure: false
            },
            '^/payrollEntry': {
                target: 'https://localhost:7062/',
                secure: false
            },
            '^/api/Authentication/authenticate': {
                target: 'https://localhost:7062/',
                secure: false
            },
            '^/Account/Login': {
                target: 'https://localhost:7062/',
                secure: false
            },
            '^/Account/Logout': {
                target: 'https://localhost:7062/',
                secure: false
            },
            '^/Account/SignedOut': {
                target: 'https://localhost:7062/',
                secure: false
            },
            '^/Account/Signout': {
                target: 'https://localhost:7062/',
                secure: false
            },
            '^/Private/Pages': {
                target: 'https://localhost:7062/',
                secure: false
            },
            '^/Private/Timesheets': {
                target: 'https://localhost:7062/',
                secure: false
            },
            '^/Private/Employees': {
                target: 'https://localhost:7062/',
                secure: false
            },
            '^/Private/Payroll': {
                target: 'https://localhost:7062/',
                secure: false
            },
            '^/Account/profile': {
                target: 'https://localhost:7062/',
                secure: false
            },
            '^/Account/IsLoggedIn': {
                target: 'https://localhost:7062/',
                secure: false
            },
            '^/Account/Logoff/GetLogoff': {
                target: 'https://localhost:7062/',
                secure: false
            },
        },
        port: 5173,
        https: {
            key: fs.readFileSync(keyFilePath),
            cert: fs.readFileSync(certFilePath),
        }
    }
})
