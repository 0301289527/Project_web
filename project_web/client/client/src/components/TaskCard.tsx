import React from 'react';
import { twMerge } from 'tailwind-merge';
import { Button } from './Button';

interface TaskCardProps {
  title: string;
  description?: string;
  status: 'pending' | 'in_progress' | 'completed';
  priority: 'low' | 'medium' | 'high';
  onEdit?: () => void;
  onDelete?: () => void;
  onStatusChange?: (status: 'pending' | 'in_progress' | 'completed') => void;
}

const statusStyles: Record<TaskCardProps['status'], string> = {
  pending: 'bg-yellow-100 text-yellow-800',
  in_progress: 'bg-blue-100 text-blue-800',
  completed: 'bg-green-100 text-green-800',
};

const priorityStyles: Record<TaskCardProps['priority'], string> = {
  low: 'bg-gray-100 text-gray-800',
  medium: 'bg-orange-100 text-orange-800',
  high: 'bg-red-100 text-red-800',
};

export const TaskCard: React.FC<TaskCardProps> = ({
  title,
  description,
  status,
  priority,
  onEdit,
  onDelete,
  onStatusChange,
}) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-4">
      <div className="flex justify-between items-start mb-2">
        <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
        <div className="flex space-x-2">
          {onEdit && (
            <Button
              variant="secondary"
              size="sm"
              onClick={onEdit}
            >
              编辑
            </Button>
          )}
          {onDelete && (
            <Button
              variant="danger"
              size="sm"
              onClick={onDelete}
            >
              删除
            </Button>
          )}
        </div>
      </div>
      
      {description && (
        <p className="text-gray-600 mb-4">{description}</p>
      )}
      
      <div className="flex justify-between items-center">
        <div className="flex space-x-2">
          <span className={twMerge(
            'px-2 py-1 rounded-full text-xs font-medium',
            statusStyles[status]
          )}>
            {status === 'pending' && '待处理'}
            {status === 'in_progress' && '进行中'}
            {status === 'completed' && '已完成'}
          </span>
          <span className={twMerge(
            'px-2 py-1 rounded-full text-xs font-medium',
            priorityStyles[priority]
          )}>
            {priority === 'low' && '低优先级'}
            {priority === 'medium' && '中优先级'}
            {priority === 'high' && '高优先级'}
          </span>
        </div>
        
        {onStatusChange && (
          <div className="flex space-x-2">
            <Button
              variant="secondary"
              size="sm"
              onClick={() => onStatusChange('pending')}
              disabled={status === 'pending'}
            >
              待处理
            </Button>
            <Button
              variant="secondary"
              size="sm"
              onClick={() => onStatusChange('in_progress')}
              disabled={status === 'in_progress'}
            >
              进行中
            </Button>
            <Button
              variant="secondary"
              size="sm"
              onClick={() => onStatusChange('completed')}
              disabled={status === 'completed'}
            >
              已完成
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}; 