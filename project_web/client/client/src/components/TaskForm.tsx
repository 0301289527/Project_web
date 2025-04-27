import React from 'react';
import { useForm } from '../hooks/useForm';
import { Input } from './Input';
import { Button } from './Button';

interface TaskFormData {
  title: string;
  description: string;
  priority: 'low' | 'medium' | 'high';
  dueDate: string;
}

interface TaskFormProps {
  initialValues?: Partial<TaskFormData>;
  onSubmit: (data: TaskFormData) => void;
  onCancel?: () => void;
}

export const TaskForm: React.FC<TaskFormProps> = ({
  initialValues = {},
  onSubmit,
  onCancel,
}) => {
  const { values, errors, handleChange, handleSubmit } = useForm<TaskFormData>({
    initialValues: {
      title: initialValues.title || '',
      description: initialValues.description || '',
      priority: initialValues.priority || 'medium',
      dueDate: initialValues.dueDate || '',
    },
    validate: (values) => {
      const errors: Record<string, string> = {};
      if (!values.title) {
        errors.title = '标题不能为空';
      }
      return errors;
    },
    onSubmit: (values) => {
      onSubmit(values);
    },
  });

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        label="标题"
        name="title"
        value={values.title}
        onChange={(e) => handleChange('title', e.target.value)}
        error={errors.title}
        fullWidth
      />
      
      <Input
        label="描述"
        name="description"
        value={values.description}
        onChange={(e) => handleChange('description', e.target.value)}
        fullWidth
      />
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          优先级
        </label>
        <select
          name="priority"
          value={values.priority}
          onChange={(e) => handleChange('priority', e.target.value as TaskFormData['priority'])}
          className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
        >
          <option value="low">低</option>
          <option value="medium">中</option>
          <option value="high">高</option>
        </select>
      </div>
      
      <Input
        label="截止日期"
        name="dueDate"
        type="date"
        value={values.dueDate}
        onChange={(e) => handleChange('dueDate', e.target.value)}
        fullWidth
      />
      
      <div className="flex justify-end space-x-4">
        {onCancel && (
          <Button
            type="button"
            variant="secondary"
            onClick={onCancel}
          >
            取消
          </Button>
        )}
        <Button
          type="submit"
          variant="primary"
        >
          保存
        </Button>
      </div>
    </form>
  );
}; 