import { useField } from 'formik';
import { SearchProjects } from './SearchProjects';

/**
 * Higher level formik wrapper for searching projects.
 * 
 * nameを渡すことだけで、Formikのフォームにバインド出来ます。
 * Formikは使用しないなら、より低レベルのSearchProjectsをご利用ください。
 */
export const FormikSearchProjField = (props: {
  name: string,
  label: string,
  projName: string,
  disabled?: boolean,
  isLoading?: boolean
  handleChange?: () => void
}) => {
  const [field, , helpers] = useField(props);
  const { value: projId } = field;
  

  const {
    projName,
    isLoading = false,
    disabled = false,
    label,
    handleChange,
  } = props;

  return (
    <SearchProjects 
      label={label}
      value={projName ? {
        id: projId,
        projName: projName,
      } : undefined}
      onChange={(_, val) => {
        helpers.setValue(val?.id);
        handleChange?.();
      }}
      loading={isLoading}
      disabled={disabled}
    />
  );
};