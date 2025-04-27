import { useState, useCallback } from 'react';

interface FormErrors {
  [key: string]: string;
}

interface FormState<T> {
  values: T;
  errors: FormErrors;
  isSubmitting: boolean;
  isValid: boolean;
}

interface UseFormOptions<T> {
  initialValues: T;
  validate?: (values: T) => FormErrors;
  onSubmit: (values: T) => Promise<void> | void;
}

export function useForm<T extends Record<string, any>>({
  initialValues,
  validate,
  onSubmit,
}: UseFormOptions<T>) {
  const [formState, setFormState] = useState<FormState<T>>({
    values: initialValues,
    errors: {},
    isSubmitting: false,
    isValid: false,
  });

  const handleChange = useCallback((name: keyof T, value: any) => {
    setFormState((prev) => {
      const newValues = { ...prev.values, [name]: value };
      const newErrors = validate ? validate(newValues) : {};
      return {
        ...prev,
        values: newValues,
        errors: newErrors,
        isValid: Object.keys(newErrors).length === 0,
      };
    });
  }, [validate]);

  const handleSubmit = useCallback(async (e?: React.FormEvent) => {
    if (e) {
      e.preventDefault();
    }

    if (validate) {
      const errors = validate(formState.values);
      setFormState((prev) => ({
        ...prev,
        errors,
        isValid: Object.keys(errors).length === 0,
      }));

      if (Object.keys(errors).length > 0) {
        return;
      }
    }

    setFormState((prev) => ({ ...prev, isSubmitting: true }));

    try {
      await onSubmit(formState.values);
      setFormState((prev) => ({ ...prev, isSubmitting: false }));
    } catch (error) {
      setFormState((prev) => ({
        ...prev,
        isSubmitting: false,
        errors: {
          ...prev.errors,
          submit: error instanceof Error ? error.message : '提交失败',
        },
      }));
    }
  }, [formState.values, onSubmit, validate]);

  const resetForm = useCallback(() => {
    setFormState({
      values: initialValues,
      errors: {},
      isSubmitting: false,
      isValid: false,
    });
  }, [initialValues]);

  return {
    values: formState.values,
    errors: formState.errors,
    isSubmitting: formState.isSubmitting,
    isValid: formState.isValid,
    handleChange,
    handleSubmit,
    resetForm,
  };
} 