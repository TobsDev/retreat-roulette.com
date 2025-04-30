# Retreat Roulette Development Guidelines

## 1. Code Organization

### Component Structure
```tsx
// components/ui/ComponentName.tsx
import { cn } from '@/utils/cn';
import type { ComponentProps } from '@/types';

export interface ComponentNameProps {
  className?: string;
  // ... other props
}

export function ComponentName({ className, ...props }: ComponentNameProps) {
  return (
    <div className={cn('base-classes', className)} {...props}>
      {/* content */}
    </div>
  );
}
```

### File Structure
```
src/
├── components/
│   ├── ui/           # Reusable UI components
│   └── features/     # Feature-specific components
├── hooks/            # Custom React hooks
├── utils/           # Utility functions
├── types/           # TypeScript types/interfaces
├── styles/          # Global styles
└── lib/             # Third-party library configurations
```

## 2. Styling Guidelines

### Tailwind Usage
- Use Tailwind's utility classes for styling
- Create reusable components for repeated patterns
- Use `cn()` utility for conditional classes
- Keep responsive designs mobile-first

Example:
```tsx
className={cn(
  "base-styles",
  "sm:tablet-styles",
  "lg:desktop-styles",
  className
)}
```

## 3. Testing

### Component Tests
- Write tests for component rendering
- Test user interactions
- Test accessibility
- Test responsive behavior

Example:
```tsx
describe('ComponentName', () => {
  it('renders correctly', () => {
    render(<ComponentName />);
    expect(screen.getByRole('button')).toBeInTheDocument();
  });
});
```

## 4. Logging

### Development Logging
- Use the logger utility for all logging
- Include contextual information
- Use appropriate log levels

```typescript
import { logger } from '@/utils/logger';

logger.info('Component mounted', { componentName: 'SlotMachine' });
logger.error('API error', { error, endpoint });
```

## 5. Git Workflow

### Commit Messages
Format: `type(scope): description`

Types:
- feat: New feature
- fix: Bug fix
- refactor: Code change that neither fixes a bug nor adds a feature
- style: Changes that do not affect the meaning of the code
- test: Adding missing tests or correcting existing tests
- docs: Documentation only changes

Example:
```
feat(slot-machine): add lever animation
fix(audio): resolve sound delay issue
```

### Branch Naming
Format: `type/description`
Example: `feat/add-lever-animation`

## 6. Performance Guidelines

- Lazy load components when possible
- Optimize images and assets
- Monitor bundle size
- Use React.memo for expensive renders
- Profile performance regularly

## 7. Accessibility

- Use semantic HTML
- Include ARIA labels
- Ensure keyboard navigation
- Test with screen readers
- Follow WCAG guidelines

## 8. State Management

- Use React Query for server state
- Use Zustand for complex client state
- Keep component state minimal
- Document state dependencies

## 9. Error Handling

- Use error boundaries
- Log errors appropriately
- Provide user-friendly error messages
- Include error recovery when possible 