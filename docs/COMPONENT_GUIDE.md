# Component Development Guide

## Creating Reusable Components

### Component Template

```jsx
import React from 'react';

/**
 * ComponentName - Brief description
 * 
 * @param {Object} props
 * @param {string} props.propName - Description
 * @returns {JSX.Element}
 */
const ComponentName = ({ 
    propName, 
    className = '', 
    ...props 
}) => {
    return (
        <div className={`base-classes ${className}`} {...props}>
            {/* Component content */}
        </div>
    );
};

export default ComponentName;
```

### Props Best Practices

1. **Destructure props** for clarity
2. **Provide default values** for optional props
3. **Use meaningful names** that describe the prop's purpose
4. **Document complex props** with JSDoc comments
5. **Spread remaining props** with `{...props}` for flexibility

### Example: Creating a Reusable Button

```jsx
import React from 'react';

const Button = ({ 
    children,
    variant = 'primary',
    size = 'medium',
    icon: Icon,
    disabled = false,
    loading = false,
    className = '',
    onClick,
    ...props 
}) => {
    const variants = {
        primary: 'bg-blue-600 text-white hover:bg-blue-700',
        secondary: 'bg-gray-200 text-gray-800 hover:bg-gray-300',
        danger: 'bg-red-600 text-white hover:bg-red-700',
        ghost: 'bg-transparent hover:bg-gray-100',
    };

    const sizes = {
        small: 'px-3 py-1.5 text-sm',
        medium: 'px-4 py-2 text-base',
        large: 'px-6 py-3 text-lg',
    };

    return (
        <button
            onClick={onClick}
            disabled={disabled || loading}
            className={`
                inline-flex items-center justify-center gap-2
                rounded-lg font-medium transition-colors
                disabled:opacity-50 disabled:cursor-not-allowed
                ${variants[variant]}
                ${sizes[size]}
                ${className}
            `}
            {...props}
        >
            {loading ? (
                <span className="animate-spin">⏳</span>
            ) : Icon ? (
                <Icon className="w-4 h-4" />
            ) : null}
            {children}
        </button>
    );
};

export default Button;
```

### Usage Examples

```jsx
// Basic usage
<Button>Click Me</Button>

// With variant and size
<Button variant="secondary" size="large">
    Large Button
</Button>

// With icon
<Button icon={PlusIcon}>
    Add Item
</Button>

// Loading state
<Button loading>
    Processing...
</Button>

// Custom styling
<Button className="w-full">
    Full Width Button
</Button>
```

## Component Composition

### Building Complex Components from Simple Ones

```jsx
import React from 'react';
import { Card, Button, Icon, ProgressBar } from '@/components/ui';
import { Badge } from '@/components/common';

const ClientCard = ({ client, onAction }) => {
    return (
        <Card className="p-6">
            {/* Header with status */}
            <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                    <Icon name={client.icon} className="w-8 h-8" />
                </div>
                <Badge variant={client.status}>
                    {client.status}
                </Badge>
            </div>

            {/* Content */}
            <div className="mb-4">
                <h3 className="text-lg font-bold">{client.name}</h3>
                <p className="text-sm text-gray-500">{client.sector}</p>
            </div>

            {/* Progress */}
            <ProgressBar 
                value={client.progress} 
                label="Audit Progress" 
            />

            {/* Action */}
            <Button 
                onClick={() => onAction(client)}
                className="w-full mt-4"
            >
                View Details
            </Button>
        </Card>
    );
};

export default ClientCard;
```

## State Management in Components

### Local State
```jsx
const [isOpen, setIsOpen] = useState(false);
const [value, setValue] = useState('');
```

### Derived State
```jsx
const isValid = value.length > 0;
const hasError = touched && !isValid;
```

### Effects
```jsx
useEffect(() => {
    // Side effects
    return () => {
        // Cleanup
    };
}, [dependencies]);
```

## Styling Guidelines

### Tailwind CSS Classes

1. **Order of classes**:
   - Layout (flex, grid, block)
   - Spacing (p-, m-)
   - Sizing (w-, h-)
   - Typography (text-, font-)
   - Colors (bg-, text-, border-)
   - Effects (shadow-, rounded-)
   - States (hover:, focus:, active:)

2. **Responsive design**:
   ```jsx
   className="w-full md:w-1/2 lg:w-1/3"
   ```

3. **Conditional classes**:
   ```jsx
   className={`
       base-classes
       ${condition ? 'conditional-classes' : 'else-classes'}
   `}
   ```

## Accessibility

### ARIA Attributes
```jsx
<button
    aria-label="Close dialog"
    aria-pressed={isPressed}
    aria-disabled={disabled}
>
    Close
</button>
```

### Keyboard Navigation
```jsx
const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
        onClick();
    }
};
```

### Focus Management
```jsx
<button
    className="focus:outline-none focus:ring-2 focus:ring-blue-500"
    autoFocus={shouldFocus}
>
    Button
</button>
```

## Performance Optimization

### Memoization
```jsx
const MemoizedComponent = React.memo(Component);
```

### Callback Memoization
```jsx
const handleClick = useCallback(() => {
    // Handler logic
}, [dependencies]);
```

### Computed Values
```jsx
const expensiveValue = useMemo(() => {
    return computeExpensiveValue(data);
}, [data]);
```

## Testing Components

### Component Test Template
```jsx
import { render, screen, fireEvent } from '@testing-library/react';
import Component from './Component';

describe('Component', () => {
    it('renders correctly', () => {
        render(<Component />);
        expect(screen.getByText('Text')).toBeInTheDocument();
    });

    it('handles user interaction', () => {
        const handleClick = jest.fn();
        render(<Component onClick={handleClick} />);
        
        fireEvent.click(screen.getByRole('button'));
        expect(handleClick).toHaveBeenCalledTimes(1);
    });
});
```

## Common Patterns

### Controlled Components
```jsx
<Input
    value={value}
    onChange={(e) => setValue(e.target.value)}
/>
```

### Compound Components
```jsx
<Card>
    <Card.Header>Title</Card.Header>
    <Card.Body>Content</Card.Body>
    <Card.Footer>Actions</Card.Footer>
</Card>
```

### Render Props
```jsx
<DataProvider>
    {({ data, loading, error }) => (
        loading ? <Spinner /> : <Content data={data} />
    )}
</DataProvider>
```

## Checklist for New Components

- [ ] Component follows naming conventions
- [ ] Props are properly typed/documented
- [ ] Default values provided for optional props
- [ ] Accessible (ARIA, keyboard navigation)
- [ ] Responsive design implemented
- [ ] Handles loading/error states
- [ ] Optimized for performance
- [ ] Reusable and composable
- [ ] Consistent with design system
- [ ] Tests written (unit + integration)
