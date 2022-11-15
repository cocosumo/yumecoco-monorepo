import { useField } from 'formik';
import { SearchProjects } from './SearchProjects';

/* TODO: SearchProjectsのラッパーとして変える */
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