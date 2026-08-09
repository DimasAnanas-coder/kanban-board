import babelParser from '@babel/eslint-parser';
import importPlugin from 'eslint-plugin-import';
import reactPlugin from 'eslint-plugin-react';

export default [
    {
        plugins: {
            import: importPlugin,
            react: reactPlugin,
        },
        files: ['**/*.js', '**/*.jsx'],
        ignores: [
            'node_modules/**',
            'dist/**',
            'build/**',
            'coverage/**',
            '.next/**',
            'out/**',
        ],
        languageOptions: {
            parser: babelParser,
            parserOptions: {
                ecmaVersion: 2022,
                sourceType: 'module',
                requireConfigFile: false,
                babelOptions: {
                    presets: ['@babel/preset-react'],
                },
                ecmaFeatures: {
                    jsx: true,
                },
            },
            globals: {
                console: 'readonly',
                process: 'readonly',
                Buffer: 'readonly',
                setTimeout: 'readonly',
                clearTimeout: 'readonly',
                setInterval: 'readonly',
                clearInterval: 'readonly',
                Promise: 'readonly',
                Map: 'readonly',
                Set: 'readonly',
                WeakMap: 'readonly',
                WeakSet: 'readonly',
                Symbol: 'readonly',
                Reflect: 'readonly',
                Proxy: 'readonly',
                Error: 'readonly',
                TypeError: 'readonly',
                ReferenceError: 'readonly',
                JSON: 'readonly',
                globalThis: 'readonly',
                document: 'readonly',
                window: 'readonly',
                navigator: 'readonly',
                location: 'readonly',
                history: 'readonly',
                localStorage: 'readonly',
                sessionStorage: 'readonly',
                fetch: 'readonly',
                WebSocket: 'readonly',
                EventSource: 'readonly',
                React: 'readonly',
                JSX: 'readonly',
            },
        },
        settings: {
            'import/resolver': {
                node: {
                    extensions: ['.js', '.jsx', '.json'],
                },
            },
            react: {
                version: 'detect',
            },
        },
        rules: {
            'no-console': 'off',
            'semi': ['error', 'always'],
            'quotes': ['error', 'single', { 'avoidEscape': true }],
            'indent': ['error', 4, { 'SwitchCase': 1 }],
            'comma-dangle': ['error', 'always-multiline'],
            'no-var': 'error',
            'prefer-const': 'error',
            'eqeqeq': ['error', 'always'],
            'curly': ['error', 'all'],
            'brace-style': ['error', '1tbs'],
            'space-before-function-paren': ['error', 'never'],
            'space-in-parens': ['error', 'never'],
            'object-curly-spacing': ['error', 'always'],
            'array-bracket-spacing': ['error', 'never'],
            'eol-last': ['error', 'always'],
            'no-trailing-spaces': 'error',
            'no-multiple-empty-lines': ['error', { 'max': 2 }],

            // Отключаем проверку import
            'import/no-unresolved': 'off',
            'import/named': 'off',
            'import/default': 'off',
            'import/export': 'off',
            'import/no-cycle': 'off',

            // React правила
            'react/jsx-uses-react': 'error',
            'react/jsx-uses-vars': 'error',
            'react/jsx-indent': ['error', 4],
            'react/jsx-curly-spacing': ['error', 'never'],
            'react/jsx-equals-spacing': ['error', 'never'],
            'react/jsx-tag-spacing': ['error', {
                'closingSlash': 'never',
                'beforeSelfClosing': 'always',
                'afterOpening': 'never',
                'beforeClosing': 'never',
            }],
        },
    },
];
