declare module 'npm-run-all';
declare module '*.css'
declare module '*.jpg'
declare module '*.jpeg'
declare module '*.png'
declare module '*.gif'
declare module '*.svg'
declare module 'koyomi'

/*
 * Namespace 'React' has no exported member 'StatelessComponent'
 * in formik, react-mapbox-gl
 */
declare namespace React {
  type StatelessComponent<P> = React.FunctionComponent<P>;
}