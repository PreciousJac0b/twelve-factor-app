import { ITask } from '../models/Task';

interface ValidationResult {
  success: boolean;
  errors?: string[];
}

export function validateTaskData(data: Partial<ITask>): ValidationResult {
  const errors: string[] = [];

  if (!data.tag || typeof data.tag !== 'string') {
    errors.push('Tag is required and must be a string');
  }

  if (!data.title || typeof data.title !== 'string') {
    errors.push('Title is required and must be a string');
  }

  if (!data.details || typeof data.details !== 'string') {
    errors.push('Details is required and must be a string');
  }

  // createdAt is handled automatically by schema so no need to validate

  if (!data.timeDue) {
    errors.push('timeDue is required');
  } else {
    const parsedDate = new Date(data.timeDue as any);
    if (isNaN(parsedDate.getTime())) {
      errors.push('timeDue must be a valid date (ISO string or JS Date)');
    }
  }

  return {
    success: errors.length === 0,
    errors: errors.length ? errors : undefined,
  };
}
