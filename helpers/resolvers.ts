// eslint-disable-next-line @typescript-eslint/no-var-requires
const pkg = require(`${process.cwd()}/package.json`);

/**
 * Resolve environment variable on process. In undefined case, return "defaultValue".
 *
 * Examples,
 *  ```
 *    resolveEnvVar('DOC_SWAGGER_TITLE')
 *    // return value of -> process.env.DOC_SWAGGER_TITLE
 *  ```
 *
 *  ```
 *    resolveEnvVar('NOT_FOUND_VAR_NAME', 'jujarazo')
 *    // return default value -> 'jujarazo'
 *  ```
 *
 * @note we transform the "key" into uppercase.
 *
 * @param key {string} Environment variable name
 * @param defaultValue {any} Default value
 *
 * @return process environment value or default value
 */
export const resolveEnvVar = (key: string, defaultValue: any = null) => {
  return process.env[key.toUpperCase()] || defaultValue;
};

/**
 * Resolve environment variable on process. In undefined case, return "defaultValue".
 *
 * Examples,
 *  ```
 *    resolveEnvVarWithPrefix('DOC_SWAGGER_TITLE', 'payments')
 *    // return value of -> process.env.PAYMENTS_DOC_SWAGGER_TITLE || process.env.DOC_SWAGGER_TITLE
 *  ```
 *
 *  ```
 *    resolveEnvVarWithPrefix('NOT_FOUND_VAR_NAME', 'payments', 'jujarazo')
 *    // return default value -> 'jujarazo'
 *  ```
 *
 * @note we transform the "key" and "prefix" into uppercase
 *
 * @param key {string} Environment variable name
 * @param prefix {string} Possible environment variable prefix
 * @param defaultValue {any} Default value
 *
 * @return process environment value or default value
 */
export const resolveEnvVarWithPrefix = (
  key: string,
  prefix = '',
  defaultValue: any = null,
) => {
  return (
    process.env[`${prefix}_${key}`.toUpperCase()] ||
    resolveEnvVar(key, defaultValue)
  );
};

/**
 * Resolve environment variable on process. In undefined case, return "defaultValue".
 *
 * Examples,
 *  ```
 *    resolveEnvVarByApp('DOC_SWAGGER_TITLE')
 *    // return value of -> process.env.PAYMENTS_DOC_SWAGGER_TITLE || process.env.DOC_SWAGGER_TITLE
 *  ```
 *
 *  ```
 *    resolveEnvVarByApp('NOT_FOUND_VAR_NAME', 'jujarazo')
 *    // return default value -> 'jujarazo'
 *  ```
 *
 * @note we transform the "key" and "prefix" into uppercase
 * @note the prefix used for this cases, is `package.json -> name`
 *
 * @param key {string} Environment variable name
 * @param defaultValue {any} Default value
 *
 * @return process environment value or default value
 */
export const resolveEnvVarByApp = (key: string, defaultValue: any = null) => {
  return resolveEnvVarWithPrefix(key, pkg.name, defaultValue);
};

/**
 * Resolve any type or function value. In undefined case, return "defaultValue".
 *
 * Examples,
 *  ```
 *    resolvePossibleFunctionValue('my-string-value')
 *    // return -> 'my-string-value'
 *  ```
 *
 *  ```
 *    resolvePossibleFunctionValue(null, 'jujarazo')
 *    // return -> 'jujarazo'
 *  ```
 *
 *  ```
 *    const options = {
 *     uri: (id) => `/api/v1/users/${id}`
 *    };
 *    ...
 *    resolvePossibleFunctionValue(options.uri, '/api/v1/users', 1)
 *    // return -> '/api/v1/users/1'
 *  ```
 *
 *  ```
 *    const options = {
 *     uri: () => null
 *    };
 *    ...
 *    resolvePossibleFunctionValue(options.uri, '/api/v1/users', 1)
 *    // return -> '/api/v1/users'
 *  ```
 *
 * @param value {string | function} Variable we want to solve
 * @param defaultValue {any} Default value in case of not being able to resolve the value
 * @param args {any[]} Argument used in case the value is of type function
 *
 * @return {any} Result of solving the value
 */
export const resolvePossibleFunctionValue = (
  value: any,
  defaultValue: any,
  ...args
) => {
  if (typeof value === 'function') {
    value = value(...args);
  }
  // == null is nil comparation (null or undefined)
  return value == null ? defaultValue : value;
};

/**
 * Resolve any error value. In undefined case, return error.
 *
 * Examples,
 *  ```
 *    resolveErrorResponseData(instanceError)
 *    // return -> instanceError
 *  ```
 *
 *  ```
 *    resolveErrorResponseData(instanceAxiosError)
 *    // return -> instanceAxiosError.response?.data || instanceAxiosError
 *  ```
 *
 *  ```
 *    resolveErrorResponseData(instanceAnyotherError)
 *    // return -> instanceAnyotherError
 *  ```
 *
 * @param error {Error | any} Error
 *
 * @return {any} Result of solving the error response data
 */
export const resolveErrorResponseData = (
  error: any,
  defaultValue: any = null,
) => {
  return error?.isAxiosError ? error.response?.data : error || defaultValue;
};
